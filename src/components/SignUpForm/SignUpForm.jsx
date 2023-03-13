import { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";


function SignUpForm() {

    const [pledge, setPledge] = useState({
            amount: null,
            comment: "",
            anonymous: false,
            project: null,
        });

    //Hooks 
    const navigate = useNavigate();
    
   
    const handleChange = (event) => {
        const { id, value} = event.target;

    };

    const postData = async () => {

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}pledges/`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                
            }
        );
        return response.json();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

            try {
                if (pledge.amount) {
                    postData().then((response) =>{
                        console.log(response);
                        // location.reload();
                    });                    
                } else {
                    return (alert("Please enter an amount, thank you!"));
                }
            } catch (err) {
                console.error(err);
                alert(`Error: ${err.message}`);
            };
            
    };

    return (
        <>
        <div className="wrapper">
          <div className="grids top">
            <div className="grid-6 grid">
              <h2>Member Sign Up</h2>
              <form onSubmit={handleSubmit} className="form">
                <div className="label">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text" id="username" className="textfield"
                    onChange={handleChange}/>
                </div>
                <div className="label">
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    type="text" id="firstname" className="textfield"
                    onChange={handleChange}/>
                </div>
                <div className="label">    
                <label htmlFor="password">Password:</label>
                  <input
                    type="password" id="password" placeholder="Password" className="textfield" 
                    onChange={handleChange}/>
                </div>
                <div className="login">
                  <button type="submit">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        </>
      );

}

export default SignUpForm;