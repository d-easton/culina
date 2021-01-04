import React from 'react';
// import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import SavedPlan from './SavedPlan.jsx';

const DashboardList = styled.div`
    width: 90%;
    margin-left: 5%;
    height: 80vh;
    margin-top: 7.5vh;
    padding: 30px;

    background-color: whitesmoke;
    border: 3px solid  #142843;
    border-radius: 10px;

    display: flex;
    flex-flow: column;
    justify-content: space-between;
`;

export default class Dashboard extends React.Component {
    render() {
        console.log("PLANS");
        console.log(this.props.mealPlans);
        // const dropAreaID = "recipeBox";
        return (
            
            <DashboardList>
                {this.props.mealPlans.map((plan, index) => (
                    <SavedPlan 
                        // key={plan.title} 
                        plan={plan} 
                        index={index} 
                        openPlanCallback={this.props.openPlanCallback} 
                        deletePlanCallback={this.props.deletePlanCallback} 
                    />
                ))}
            </DashboardList>
            
        );
    }
}