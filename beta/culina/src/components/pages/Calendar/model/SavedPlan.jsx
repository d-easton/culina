import React from 'react';
import styled from 'styled-components';

const PlanDiv = styled.div`    
    width: 150px;
    min-height: 50px;
    border-radius: 15px; 
    text-align: center;
    padding-top: 12.5px;
    margin-top: 5px;
    margin-bottom: 5px;

    background-color: #487A90;
    color: whitesmoke;
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
                <button class="clean-button" onClick={this.handleOpen}>Open</button>
                <button class="clean-button" onClick={this.handleDelete}>Delete</button>
                {this.props.plan.title}
            </PlanDiv>
        );
    }

}