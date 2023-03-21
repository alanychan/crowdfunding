// import { Link } from 'react-router-dom';
import { useState, useContext, createContext } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import "./PledgeForm.css";

function PledgeForm(props, getState) {

    //Actions
    const { id }  = useParams(); 

    //State
    const { project } = props;

    const authToken = window.localStorage.getItem("token");
    
    const [loggedIn] = useOutletContext();

    const [pledge, setPledge] = useState({
            amount: null,
            comment: " ",
            anonymous: false,
            project: id,
        });

    const [hasError, setHasError] = useState(false);

    // const { State } = getState;

    //Hooks 
    const navigate = useNavigate();

    // const navigateToSignUp = () => {
    //     // 👇️ navigate to /signUp
    //     navigate('/signup');
    //   };
  
    // const navigateToLogin = () => {
    // // 👇️ navigate to /login
    // navigate('/login');
    // };
  

    const handleChange = (event) => {
        const { id, value} = event.target;
        
        setPledge((prevPledge) => ({
            ...prevPledge,
            [id]: value,
        }));
    };

    const postData = async () => {

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}pledges/`,
            {
                method: "post",
                headers: {
                    "Authorization": `Token ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({project, ...pledge}),
            }
        );
        return response.json();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (loggedIn) {
            try {
                if (pledge.amount) {
                    postData().then((response) =>{
                        console.log(response);
                        // navigate("/");
                        window.location.reload();
                       
                    });                    
                } else {
                    return (alert("Please enter an amount, thank you!"));
                }
            } catch (err) {
                console.error(err);
                alert(`Error: ${err.message}`);
            };
            
        } else {
            // redirect to login page
            //navigate(`/login`);
            // return (alert("Please log in to pledge"));
            return setHasError(true);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="label_pledge">
            <label htmlFor="amount">Amount</label>
            <input
                type="number" id="amount" placeholder="Enter amount"
                min="0" pattern="[0-9]*"
                onChange={handleChange}
            />
            </div>
            <div className="label_pledge">
            <label htmlFor="comment">Comment</label>
            <input
                type="text" id="comment" placeholder="Feel free to leave a comment..."
                onChange={handleChange}
            />
            </div>
            <div className="label_pledge">
                <label htmlFor="anonymous">Do you want to stay anonymous?:</label>
                <select
                type="select" id="anonymous"
                onChange={handleChange}>            
                    <option value="false">No, thanks</option>;
                    <option value="true">Yes, please</option>;
                </select>
            </div>
            <div className="login">
                <button type="submit">Pledge Now</button>
                {hasError  && <ErrorComponent></ErrorComponent>}
            </div>
        </form>
    );
  };
  
  function ErrorComponent() {
    const navigate = useNavigate();
    const navigateToSignUp = () => {
        // 👇️ navigate to /signUp
        navigate('/signup');
      };
  
    const navigateToLogin = () => {
    // 👇️ navigate to /login
    navigate('/login');
    };
  
    
    return <p className="error_message">Please <button id="sign-up" onClick={navigateToSignUp}>Sign Up</button> or <button id="sign-up" onClick={navigateToLogin}>Login</button> to pledge, thank you!</p>
  }

  export default PledgeForm;