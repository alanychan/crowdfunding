import { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";


function SignUpForm() {

    const [users, setUsers] = useState({
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
            bio: null,
            location: null,
            photo_meme: null,
        });

    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    
    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }

    //Hooks 
    const navigate = useNavigate();
    const navigateToLogin = () => {
      // 👇️ navigate to /login
      navigate('/login');
    };
  
   
    const handleChange = (event) => {
      const { id, value} = event.target;

      setEmail(event.target.value);

      setUsers((prevUsers) => ({
          ...prevUsers,
          [id]: value,
      }));
  };

  const postData = async () => {

      const response = await fetch(
          `${import.meta.env.VITE_API_URL}users/`,
          {
              method: "post",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({users}),
          }
      );
      return response.json();
  };

  const handleSubmit = async (event) => {
      event.preventDefault();

      setError(null);
            
      try {
            
          if (isValidEmail(email)) {
            console.log('The email is valid');
          } else {
            setError('Email is invalid');
          };

        if (users.first_name && users.last_name && users.username && users.email && users.password) {
              postData().then((response) =>{
                  console.log(response);
                  // navigate("/");
                  window.location.reload();
                  
              });                    
          } else {
              setError("Please fill out all the fields marked with *, thank you!");
          }
      } catch (err) {
          console.error(err);
          alert(`Error: ${err.message}`);
      };
          
  };

    return (
        <>
        <div className="form-container">
              <h2>Member Sign Up</h2>
              <form onSubmit={handleSubmit} className="form">
              <div className="label">
                  <label htmlFor="firstname">First Name *</label>
                  <input
                    type="text" id="firstname" className="textfield"
                    onChange={handleChange}/>
                </div>
                <div className="label">
                  <label htmlFor="lastname">Last Name *</label>
                  <input
                    type="text" id="lastname" className="textfield"
                    onChange={handleChange}/>
                </div>
                <div className="label">
                  <label htmlFor="username">Username *</label>
                  <input
                    type="text" id="username" className="textfield"
                    onChange={handleChange}/>
                </div>
                <div className="label">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="text" id="email" className="textfield"
                    onChange={handleChange}/>
                </div>
                
                <div className="label">    
                <label htmlFor="password">Password *</label>
                  <input
                    type="password" id="password" placeholder="Password" className="textfield" 
                    onChange={handleChange}/>
                </div>
                <div className="login">
                  <button type="submit">Sign Up</button>
                  <button id="sign-up" onClick={navigateToLogin}>Login</button>
                  {error  && <ErrorComponent></ErrorComponent>}
                </div>
              </form>
            </div>
        </>
      );
}

function ErrorComponent() {
  return <p className="error_message">Please fill out all the fields marked with *, thank you!</p>
}

export default SignUpForm;