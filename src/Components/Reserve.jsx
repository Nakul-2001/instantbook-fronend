import React, { useState } from "react";
import { styled } from "styled-components";
import { IoIosCloseCircle } from "react-icons/io";
import useFetch from "../Hooks/useFetch";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { checkout } from "../Redux/apiCalls";

const Res = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.418);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background-color: white;
  padding: 20px;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

const Heading = styled.div`
  font-weight: 500;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  padding: 20px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.div`
  font-weight: 500;
`;

const Desc = styled.div`
  font-weight: 300;
`;

const Max = styled.div`
  font-size: 12px;
`;

const Price = styled.div`
  font-weight: 500;
`;

const SelectedRoom = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 8px;
  color: gray;
`;

const Room = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input``;

const Button = styled.button`
  border: none;
  padding: 10px 20px;
  background-color: #0071c2;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  margin-top: 20px;
`;

function Reserve({ setOpenModel, hotelId , amount}) {

  const { data, loading, error } = useFetch(
    `https://bookifypro.onrender.com/api/hotel/room/${hotelId}`
  );

  const { date } = useSelector((state) => state.search);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const d = new Date(start.getTime());
    const dates = [];
    while (d <= end) {
      dates.push(new Date(d).getTime());
      d.setDate(d.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(date[0].startDate, date[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const [selectedRoom, setSelectedRoom] = useState([]);
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRoom(
      checked
        ? [...selectedRoom, value]
        : selectedRoom.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRoom.map(async (roomId) => {
          const res = axios.put(
            `https://bookifypro.onrender.com/api/room/availability/${roomId}`,
            {
              dates: alldates,
            }
          );
          return res.data;
        })
      );
      setOpenModel(false);
      
      console.log(amount);
      checkout(amount);
    } catch (err) {

    }
  };

  return (
    <Res>
      <Container>
        <Close>
          <IoIosCloseCircle onClick={() => setOpenModel(false)} />
        </Close>
        <Heading>Select Your rooms:</Heading>
        {data.map((item) => (
          <Item key={item._id}>
            <ItemInfo>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Max>Max People: {item.maxPeople}</Max>
              <Price>{item.price}</Price>
            </ItemInfo>
            <SelectedRoom>
              {item.roomNumbers.map((roomNumber) => (
                <Room key={roomNumber._id}>
                  <label value="">{roomNumber.number}</label>
                  <Input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  ></Input>
                </Room>
              ))}
            </SelectedRoom>
          </Item>
        ))}
        <Button onClick={handleClick}>Reserve Now!</Button>
      </Container>
    </Res>
  );
}

export default Reserve;
