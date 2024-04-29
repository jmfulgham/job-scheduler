import * as turf from "@turf/turf"
import {findCompletedJobs, findPendingJobs, ON_LOCATION_JOB_TYPE, REMOTE_JOB_TYPE} from "./jobs.js";

const getProviderRatings = (jobs, providers) => {
    const completedJobs = jobs.filter(job => job.status === "COMPLETE")
    let avg_rating;

    for (const provider of providers) {
        provider["jobs"] = []
    }
    for (const job of completedJobs) {
        providers.map(provider => {
            if (provider.id === job.provider_id) {
                provider["jobs"] = [...provider.jobs, {jid: job.id, rating: job.provider_rating}]
            }
        })
    }
    for (const provider of providers) {
        let numberOfJobs = provider.jobs.length
        let rating_sum = provider.jobs.reduce((rating, job) => {
            if (job.rating === "" || null) {
                numberOfJobs--
                return 0
            }
            return rating + parseInt(job.rating)
        }, 0)
        if (rating_sum && numberOfJobs === 0) avg_rating = 0
        avg_rating = rating_sum / numberOfJobs
        provider["avg_rating"] = avg_rating;
    }
    return providers
}

const calculateAveragePageCost = (jobs, providerId) => {
    const completedJobs = findCompletedJobs(jobs)
    const getJobsByLocationAndProviderId = (locationType, providerId) => completedJobs.filter(job => {
        if ((job.provider_id === providerId) && (job.location_type === locationType)) {
            return job
        }
    })
    const remoteJobs = getJobsByLocationAndProviderId(REMOTE_JOB_TYPE, providerId)
    const onLocationJobs = getJobsByLocationAndProviderId(ON_LOCATION_JOB_TYPE, providerId)

    const averageCost = (jobs) => (jobs.reduce((tally, current) => {
        if (current["avg_cost_per_page"]) return tally + Number(current["avg_cost_per_page"])
        return tally
    }, 0) / jobs.length)
    const avg_remote_cost_p_page = isNaN(averageCost(remoteJobs)) ? null : averageCost(remoteJobs);
    const avg_location_cost_p_page = isNaN(averageCost(onLocationJobs)) ? null : averageCost(onLocationJobs);
    return {avg_remote_cost_p_page, avg_location_cost_p_page, provider_id: providerId}
}

const findDistance = (scheduledJob, providers) => {
    if (scheduledJob?.location_type === REMOTE_JOB_TYPE) return {distance_in_miles: 0}
    const jobCoords = scheduledJob?.latitude && turf.point([scheduledJob.longitude, scheduledJob.latitude])
    const providerCoords = providers.map(provider => ({
        provider_id: provider.id,
        coords: turf.point([provider.longitude, provider.latitude])
    }))
    const options = {units: "miles"}
    return providerCoords.map((provider) => {
        const placeholder = {}
        placeholder["provider_id"] = provider.provider_id
        placeholder["distance_in_miles"] = Math.round(turf.distance(jobCoords, provider.coords, options))
        return placeholder
    })
}

const calculateTurnInTime = (jobs, providers) => {
    const completedJobs = findCompletedJobs(jobs)
    const materialTurnInWaitTimes = completedJobs.map(({materials_turned_in_at, provider_id, datetime}) => {
        const formatted_materials_date = new Date(materials_turned_in_at);
        const formatted_datetime = new Date(datetime)
        const timeDifference =
            formatted_materials_date.getTime() - formatted_datetime.getTime();

        const dayDifference =
            Math.round
            (timeDifference / (1000 * 3600 * 24));
        return {avg_days_to_turn_in: dayDifference, provider_id}
    })

    const outstandingMaterials = findPendingJobs(jobs)
    return providers.map(provider => {
        const sumOfWaitTimesById = materialTurnInWaitTimes.filter(({provider_id}) => provider_id === provider.id)
        const awaitingMaterialsByProvider = outstandingMaterials.filter(({provider_id}) => provider_id === provider.id).length
        const totalDays = Math.round(sumOfWaitTimesById.reduce((tally, curr) => {
            if (curr["provider_id"]) return tally + curr["avg_days_to_turn_in"]
            return tally
        }, 0) / sumOfWaitTimesById.length) + awaitingMaterialsByProvider
        return {provider_id: provider.id, avg_days_to_turn_in: totalDays ? totalDays : null}
    })
}

export {getProviderRatings, calculateAveragePageCost, findDistance, calculateTurnInTime}