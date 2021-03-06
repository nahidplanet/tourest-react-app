import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/firebase.init';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import Loader from '../Shared/Loader/Loader';
import { sendEmailVerification } from 'firebase/auth';

const Ragistration = () => {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [errorText, setErrorText] = useState('');
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');
    let emailSinginError;
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, errorProfile] = useUpdateProfile(auth)
    const handleRagistration =async (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        if (password !== confirmPassword) {
            setErrorText('Two password not matching...');

        } else {
           await createUserWithEmailAndPassword(email, password);
           await updateProfile({displayName:name});
        }
    }
    if (error) {
        emailSinginError = <p className='text-red-600 text-lg font-bold'>{error?.message}</p>
    }
    if (loading || updating ) {
        return <Loader></Loader>
    }
    if (user) {
        navigate('/home');
    }


    return (
        <div className='flex justify-center items-center h-[100vh]]'>
            <div className="w-[320px] sm:w-6/12 md:w-5/12 lg:w-4/12">
                <h1 className='text-center font-bold text-2xl md:text-4xl'>Ragistration</h1>

                <form data-aos="fade-left" onSubmit={handleRagistration} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input required ref={nameRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input required ref={emailRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Email" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input required ref={passwordRef} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />

                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input required ref={confirmPasswordRef} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirm-password" type="password" placeholder="******************" />

                    </div>
                    <div className="flex justify-start mb-4">
                        <label className="md:w-2/3 block text-gray-500 font-bold">
                            <input onClick={() => setChecked(!checked)} className="mr-2 leading-tight" type="checkbox" />
                            <span className="text-sm">
                                Send me your newsletter!
                            </span>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <button disabled={!checked} className="disabled:bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Registration
                        </button>
                    </div>
                    <p className='font-bold text-gray-700 text-sm mt-2 text-center'>Already Have a Account? <span onClick={() => navigate('/login')} className='text-[#cca001] cursor-pointer'>Login</span></p>
                </form>
                <span className='text-red-600 text-lg font-bold'> {errorText}</span>
                {emailSinginError}
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Ragistration;