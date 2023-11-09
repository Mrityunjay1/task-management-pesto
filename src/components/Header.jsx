import { NavLink } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

// eslint-disable-next-line react/prop-types
function Header({ pageTitle }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      signOut(auth)
        .then(() => {
          dispatch(setUser(null));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <h1>{pageTitle}</h1>

      <div className="header-btns">
        <NavLink to="/">
          <button className="btn">Tasks</button>
        </NavLink>

        <button className="btn transparent" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default Header;
