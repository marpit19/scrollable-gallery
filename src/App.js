import React from "react";
import "./App.css";
import axios from "axios";
import Carousel from "./Components/Carousel/Carousel";

import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { BiShuffle } from "react-icons/bi";

const getApiForRandomPhoto = (count) => {
	return `https://api.unsplash.com/photos/random/?count=${count}&client_id=haxmA_JmfVAFva4kzgkcnS-Vd8-bfXWKFVteJjJDJM8`;
};

const getApiForSearch = (photo) => {
    return `https://api.unsplash.com/search/photos?page=1&query=${photo}&client_id=haxmA_JmfVAFva4kzgkcnS-Vd8-bfXWKFVteJjJDJM8`;
};

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomPhoto = async () => {
	const randomNumber = randomIntFromInterval(1, 20);
	const apiPath = getApiForRandomPhoto(randomNumber);
	const { data } = await axios.get(apiPath);
	return data;
};

const searchPhoto = async (photo) => {
    const apiPath = getApiForSearch(photo);
    const {data} = await axios.get(apiPath);
    return data.results;
}

function App() {
	const [childIndex, setChildIndex] = React.useState(0);
	const [data, setData] = React.useState([]);
	const [photo, setPhoto] = React.useState("");

	const handleChange = (event) => {
		setPhoto(event.target.value);
	};

	const handleSubmit = () => {
        searchPhoto(photo.results).then((photos)=>{
            console.log(photos);
            setData(photos);
        })
	};

	const randomizeImages = () => {
		getRandomPhoto().then((randomPhotos) => {
			setData(randomPhotos);
		});
	};

	React.useEffect(() => {
        handleSubmit();
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
				<input
					onChange={handleChange}
					type='text'
					name='photo'
					placeholder='Search for Photos...'
					className='search'
				/>
				<button onClick={handleSubmit} type='submit'>
					Search
				</button>
				<button onClick={randomizeImages}>
					Shuffle&nbsp;
					<BiShuffle />
				</button>
			</div>
			<Carousel data={data} />
			<div className='cards-scroll'>
				<button onClick={prevImage}>
					<AiOutlineLeft />
				</button>
				<button onClick={nextImage}>
					<AiOutlineRight />
				</button>
			</div>
		</div>
	);
}

export default App;
