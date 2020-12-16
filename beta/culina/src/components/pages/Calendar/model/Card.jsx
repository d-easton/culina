import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';

const CardDiv = styled.div`    
    width: 150px;
    height: 50px;
    border-radius: 15px; 
    text-align: center;
    padding-top: 12.5px;
    margin-top: 5px;
    margin-bottom: 5px;

    background-color: #487A90;
    color: whitesmoke;
`;

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.recipeClickCallback(this.props.recipe);
    }

    render() {
        return (
            <Draggable draggableId={""+this.props.recipe.id} index={this.props.index} >  
                { provided => (
                    <CardDiv
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        key={"carddiv" + this.props.recipe.id}
                        onClick={this.handleClick}
                    >
                        {this.props.recipe.title}
                        Ree
                    </CardDiv>
                )}
            </Draggable>
        );
    }

}