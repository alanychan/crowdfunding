import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function LoginForm() {

    const [, setLoggedIn] = useOutletContext();

    //State
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        isSuperUser: "",
    });

    console.log(credentials);
    const [error, setError] = useState(null);

    //Hooks 
    const navigate = useNavigate();
    const navigateToSignUp = () => {
      // 👇️ navigate to /signUp
      navigate('/signup');
    };
  
    
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
        setError(null);

        if (credentials.username && credentials.password) {
            const { token } = await postData();
            if (!token){
                setError(true);
            }
            else {window.localStorage.setItem("token", token); // key + value
            setLoggedIn(true);
            navigate("/");}

        } else {
          setLoggedIn(false);
          setError(true)
        }
    };

    return (
      <>
          <div className="form-container">
            <h2>Member Login</h2>
            <form onSubmit={handleSubmit} className="form">
              <div className="label">
                <label htmlFor="username">Username</label>
                <input
                  type="text" id="username" placeholder="Enter username" className="textfield"
                  onChange={handleChange}/>
              </div>
              <div className="label">    
              <label htmlFor="password">Password</label>
                <input
                  type="password" id="password" placeholder="Password" className="textfield" 
                  onChange={handleChange}/>
              </div>
              <div className="login">
                {/* <input type="checkbox" name="remember" className="checkbox" />
                <span className="remember"> Remember Me</span> */}
                {/* <input type="submit" name="login" value="login"/> */}
                <button type="submit">Login</button>
                <button id="sign-up" onClick={navigateToSignUp}>Sign Up</button>
                
                {error  && <ErrorComponent></ErrorComponent>}
              </div>
            </form>
          </div>
      </>
    );
  }

  function ErrorComponent() {
    return <p className="error_message">Sorry, your account does not exist, please retry or sign up, thank you!</p>
  }

  export default LoginForm;