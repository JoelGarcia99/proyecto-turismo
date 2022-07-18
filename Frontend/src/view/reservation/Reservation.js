
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Carousel} from 'react-responsive-carousel';
import SessionHeaderComponent from '../../components/header/sessionHeaderComponent';
import {startSavingReservation} from '../../redux/actions/reservations/action.reservation';
import {allRoutes} from '../../router/routes';
import SessionFooterComponent from '../home/component.footer';
import _Header from './_Header';
import _GuideSelector from './components/_GuideSelector';
import _PointSelector from './components/_PointSelector';
import _ScheduleSelector from './components/_ScheduleSelector';
import _DateSelector from './components/_DateSelector';
import CustomTextArea from '../../components/inputs/CustomTextArea';
import ResponsiveSelect from '../../components/inputs/responsiveSelect';
import {ToastContainer} from 'react-toastify';

const Reservation = () => {

	const dispatch = useDispatch();

	const [status, setStatus] = useState({});

	const handleReservationSubmit = ()=>{
		dispatch(startSavingReservation({
			...status,
			schedule: status.res_schedule,
			point: status.point._id,
			guide: status.guide._id,
		}, ()=>{
			setStatus({});
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
			<_PointSelector status={status} setStatus={setStatus} />
			<_DateSelector status={status} setStatus={setStatus} />
			<div className="flex flex-row flex-wrap justify-evenly py-4">
				{
					status.point && status.date &&
					<_GuideSelector status={status} setStatus={setStatus} />
				}
				{
					status.guide &&
					<div className='flex flex-col justify-between w-2/6'>
						<h1 className="text-xl font-bold px-4 my-4"></h1>
						<_ScheduleSelector status={status} setStatus={setStatus} />
						<ResponsiveSelect
							name="aforum"
							title={"Aforo"}
							setData={(value) => setStatus({...status, aforum: value.target.value})}
							data={[
								{value: "15_20", label: "15 a 20 personas"},
								{value: "20_30", label: "20 a 30 personas"},
								{value: "30_40", label: "30 a 40 personas"},
								{value: "40_50", label: "40 a 50 personas"},
							]}
							displayProp={'label'}
							valueProp={'value'}
						/>
						<CustomTextArea
							title={"Descripción"}
							name={"description"}
							placeholder={"Establezca el proposito de la reserva"}
							value={status.description}
							onChange={(value) => setStatus({...status, description: value.target.value})}
							description={"Proposito de la reserva"}
							maxLength={2000}
						/>
					</div>
				}
			</div>
			{
				status.res_schedule &&
				<div className='flex flex-row justify-end px-16'>
					<button
						onClick={handleReservationSubmit}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full right-10 flex items-center justify-center my-4"
					>
						<FontAwesomeIcon icon={faSave} />
						&nbsp;&nbsp;
						Agendar
					</button>
				</div>
			}
			<SessionFooterComponent />
			<ToastContainer />
		</div>
	);
}

export default Reservation;
