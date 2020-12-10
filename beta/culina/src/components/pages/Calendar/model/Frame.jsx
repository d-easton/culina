import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card.jsx';
import styled from 'styled-components';
// import DroppableArea from './DroppableArea.js';
// import RecipeCardList from './RecipeCardList';

const CardList = styled.div`
    margin: 3px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: ${props=>(props.isDraggingOver ? '#9CA9B1' : "whitesmoke")}
`;

export default class Frame extends React.Component {
    render() {
        // const dropAreaID = this.props.frame.id;
        // console.log(this.props.frame.id);
        return (
            <div id={this.props.frame.id} className="calendar-day">
                <h4 className="frame-title">{this.props.frame.title}</h4>
                <div className="bar sand-dark"></div>
                <Droppable droppableId={this.props.frame.id}>
                    {provided => (
                        //  key={this.props.frame.id}
                        <CardList ref={provided.innerRef} {...provided.droppableProps} >
                            {this.props.recipes.map( (recipe, index) => (
                                <Card key={recipe.id} recipe={recipe} index={index}/>
                            ))}
                            {provided.placeholder}
                        </CardList>
                    )}
                </Droppable>
            </div>);
    }
}