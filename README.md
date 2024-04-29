## job-scheduler
A basic web application that lists all upcoming jobs that still need a provider assigned, and when a job is selected, the app displays which providers may be a good fit for that job (ordering potential providers by best fit to worst fit).

### More Context
The instructions for this code challenge came with a 5 day time limit. The app needed to be a POC, meeting all requirements listed below. I could use Typescript or Javascript, and the project needed a distinct backend using Node/Express to be in alignment with the company's current stack. 

There's a section below mentioning a couple changes I would make with more time, or if this project was for production. I chose not to update this repository with those ideas, since I intend to use this project to start technical discussions.

#### Challenge Requirements
1. Ingest the provided CSV files jobs.csv and providers.csv
2. A backend API should exist which enables getting all upcoming jobs, and for a given job it should return a list of providers which may be a good fit for each job ordered by best fit to worst fit
3. There should be a frontend web component which displays all upcoming jobs
4. On the front end, when a job is clicked on, somewhere on the page it should show all providers that may be a good fit for that job

### Reasons why a provider may be better for a job then others
* Proximity (if the job is a location based job - the closer the reporter, the better)
* How quickly they have historically turned in their materials
* Cost (court reporter cost is calculated based on their $ per page) - the lower the better
* Ratings (firms can give binary feedback about providers they worked with - either yes they would work with them again, or no they wouldn't work with them again)

## Instructions
Run `npm run setup` in the root directory to install all dependencies in both the server and client, then run `npm run dev`
to start the application.

If `nvm` is installed on your local machine, you can run `nvm use` to make sure you're on the same version of Node.

### Technical Overview
In order to move as fast as possible, I decided to use Javascript instead of Typescript. I used Express.js to help build the API, and I used React for the front end and MaterialUI components for easy styling. 

I stored the csv files in the `/resources` directory, just for better organization. All the calculating and data parsing methods are stored in
`/utils`. 

`calculations.js` stores methods that require both job and provider inputs. `jobs.js` and `providers.js` handle their respective csv files.

### What I Would Do Differently...
If I had more time, or if this project was for production I would implement a controller for the API. Since I'm only hitting a few endpoints to grab my data, and this is a POC, I left the filtering methods in the server file, but for a production level application, leveraging a controller that implements those methods is a better idea.

The front end explicitly hits `localhost:8080/api...', for the sake of time, I went about it this way instead of serving client files from the server. With more time, I would focus on implementing a cleaner approach to having the server and client in the same repository. Especially for security purposes.

Also I would add a bunch of tests. Each component would have a test file, I would test each endpoint in the API, as well as my calculation methods. Under normal circumstances, I wouldn't submit a PR without tests, but since this is a POC, and for the sake of time, I omitted them to make sure I could complete the challenge. With one more day, I could add a series of tests. 



