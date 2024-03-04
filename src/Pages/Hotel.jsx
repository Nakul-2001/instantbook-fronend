import Navbar from "../Components/Navbar";
import Email from "../Components/Email";
import Footer from "../Components/Footer";
import styled from "styled-components";
import { FaLocationDot } from "react-icons/fa6";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";
import {useLocation, useNavigate} from 'react-router-dom'
import useFetch from "../Hooks/useFetch";
import { useSelector } from "react-redux";
import Reserve from "../Components/Reserve";
import { checkout } from "../Redux/apiCalls";

const Container = styled.div`
  position:relative;
`;

const Heading = styled.div`
  font-size: 25px;
  font-weight: bolder;
  margin: 10px;
`;

const Location = styled.div`
  font-size: 14px;
  margin: 10px;
`;

const Distance = styled.div`
  margin: 10px;
  color: #4ba1bd;
  font-weight: bold;
`;

const Offer = styled.div`
  margin: 10px;
  color: #009723;
  font-weight: bold;
`;

const Images = styled.div`
  display: flex;
  margin: 10px;
  flex-wrap: wrap;
  gap: 10px;
`;

const Image = styled.div`
  width: 32%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const Description = styled.div`
  display: flex;
  margin: 20px 10px 10px 10px;
  justify-content: space-between;
  gap: 10px;
`;

const Left = styled.div`
  flex: 8;
`;

const Desc = styled.div`
  margin: 10px;
`;

const Right = styled.div`
  background-color: lightblue;
  padding: 10px;
  text-align: center;
  flex: 2;
  border-radius: 5px;
`;

const Summary = styled.div`
  margin: 5px;
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-weight: bolder;
  font-size: 25px;
  margin: 5px;
`;

const Button = styled.button`
  background-color: #0071c2;
  border: none;
  margin: 5px;
  padding: 5px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  border-radius: 5px;
  font-size: 15px;
`;

const Slider = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.613);
  z-index: 999;
  display: flex;
  align-items: center;
`;

const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
  color: lightgray;
  cursor: pointer;
`;

const Arrow = styled.div`
  margin: 20px;
  font-size: 50px;
  color: lightgray;
  cursor: pointer;
`;

const SliderImg = styled.img`
  width: 80%;
  height: 80vh;
`;

const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Hotel() {

  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const {data,loading,error} = useFetch(`https://bookifypro.onrender.com/api/hotel/find/${id}`);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const navigate = useNavigate();
  const {currentUser} = useSelector((state)=>state.user);

  const {date,count} = useSelector((state)=>state.search);

  function dayDifference(date1, date2) {
    console.log(date1,date2);
    const end = new Date(date1);
    const start = new Date(date2);
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.floor((end-start) / millisecondsInDay);
    console.log(diffDays);
    return diffDays;
  }

  const days = dayDifference(date[0].endDate, date[0].startDate);

  const [openModel,setOpenModel] = useState(false);

  const handleclick = (e) => {
    e.preventDefault();
    !currentUser && navigate('/Login');
    setOpenModel(true);
  }

  return (
    <div>
      <Navbar></Navbar>
      <Container>
        {open && (
          <Slider>
            <Close onClick={() => setOpen(false)}>
              <IoIosCloseCircle />
            </Close>
            <Arrow onClick={() => handleMove("l")}>
              <FaArrowCircleLeft />
            </Arrow>
            <SliderWrapper>
              <SliderImg src={data.photos[slideNumber]} alt="" />
            </SliderWrapper>
            <Arrow onClick={() => handleMove("r")}>
              <FaArrowCircleRight />
            </Arrow>
          </Slider>
        )}

        <Heading>{data.name}</Heading>
        <Location>
          <FaLocationDot />{data.address}
        </Location>
        <Distance>Excelent Location - {data.distance}m from center</Distance>
        <Offer>
          Book a stay over $150 at this property and get a free airport taxi
        </Offer>
        <Images>
          {data.photos?.map((photo, i) => (
            <Image key={i}>
              <Img onClick={() => handleOpen(i)} src={photo} alt="" />
            </Image>
          ))}
        </Images>
        <Description>
          <Left>
            <Heading>{data.title}</Heading>
            <Desc>
              {data.desc}
            </Desc>
          </Left>
          <Right>
            <Summary>Perfect for a {days}-night stay!</Summary>
            <Desc>
              Located in the real heart of krakow, this property has an excelent
              location score of 9.8!
            </Desc>
            <Price>
              ${data.cheapestPrice*days*count.room} <small>({days} nights)</small>
            </Price>
            <Button onClick={handleclick}>Reserve or Book Now</Button>
          </Right>
        </Description>
      </Container>
      <Email></Email>
      <Footer></Footer>
      {
        openModel && <Reserve setOpenModel = {setOpenModel} hotelId = {id} amount={data.cheapestPrice*days*count.room}/>
      }
    </div>
  );
}

export default Hotel;
