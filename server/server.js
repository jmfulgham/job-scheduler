import express from "express";
import {calculateAveragePageCost, findDistance, getProviderRatings, calculateTurnInTime} from "./utils/calculations.js";
import {getProvidersJson, handleProviderDetails, handleSortByJobLocation} from "./utils/providers.js";
import {getJobsJson, findScheduledJobs} from "./utils/jobs.js";

import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express()
const port = process.env.PORT

app.use(cors())

const jobs = "./resources/jobs.csv"
const jobsJson = getJobsJson(jobs)

const providers = "./resources/providers.csv";
const providersJson = getProvidersJson(providers)

const scheduledJobs = findScheduledJobs(jobsJson)
const providerRatings = getProviderRatings(jobsJson, providersJson)
const turnInTimes = calculateTurnInTime(jobsJson, providersJson)

const averageCost = jobsJson.map((job)=> {
    if(job.provider_id) return calculateAveragePageCost(jobsJson, job.provider_id)
}).filter(avg => avg  !== undefined)

app.get("/api/v1/jobs",(req, res) =>{
    const {scheduled} = req.query
    let jobs;
    scheduled ? jobs = scheduledJobs : jobs = jobsJson
    res.send(jobs)
})

app.get("/api/v1/jobs/:id",(req, res) =>{
    const {id} = req.params;
    const filteredJobById = jobsJson.find(job => job.id === id);
    const providerDistanceDetails = findDistance(filteredJobById, providersJson)
    const providerDetails = handleProviderDetails(providersJson, providerDistanceDetails, averageCost, providerRatings, turnInTimes )
    const sortedProviderDetails = handleSortByJobLocation(filteredJobById.location_type, providerDetails)
    res.send({filteredJobById, potentialProviderDetails: sortedProviderDetails})
})

app.get("/api/v1/providers",(req, res) =>{
    res.send(providersJson)
})
app.listen(port, ()=> {
    console.log("App is running")
})
