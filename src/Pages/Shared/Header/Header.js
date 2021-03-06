import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../Firebase/firebase.init';
import CustomLink from '../CustomLink/CustomLink';

const Header = () => {
    const [openProfile, setProfile] = useState(false);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    let userName;
    let userEmail;
    if (user) {
        userName = user.displayName;
        userEmail = user.email;
    }
    const handleSingout = () => {
        signOut(auth);
        navigate('/home');
    }

    return (
        <header className='' data-aos="fade-down">
            <nav className="border-gray-200 px-2 sm:px-4 py-4  bg-gray-800 ">
                <div className="container flex flex-wrap justify-between items-center mx-auto ">
                    <Link to={"/"} href="https://flowbite.com" className="flex items-center">
                        <img src="https://i.ibb.co/6H8HnYH/10028.png" className="mr-3 h-8 sm:h-9" alt="Logo" />
                        {/* <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Tourest</span> */}
                    </Link>
                    <div className="flex items-center md:order-2">
                        <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
                            <span className="sr-only">Open user menu</span>
                            {
                                user?.photoURL ?
                                    <span className='flex items-center'><span className='mr-3 hidden md:block    hover:text-white text-gray-500 font-bold md:text-md'>{userName}</span>
                                        <img onClick={() => setProfile(!openProfile)} className="w-[42px] h-10 rounded-full border-2  border-[#FDC703]" src={user?.photoURL} alt="user" /></span>

                                    :
                                    <img onClick={() => setProfile(!openProfile)} className="w-[42px] h-10 rounded-full border-2  border-[#FDC703]" src="https://i.ibb.co/YjMwFFR/user-default-2.png" alt="user" />

                            }
                        </button>

                        <div className={`${openProfile ? 'block absolute top-10 right-10' : 'hidden'} z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate(956px, 1081px)`} id="dropdown" >
                            <div className="py-3 px-4">
                                <span className="block text-sm text-gray-900 dark:text-white">{userName && userName}</span>
                                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{userEmail && userEmail}</span>
                            </div>
                            <ul className="py-1" aria-labelledby="dropdown">
                                <li>
                                    <Link to={"/"} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to={"/"} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</Link>
                                </li>
                                <li>
                                    <Link to={"/"} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</Link>
                                </li>
                                <li>
                                    <p onClick={handleSingout} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</p>
                                </li>
                            </ul>
                        </div>
                        <button onClick={() => setOpenMobileMenu(!openMobileMenu)} type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"  >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className={`${openMobileMenu ? 'block ' : 'hidden'} justify-between items-center w-full md:flex md:w-auto md:order-1`} id="mobile-menu-2 ">
                        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                            <li>
                                <CustomLink to={'/home'} className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 md:text-md"  >Home</CustomLink>
                            </li>
                            <li>
                                <CustomLink to={'/blog'} className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 md:text-md">Blog</CustomLink>
                            </li>
                            <li>
                                <CustomLink to={'/about'} className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 md:text-md">About</CustomLink>
                            </li>
                            {user ?
                                <li>
                                    <p onClick={handleSingout} className="cursor-pointer block py-2 pr-4 pl-3   border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 md:text-md">Logout</p>
                                </li>
                                :
                                <li >
                                    <CustomLink to={'/login'} className="block py-2 pr-4 pl-3   border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 md:text-md">Login</CustomLink>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;