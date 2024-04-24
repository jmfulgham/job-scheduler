import csvToJson from "convert-csv-to-json";

const getProvidersJson = (providersCsvFile)=> csvToJson.fieldDelimiter(',').getJsonFromCsv(providersCsvFile);

export {getProvidersJson}