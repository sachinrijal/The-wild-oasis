import styled from "styled-components";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";


const Div = styled.div`
  display: flex;
  flex-direction : column;
  gap : 3rem
  
`;


function Settings() {
  return (
    <Row>
      <Div>
        <Heading as="h1">Update hotel settings</Heading>
        <UpdateSettingsForm />
      </Div>
    </Row>
  );
}

export default Settings;
