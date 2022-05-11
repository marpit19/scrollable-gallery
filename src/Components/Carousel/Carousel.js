import React from "react";
import Card from "../Card/Card";
import "./Carousel.css";

export const Carousel = ({ data }) => {
	return (
		<div
			id='carousel-main'
			className='cards-carousel'
		>
			{data.map((image, index) => (
				<Card {...image} />
			))}
		</div>
	);
};

export default Carousel;
