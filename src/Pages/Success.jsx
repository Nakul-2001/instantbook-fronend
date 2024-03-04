import {Link} from 'react-router-dom'
import {styled} from 'styled-components'

const Button = styled.button`
  padding: 10; 
  margin-top: 20;
  a{
    text-decoration:none;
    color:black;
  }
`
const Success = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      
         Hotel has been booked successfully.
      <Button style={{ padding: 10, marginTop: 20}}><Link to='/'>Go to Homepage</Link></Button>
    </div>
  );
};

export default Success;