import FullPageLoader from "../components/FullPageLoader.jsx";
import { useState } from "react";
import { auth, db } from "../firebase/config.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice.js";
// import { ref, set } from "firebase/database";
import { addDoc, collection } from "firebase/firestore";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState("login");
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({ id: user.uid, email: user.email }));
      // ...
    } else {
      dispatch(setUser(null));
    }
    if (isLoading) {
      setIsLoading(false);
    }
  });

  const handleChange = (e) => {
    setError(null);
    e.preventDefault();
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  async function handleSignup(e) {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userCredentials.email,
        userCredentials.password
      );
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    ).catch((error) => {
      setError(error.message);
    });
  }

  function handlePasswordReset() {
    const email = prompt("Enter your email");
    sendPasswordResetEmail(auth, email);
    alert("Password reset email sent");
  }

  return (
    <>
      {isLoading && <FullPageLoader></FullPageLoader>}

      <div className="container login-page">
        <section>
          <h1>Welcome to the Task Management App</h1>
          <p>Login or create an account to continue</p>
          <div className="login-type">
            <button
              className={`btn ${loginType == "login" ? "selected" : ""}`}
              onClick={() => setLoginType("login")}
            >
              Login
            </button>
            <button
              className={`btn ${loginType == "signup" ? "selected" : ""}`}
              onClick={() => setLoginType("signup")}
            >
              Signup
            </button>
          </div>
          <form className="add-form login">
            <div className="form-control">
              <label>Email *</label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>
            {loginType == "login" ? (
              <button
                className="active btn btn-block"
                onClick={(e) => handleLogin(e)}
              >
                Login
              </button>
            ) : (
              <button
                className="active btn btn-block"
                onClick={(e) => handleSignup(e)}
              >
                Sign Up
              </button>
            )}
            {error && <p className="error">{error}</p>}
            <p className="forgot-password" onClick={handlePasswordReset}>
              Forgot Password?
            </p>
          </form>
        </section>
      </div>
    </>
  );
}

export default LoginPage;
