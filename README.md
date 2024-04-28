## job-scheduler
A basic web application that lists all upcoming jobs that still need a provider assigned, and when a job is selected, the app displays which providers may be a good fit for that job (ordering potential providers by best fit to worst fit).

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
In order to move as fast as possible, I decided to use Javascript instead of Typescript. I used Express.js to help build the API, and I used React/MaterialUI 
components for easy styling. 

I stored the csv files in the `/resources` directory, just for better organization. All the calculating and data parsing methods are stored in
`/utils`. 

`calculations.js` stores methods that require both job and provider inputs. `jobs.js` and `providers.js` handle their respective csv files.

### With More Time...
I would implement a controller for the API. Since I'm only hitting a few endpoints to grab my data, and this is a POC, I left the filtering methods in the server file,
but for a production level application, leveraging a controller is a better idea.

The front end explicitly hits `localhost:8080', for the sake of time, I went about it this way instead of serving client files from the server. With more time, I would focus on implementing
a cleaner approach to having the server and client in the same repo. 

Also I would add a bunch of tests. Each component would have a test file, and I would test each endpoint in the API, and my calculation methods. Under normal circumstances, I wouldn't submit a PR without tests,
but since this is a POC, and for the sake of time, I omitted them to make sure I could complete the challenge. With one more day, I could add a series of tests. 



