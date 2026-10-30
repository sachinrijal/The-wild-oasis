import { LogOut } from "lucide-react";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";


function Logout() {
  const { Logout, isLoginOut } = useLogout();
  return (
    <ButtonIcon disabled={isLoginOut} onClick={Logout}>
      {isLoginOut ?
        <SpinnerMini />
      : <LogOut />}
    </ButtonIcon>
  );
}

export default Logout;
