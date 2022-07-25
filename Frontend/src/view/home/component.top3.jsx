import {useEffect, useState} from "react"
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import SpinLoader from "../../components/loader/SpinLoader";
import {customHTTPRequest} from "../../helpers/helper.network";
import {allRoutes} from "../../router/routes";
import StarInput from "../punto-turistico/components/StarInput";

const Top3TouristicPoints = () => {

	const navigator = useNavigate();

	const dispath = useDispatch();
	// data about touristic points & their rank
	const [data, setData] = useState(null);

	useEffect(async () => {
		const url = `${process.env.REACT_APP_NG_API_HOST}/api/review/top-3`;
		const response = await customHTTPRequest(dispath, url, {
			method: "GET",
		}, false);

		if (response !== {}) {
			setData(response.data);
		}
	}, []);

	return <div className="px-16 my-4">
		<h1 className="text-2xl uppercase">
			Mostrando los puntos turisticos mejor valorados
		</h1>
		<br />

		{
			!data && <SpinLoader />
		}
		<div className="flex flex-row justify-start">
			{
				data?.map((item, index) => {
					return <div
						key={index}
						className="rounded-md px-4 py-4 mx-2 bg-gray-300 shadow hover:shadow-xl"
					>
						<div className="flex flex-row justify-between items-center my-1">
							<StarInput
								rating={item.review_score}
								setRating={() => {}}
							/>
							&nbsp;
							<span
								className="font-bold text-md rounded-full p-1 bg-white">
								{
									<span>
										{item.review_score}
										{
											item.review_score % 1 === 0 && ".0"
										}
									</span>
								}
							</span>
						</div>
						<justify-between></justify-between>
						<img
							src={process.env.REACT_APP_NG_API_HOST + item.main_image_url}
							style={{
								width: "15rem",
								height: "15rem",
								objectFit: "cover"
							}}
						/>
						<h2 className="my-4 text-black text-xl font-extrabold">
							{item.name}
						</h2>
						<button
							onClick={() => navigator(allRoutes.punto_detail + `${item.slug}`)}
							className="px-4 py-1 rounded-md bg-white font-semibold float-right"
						>
							Ver detalles
						</button>
					</div>
				})
			}
		</div>
	</div>;
}

export default Top3TouristicPoints
