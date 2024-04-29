import React, {memo} from "react";
import "./ScheduledJobs.css";
import Typography from "@mui/material/Typography";

const ScheduledJobs = memo(({
                                selected,
                                id,
                                datetime,
                                location_type,
                                latitude,
                                longitude,
                            }) => {
    const location = location_type === "LOCATION_BASED" ? "On Location" : "Remote";
    const formattedDate = new Date(datetime).toDateString()

    return (<div className={"schedule-jobs-container"} id={selected ? "selected" : null}>
        <>
            <Typography variant={"h4"}>Job Id: {id}</Typography>
            <Typography variant={"body1"}>Job Type: {location}</Typography>
            {location === "On Location" && latitude && <Typography variant={"body1"}>Latitude: {latitude}</Typography>}
            {location === "On Location" && longitude &&
                <Typography variant={"body1"}>Longitude: {longitude}</Typography>}
            <Typography variant={"body1"}>Date Scheduled: {formattedDate}</Typography>
        </>
    </div>)
})

export default ScheduledJobs;