import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
	return (
		<div className="pageFooter">
			<div className="footerContent">
				<h1>This is the footer, and copyright stuff.</h1>

				<ul>
					<li>
						<Link to={{ pathname: '/' }}>Home</Link>
					</li>
					<li>
						<a href="_blank">About</a>
					</li>
					<li>
						<a href="_blank">Contact</a>
					</li>
					<li>
						<a href="_blank">Links</a>
					</li>
				</ul>
			</div>
			<div className="footerRight">
				<p>SMLinks</p>
			</div>
		</div>
	);
}
