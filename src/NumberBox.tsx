import * as React from "react"; 

interface NumberBoxProps {
	num: number;
	commitImmediately: boolean;
	updateCallback: (newVal: number) => void;
}

interface NumberBoxState {
	num: number;
}

class NumberBox extends React.Component<NumberBoxProps, NumberBoxState> {

    constructor(props: NumberBoxProps) {
		super(props);
		// set initial state
		this.state = { num: this.props.num };
    }

	handleTextChange(e: any) {
		var newVal = parseInt(e.target.value);
		if (!(newVal >= 0)) {
			newVal = 0;
		}
		this.setState({ num: newVal });
		if (this.props.commitImmediately) {
			this.props.updateCallback(newVal);
		}
	}

	handleBlur() {
		if (!this.props.commitImmediately) {
			this.props.updateCallback(this.state.num);
		}
	}

	render() {
		if (this.state.num < 0) {
			return;
		} else {
			var cellVal = this.state.num ? this.state.num : '';
			var inputStyle = { width: '20px' };
			return <input type='text' 
			              value={ cellVal } 
			              onChange={ e => this.handleTextChange(e) } 
						  onBlur= { () => this.handleBlur() }
			              style={ inputStyle } />;
		}
	}
}

export default NumberBox;