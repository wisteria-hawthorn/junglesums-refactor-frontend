import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../components/Login/LoginButton";
import LogoutButton from "../../components/Login/LogoutButton";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
//eslint-disable-next-line
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    navigate("/login");
  } else {
    return (
      <>
        <div className="background-image"></div>
        <div className="landing-page">
          <h1 className="app-heading">Welcome to Jungle Sums</h1>
          <section className="button-container">
            <LoginButton />
            <LogoutButton />
          </section>
          {/* CURRENTLY COMMENTED OUT UNTIL SIGNUP FUNCTIONALITY IMPLEMENTED
           <nav>
            <Link to="/Signup">Sign Up</Link>
          </nav> */}
         
          {/* <Link to="/login">
          <button>Log On</button>
          </Link> */}
        </div>
      </>
    );
  }
}
