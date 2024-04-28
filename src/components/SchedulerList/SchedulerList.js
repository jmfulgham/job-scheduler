import Typography from "@mui/material/Typography";
import "./SchedulerList.css"
import ScheduledJobs from "../ScheduledJobs/ScheduledJobs";
import {useEffect, useState} from "react";
import ProviderResults from "../ProviderResults/ProviderResults";

const SchedulerList = () => {
    const [scheduledJobs, setScheduledJobs] = useState([])
    const [providerDetails, setProviderDetails] = useState([])
    const [locationType, setLocationType] = useState("")
    const [jobId, setJobId]= useState("")

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`http://localhost:8080${process.env.REACT_APP_JOBS_API_ENDPOINT}?scheduled=true`)
                const body = await res.json()
                setScheduledJobs(body)
            } catch (e) {
                console.error("Error fetching jobs ", e)
            }
        })()
    }, [])

    const handleProviders = async (jobId) => {
        setJobId(jobId);
        const providerDetails = await fetch(`http://localhost:8080${process.env.REACT_APP_JOBS_API_ENDPOINT}/${jobId}`)
        const {potentialProviderDetails, filteredJobById} = await providerDetails.json()
        const {location_type} = filteredJobById
        setLocationType(location_type)
        setProviderDetails(potentialProviderDetails)
    }

    return (<div className={"schedule-parent"}>
        <div className={"scheduler-list-container"}>
            <Typography variant={"h4"}>Scheduled Jobs</Typography>

            {scheduledJobs.length && scheduledJobs.map(({
                                                        id,
                                                        datetime,
                                                        location_type,
                                                        latitude,
                                                        longitude
                                                        }, i) => (
                <div className={"scheduled-job"} id={jobId === id ? "selected": null} key={i} onClick={() => handleProviders(id)}>
                    <ScheduledJobs key={i} id={id} datetime={datetime} location_type={location_type}
                                   latitude={latitude} longitude={longitude}/></div>))}
        </div>
            <div className={"provider-results-container"}>
                {providerDetails.length ? <Typography variant={"h4"}>Available Providers for Job {jobId}</Typography> : null}
                {providerDetails.length ? providerDetails.map(({
                                                                provider_id,
                                                                distance_in_miles,
                                                                avg_remote_cost_p_page,
                                                                avg_location_cost_p_page,
                                                                avg_rating,
                                                                avg_days_to_turn_in, provider_name
                                                            }, i) => <ProviderResults key={i} name={provider_name}
                                                                               locationType={locationType}
                                                                               id={provider_id}
                                                                               distance={distance_in_miles}
                                                                               remoteCost={avg_remote_cost_p_page}
                                                                               locationCost={avg_location_cost_p_page}
                                                                               rating={avg_rating}
                                                                               avgTurnInTime={avg_days_to_turn_in}/>): null}
        </div>

    </div>)
}

export default SchedulerList