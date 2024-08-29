import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
<link href='https://fonts.googleapis.com/css?family=Playfair Display' rel='stylesheet'></link>

interface myFormInput {
  email: string;
  password: string;
}

const yupValidation = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const { register, handleSubmit, formState: { errors } } = useForm<myFormInput>({
    resolver: yupResolver(yupValidation),
  });

  const onSubmit: SubmitHandler<myFormInput> = (data) => {
    // Store the user data in Zustand store - state management library
    setUser(data);

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
        <input type="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      
      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Register</button>
    </form>
    
    </>
  );
};

export default Login;