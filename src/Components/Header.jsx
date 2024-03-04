import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import { FaBed } from "react-icons/fa";
import { TbPlaneInflight } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import { BsTaxiFront } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { FaPerson } from "react-icons/fa6";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import {useDispatch, useSelector} from 'react-redux'
import { update } from '../Redux/searchSlice';


const Container = styled.div`
    width: 100%;
    /* height: 350px; */
    background-color:#003580;
    position:relative;
`

const Icons = styled.div`
    display:flex;
    gap:50px;
    padding:20px;
    padding-left:10px;
`

const Icon = styled.div`
    &:active{
        border:1px solid white;
        padding:5px;
        border-radius:20px;
    }
    svg{
        color:white;
        font-size:20px;
    }
    display: flex;
    margin-bottom:30px;
`

const Name = styled.div`
    color:white;
    font-size:20px;
    margin-left:8px;
`

const Heading = styled.div`
    
    color:white;
    font-size:50px;
    font-weight:bolder;
    padding:15px 15px 15px 10px;
`

const Desc = styled.div`
    
    color:white;
    font-size:20px;
    font-weight:bold;
    padding:15px 15px 15px 10px;
`

const Button = styled.button`
    color:white;
    margin:20px 20px 80px 10px;
    font-size:15px;
    background-color: #2e6cc4;
    padding:10px;
    border-radius:2px;
    border:none;
    a{
        text-decoration:none;
        color:white;
    }
`

const Search = styled.div`
    width:95%;
    border:3px solid orange;
    border-radius:5px;
    padding:5px 0px 5px 0px;
    display:flex;
    justify-content: space-around;
    height:40px;
    background-color: white;
    position:absolute;
    bottom:-25px;
    left:25px;
`

const SearchItem = styled.div`
    display: flex;
    gap:10px;
`

const SearchIcon = styled.div`
    svg{
        color:lightgrey;
        font-size:30px;
        padding:5px;
    }
`

const InputText = styled.input`
    border:none;
    border-radius:5px;
    font-size:15px;
    width:250px;
    outline:none;
`

const Text = styled.input`
    border:none;
    border-radius:5px;
    font-size:15px;
    color:lightgray;
    width:250px;
    outline:none;
    cursor: pointer;
    position:relative;
`

const SearchBtn = styled.button`
    border:none;
    border-radius:5px;
    width:100px;
    font-size:15px;
    font-weight:bold;
    color:white;
    background-color:#2e6cc4;
`

const DateCont = styled.div`
    position:absolute;
    top:50px;
    z-index:1;
`

const Options = styled.div`
    position:absolute;
    top:50px;
    width:250px;
    background-color: #fff;
    /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
    z-index:1;
`

const Items = styled.div`
    display:flex;
    justify-content: space-between;
`

const Title = styled.div`
    color:grey;
    font-size:20px;
    margin:8px 10px 8px 10px;
`

const Span = styled.span`
    display:flex;
    color:grey;
    font-size:20px;
    margin:8px 10px 8px 10px;
`

const ItemBtn = styled.button`
    margin:0px 10px 0px 10px;
    border:1px solid blue;
    background-color: white;
    border-radius:2px;
    font-size:20px;
    &:disabled{
        cursor:not-allowed;
    }
`

function Header({inList}) {

    const [destination,setDestination] = useState('');

    const [openDate,setopenDate] = useState(false);
    const [date,setDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }]);

    var startDate = new Date(date[0].startDate);
    var endDate = new Date(date[0].endDate);

    //Function to convert startDate and endDate to dersire format.
    var dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    });


    const [openOptions,setopenOptions] = useState('');
    const [options,setOptions] = useState({
        Adult:1,
        Children:0,
        Room:0
    })

    const handleOptions = (name, operation) => {
    setOptions ((prev) => {
    return {
    ...prev,
    [name]: operation === "i" ? options [name] + 1 : options [name] - 1,
           };
        });
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(update({destination,date,options}));
        navigate('/hotels',{state:{destination,date,options}});
    }

    const User = useSelector((state)=>state.user.currentUser);

  return (
    <Container>
      <Icons>
        <Icon><FaBed /><Name>Stays</Name></Icon>
        <Icon><TbPlaneInflight /><Name>Flights</Name></Icon>
        <Icon><FaCar /><Name>Car Rentals</Name></Icon>
        <Icon><FaBed /><Name>Attractions</Name></Icon>
        <Icon><BsTaxiFront /><Name>Airport Taxis</Name></Icon>
      </Icons>

        {!inList && <>
        <Heading>A lifetime of discounts? It's Genius.</Heading>
        <Desc>Get rewarded for your travels - unlock instant savings of 10% or more on your first booking.</Desc>
        {!User ? <Button><Link to='/Register'>Register Now</Link></Button> : <Button><Link to='/Register'>Book Now!</Link></Button>}


        <Search>
        <SearchItem>
            <SearchIcon><FaBed /></SearchIcon>
            <InputText placeholder="Where are you going?" onChange={(e)=>setDestination(e.target.value)}></InputText>
        </SearchItem>
        <SearchItem>
            <SearchIcon><SlCalender /></SearchIcon>
            <Text placeholder={`${dateFormatter.format(startDate)} to ${dateFormatter.format(endDate)}`} onClick={()=>setopenDate(!openDate)}></Text>
            <DateCont>
            {openDate && <DateRange
                editableDateInputs={true}
                onChange={(item) => {setDate([item.selection]);setopenDate(false);}}
                moveRangeOnFirstSelection={false}
                minDate={new Date()}
                ranges={date}/>}
            </DateCont>
        </SearchItem>
        <SearchItem>
            <SearchIcon><FaPerson /></SearchIcon>
            <Text placeholder={`${options.Adult} Adult - ${options.Children} Children - ${options.Room} Room`} onClick={()=>setopenOptions(!openOptions)}></Text>
            {openOptions && <Options>
                <Items>
                    <Title>Adult</Title>
                    <Span>
                        <ItemBtn onClick={()=>handleOptions("Adult","i")}>+</ItemBtn>
                        {options.Adult}
                        <ItemBtn disabled={options.Adult <= 0} onClick={()=>handleOptions("Adult","d")}>-</ItemBtn>
                    </Span>
                </Items>
                <Items>
                    <Title>Children</Title>
                    <Span>
                        <ItemBtn onClick={()=>handleOptions("Children","i")}>+</ItemBtn>
                        {options.Children}
                        <ItemBtn disabled={options.Children <= 0} onClick={()=>handleOptions("Children","d")}>-</ItemBtn>
                    </Span>
                </Items>
                <Items>
                    <Title>Rooms</Title>
                    <Span>
                        <ItemBtn onClick={()=>handleOptions("Room","i")}>+</ItemBtn>
                        {options.Room}
                        <ItemBtn disabled={options.Room <= 0} onClick={()=>handleOptions("Room","d")}>-</ItemBtn>
                    </Span>
                </Items>
            </Options>}
        </SearchItem>
        <SearchBtn onClick={handleClick}>Search</SearchBtn>
        </Search>
        </>}
    
    </Container>
  )
}

export default Header
