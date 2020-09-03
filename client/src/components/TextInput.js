import React from 'react';

const TextInput = (props) => {
	if (props.required) {
		return (
			<div className="textInput">
				<h3>{props.label}</h3>
				{props.textarea ? (
					<textarea
						required
						style={{ outline: 'none', width: '500px', height: '300px' }}
						{...props.useFormInput}
					/>
				) : (
					<input required style={{ outline: 'none' }} {...props.useFormInput} />
				)}
			</div>
		);
	} else {
		return (
			<div className="textInput">
				<h3>{props.label}</h3>
				{props.textarea ? (
					<textarea style={{ outline: 'none', width: '500px', height: '300px' }} {...props.useFormInput} />
				) : (
					<input style={{ outline: 'none' }} {...props.useFormInput} />
				)}
			</div>
		);
	}
};

export default TextInput;
