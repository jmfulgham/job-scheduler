import Typography from '@mui/material/Typography';
import './SchedulerList.css'
import ScheduledJobs from "../ScheduledJobs/ScheduledJobs";
import {useEffect, useState} from "react";
import ProviderResults from "../ProviderResults/ProviderResults";


const SchedulerList = () => {
    const [scheduledJobs, setScheduledJobs] = useState([])
    const [providerDetails, setProviderDetails] = useState([])
    //TODO figure out useCallback
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
        const providerDetails = await fetch(`http://localhost:8080${process.env.REACT_APP_JOBS_API_ENDPOINT}/${jobId}`)
        const {potentialProviderDetails} = await providerDetails.json()
        setProviderDetails(potentialProviderDetails)
    }

    return (<div className={'schedule-parent'}>
        <div className={'scheduler-list-container'}>
            <Typography variant={'h3'}>Scheduled Jobs</Typography>

            {scheduledJobs.length && scheduledJobs.map(({
                                                            id,
                                                            datetime,
                                                            location_type,
                                                            latitude,
                                                            longitude
                                                        }, i) => (
                <div className={'scheduled-job'} onClick={() => handleProviders(id)}>
                    <ScheduledJobs key={i} id={id} datetime={datetime} location_type={location_type}
                                   latitude={latitude} longitude={longitude}/></div>))}
        </div>
            <div className={'provider-results-comp'}>
                {providerDetails.length ? <Typography variant={'h3'}>Available Providers</Typography> : null}
                {providerDetails.length ? providerDetails.map(({
                                                                    provider_id,
                                                                    distance_in_miles,
                                                                    avg_remote_cost_p_page,
                                                                    avg_location_cost_p_page,
                                                                    avg_rating,
                                                                    avg_days_to_turn_in
                                                                }) => <ProviderResults id={provider_id}
                                                                                       distance={distance_in_miles}
                                                                                       remoteCost={avg_remote_cost_p_page}
                                                                                       locationCost={avg_location_cost_p_page}
                                                                                       rating={avg_rating}
                                                                                       avgTurnInTime={avg_days_to_turn_in}/>): null}
            </div>

    </div>)
}

export default SchedulerList