import {useEffect, useState} from "react";
import CustomTextArea from "../../../components/inputs/CustomTextArea";
import SpinLoader from "../../../components/loader/SpinLoader";
import {customHTTPRequest} from "../../../helpers/helper.network";
import StarInput from "./StarInput";
import TotalReviews from "./TotalReviews";
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuoteLeft, faQuoteRight} from "@fortawesome/free-solid-svg-icons";
import NoData from "../../../components/feedback/NoData";

/**
 * Loads a set of reviews for the current touristic point. Here the user will
 * be also able to add a new review.
 */
const Reviews = ({pointId}) => {
	const dispatch = useDispatch();
	const {user} = useSelector(state => state.auth);
	const {token} = useSelector(state => state.auth);
	const [isLoading, setLoading] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [reviews, setReviews] = useState([]);
	const [stats, setStats] = useState({});

	useEffect(() => {
		// fetching data of the touristic point
		const url = `${process.env.REACT_APP_NG_API_HOST}/api/review/punto-turistico/${pointId}`;
		const statsUrl = `${process.env.REACT_APP_NG_API_HOST}/api/review/stats/${pointId}`;

		setLoading(true);

		// loading some basic statistic
		customHTTPRequest(dispatch, statsUrl).then(response => {
			if (response !== {}) {
				setStats(response.data);
			}
		});

		// loading current user review
		customHTTPRequest(dispatch, `${url}?user_id=${user.id}`).then(response => {
			if (response !== {}) {
				setRating(response.data.review_score);
				setComment(response.data.review_comment);
			}
		});

		// loading all the other reviews
		customHTTPRequest(dispatch, url).then(response => {

			// if there is no error
			if (response !== {}) {
				setReviews(response.data);
				setLoading(false);
			}
			else {
				toast.error(response.message);
			}
		});
	}, [pointId]);

	const handleSubmit = async () => {
		const url = `${process.env.REACT_APP_NG_API_HOST}/api/review`;
		await customHTTPRequest(dispatch, url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				review_score: rating,
				review_comment: comment,
				author_id: user.id.toString(),
				point_id: pointId
			})
		}, true);
	}

	// Loading animation while the interface is fetching data
	if (isLoading) {
		return <center><SpinLoader /></center>;
	}

	return <div id="reviews" className="px-8 py-6 w-full flex flex-col items-center justify-start">
		<ToastContainer />
		<h1
			id="review-title"
			className="text-2xl uppercase font-bold text-center"
		>
			Reviews del punto turístico
		</h1>
		<div className="flex flex-col w-full items-center lg:flex-row">
			<TotalReviews stats={stats} />
			<div id="new-review" className="w-full flex-col items-center">
				<StarInput
					rating={rating}
					setRating={setRating}
				/>
				<CustomTextArea
					title={""}
					name={"comment"}
					placeholder={"Escribe tu comentario"}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					maxLength={1000}
				/>
				<div className="flex flex-row justify-end">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={handleSubmit}
					>
						Dejar review
					</button>
				</div>
				<div id="review-list"></div>
			</div>
		</div>
		<div id="other-comments" className="mt-8 lg:mt-0">
			<h2 className="text-2xl uppercase font-bold text-center">
				Comentarios del punto turístico
			</h2>
			<div id="reviews-body" className="flex flex-row flex-wrap justify-center items-stretch my-4">
				{
					reviews.length === 0 &&
					<NoData text="No hay comentarios" />
				}
				{
					reviews.map(review => {
						return <div
							key={review._id}
							style={{width: "20rem"}}
							className="flex flex-col justify-betweem items-center shadow-lg rounded-xl py-4 px-2 mx-2 hover:shadow-xl select-none"
						>
							<StarInput
								rating={review.review_score}
								setRating={() => {}}
							/>
							<h1 className="font-bold text-md text-center"></h1>
							<span
								className="w-full"
							>
								<FontAwesomeIcon
									icon={faQuoteLeft}
									className="mx-2 text-left text-gray-400 text-2xl"
								/>
								<br />
								<span className="mx-6">
									{review.review_comment}
								</span>
								<br />
								<FontAwesomeIcon icon={faQuoteRight} className="text-right float-right mx-2 text-gray-400 text-2xl" />
								<small
									className="text-sm text-gray-600 text-right px-4 float-right w-full"
								>
									~{review.author ?? "Anónimo"}
								</small>
							</span>
						</div>
					})
				}
			</div>
		</div>
	</div>
}

export default Reviews
