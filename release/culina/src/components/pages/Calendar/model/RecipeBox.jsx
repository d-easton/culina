import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Card from './Card.jsx';

const RecipeBoxList = styled.div`
    width: 85%;
    margin-left: 10%;
    height: 43vh;
    margin-top: 2vh;
    padding: 15px;

    background-color: white;
    border: 3px solid  #142843;
    border-radius: 10px;
    
    box-shadow: 0px 8px 11px -7px #030303, 3px 3px 50px 5px rgba(121,121,121,0.25);

    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
`;

//#F4E3D7

export default class RecipeBox extends React.Component {
    render() {
        const dropAreaID = "recipeBox";
        return (
            <Droppable droppableId={dropAreaID}>
                 {provided => (
                     <RecipeBoxList ref = {provided.innerRef}  {...provided.droppableProps} >
                        {this.props.recipes.map((recipe, index) => (
                            <Card key={recipe.id} recipe={recipe} index={index} recipeClickCallback={this.props.recipeClickCallback} />
                         ))}
                         {provided.placeholder}
                     </RecipeBoxList>
                 )}
            </Droppable>
        );
    }
}