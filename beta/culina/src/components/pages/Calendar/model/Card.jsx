import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';

const CardDiv = styled.div`    
    width: 150px;
    height: 50px;
    border-radius: 15px; 
    text-align: center;
    padding-top: 12.5px;

    background-color: #487A90;
    color: whitesmoke;
`;

export default class Card extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.recipe.id} index={this.props.index} >  
                { provided => (
                    <CardDiv
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        key={"carddiv"+this.props.recipe.id}
                    >
                        {this.props.recipe.title}
                    </CardDiv>
                )}
            </Draggable>
        );
    }

}