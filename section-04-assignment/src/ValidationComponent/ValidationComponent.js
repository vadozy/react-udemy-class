import React from 'react';

const validationComponent = (props) => {

	let txt = "";
	if (props.textLength < 5) {
		txt = "Text too short";
	} else {
		txt = "Text long enough";
	}

    return (
        <div>
            <p>{txt}</p>
        </div>
    )
};

export default validationComponent;