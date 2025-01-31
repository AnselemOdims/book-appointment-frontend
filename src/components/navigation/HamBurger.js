import React, { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import twitter from '../../assets/images/twitter-icon.png';
import facebook from '../../assets/images/facebook-icon.png';
import linkedin from '../../assets/images/linkedin-icon.png';
import github from '../../assets/images/github-icon.png';
import Modal from '../sessions/Modal';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const menuItems = [
  { name: 'Doctors', path: '/' },
  { name: 'Reserve', path: '/reserve' },
  { name: 'My reservations', path: '/reservations' },
];

const menuItems2 = [
  { name: 'Add dcotor', path: '/doctorform' },
  { name: 'Delete doctor', path: '/removedoctor' },
];

const social = [
  { icon: twitter },
  { icon: facebook },
  { icon: linkedin },
  { icon: github },
];

const HamBurger = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { role } = useSelector(({ signUpReducer }) => signUpReducer.currentUser);

  const handleModal = () => {
    setShowModal(!showModal);
    setMobileMenu(false);
  };

  return (
    <header className={`flex flex-col px-8 bg-slate-50 ${mobileMenu ? 'h-screen header' : 'h-fit'} fixed top-0 w-screen shadow-xl lg:hidden`}>
      <a href="/" className="text-lg text-slate-50"><img src={logo} className={`w-24 ${mobileMenu ? 'hidden' : 'block'}`} alt="logo" /></a>
      <nav>
        <div className="text-slate-50 mobile-btns">
          <button
            type="button"
            className={` text-lime-500 ${!mobileMenu ? 'block' : 'hidden'}`}
            onClick={() => setMobileMenu(true)}
          >
            <MenuIcon className="h-8" />
          </button>
          <button type="button" className={classNames(mobileMenu ? 'block' : 'hidden', 'text-slate-900')} onClick={() => setMobileMenu(false)}>
            <XIcon className="h-8" />
          </button>
        </div>
        <div className={classNames(mobileMenu ? 'block' : 'hidden')}>
          <ul className="flex flex-col text-slate-900 font-bold text-lg gap-8 items-center mt-44">
            {
              menuItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.path}>
                    <a href={item.path}>{item.name}</a>
                  </Link>
                </li>
              ))
            }
            {role === 'admin' && (
              menuItems2.map((item) => (
                <li key={item.name}>
                  <Link to={item.path}>
                    <a href={item.path}>{item.name}</a>
                  </Link>
                </li>
              ))
            )}
          </ul>
          <div className="logout">
            <button type="button" onClick={handleModal} className="logout-btn ml-6">Logout</button>
          </div>
        </div>
      </nav>
      <div className={classNames(mobileMenu ? 'block' : 'hidden', 'flex flex-col items-center mt-32')}>
        <div className="flex gap-2">
          {social.map((item) => (
            <a href="/" key={item.icon}><img src={item.icon} alt="social-icon" className="w-8" /></a>
          ))}
        </div>
        <p className="text-gray-700 font-bold mt-2">© 2022</p>
      </div>
      { showModal && <Modal handleModal={handleModal} />}
    </header>
  );
};

export default HamBurger;
