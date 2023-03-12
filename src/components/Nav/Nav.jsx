import { Link } from "react-router-dom";
import "./Nav.css";

function Nav(props) {
    const { loggedIn, setLoggedIn } = props;

    const handleClick = () => {
        window.localStorage.removeItem("token");
        setLoggedIn(false);
    };

    return (
        <div className="wrapper">
            <nav id="nav" className="main">
                <ul>
                    <li><Link to="/" className="active">Home</Link></li>
                    {!loggedIn && <li><Link to="/login">Login</Link></li>}
                    {loggedIn && <li><Link onClick={handleClick}>Sign Out</Link></li>}
                    <li><Link to="/admin">Admin Access (Not Active Yet) </Link></li>
                    {/* <Link to="/project">Project</Link> */}
                </ul>
            </nav>
        </div>
    );
}

export default Nav;