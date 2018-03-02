import React from "react";
import {ApiClient} from "./api-client";

const moment = require("moment");
const autoBind = require("react-auto-bind");

export class WeeklyStatsComponent extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        let currentTime = moment().hour(12).minute(0).second(0);
        let prevWeek = moment().isoWeeks(currentTime.isoWeeks()-1);
        let nextWeek = moment().isoWeeks(currentTime.isoWeeks()+1);
        this.state = {
            currentTime,
            prevWeek,
            nextWeek,
            isLoading:true,
            thisWeekStats:null,
            prevWeekStats:null,
            nextWeekStats:null,
            authToken:props.authToken
        }
    }

    async componentDidMount() {
        this.getStats();
    }

    async getStats() {
        let prevWeekYear = this.state.prevWeek.year();
        let prevWeekNr = this.state.prevWeek.isoWeeks();
        let nextWeekYear = this.state.nextWeek.year();
        let nextWeekNr = this.state.nextWeek.isoWeeks();
        let stats = await Promise.all([
            ApiClient.getWeeklyStats(this.state.authToken,this.state.currentYear,this.state.currentTime.isoWeeks()),
            ApiClient.getWeeklyStats(this.state.authToken,prevWeekYear,prevWeekNr),
            ApiClient.getWeeklyStats(this.state.authToken,nextWeekYear,nextWeekNr),
        ]);
        let thisWeekStats = stats[0].data;
        let prevWeekStats = stats[1].data;
        let nextWeekStats = stats[2].data;
        this.setState({
            isLoading:false,
            thisWeekStats,
            prevWeekStats,
            nextWeekStats
        })
    }

    WeekCard(props) {
        console.log(props);
        return <div className="inner-card card card-1">
            <h3>Year {props.targetTime.year()} Week {props.targetTime.isoWeeks()}</h3>
            <div>Fastest Run: {props.stats.fastestRun}</div>
            <div>Greatest Distance: {props.stats.greatestDistance}</div>
            <div>Total Distance: {props.stats.totalDistance}</div>
            <div>Average Speed: {props.stats.averageSpeed}</div>
        </div>
    }

    getPrevWeek(e) {
        e.preventDefault();
        let targetWeek = moment(this.state.currentTime).isoWeeks(this.state.currentTime.isoWeeks()-1);
        let weekBeforeThat = moment(targetWeek).isoWeeks(targetWeek.isoWeeks()-1);
        let nextWeek = this.state.currentTime;
        this.setState({
            isLoading:true,
            currentTime:targetWeek,
            prevWeek:weekBeforeThat,
            nextWeek
        },() => {
            this.getStats();
        });
    }

    getNextWeek(e) {
        e.preventDefault();
        let targetWeek = moment(this.state.currentTime).isoWeeks(this.state.currentTime.isoWeeks()+1);
        let weekBeforeThat = this.state.currentTime;
        let nextWeek = moment(targetWeek).isoWeeks(targetWeek.isoWeeks()+1);
        this.setState({
            isLoading:true,
            currentTime:targetWeek,
            prevWeek:weekBeforeThat,
            nextWeek
        },() => {
            this.getStats();
        });
    }

    render() {
        if(this.state.isLoading) {
            return <div className="body-container">
                <div className="inner-card card card-1">Loading...</div>
            </div>;
        }
        else {
            return <div className="large-body-container">
                <div className="inner-card card card-1">
                    <h3>Weekly statistics</h3>
                    <div>
                        <button onClick={this.getPrevWeek} className="button button-big">Previous Week</button>
                        <button onClick={this.getNextWeek} className="button button-big">Next Week</button>
                    </div>
                    <div className="flex-container">
                        <this.WeekCard targetTime={this.state.prevWeek} stats={this.state.prevWeekStats} />
                        <this.WeekCard targetTime={this.state.currentTime} stats={this.state.thisWeekStats}  />
                        <this.WeekCard targetTime={this.state.nextWeek} stats={this.state.nextWeekStats} />
                    </div>
                </div>
            </div>;
        }
    }
}