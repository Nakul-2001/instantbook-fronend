import {styled} from 'styled-components';
import useFetch from '../Hooks/useFetch';

const Container = styled.div`
    margin-top: 40px;
    display:flex;
    justify-content:space-around;
    height:300px;
`

const Item = styled.div`
    border-radius:10px;
    width:30%;
    position:relative;
`

const Image = styled.img`
    width:100%;
    height:100%;
    object-fit:fill;
    border-radius:10px;
`

const Title = styled.h1`
    position:absolute;
    top:70%;
    color:white;
    margin: 10px;
    font-size: 40px;
`

const Desc = styled.h3`
    position:absolute;
    top:85%;
    color:white;
    margin: 10px;
    font-size: 20px;
`

function Featured () {

  const {data,loading,error} = useFetch("https://bookifypro.onrender.com/api/hotel/countByCity?cities=london,berlin,madrid");

  return (
    <Container>
      {loading ? "Loading, Please Wait" : <>
      <Item>
        <Image src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="></Image>
        <Title>London</Title>
        <Desc>{data[0]} Properties</Desc>
      </Item>
      <Item>
        <Image src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="></Image>
        <Title>Berlin</Title>
        <Desc>{data[1]} Properties</Desc>
      </Item>
      <Item>
        <Image src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="></Image>
        <Title>Madrid</Title>
        <Desc>{data[2]} Properties</Desc>
      </Item>
      </>}
    </Container>
  )
}

export default Featured
