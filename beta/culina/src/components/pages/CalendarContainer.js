import React from 'react';
import '../../App.css';
import './Calendar/css/Calendar.css';
const axios = require('axios');

class CalendarContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    
    }

    render() {
        return (
            <div class="grey">
                <div id="calendar-div" className="blue-dark"></div>
                <div id="recipes-div" className="sand-dark"></div>
            </div>
        )
    }
}
export default CalendarContainer;