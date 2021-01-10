import React from 'react';
import ContentEditable from 'react-contenteditable'

//Editable Field Component
//Renders an editable-version of most HTML tags
class EditableField extends React.Component {
    //Sets up Editable Field
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.endEditing = this.endEditing.bind(this);
        this.stripHtml = this.stripHtml.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.contentEditable = React.createRef();

        this.state = { 
            html: this.props.html === "" ? this.props.placeholderText : this.props.html,
            text: this.props.html,
            isEmpty: this.props.html === "",
            crossedOff : false  
        }; 
}

    //Updates the local state and updateds global copy
    handleChange(event) {
        //New HTML
        const html = event.target.value;
        const text = this.contentEditable.current.textContent;
        let displayPlaceholder = (text === ""); 
        this.setState({ 
            html: html,
            text: text,
            isEmpty: displayPlaceholder,
            isFocused: false 
         })

        const commentIndex = this.props.commentIndex != null ? this.props.commentIndex : -1;
        this.props.onChange(text, commentIndex);
    }

    handleBlur(){
        if(this.state.isEmpty){
            this.setState({html: this.props.placeholderText});
        }
    }

    handleFocus(){
        if(this.state.isEmpty){
            this.setState({html: ""})
        }
    }

    stripHtml(html) {
        return html.replace(/<[^>]+>/g, '')
    }

    endEditing() {
        this.props.onChange(this.props.id, this.state.html);
    }
    
    handleClick() {
        console.log("clicked");
        console.log(this.state.crossedOff);
        this.setState({
            crossedOff : !this.state.crossedOff
        }, () =>
        console.log(this.state.crossedOff));
    }

    //Renders an editable field
    render() {
        //let classes = this.props.childClass + (this.state.isEmpty ? " placeholder" : "");
        let classes = ((this.state.crossedOff) ? "true" : "false");
        classes = (this.state.isEmpty ? " placeholder" : classes);
        //let style = { }
        return (<ContentEditable
            innerRef={this.contentEditable}
            html={this.state.html}
            disabled={this.props.disabled}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            tagName={this.props.tagName}
            key={this.props.childKey}
            className={classes}
            onClick={this.handleClick}
            id={this.props.id}
        />);
    }
}

export default EditableField;
