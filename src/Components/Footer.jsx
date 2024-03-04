import styled from 'styled-components' 

const Container = styled.div`
    width: 100%;
    font-size: 12px;
`

const Lists = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`

const List = styled.ul`
    list-style: none;
    padding: 0;
`

const ListItem = styled.li`
    margin-bottom: 10px;
    color: #003580;
    cursor: pointer;
`

const Text = styled.div`
    
`

function Footer(){
  return (
    <Container>
      <Lists>
        <List>
          <ListItem>Countries</ListItem>
          <ListItem>Regions</ListItem>
          <ListItem>Cities</ListItem>
          <ListItem>Districts</ListItem>
          <ListItem>Airports</ListItem>
          <ListItem>Hotels</ListItem>
        </List>
        <List>
          <ListItem>Homes </ListItem>
          <ListItem>Apartments </ListItem>
          <ListItem>Resorts </ListItem>
          <ListItem>Villas</ListItem>
          <ListItem>Hostels</ListItem>
          <ListItem>Guest houses</ListItem>
        </List>
        <List>
          <ListItem>Unique places to stay </ListItem>
          <ListItem>Reviews</ListItem>
          <ListItem>Unpacked: Travel articles </ListItem>
          <ListItem>Travel communities </ListItem>
          <ListItem>Seasonal and holiday deals </ListItem>
        </List>
        <List>
          <ListItem>Car rental </ListItem>
          <ListItem>Flight Finder</ListItem>
          <ListItem>Restaurant reservations </ListItem>
          <ListItem>Travel Agents </ListItem>
        </List>
        <List>
          <ListItem>Curtomer Service</ListItem>
          <ListItem>Partner Help</ListItem>
          <ListItem>Careers</ListItem>
          <ListItem>Sustainability</ListItem>
          <ListItem>Press center</ListItem>
          <ListItem>Safety Resource Center</ListItem>
          <ListItem>Investor relations</ListItem>
          <ListItem>Terms & conditions</ListItem>
        </List>
      </Lists>
      <Text>Copyright © 2022 Lamabooking.</Text>
    </Container>
  );
};

export default Footer;