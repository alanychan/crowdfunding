import { Link } from "react-router-dom";
import "./Nav.css";

function Nav(props) {
    const { loggedIn, setLoggedIn } = props;

    const handleClick = () => {
        window.localStorage.removeItem("token");
        setLoggedIn(false);
    };

    return (
        <nav className="nav">
            <Link to="/">Home</Link>
        {!loggedIn && <Link to="/login">Login</Link>}          
        {loggedIn && <Link onClick={handleClick}>Sign Out</Link>}
            <Link to="/admin">Admin</Link>            
            {/* <Link to="/project">Project</Link> */}
        </nav>
    );
}

export default Nav;