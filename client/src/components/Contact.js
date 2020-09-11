import React from 'react';
import self from '../images/self.png';
import { Icon } from 'semantic-ui-react';

export default function Contact() {
	const email = 'srsmith' + '11' + '@' + 'live.com';

	return (
		<div>
			<div className="contactHeader">
				<h1 className="contactFont">This app was created by Shawn Smith</h1>
			</div>
			<p className="subHeader">Head Brewer turned web developer</p>

			<div className="settingsContent">
				<div>
					<img className="self" src={self} />
					<br />
					<div className="info">
						<a href="https://www.linkedin.com/in/shawnsmith11/" target="_blank">
							<Icon name="linkedin" size="huge" link />
						</a>
						<a style={{ color: 'black' }} href="https://github.com/srsmith0" target="_blank">
							<Icon name="github" size="huge" link />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
