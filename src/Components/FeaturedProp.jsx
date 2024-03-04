import {styled} from 'styled-components'
import useFetch from '../Hooks/useFetch'

const Container = styled.div`
  margin-top:10px;
`

const Heading = styled.div`
  margin:30px;
  font-size:30px;
  font-weight:bolder;
`

const Items = styled.div`
  display: flex;
  justify-content: space-around;
`

const Item = styled.div`
  width:18%;
`

const Image = styled.img`
  width:100%;
  height:70%;
  border-radius:10px;
`

const Title = styled.div`
  font-weight:bolder;
  font-size:20px;
  margin: 2px;
`

const Price = styled.div`
  font-size:15px;
  margin: 2px;
`

const Rating = styled.div`
  display:flex;
  margin: 2px;
`

const Button = styled.button`
`

const Grade = styled.div`
  padding-top:2px;
  padding-left:1px;
`

function FeaturedProp() {

  const {data,loading,error} = useFetch("https://bookifypro.onrender.com/api/hotel?featured=true");

  return (
    <Container>
      <Heading>Homes guests love</Heading>
      {loading ? "loading" : <><Items>
        {data.map(((item,i) => (
          <Item key={i}>
            <Image src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="></Image>
            <Title>{item.name}<br/>{item.city}</Title>
            <Price>Starting from ${item.cheapestPrice}</Price>
            <Rating>
              <Button>8.9</Button>
              <Grade>Excellent</Grade>
            </Rating>
          </Item>
        )))}
        </Items></>
      }
    </Container>
  )
}

export default FeaturedProp
