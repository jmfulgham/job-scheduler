## Project Description
Implement a basic web application which will list all upcoming jobs that still need a provider assigned, and when a job is selected, also show in that web application which providers may be a good fit for that job (ordering potential providers by best fit to worst fit).

## Instructions
* Please fullfil the requirements below. Let us know when you're done and open a PR for review.
* We ask that you use Javascript or Typescript, and that the project has a distinct backend with routing and middleware (if applicable), as this will be the most inline with our current stack.
  * For reference, we use Node.js for our runtime, React for our frontend and Express.js for our API layer.
  * Otherwise, there's no limitation on packages or additional frameworks you can use.

## Requirements
* Ingest the provided CSV files [jobs.csv](jobs.csv) and [providers.csv](providers.csv)
* A backend API should exist which enables getting all upcoming jobs, and for a given job it should return a list of providers which may be a good fit for each job ordered by best fit to worst fit
* There should be a frontend web component which displays all upcoming jobs
* On the front end, when a job is clicked on, somewhere on the page it should show all providers that may be a good fit for that job 

## Reasons why a provider may be better for a job then others
* Proximity (if the job is a location based job - the closer the reporter, the better)
* How quickly they have historically turned in their materials
* Cost (court reporter cost is calculated based on their $ per page) - the lower the better
* Ratings (firms can give binary feedback about providers they worked with - either yes they would work with them again, or no they wouldn't work with them again)
