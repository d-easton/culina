import React from 'react';
import Frame from './Frame';
import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';


export default class CalendarTrack extends React.Component {
    render() {
        return (
            <div id="calendar-track">
                {this.props.calendarOrder.map((frameID) => {
                    const frame = this.props.frameData[frameID];
                    const recipes = frame.recipeIDs.map(
                        (recipeID) => this.props.recipes[recipeID]
                    );
                    return (
                        <Frame
                            key={frame.id}
                            frame={frame}
                            recipes={recipes}
                            recipeClickCallback={this.props.onRecipeClick}
                        ></Frame>
                    );
                })}
            </div>
        );
    }
}

