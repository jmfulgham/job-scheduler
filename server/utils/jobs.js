import csvToJson from "convert-csv-to-json";
const REMOTE_JOB_TYPE = "REMOTE"
const ON_LOCATION_JOB_TYPE = "LOCATION_BASED"

const getJobsJson = (jobsCsvFile) => csvToJson.fieldDelimiter(",").getJsonFromCsv(jobsCsvFile)

const findScheduledJobs = (listOfJobs) => {
    return listOfJobs.filter(job => job.status === "SCHEDULED")
}

const findCompletedJobs = (listOfJobs )=> {
    return listOfJobs.filter(job => job.status === "COMPLETE")
}

const findPendingJobs = (listOfJobs )=> {
    return listOfJobs.filter(job => job.status === "AWAITING MATERIALS")
}

export {getJobsJson, findScheduledJobs,findCompletedJobs, findPendingJobs, REMOTE_JOB_TYPE, ON_LOCATION_JOB_TYPE}