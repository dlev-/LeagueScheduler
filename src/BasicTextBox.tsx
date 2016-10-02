import * as React from "react"; 

interface BasicTextBoxProps {
	text: string;
	commitImmediately: boolean;
	updateCallback: (newVal: string) => void;
}

interface BasicTextBoxState {
	text: string;
}

class BasicTextBox extends React.Component<BasicTextBoxProps, BasicTextBoxState> {

    constructor(props: BasicTextBoxProps) {
		super(props);
		// set initial state
		this.state = { text: this.props.text };
    }

	handleTextChange(e: any) {
		var newVal = e.target.value;
		this.setState({ text: newVal });
		if (this.props.commitImmediately) {
			this.props.updateCallback(newVal);
		}
	}

	handleBlur() {
		if (!this.props.commitImmediately) {
			this.props.updateCallback(this.state.text);
		}
	}

	render() {
		var inputStyle = { width: '150px' };
		return <input type='text' 
		              value={ this.state.text } 
		              onChange={ e => this.handleTextChange(e) } 
					  onBlur= { () => this.handleBlur() }
		              style={ inputStyle } />;
	}
}

export default BasicTextBox;