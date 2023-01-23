import React from 'react';
import { Container, Logo } from './style';
import logo from './../../assets/icons/logo.jpg';
import user from './../../assets/icons/user.png';

const Navbar = () => {
  return (
    <Container>
      <Logo>
        <Logo.Icon src={logo} />
        <Logo.Text>Sensarts</Logo.Text>
      </Logo>
      <Logo>
        <Logo.Icon src={user} />
        <Logo.Text>Username</Logo.Text>
      </Logo>
    </Container>
  );
};

export default Navbar;
