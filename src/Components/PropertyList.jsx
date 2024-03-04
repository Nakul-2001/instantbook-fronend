import { styled } from "styled-components";
import useFetch from "../Hooks/useFetch";

const Container = styled.div`
  margin-top: 10px;
`;

const Heading = styled.div`
  margin: 30px;
  font-size: 30px;
  font-weight: bolder;
`;

const Items = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Item = styled.div`
  width: 18%;
  height: 200px;
`;

const Image = styled.img`
  width: 100%;
  height: 75%;
  border-radius: 10px;
`;

const Title = styled.div`
  font-weight: bolder;
  font-size: 25px;
`;

const Desc = styled.div`
  font-size: 15px;
`;

function PropertyList() {

  const { data, loading, error } = useFetch(
    "https://bookifypro.onrender.com/api/hotel/countByType"
  );

  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ];
  
  return (
    <Container>
      <Heading>Browse by property type</Heading>
      {loading ? "Loading Please Wait" : <>
          <Items>
            {images.map((img,i) => (
                <Item key={i}>
                <Image src={img}></Image>
                <Title>{data[i].type}</Title>
                <Desc>
                  {data[i].count} {data[i].type}
                </Desc>
              </Item>
            ))}
          </Items>
        </>
      }
    </Container>
  );
}

export default PropertyList;
