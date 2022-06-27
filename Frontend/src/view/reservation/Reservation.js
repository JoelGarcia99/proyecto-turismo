
import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Carousel} from 'react-responsive-carousel';
import {useNavigate} from 'react-router';
import Comments from '../../components/comments/Comments';
import SessionHeaderComponent from '../../components/header/sessionHeaderComponent';
import CustomSelect from '../../components/inputs/CustomSelect';
import SpinLoader from '../../components/loader/SpinLoader';
import SquareLoader from '../../components/loader/SquareLoader';
import useCustomForm from '../../hooks/useCustomForm';
import {startFetchingGuides, startFetchingGuidesByPoint} from '../../redux/actions/guideman/action.guideman';
import {startFetchingReservables} from '../../redux/actions/locations/action.location';
import {startSavingReservation} from '../../redux/actions/reservations/action.reservation';
import {allRoutes} from '../../router/routes';
import SessionFooterComponent from '../home/component.footer';
import WideDescriptorComponent from '../home/component.wideDescriptor';
import _Header from './_Header';

const Reservation = ({isUpdate = false}) => {

	const dispatch = useDispatch();
	const {guidemen: guides} = useSelector(state => state.guideman);
	const {reservables} = useSelector(state => state.locations);

	const [selectedGuide, setSelectedGuide] = useState(null);
	const [selectedSchedule, setSelectedSchedule] = useState(null);
	const [selectedPoint, setSelectedPoint] = useState(null);

	const navigator = useNavigate();

	const [params, setParams] = useCustomForm({
		state: 'state_draft',
		title: '',
		description: '',
		aforum: 15
	});

	// fetching guides
	useEffect(() => {
		dispatch(startFetchingReservables());
		dispatch(startFetchingGuides(false))
		// dispatch(startFetchingReservables((points)=>{
		// 	dispatch(startFetchingGuidesByPoint(points[0]._id, (guides)=>{
		// 		setSelectedGuide(guides[0]);
		// 		setSelectedSchedule(guides[0]?.schedules[0]);
		// 	}));
		// }));
	}, [dispatch]);

	const handleSave = (event) => {
		event.preventDefault();

		const body = {
			...params,
			guide: {
				_id: selectedGuide._id,
				name: selectedGuide.name,
			},
			schedule: selectedSchedule,
			touristic_point: {
				_id: selectedPoint._id,
				name: selectedPoint.name,
			}
		}

		//TODO: show a loader here
		dispatch(startSavingReservation(body, () => {
			//TODO: redirect to the reservation page instead of home
			navigator(allRoutes.home);
			//TODO: quit loader here
		}));
	}

	function importAll(r) {
		return r.keys().map(r);
	}
	const images = importAll(require.context('../../assets/header/', false, /\.(svg|webp)$/));

	return (
		<div className="w-full flex flex-col justify-start align-center">
			<SessionHeaderComponent
				currentRoute={allRoutes.reservation}
			/>
			<div className="top-0 absolute animate__animated animate__fadeInDown animate__faster">
				<Carousel
					autoPlay={true}
					interval={5000}
					infiniteLoop={true}
					showThumbs={false}
					showStatus={false}
					stopOnHover={false}
					useKeyboardArrows={true}
				>
					{
						images.map((image, index) => {
							return <div key={index}>
								<img src={image} className="object-cover" alt="" style={{height: "85vh"}} />
							</div>

						})}
				</Carousel>
			</div>
			<div style={{height: "75vh"}}></div>
			<h1 className="text-xl font-bold px-4">¿Cuál será tu próxima aventura?</h1>

			<div id="reservables" className="mx-2 px-2 flex flex-col justify-start rounded shadow-md">
				{
					reservables.map((reservable, index) => {
						return <div key={index}>
							<WideDescriptorComponent
								buttonText={"Reservar"}
								title={reservable.name}
								isTitleInside={true}
								details={reservable.short_description ?? ""}
								imageUrl={reservable.main_image}
								imageLeft={false}
							/>
						</div>
					})
				}
			</div>

			<h1 className="text-xl font-bold px-4 my-4">HIDE - Seleccione el guía del recorrido</h1>

			<div
				className="flex flex-row justify-center"
			>
				{
					guides.map((guide, index) => {
						return <div key={index} className="mx-8 rounded-xl px-2 py-2 cursor-pointer hover:shadow-xl hover:bg-gray-200">
							<img
								src={guide.image_url}
								alt=""
								className="animate__animated animate__fadeIn my-4 rounded-full"
								style={{height: "10rem", width: "10rem"}}
							/>
							<p className="text-center font-bold uppercase">{guide.name}</p>
						</div>
					})
				}
			</div>

			<h1 className="text-xl font-bold px-4 my-4">HIDE - Seleccione la fecha y hora</h1>
			{/*TODO: remove this and make it dynamic to fetch the selected guide schedules*/}
			<div>
				{
					guides[0]?.schedules.map((schedule, index) => {
						return <div key={index} className="flex flex-row justify-center">
							<div className="flex flex-row justify-center">
								<p className="text-center font-bold uppercase">
									{format(schedule.from, 'PPpp')}
								</p>
								<p className="text-center font-bold uppercase">
									&nbsp; - &nbsp;{format(schedule.to, 'PPpp')}
								</p>
							</div>
						</div>
					})}
			</div>

			<SpinLoader />
			<SessionFooterComponent />
		</div>
	);
}

export default Reservation;
