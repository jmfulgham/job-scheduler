import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './ProviderResults.css'

const ProviderResults = () => {
    return (
        <div className={'provider-results-container'}>
            <Card>
                <CardContent>
                    <Typography variant={'h3'}>Available Providers</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProviderResults