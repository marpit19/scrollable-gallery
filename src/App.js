import React from "react";
import "./App.css";
import axios from "axios";
import Carousel from "./Components/Carousel/Carousel";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiShuffle } from "react-icons/bi";


const getApiForRandomPhoto = (count) => {
	return `https://api.unsplash.com/photos/random/?count=${count}&client_id=QeKhrpQo6kuHZZUebvFxV1OD2bJMExLwyT2f6TflsBE`;
};

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomPhoto = async () => {
	const randomNumber = randomIntFromInterval(7, 15);
	const apiPath = getApiForRandomPhoto(randomNumber);
	const { data } = await axios.get(apiPath);
	return data;
};

function App() {
	const [childIndex, setChildIndex] = React.useState(0);
	const [data, setData] = React.useState([]);
	const randomizeImages = () => {
		getRandomPhoto().then((randomPhotos) => {
			setData(randomPhotos);
		});
	};

	React.useEffect(() => {
		randomizeImages();
	}, []);

	const nextImage = () => {
		if (childIndex >= data.length - 1) return;
		const value =
			document.getElementById("carousel-main").children[childIndex].clientWidth;
		document
			.getElementById("carousel-main")
			.scrollBy({ left: value, behavior: "smooth" });
		setChildIndex(childIndex + 1);
	};

	const prevImage = () => {
		if (childIndex <= 1) return;
		const value =
			document.getElementById("carousel-main").children[childIndex - 1]
				.clientWidth;
		document
			.getElementById("carousel-main")
			.scrollBy({ left: -value, behavior: "smooth" });
		setChildIndex(childIndex - 1);
	};

	return (
		<div className='App'>
			<div className='header'>
				<h1>Gallery</h1>
				<button onClick={randomizeImages}>
					Shuffle&nbsp;
                    <BiShuffle />
				</button>
			</div>
			<Carousel data={data} />
			<div className='cards-scroll'>
				<button onClick={prevImage}>
                    <AiOutlineArrowLeft />
				</button>
				<button onClick={nextImage}>
                    <AiOutlineArrowRight />
				</button>
			</div>
		</div>
	);
}

export default App;
