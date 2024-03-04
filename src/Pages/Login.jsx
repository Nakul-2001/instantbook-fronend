import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch,useSelector } from 'react-redux'
import { login } from '../Redux/apiCalls';
import { useNavigate } from 'react-router-dom';

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {currentUser,isFetching} = useSelector((state)=>state.user);

  const navigate = useNavigate();

  const handleClick = (e) => {

    e.preventDefault();
    
    login(dispatch,{email,password});
    navigate('/');
    
  };

  return (
    <LoginPageContainer>
      <LoginForm >
        <h2>Login</h2>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleClick} disabled={isFetching}>LOG IN</Button>
      </LoginForm>
    </LoginPageContainer>
  );
};

export default Login;
