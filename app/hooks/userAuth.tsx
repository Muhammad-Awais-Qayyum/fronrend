import { useSelector } from "react-redux";

export default function UserAuth() {
  // check user is logged in y not
  const { user } = useSelector((state: any) => state.auth);

  if (user) {
    return true;
  } else {
    return false;
  }
}
