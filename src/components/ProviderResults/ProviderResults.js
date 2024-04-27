import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './ProviderResults.css'

const ProviderResults = () => {
    return (
        <div className={'provider-results-container'}>
            <Typography variant={'h3'}>Available Providers</Typography>
            <Card>
                <CardContent>
                    <Typography variant={'body1'} className={'provider-name'}>John Doe</Typography>
                    <Typography variant={'body1'}>Location: Lat, Long</Typography>
                    <Typography variant={'body1'}>Average Rating: 1</Typography>
                    <Typography variant={'body1'}>Distance from Job: 1.45 miles</Typography>
                    <Typography variant={'body1'}>Average Cost Per Page: $450</Typography>
                </CardContent>
            </Card>

        </div>
    )
}

export default ProviderResults