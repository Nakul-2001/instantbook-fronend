import React from 'react'
import styled from 'styled-components'
import { IoIosHelpCircleOutline } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { FiLogOut } from "react-icons/fi";
import {logout} from '../Redux/userSlice'
import {reset} from '../Redux/searchSlice'

const Container = styled.div`
    width:100%;
    height:50px;
    display:flex;
    background-color: #003580;
`

const Left = styled.div`
    display: flex;
    width:40%;
    
`

const Logo = styled.div`
    color:white;
    font-size:30px;
    font-weight:bolder;
    padding:5px;
    
`

const Right = styled.div`
    display: flex;
    width:60%;
    justify-content: flex-end;
    gap:5px;
`

const Language = styled.div`
    
`

const Country = styled.div`
    
`

const Help = styled.button`
    svg{
        color:white;
        font-size:30px;
        padding:8px 10px 5px 10px;
    }
    background-color:inherit;
    border:none;
    cursor:pointer;
`

const ListProp = styled.div`
    color:white;
    background-color: #003580;
    border:1px solid white;
    margin: 8px;
    padding:5px 10px 5px 10px;
    cursor:pointer;
`

const Button = styled.button`
    background-color: white;
    cursor: pointer;
    border:none;
    padding:1px 5px 1px 5px;
    margin: 8px;
    border-radius:2px;
    a{
        text-decoration:none;
        color:#003580;
    }
`

const Username = styled.div`
    color:white;
    background-color: #003580;
    margin: 3px;
    padding:12px 5px 5px 5px;
    cursor:pointer;
`

const Logout = styled.button`
    cursor: pointer;
    color:white;
    border:none;
    padding:1px 5px 1px 5px;
    margin: 3px;
    border-radius:2px;
    background-color:#003580;
    svg{
        text-align:center;
        color:white;
        font-size:20px;
    }
`


function Navbar() {
    const User = useSelector((state)=>state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }
  return (
    <Container>
        <Left>
        <Logo><Link to="/">Instant Book</Link></Logo>
        </Left>

        <Right>
            <Language></Language>
            <Country></Country>
            <Help><IoIosHelpCircleOutline/></Help>
            <ListProp>List your Property</ListProp>
            {!User ? 
            <><Button><Link to="/Login">Log In</Link></Button>
            <Button><Link to="/Register">Register</Link></Button></> : 
            <>
            <Username>{User.username}</Username>
            <Logout onClick={handleClick}><FiLogOut /><br/>Logout</Logout>
            </>}
        </Right>
        
    </Container>
  )
}

export default Navbar
