import React from 'react';

const Landing = () => {
	return (
		<div id="landing">
			<div id="splash">
				<div id="arrow">
					<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
						<line x1="0" y1="150" x2="100" y2="100" stroke="blue">
							<animateMotion
								dur="5s"
								repeatCount="1"
								path="L 0,150 L 100,100"
							/>
						</line>
						{/* <line x1="100" y1="100" x2="140" y2="115" stroke="blue"/>
            <line x1="140" y1="115" x2="250" y2="60" stroke="blue"/>
            <line x1="250" y1="60" x2="275" y2="75" stroke="blue"/>
            <line x1="275" y1="75" x2="350" y2="20" stroke="blue"/> */}
					</svg>
				</div>
			</div>
			<div id="welcome">
				Welcome to your stock management solution!
      </div>
		</div>
	);
};

export default Landing;
