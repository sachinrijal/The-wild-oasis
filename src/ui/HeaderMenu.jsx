import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StyledHeader = styled.ul`
  display: flex;
  gap: 0.8rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <User />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeader>
  );
}

export default HeaderMenu;
