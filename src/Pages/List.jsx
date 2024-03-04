import { useState } from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import SearchItem from "../Components/SearchItem";
import styled from "styled-components";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useLocation } from "react-router-dom";
import useFetch from "../Hooks/useFetch";

const Container = styled.div`
  display: flex;
`;

const Left = styled.div`
  padding: 10px;
  width: 25%;
`;

const Right = styled.div`
  display: flex;
  width: 75%;
  flex-direction: column;
`;

const Searchcontainer = styled.div`
  background-color: #dfab02;
  width: 100%;
  border-radius: 10px;
`;

const Heading = styled.div`
  font-size: 25px;
  font-weight: 900;
  padding: 5px;
  text-align: center;
`;

const Label = styled.div`
  padding: 5px 10px 0px 5px;
  font-weight: 600;
`;

const Input = styled.input`
  margin-left: 5px;
  font-size: 15px;
  padding: 5px;
  outline: none;
  width: 90%;
`;

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 20px 5px 5px;
`;

const Button = styled.button`
  margin: 10px 20px 10px 30px;
  width: 80%;
  background-color: #2e6cc4;
  border: none;
  height: 30px;
  border-radius: 2px;
  cursor:pointer;
`;

const Field = styled.input`
  width: 50px;
  outline: none;
`;

const Text = styled.input`
  margin-left: 5px;
  font-size: 15px;
  padding: 5px;
  outline: none;
  position: relative;
  width: 90%;
`;

const DateCont = styled.div`
  position: absolute;
  top: 310px;
`;

function List() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);

  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  var startDate = new Date(date[0].startDate);
  var endDate = new Date(date[0].endDate);

  //Function to convert startDate and endDate to dersire format.
  var dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const {data,loading,reFetch} = useFetch(`https://bookifypro.onrender.com/api/hotel?city=${destination}&min=${min || 0}&max=${max || 999}`);

  const handleClick = (e) => {
    e.preventDefault();
    reFetch();
  }

  return (
    <div>
      <Navbar />
      <Header inList={true} />

      <Container>
        <Left>
          <Searchcontainer>
            <Heading>Search</Heading>
            <Label>Destination</Label>
            <Input placeholder={destination} onChange={(e)=>setDestination(e.target.value)}></Input>
            <Label>Check-in date</Label>
            <Text
              placeholder={`${dateFormatter.format(
                startDate
              )} to ${dateFormatter.format(endDate)}`}
              onClick={() => setOpenDate(!openDate)}
            ></Text>
            <DateCont>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    setDate([item.selection]);
                    setOpenDate(false);
                  }}
                  moveRangeOnFirstSelection={false}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </DateCont>
            <Label>Options</Label>
            <Option>
              <Label>
                Min price <small>(per night)</small>
              </Label>
              <Field type="number" onChange={(e)=>setMin(e.target.value)}></Field>
            </Option>
            <Option>
              <Label>
                Max price <small>(per night)</small>
              </Label>
              <Field type="number" onChange={(e)=>setMax(e.target.value)}></Field>
            </Option>
            <Option>
              <Label>Adult</Label>
              <Field type="number" min={1} placeholder={options.Adult}></Field>
            </Option>
            <Option>
              <Label>Children</Label>
              <Field
                type="number"
                min={0}
                placeholder={options.Children}
              ></Field>
            </Option>
            <Option>
              <Label>Room</Label>
              <Field type="number" min={0} placeholder={options.Room}></Field>
            </Option>
            <Button onClick={handleClick}>Search</Button>
          </Searchcontainer>
        </Left>
        <Right>
          {
            data.map((item,i)=>(
              <SearchItem item={item} key={i}/>
            ))
          }
        </Right>
      </Container>
    </div>
  );
}

export default List;
