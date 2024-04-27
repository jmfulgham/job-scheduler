import './ScheduledJobs.css';
import Typography from "@mui/material/Typography";


const ScheduledJobs = () => {
    return(<div className={'schedule-jobs-container'}>
        <section className={'sj-contents'}>
        <Typography variant={'h4'}>Job Id: 21</Typography>
            <Typography variant={'body1'}>Job Type: Location Based</Typography>
            <Typography variant={'body1'}>Job Lat: "34.008454"</Typography>
            <Typography variant={'body1'}>Job Long: -118.498543</Typography>
            <Typography variant={'body1'}>Date Scheduled: Datetime</Typography>

        </section>
        </div>)
}

export default ScheduledJobs;