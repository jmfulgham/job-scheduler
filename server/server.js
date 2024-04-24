import express from 'express';
import csvToJson from 'convert-csv-to-json';
const app = express()
const port = 8080;

const jobs = './resources/jobs.csv'
const jobsJson = csvToJson.fieldDelimiter(',').getJsonFromCsv(jobs)

const providers = './resources/providers.csv';
const providersJson = csvToJson.fieldDelimiter(',').getJsonFromCsv(providers);

app.get('/jobs',(req, res) =>{
    res.send(jobsJson)
})

app.get('/providers', (req, res)=>{
    res.send(providersJson)
})

app.listen(port, ()=>{
    console.log("App is running")
})