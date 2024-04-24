import csvToJson from 'convert-csv-to-json';

const getJobsJson = (jobsCsvFile) => csvToJson.fieldDelimiter(',').getJsonFromCsv(jobsCsvFile)

export {getJobsJson}