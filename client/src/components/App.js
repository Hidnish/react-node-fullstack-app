import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => { //1
    return (
        <div>
            <BrowserRouter> 
                <div>
                    <Route path="/" component={Landing} />
                    <Route path="/surveys" component={Dashboard} />
                    <Route path="/header" component={Header} />
                    <Route path="/survey-new" component={SurveyNew} />
                </div>
            </BrowserRouter>;
        </div>
    );
}

export default App;

//1 BrowserRouter only accept AT MOST 1 child