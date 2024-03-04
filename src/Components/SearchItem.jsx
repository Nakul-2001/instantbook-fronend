import { Link } from 'react-router-dom'
import {styled} from 'styled-components'

const Container = styled.div`
  margin:10px;
  border-radius:5px;
  padding:5px;
  display: flex;
  gap:10px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
`

const Image = styled.img`
  flex:1;
  width:200px;
`

const Details = styled.div`
  flex:3;
`

const Heading = styled.div`
  margin:5px;
  display:flex;
  justify-content:space-between;
`

const Title = styled.div`
  color: #2e6cc4;
  font-size:25px;
  font-weight:800;
`
const Grade = styled.div`
  font-weight:600;
  padding-top:5px;
`
const Rating = styled.div`
  background-color: #000076;
  padding:2px;
  margin:2px;
  color:white;
  border-radius:2px;
`

const Distance = styled.div`
  font-size:15px;
  padding:2px;
  margin:5px;
`

const Offer1 = styled.div`
  margin:5px;
  background-color: green;
  color:white;
  padding:2px;
  color:white;
  border-radius:2px;
  width:fit-content;

`

const Feature = styled.div`
  padding:2px;
  font-weight:600;
  margin:5px;
`

const Cont1 = styled.div`
  margin:5px;
  display: flex;
  justify-content:space-between;
`

const Size = styled.div`
  padding:5px 2px 2px 2px;
`

const Price = styled.div`
  font-size:25px;
`

const FreeCancellation = styled.div`
  display: flex;
  margin: 5px;
  justify-content:space-between;
`

const Cancel = styled.div`
  color: #097003;
  font-weight:600;
`

const Taxes = styled.div`
  color:grey;
  font-size:15px;
`

const Cont2 = styled.div`
  display: flex;
  justify-content:space-between;
`

const Offer2 = styled.div`
  padding:10px 2px 2px 2px;
  color: #11a011;
`

const Button = styled.button`
  cursor:pointer;
  background-color: #2e6cc4;
  border:none;
  padding:10px;
  font-size:20px;
  border-radius:5px;
  color:white;
  font-weight:600;
`


function SearchItem({item}) {
  return (
    <Container>
      <Image src={item.photos[0]}></Image>
      <Details>
        <Heading>
          <Title>{item.name}</Title>
          <Grade>Excellent</Grade>
          <Rating>8.9</Rating>
        </Heading>
        <Distance>{item.distance}m from center</Distance>
        <Offer1>Free Airport Taxi</Offer1>
        <Feature>Studio Apartment with Air conditioning</Feature>
        <Cont1>
          <Size>{item.desc}</Size>
          <Price>${item.cheapestPrice}</Price>
        </Cont1>
        <FreeCancellation>
        <Cancel>Free Cancellation</Cancel>
        <Taxes>include taxes and fees</Taxes>
        </FreeCancellation>
        <Cont2>
        <Offer2>You can cancel later, so lock in this great price today!</Offer2>
        <Link to={`/hotel/${item._id}`}>
        <Button>See Availability</Button>
        </Link>
        </Cont2>
      </Details>
    </Container>
  )
}

export default SearchItem
