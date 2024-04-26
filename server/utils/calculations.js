import * as turf from '@turf/turf'
import {findCompletedJobs, findPendingJobs} from "./jobs.js";

const getProviderRatings = (jobs, providers) => {
    const completedJobs = jobs.filter(job => job.status === "COMPLETE")
    let avg_rating;

    for (const provider of providers) {
        provider["jobs"] = []
    }

    for (const job of completedJobs) {
        providers.map(provider => {
            if (provider.id === job.provider_id) {
                provider['jobs'] = [...provider.jobs, {jid: job.id, rating: job.provider_rating}]
            }
        })
    }

    for (const provider of providers) {
        let numberOfJobs = provider.jobs.length
        let rating_sum = provider.jobs.reduce((rating, job) => {
            if (job.rating === '' || null) {
                numberOfJobs--
                return 0
            }
            return rating + parseInt(job.rating)
        }, 0)
        if (rating_sum && numberOfJobs === 0) avg_rating = 0
        avg_rating = rating_sum / numberOfJobs
        provider['avg_rating'] = avg_rating;
    }
}

const calculateAveragePageCost = (jobs, providerId) => {
    const completedJobs = findCompletedJobs(jobs)
    const getJobsByLocationAndProviderId = (locationType, providerId) => completedJobs.filter(job => {
        if ((job.provider_id === providerId) && (job.location_type === locationType)) {
            return job
        }
    })

    const remoteJobs = getJobsByLocationAndProviderId("REMOTE", providerId)
    const onLocationJobs = getJobsByLocationAndProviderId("LOCATION_BASED", providerId)
    const averageCost = (jobs) => (jobs.reduce((prev, current) => {
        if (current['avg_cost_per_page']) return prev + Number(current['avg_cost_per_page'])
    }, 0) / jobs.length)

    const averageRemoteJobCost = averageCost(remoteJobs);
    const averageOnLocationJobCost = averageCost(onLocationJobs)
    return {averageRemoteJobCost, averageOnLocationJobCost, provider_id: providerId}
}

const findDistance = (scheduledJobs, providers) => {
//TODO spot check distance
    const filteredLocationJobs = scheduledJobs.filter(job => job.location_type === "LOCATION_BASED")
    const scheduledCoords = filteredLocationJobs.map(job => ({
        job_id: job.id,
        coords: turf.point([job.longitude, job.latitude])
    }))

    const providerCoords = providers.map(provider => ({
        provider_id: provider.id,
        coords: turf.point([provider.longitude, provider.latitude])
    }))

    const options = {units: 'miles'}

    return providerCoords.map((provider) => {
        let jobs = []
        const placeholder = {}
        for (const jobLocation of scheduledCoords) {
            placeholder['provider_id'] = provider.provider_id
            jobs.push({
                job_id: jobLocation.job_id,
                distance: turf.distance(jobLocation.coords, provider.coords, options)
            })
            placeholder['details'] = [...jobs]
        }
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
            if (curr['provider_id']) return tally + curr['avg_days_to_turn_in']
        }, 0) / sumOfWaitTimesById.length) + awaitingMaterialsByProvider
        return {provider_id: provider.id, avg_days_to_turn_in: totalDays ? totalDays : null}
    })
}

export {getProviderRatings, calculateAveragePageCost, findDistance, calculateTurnInTime}