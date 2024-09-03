import React , {useState, useEffect } from 'react';
import { Card, Overlay, Button, Text, Container } from '@mantine/core';

import { useUserStore } from '../store/userStore'; 
import '../styles/login.css'; 
import classes from '../components/EmailBanner.module.css'; 

import { useNavigate } from 'react-router-dom';
<link href='https://fonts.googleapis.com/css?family=Playfair Display' rel='stylesheet'></link>


export const Welcome: React.FC = () => {
  const { user, clearUser } = useUserStore(); // Accessing user data from Zustand store
  const navigate = useNavigate();
  const[showUsername, setShowUsername] = useState(false);
  const[showEmail, setShowEmail] = useState(false);

  //logout function 
  const handleLogout = () => {
    clearUser(); // Clear the user from Zustand store
    navigate('/login'); // Redirect to the login page after logout
  };

  //useEffect to set delay before showing user name, email and phone number.
  useEffect(() => {
    const userNameTimer = setTimeout(() => {
      setShowUsername(true); //show username after 2 seconds
    }, 2000);

    const emailTimer = setTimeout(() => {
      setShowEmail(true); //show email and phone after 3 seconds
    }, 3000);
    

    //clean up timeout if component is unmounted
    return () => {
      clearTimeout(userNameTimer);
      clearTimeout(emailTimer);};
  }, []);

  return (
    <Container className={classes.container}>
      <Card radius="md" className={classes.card}>
        <Overlay className={classes.overlay} opacity={0.55} zIndex={0} />

        <div className={classes.content}>
          {showUsername ? (
          <Text size="xl" fw={700} className={classes.title}>
            <span className="wave">👋</span> Welcome, {user?.firstName} {user?.lastName}!
          </Text>
          ):(
            <Text size="x1" fw={700} className = {classes.title}> Loading...
              
            </Text>
          )}
          {showEmail ?(
          <Text size="lg" className={classes.description}>
            <strong>Email:</strong> {user?.email}
            <br />
            <strong>Phone Number:</strong> {user?.phoneNumber}
          </Text>): null}

          

          <Button  onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default Welcome;