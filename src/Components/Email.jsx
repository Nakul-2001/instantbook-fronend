import {styled} from 'styled-components'

const Container = styled.div`
    margin-top:20px;
    border: 1px solid white;
    background-color: #003580;
`

const Title = styled.div`
    margin-top:40px;
    text-align:center;
    color:white;
    font-size:25px;
`

const Desc = styled.div`
    text-align: center;
    margin-bottom:5px;
    color:grey;
    font-size:15px;
`

const Data = styled.div`
    display: flex;
    height:50px;
`

const Input = styled.input`
    margin:10px 2px 10px auto;
    width:250px;
    outline:none;
    border:none;
    border-radius:5px;
`

const Button = styled.button`
    margin:10px auto 10px 2px;
    background-color: #0071c2;
    border:none;
    border-radius:5px;
    cursor:pointer;
    color:white;
`

const Box = styled.div`
    display: flex;
    margin-bottom:40px;
`

const CheckBox = styled.input`
    margin:0px 2px 10px auto;
`

const Label = styled.div`
    margin:0px auto 10px 2px;
    color:white;
`

function Email() {
  return (
    <Container>
      <Title>Save time, save money!</Title>
      <Desc>Sign up and we'll send the best deals to you</Desc>
      <Data>
        <Input placeholder='Your Email'></Input>
        <Button>SUBSCRIBE</Button>
      </Data>
      <Box>
        <CheckBox type='checkbox'></CheckBox>
        <Label>Send me a link to get the FREE booking.com app</Label>
      </Box>
    </Container>
  )
}

export default Email
