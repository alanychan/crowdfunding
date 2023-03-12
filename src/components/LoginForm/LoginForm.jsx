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
      <div id="content_center">
        <div class="section">
          <div> MEMBER LOGIN </div>
          <div class="section_1_mid">
            <div class="form">
              <form onSubmit={handleSubmit}>
                <div class="label">
                  <label htmlFor="username">Username:</label>
                  <label htmlFor="password">Password:</label>
                </div>
                <div class="textboxes">
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    onblur="clearText(this)"
                    onchange={handleChange}
                    onfocus="clearText(this)"
                    class="textfield" />
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onblur="clearText(this)"
                    onChange={handleChange}
                    onfocus="clearText(this)"
                    class="textfield" />
                </div>
                <div class="cleaner_with_height"></div>
                <div class="login_bottom">
                  <input type="checkbox" name="remember" class="checkbox" />
                  <span class="remember"> Remember Me</span>
                  <input type="submit" name="login" value="" class="button" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
  
  export default LoginForm;