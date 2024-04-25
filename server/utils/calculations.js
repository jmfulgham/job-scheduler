import * as turf from '@turf/turf'

const findScheduledJobs = (listOfJobs) => {
    return listOfJobs.filter(job => job.status === "SCHEDULED")
}
const getProviderRatings = (jobs, providers) => {
    const completedJobs = jobs.filter(job => job.status === "COMPLETE")
    let avg_rating;
    //TODO handle mutation of providers
    for (const provider of providers) {
        provider["jobs"] = []
    }

    for (const job of completedJobs) {
        providers.map(provider => {
            if (provider.id === job.provider_id) {
                provider.jobs = [...provider.jobs, {jid: job.id, rating: job.provider_rating}]
            }
        })
    }

    for (const provider of providers) {
        let numberOfJobs = provider.jobs.length
        let rating_sum = provider.jobs.reduce((rating, job) => {
            if (job.rating === '') {
                numberOfJobs--
                // console.log(numberOfJobs, "id ", provider.id)
                return 0
            }
            return rating + parseInt(job.rating)

        }, 0)
        if (rating_sum && numberOfJobs === 0) avg_rating = 0
        avg_rating = rating_sum / numberOfJobs
        //TODO fix NaN
        provider['avg_rating'] = avg_rating;
    }
}

const calculateAveragePageCost = (jobs, providerId) => {
//TODO figure out why tf there are dupes
    const getJobsByLocationAndProviderId = (locationType, providerId) => (jobs.filter(job => {
        if ((job.provider_id === providerId) && (job.location_type === locationType && job.status === "COMPLETE")) {
            return job
        }
    }))

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

export {findScheduledJobs, getProviderRatings, calculateAveragePageCost, findDistance}