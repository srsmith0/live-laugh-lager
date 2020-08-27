import React from 'react';

export function Form(props) {
	function preventDefaultSubmit(e) {
		e.preventDefault();
		props.onSubmit();
		e.target.reset();
	}
	return (
		<form onSubmit={preventDefaultSubmit}>
			<h3>{props.header && props.header}</h3>
			{props.children}
		</form>
	);
}
