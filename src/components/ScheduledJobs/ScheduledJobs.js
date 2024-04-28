import React from "react";
import "./ScheduledJobs.css";
import Typography from "@mui/material/Typography";

const ScheduledJobs = ({
                           id,
                           datetime,
                           location_type,
                           latitude,
                           longitude,
                       }) => {
    const location = location_type === "LOCATION_BASED" ? "On Location" : "Remote";
    const formattedDate = new Date(datetime).toDateString()

    return (<div className={"schedule-jobs-container"}>
        <>
            <Typography variant={"h4"}>Job Id: {id}</Typography>
            <Typography variant={"body1"}>Job Type: {location}</Typography>
            {location === "On Location" && latitude && <Typography variant={"body1"}>Latitude: {latitude}</Typography>}
            {location === "On Location" && longitude &&
                <Typography variant={"body1"}>Longitude: {longitude}</Typography>}
            <Typography variant={"body1"}>Date Scheduled: {formattedDate}</Typography>
        </>
    </div>)
}

export default ScheduledJobs;