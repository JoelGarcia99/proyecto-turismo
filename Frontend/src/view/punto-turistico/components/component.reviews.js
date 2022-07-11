import {useEffect, useState} from "react";
import CustomTextArea from "../../../components/inputs/CustomTextArea";
import SpinLoader from "../../../components/loader/SpinLoader";
import StarInput from "./StarInput";
import TotalReviews from "./TotalReviews";

/**
 * Loads a set of reviews for the current touristic point. Here the user will
 * be also able to add a new review.
 */
const Reviews = ({pointId}) => {
	const [isLoading, setLoading] = useState(false);
	const [rating, setRating] = useState(0);
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		// // fetching data of the touristic point
		// fetch(`${process.env.REACT_APP_NG_API_HOST}/api/punto-turistico/${pointId}/reviews`).then(async (response) => {
		// 	const jsonRes = await response.json();
		//
		// 	if (response.status === 200) {
		// 		const reviews = jsonRes.data;
		// 		setReviews(reviews);
		// 	}
		// 	else {
		// 		Toast.error(jsonRes.message);
		// 	}
		//
		// 	// if loading is false and there is no data, then it's a 404 error
		// 	setLoading(false);
		// });
	}, [pointId]);

	// Loading animation while the interface is fetching data
	if (isLoading) {
		return <center><SpinLoader /></center>;
	}

	return <div id="reviews" class="px-8 py-6 w-full flex flex-col items-center justify-start">
		<h1
			id="review-title"
			className="text-2xl uppercase font-bold text-center"
		>
			Reviews del punto turístico
		</h1>
		<div className="flex flex-col w-full items-center lg:flex-row">
			<TotalReviews />
			<div id="new-review" className="w-full flex-col items-center">
				<StarInput
					rating={rating}
					setRating={setRating}
				/>
				<CustomTextArea
					title={""}
					name={"comment"}
					placeholder={"Escribe tu comentario"}
					maxLength={1000}
				/>
				<div className="flex flex-row justify-end">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Dejar review
					</button>
				</div>
				<div id="review-list"></div>
			</div>
		</div>
	</div>
}

export default Reviews
