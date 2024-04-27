import "./App.css";
import Typography from "@mui/material/Typography";
import SchedulerList from "../SchedulerList/SchedulerList";

function App() {
    return (
        <div className="App">
            <header className={"App-header"}>
                <Typography variant={"h1"}>Job Scheduler</Typography>
            </header>
                <>
                    <SchedulerList/>
                </>
        </div>
    );
}

export default App;
