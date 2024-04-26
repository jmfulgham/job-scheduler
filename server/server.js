import express from 'express';
import {calculateAveragePageCost, findDistance, getProviderRatings, calculateTurnInTime} from "./utils/calculations.js";
import {getProvidersJson} from './utils/providers.js';
import {getJobsJson, findScheduledJobs} from "./utils/jobs.js";

const app = express()
const port = 8080;

const jobs = './resources/jobs.csv'
const jobsJson = getJobsJson(jobs)

const providers = './resources/providers.csv';
const providersJson = getProvidersJson(providers)

const scheduledJobs = findScheduledJobs(jobsJson)
getProviderRatings(jobsJson, providersJson)

const turnInTimes = calculateTurnInTime(jobsJson, providersJson)

const providerDistanceDetails = findDistance(scheduledJobs, providersJson)
// console.log(providerDistanceDetails)
const averageCost = jobsJson.map((job)=>{
    if(job.provider_id) return calculateAveragePageCost(jobsJson, job.provider_id)
}).filter(avg => avg  !== undefined)

// console.log(providerDistanceDetails)
app.get('/jobs',(req, res) =>{
    //TODO update to scheduledjobs, and add query param?
    res.send(jobsJson)
})
//TODO add versioning to API
// /api/v1/...


//TODO order providers by best for job id...
app.get('/jobs/:id',(req, res) =>{
    const {id} = req.params;
    const filteredJobsById = scheduledJobs.filter(job => job.id === id);
    res.send(filteredJobsById)
})

app.get('/providers', (req, res)=>{
    res.send(providersJson)
})

app.get('/providers/:id', (req, res)=>{
    const {id} = req.params;
    const filteredProvidersById = providersJson.filter(provider => provider.id === id)
    res.send(filteredProvidersById)
})

app.get('/ratings/:id', (req,res)=>{
    const {id} = req.params;
    const filteredRatings = averageCost.filter(cost=> cost.provider_id === id)
    res.send(filteredRatings)
})
app.listen(port, ()=>{
    console.log("App is running")
})
