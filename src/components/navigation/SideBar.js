import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/app-logo.png';
import twitter from '../../assets/images/twitter-icon.png';
import facebook from '../../assets/images/facebook-icon.png';
import linkedin from '../../assets/images/linkedin-icon.png';
import github from '../../assets/images/github-icon.png';
import Modal from '../sessions/Modal';

const navigation1 = [
  { name: 'Doctors', path: '/', current: true },
  { name: 'Reserve', path: '/reserve', current: false },
  { name: 'My reservations', path: '/reservations', current: false },
];

const navigation2 = [
  { name: 'Add doctor', path: '/doctorform', current: false },
  { name: 'Delete Doctor', path: '/removedoctor', current: false },
];

const social = [
  { icon: twitter },
  { icon: facebook },
  { icon: linkedin },
  { icon: github },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const changeCurrentStatus = (name) => {
  for (let i = 0; i < navigation1.length; i += 1) {
    if (navigation1[i].name === name) {
      navigation1[i].current = true;
    } else {
      navigation1[i].current = false;
    }
  }
  for (let i = 0; i < navigation2.length; i += 1) {
    if (navigation2[i].name === name) {
      navigation2[i].current = true;
    } else {
      navigation2[i].current = false;
    }
  }
};

const SideBar = () => {
  const [showModal, setShowModal] = useState(false);
  const { role } = useSelector(({ signUpReducer }) => signUpReducer.currentUser);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex flex-col w-64">
      <div className="flex-1 flex flex-col pt-0 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-2">
          <a href="/"><img src={logo} className="w-40" alt="logo" /></a>
        </div>
        <nav className="mt-12 flex-1 desktop-nav" aria-label="Sidebar">
          <div className="pl-3 uppercase font-black text-md">
            {navigation1.map((item) => (
              <Link to={item.path} key={item.name}>
                <a
                  onClick={() => changeCurrentStatus(item.name)}
                  href={item.path}
                  className={classNames(
                    item.current
                      ? 'bg-lime-500 text-slate-50'
                      : 'text-slate-900 hover:bg-lime-200',
                    'group flex items-center pl-5 py-3 hover:text-slate-900',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              </Link>
            ))}
            {role === 'admin' && navigation2.map((item) => (
              <Link to={item.path} key={item.name}>
                <a
                  onClick={() => changeCurrentStatus(item.name)}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-lime-500 text-slate-50'
                      : 'text-slate-900 hover:bg-lime-200',
                    'group flex items-center pl-5 py-3 hover:text-slate-900',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <button type="button" onClick={handleModal} className="logout-btn ml-4">Logout</button>
      <div className="flex-shrink-0 flex-200 p-4">
        <div className="flex gap-2">
          {social.map((item) => (
            <a href="/" key={item.icon}><img src={item.icon} alt="social-icon" className="w-6" /></a>
          ))}
        </div>
        <p className="text-gray-700 font-bold mt-2">© 2022</p>
      </div>
      { showModal && <Modal handleModal={handleModal} />}
    </div>
  );
};

export default SideBar;
