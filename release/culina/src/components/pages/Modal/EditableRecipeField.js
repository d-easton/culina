import React from 'react';
import ContentEditable from 'react-contenteditable'

//Editable Field Component
//Renders an editable-version of most HTML tags
class EditableRecipeField extends React.Component {
    //Sets up Editable Field
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.stripHtml = this.stripHtml.bind(this);

        this.contentEditable = React.createRef();

        // Incoming html is found in this.props.html, but populate to "" so user doesn't have to delete any text
        // TODO: explore placeholders? -- might look like this : <input placeholder="XYZ" />
        this.state = { 
            html: this.props.html === "" ? this.props.placeholderText : this.props.html,
            text: this.props.html,
            isEmpty: this.props.html === ""  
         };
        
    }

    //Updates the local state and updateds global copy
    handleChange(event) {
        //New HTML
        console.log(this.contentEditable.current);
        const html = event.target.value;
        //const html = this.contentEditable.current.textContent;
        const text = this.contentEditable.current.textContent;
        console.log(event.target.value)
        console.log(html + ".");
        console.log(text);

        let displayPlaceholder = (text === ""); 
        //Updates local state
        this.setState({ 
            html: html,
            text: text,
            isEmpty: displayPlaceholder,
         })

        const commentIndex = this.props.commentIndex != null ? this.props.commentIndex : -1;
        this.props.onChange(text, commentIndex);
    }

    handleBlur(){
        //console.log("blurred");
        if(this.state.isEmpty){
            //console.log("adding placeholder")
            this.setState({html: this.props.placeholderText});
        }
    }

    handleFocus(){
        //console.log("focused")
        if(this.state.isEmpty){
            //console.log("removing placeholder")
            this.setState({html: ""})
        }
    }

    //Strips inputted text of any html tags
    stripHtml(html) {
        //let textToReturn = html.replace(/<br\/*>/g, ' '); 
        //if (textToReturn.charAT(textToReturn.length - 1) == ' ') {
            //textToReturn = textToReturn.splice()
        //}
        //console.log("pre-stripped = ")
        //console.log(html)
        let stripped_text = html.replace(/<br\/*>/g, ' ');
        //console.log("mid-stripped = ")
        //console.log(stripped_text)
        //console.log("mid-stripped = ")
        //console.log(stripped_text)
        return (stripped_text)
    }

    //Renders an editable field
    render() {
        //console.log("editField test = " + this.props.testProp);
        //console.log("rendering field");
        let classes = this.props.childClass + (this.state.isEmpty ? " placeholder" : "");
        return (<ContentEditable
            innerRef={this.contentEditable}     //Needed for content-editable to work
            html={this.state.html}              //Text inside the edited field
            disabled={this.props.disabled}      //If the field is editable or not
            onChange={this.handleChange}        //Function that is fired when the field is changed
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            tagName={this.props.tagName}        //The type of html element to render
            key={this.props.childKey}           //Key used for React rerendering
            className={classes}
        />
        );
    }
}

export default EditableRecipeField;
