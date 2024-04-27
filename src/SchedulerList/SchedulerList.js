import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './SchedulerList.css'
import ScheduledJobs from "../ScheduledJobs/ScheduledJobs";

const SchedulerList = () => {
    return (<div className={'scheduler-list-container'}>
                <Typography variant={'h3'}>Scheduled Jobs</Typography>
        <>
            <ScheduledJobs/>
            <ScheduledJobs/>
            <ScheduledJobs/>
        </>

    </div>)
}

export default SchedulerList