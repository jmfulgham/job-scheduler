import csvToJson from 'convert-csv-to-json';

const getJobsJson = (jobsCsvFile) => csvToJson.fieldDelimiter(',').getJsonFromCsv(jobsCsvFile)
const findScheduledJobs = (listOfJobs) => {
    return listOfJobs.filter(job => job.status === "SCHEDULED")
}

const findCompletedJobs = (listOfJobs )=> {
    return listOfJobs.filter(job => job.status === "COMPLETE")
}

const findPendingJobs = (listOfJobs )=> {
    return listOfJobs.filter(job => job.status === "AWAITING MATERIALS")
}
export {getJobsJson, findScheduledJobs,findCompletedJobs, findPendingJobs}