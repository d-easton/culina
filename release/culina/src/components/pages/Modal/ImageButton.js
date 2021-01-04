import React from 'react';

class ImageButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onPress(this.props.id);
    }

    render() {
        return (
            <input className={this.props.childClass} type="image" id={this.props.alt} alt={this.props.alt} src={this.props.imagePath} onClick={this.handleClick} hidden={this.props.isRendered} />
        );

    }
}

export default ImageButton;
