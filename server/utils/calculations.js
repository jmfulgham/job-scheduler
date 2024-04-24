const findScheduledJobs = (listOfJobs) => {
    return listOfJobs.filter(job => job.status === "SCHEDULED")
}
const getProviderRatings = (jobs, providers) => {
    const completedJobs = jobs.filter(job => job.status === "COMPLETE")
    let avg_rating;
    for (const provider of providers){
        provider["jobs"] = []
    }

    for (const job of completedJobs){
        providers.map(provider =>{
            if (provider.id === job.provider_id){
                provider.jobs = [...provider.jobs, {id: provider.id, rating: job.provider_rating }]
            }
        })
    }

    for (const provider of providers){
        let numberOfJobs = provider.jobs.length
        let rating_sum = provider.jobs.reduce((rating, job) => {
            if (job.rating === ''){
                 numberOfJobs--
                console.log(numberOfJobs, "id ", provider.id)
                return 0
            }
            return rating + parseInt(job.rating)

        }, 0)
        if (rating_sum && numberOfJobs === 0) avg_rating = 0
        avg_rating = rating_sum/numberOfJobs
        //TODO fix NaN
        provider['avg_rating'] = avg_rating;
        console.log(provider.id, avg_rating, numberOfJobs)
    }
}

export {findScheduledJobs, getProviderRatings}