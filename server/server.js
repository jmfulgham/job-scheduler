import express from 'express';
import {calculateAveragePageCost, findDistance, findScheduledJobs, getProviderRatings} from "./utils/calculations.js";
import {getProvidersJson} from './utils/providers.js';
import {getJobsJson} from "./utils/jobs.js";

const app = express()
const port = 8080;

const jobs = './resources/jobs.csv'
const jobsJson = getJobsJson(jobs)

const providers = './resources/providers.csv';
const providersJson = getProvidersJson(providers)

const scheduledJobs = findScheduledJobs(jobsJson)
// console.log(getProviderRatings(jobsJson, providersJson))

const providerDistanceDetails = findDistance(scheduledJobs, providersJson)
const averageCost = jobsJson.map((job)=>calculateAveragePageCost(jobsJson, job.provider_id))
// console.log(averageCost)
app.get('/jobs',(req, res) =>{
    //TODO update to scheduledjobs, and add query param?
    res.send(jobsJson)
})

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
