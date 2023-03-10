// import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

function PledgeForm(props) {

    //Actions
    const { id }  = useParams(); 

    //State
    const { project } = props;

    const authToken = window.localStorage.getItem("token");
    
    const [loggedIn] = useOutletContext();

    const [pledge, setPledge] = useState({
            amount: null,
            comment: "",
            anonymous: false,
            project: id,
        });

    //Hooks 
    const navigate = useNavigate();
    
   
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
                        // location.reload();
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
            navigate(`/login`);
            // return (
            //     <Link to="/login">Please log in to pledge</Link>
            // );
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
                <button type="submit">Submit Pledge</button>
            </div>
        </form>
    );
  };
  
  export default PledgeForm;