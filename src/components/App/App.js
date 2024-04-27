import './App.css';
import Typography from '@mui/material/Typography';
import SchedulerList from "../SchedulerList/SchedulerList";
import ProviderResults from "../ProviderResults/ProviderResults";

function App() {
    return (
        <div className="App">
            <header className={'App-header'}><Typography variant={'h1'}>Job Scheduler</Typography></header>

                <div className={'scheduler-list-comp'}>
                    <SchedulerList/>
                </div>
        </div>
    );
}

export default App;
