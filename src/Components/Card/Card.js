import React from "react";
import "./Card.css";
const HEIGHT = window.innerWidth < 720 ? 200 : 400;

export const Card = (props) => {
	const imageURL = props.urls.small;
	const width = (props.width * HEIGHT) / props.height;
	return (
		<div className='card-container'>
			<img src={imageURL} alt='' style={{ height: HEIGHT, width }} />
			<div className='card-info'>
				<img src={props.user.profile_image.small} alt='profile' />
				&nbsp; &nbsp;
				<div className='photographer-details'>
					<p>{`${props.user.first_name} ${props.user.last_name}`}</p>
					<span>{`${props.likes} likes recieved`}</span>
				</div>
			</div>
		</div>
	);
};

export default Card;
