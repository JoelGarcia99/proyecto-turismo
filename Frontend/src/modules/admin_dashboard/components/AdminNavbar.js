import { useLocation } from 'react-router-dom';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import NavbarInput from '@material-tailwind/react/NavbarInput';
import Image from '@material-tailwind/react/Image';
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import ProfilePicture from '../assets/img/team-1-800x800.jpg';
import {useSelector} from 'react-redux';


import headerImage from '../../../assets/green-background-texturized-expanded.jpg';


const headStyle = {
  backgroundImage: `url(${headerImage})`
};

export default function AdminNavbar({ showSidebar, setShowSidebar, title }) {
    const location = title; //useLocation().pathname;

    const {user} = useSelector(state=>state.auth);

    return (
        <nav className="bg-light-blue-500 md:ml-64 py-6 px-3" style={headStyle}>
            <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
                <div className="md:hidden">
		  {/*hamburguer button to show sidebar */}
                    <Button
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        iconOnly
                        rounded
                        ripple="light"
                        onClick={() => setShowSidebar('left-0')}
                    >
                        <Icon name="menu" size="2xl" color="white" />
                    </Button>
                    <div
                        className={`absolute top-2 md:hidden ${
                            showSidebar === 'left-0' ? 'left-64' : '-left-64'
                        } z-50 transition-all duration-300`}
                    >
                        <Button
                            color="transparent"
                            buttonType="link"
                            size="lg"
                            iconOnly
                            rounded
                            ripple="light"
                            onClick={() => setShowSidebar('-left-64')}
                        >
                            <Icon name="close" size="2xl" color="black" />
                        </Button>
                    </div>
                </div>

                <div className="flex justify-between items-center w-full">
                    <h4 className="uppercase text-white text-sm tracking-wider mt-1">
                        {location}
                    </h4>

                    <div className="flex">
                        {/* <NavbarInput placeholder="Search" /> */}
			<h2 className="flex self-center text-white">{user.nombre}&nbsp;{user.apellido}</h2>

                        <div className="-mr-4 ml-6">
                            <Dropdown
                                color="transparent"
                                buttonText={
                                    <div className="w-12">
                                        <Image src={ProfilePicture} rounded />
                                    </div>
                                }
                                rounded
                                style={{
                                    padding: 0,
                                    color: 'transparent',
                                }}
                            >
                                <DropdownItem color="lightBlue">
                                    Action
                                </DropdownItem>
                                <DropdownItem color="lightBlue">
                                    Another Action
                                </DropdownItem>
                                <DropdownItem color="lightBlue">
                                    Something Else
                                </DropdownItem>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
