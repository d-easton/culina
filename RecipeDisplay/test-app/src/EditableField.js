import React from 'react';
import ContentEditable from 'react-contenteditable'

//Editable Field Component
//Renders an editable-version of most HTML tags
class EditableField  extends React.Component {
    //Sets up Editable Field
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.endEditing = this.endEditing.bind(this);

        this.contentEditable = React.createRef();

        this.state = { html: this.props.html };
    }

    //Updates the local state and updateds global copy
    handleChange(event) {
        //New HTML
        const text = event.target.value;
        //Updates local state
        this.setState({html: text})
    }

    endEditing() {
        this.props.onChange(this.props.id, this.state.html);
    }

    //Renders an editable field
    render() {
        return( <ContentEditable
            innerRef={this.contentEditable}
            html={this.state.html}
            disabled={this.props.disabled}
            onChange={this.handleChange}
            tagName={this.props.tagName}
            key={this.props.childKey}
            onBlur={this.endEditing}
            />
        );
    }
}

export default EditableField;
