import React, { useState } from 'react';

export function useFormInput(initialValue, name) {
	const [ value, setValue ] = useState(initialValue);
	const handleChange = (e) => setValue(e.target.value);
	const clearForm = () => setValue(initialValue);

	return {
		placeholder: `Enter ${name}`,
		name: name,
		value: value,
		onChange: handleChange,
		onSubmit: clearForm
	};
}
