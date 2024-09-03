import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
<link href='https://fonts.googleapis.com/css?family=Playfair Display' rel='stylesheet'></link>

interface myFormInput {
  logEmail: string;
  logPassword: string;
}


const yupValidation = yup.object().shape({
  logEmail: yup.string().email('Invalid email format').required('Email is required'),
  logPassword: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setLoginData } = useUserStore(); //using setLoginData to for login data storage

  const { register, handleSubmit, formState: { errors } } = useForm<myFormInput>({
    resolver: yupResolver(yupValidation),
  });

  const onSubmit: SubmitHandler<myFormInput> = (data) => {
    // Store the user data in Zustand store - state management library
    setLoginData(data); //store login data in zustand

    // Redirect to the registration page
    navigate('/registration');
  };
  

  return (
    <>
    <div className="background-container"></div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1>Welcome to the Login page !</h1>
        <h2>Enter Details for registration</h2>
        <div className = "formBody"></div>
        <label>Email</label>
        <input type="email" {...register('logEmail')} />
        {errors.logEmail && <p>{errors.logEmail.message}</p>}
      </div>
      
      <div>
        <label>Password</label>
        <input type="password" {...register('logPassword')} />
        {errors.logPassword && <p>{errors.logPassword.message}</p>}
      </div>

      <button type="submit">Register</button>
    </form>
    
    </>
  );
};

export default Login;