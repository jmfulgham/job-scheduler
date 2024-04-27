import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './ProviderResults.css'

const ProviderResults = ({id, distance, remoteCost, locationCost, rating, avgTurnInTime}) => {

    return (
        <div className={'provider-results-container'}>

            <Card>
                <CardContent>
                    <Typography variant={'body1'} className={'provider-name'}>John Doe</Typography>
                    {/*Need location type*/}
                    <Typography variant={'body1'}>Provider ID: {id}</Typography>
                    <Typography variant={'body1'}>Distance From Location (mi): {distance}</Typography>
                    <Typography variant={'body1'}>Average Rating: {rating}</Typography>
                    <Typography variant={'body1'}>Average Time to Turn In Materials: {avgTurnInTime} Days</Typography>
                    {/*    display based on location type*/}
                    <Typography variant={'body1'}>Average Cost Per Page: {remoteCost}</Typography>
                    <Typography variant={'body1'}>Average Cost Per Page: {locationCost}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProviderResults