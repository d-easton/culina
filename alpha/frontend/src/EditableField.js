import React from 'react';
import ContentEditable from 'react-contenteditable'

//Editable Field Component
//Renders an editable-version of most HTML tags
class EditableField extends React.Component {
    //Sets up Editable Field
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.stripHtml = this.stripHtml.bind(this);

        this.contentEditable = React.createRef();

        // Incoming html is found in this.props.html, but populate to "" so user doesn't have to delete any text
        // TODO: explore placeholders? -- might look like this : <input placeholder="XYZ" />
        this.state = { html: this.props.html, text: this.props.html };
        
        //console.log("constructor ran");
    }

    //Updates the local state and updateds global copy
    handleChange(event) {
        //New HTML
        const html = event.target.value;
        const text = this.stripHtml(html);
        /*
        console.log("text before strip");
        console.log(text);
        text = this.stripHtml(text);
        console.log("text after strip")
        console.log(text);
        */
        //Updates local state
        console.log("html = " + html);
        console.log("text = " + text)
        this.setState({ html: html, text: text })
        this.props.onChange(text);
    }

    //Strips inputted text of any html tags
    stripHtml(html) {
        console.log(html);
        return html.replace(/<br\/*>/g, ' ');
    }

    //Renders an editable field
    render() {
        //console.log("editField test = " + this.props.testProp);
        //console.log("rendering field");
        let tag = this.props.tagName;
        if (this.props.testProp) {
            tag = this.props.testProp;
        }
        return (<ContentEditable
            innerRef={this.contentEditable}     //Needed for content-editable to work
            html={this.state.html}              //Text inside the edited field
            disabled={this.props.disabled}      //If the field is editable or not
            onChange={this.handleChange}        //Function that is fired when the field is changed
            tagName={tag}        //The type of html element to render
            key={this.props.childKey}           //Key used for React rerendering
        />
        );
    }
}

export default EditableField;
