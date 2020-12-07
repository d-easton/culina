import React from 'react';
import '../../App.css';
import './Calendar/css/Calendar.css';
const axios = require('axios');
const getCalendarURL = "https://cors-anywhere.herokuapp.com/http://35.193.28.175:8085/getGroceryList";


class CalendarContainer extends React.Component {
    __mounted = false;
    constructor(props) {
        super(props);

        this.state = {
            calenderID: 0,
            email: props.user.email,
        }

        this.getCalendar = this.getCalendar.bind(this)
        this.setData = this.setData.bind(this)
    
    }
    componentDidMount() {
        this._mounted = true;
        this.getCalendar();
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    getCalendar() {
        console.log("get calendar")
        const getCalendarHeader = {
            "email": this.state.email
        }
        axios.post(getCalendarURL, getCalendarHeader)
            .then(response => {
                if(this._mounted) {
                    this.setData(response.data[0].ingredients)
                }
            })
            .catch(err => 
                axios.put(getCalendarURL, getCalendarHeader)
                .then(response => {
                    if(this._mounted) {
                        this.setData(response.data.ingredients)
                    }
                })
                .catch(err => console.log('err', err)) )
    }

    setData(res) {
        if (res == null) {
            this.setState({ activeCalendar: [] });
        } else {
            this.setState({ activeCalendar: res});
        }
    }

    render() {
        if(5!=9){
            console.log("hi")
        }
        return (
            <div id="calendar-wrapper" className="grey">
                <div id="calendar-div" className="blue-dark"></div>
                <div id="calendar-wrapper">
                    <h2>hhwihdwhdwieh</h2>
                    <div id="calendar-day-sun" className="calendar-day"></div>
                    <div id="calendar-day-mon" className="calendar-day"></div>
                    <div id="calendar-day-tue" className="calendar-day"></div>
                    <div id="calendar-day-wed" className="calendar-day"></div>
                    <div id="calendar-day-thu" className="calendar-day"></div>
                    <div id="calendar-day-fri" className="calendar-day"></div>
                    <div id="calendar-day-sat" className="calendar-day"></div>
                </div>
            </div>
        );
    }
}
export default CalendarContainer;