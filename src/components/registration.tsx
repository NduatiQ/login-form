import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import { Paper, TextInput, PasswordInput, Button, Title, Container } from '@mantine/core';
import '../styles/login.css'; // Ensure this file contains the necessary styles

interface MyRegistrationInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
} 


const validationSchema = yup.object().shape({
  firstName: yup.string().min(3, 'First Name is too short').max(8, 'First Name is too long').required('Please fill out the first name'),
  lastName: yup.string().min(3, 'Last Name is too short').max(8, 'Last name is too long').required('Please fill out the last name'),
  email: yup.string().email('Invalid email Format').matches(/^[A-Za-z0-9._%+-]+@gmail\.com$/, 'Invalid email Format').required('Please fill out this section'),
  phoneNumber: yup.string().matches(/^07[0-9]{8}$/, 'Please enter a valid mobile number').required('Please fill out the mobile number'),
  password: yup.string().matches(/^[A-Z][0-9a-z]{7,20}$/, 'Password should start with a capital letter, have a minimum length of 8 but not exceeding 20').required('Please fill out the password'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Password does not match').required('Please Re-Enter the password to confirm')
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  //Access the persisted data
  const { setUser , loginData } = useUserStore(); // Zustand store

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<MyRegistrationInput>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<MyRegistrationInput> = (data) => {
    setUser(data);
    navigate('/welcome');
  };

  const autofillPassword = () => {
    if (loginData && loginData.logPassword) {
      setValue('password', loginData.logPassword);
      setValue('confirmPassword', loginData.logPassword); // Also autofill confirm password if needed
    }
  };

  return (
    <Container>
      <div className='background-container'></div>
      <Paper className="formContainer" withBorder shadow="md"  p={30} mt={-40} radius="md">
        <Title order={1}>Register as User</Title>
        <Title order={2}>Fill out the form below for registration</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <TextInput
              id="firstName"
              placeholder="Enter your first name"
              {...register('firstName')}
              error={errors.firstName?.message}
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <TextInput
              id="lastName"
              placeholder="Enter your last name"
              {...register('lastName')}
              error={errors.lastName?.message}
            />
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <TextInput
              id="email"
              placeholder="Enter your email address"
              {...register('email')}
              error={errors.email?.message}
            />
          </div>

          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <TextInput
              id="phoneNumber"
              placeholder="Format: 07xxxxxxxx"
              {...register('phoneNumber')}
              error={errors.phoneNumber?.message}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <PasswordInput
              id="password"
              placeholder="Enter a different password"
              mt="md"
              withAsterisk
              {...register('password')}
              error={errors.password?.message}
            />
          </div>

          <div>
            <Button id="autofill" onClick={autofillPassword} type="button" variant="outline" mt="md">
              Use login password
            </Button>
          </div>

          <div>
            <label htmlFor="confirmPassword">Re-Enter Password</label>
            <PasswordInput
              id="confirmPassword"
              placeholder="Re-Enter password to confirm"
              mt="md"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          </div>

          <Button id = "register" type="submit" >Register</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;