import React from 'react';
import styled from 'styled-components';

const PlanDiv = styled.div`    
    width: 350px;
    min-height: 50px;
    border-radius: 15px; 
    text-align: center;
    padding-top: 12.5px;
    margin-top: 5px;
    margin-bottom: 5px;

    background-color: white;
    color: black;
    box-shadow: 0px 10px 13px -7px #030303, 3px 3px 50px 5px rgba(121,121,121,0.25);
`;

export default class SavedPlan extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleOpen() {
        alert("open meal plan clicked");
        this.props.openPlanCallback(this.props.plan);
    }

    handleDelete() {
        alert("delete meal plan clicked");
        this.props.deletePlanCallback(this.props.plan);
    }

    render() {
        return (
            <PlanDiv
                key={"plandiv" + this.props.plan.title}
            >   
                <p class="plan-title-field"> {this.props.plan.title} </p>
                <button class="plan-button btn-info plan-delete" onClick={this.handleDelete}>Delete</button>
                <button class="plan-button btn-info plan-open" onClick={this.handleOpen}>Open</button>
            </PlanDiv>
        );
    }

}