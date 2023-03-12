import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./LoginForm.css";


function LoginForm() {

    const [, setLoggedIn] = useOutletContext();

    //State
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        isSuperUser: "",
    });

    console.log(credentials);

    //Hooks 
    const navigate = useNavigate();
    
    //Actions
    const handleChange = (event) => {
        const { id, value} = event.target;
        
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const postData = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}api-token-auth/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        return response.json();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            const { token } = await postData();
            window.localStorage.setItem("token", token); // key + value
            setLoggedIn(true);
            navigate("/");
        }
    };

    return (
      <>
      <div className="wrapper">
        <div className="grids top">
          <div className="grid-6 grid">
            <h2>Member Login</h2>
            <form onSubmit={handleSubmit} className="form">
              <div className="label">
                <label htmlFor="username">Username:</label>
                <input
                  type="text" id="username" placeholder="Enter username" className="textfield"
                  onChange={handleChange}/>
              </div>
              <div className="label">    
              <label htmlFor="password">Password:</label>
                <input
                  type="password" id="password" placeholder="Password" className="textfield" 
                  onChange={handleChange}/>
              </div>
              <div className="login">
                {/* <input type="checkbox" name="remember" className="checkbox" />
                <span className="remember"> Remember Me</span> */}
                <input type="submit" name="login" value="login"/>
                <a href="signUp">Sign Up</a>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>
    );
  }
  
  export default LoginForm;