import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./ProviderResults.css"

const ProviderResults = ({locationType, name, id, distance, remoteCost, locationCost, rating, avgTurnInTime}) => {
    return (
        <div className={"provider-results-container"}>
            <Card>
                <CardContent>
                    <Typography variant={"body1"} className={"provider-name"}>{name}</Typography>
                    <Typography variant={"body1"}>Provider ID: {id}</Typography>
                    {locationType === "LOCATION_BASED" && <Typography variant={"body1"}>Distance From Location (mi): {distance}</Typography>}
                    <Typography variant={"body1"}>Average Rating: {rating ? rating : "N/A"}</Typography>
                    <Typography variant={"body1"}>Average Time to Turn In Materials: {avgTurnInTime ? `${avgTurnInTime} Days` : "N/A"} </Typography>
                    {(remoteCost || locationCost) ? (<Typography variant={"body1"}>Average Cost Per Page: ${locationType === "LOCATION_BASED" ? locationCost : remoteCost}</Typography>): "Average Cost Per Page: No Data Found" }
                </CardContent>
            </Card>
        </div>
    )
}

export default ProviderResults