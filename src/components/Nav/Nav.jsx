import { Link } from "react-router-dom";
import "./Nav.css";

function Nav(props) {
    const { loggedIn, setLoggedIn, myLogo } = props;

    const handleClick = () => {
        window.localStorage.removeItem("token");
        setLoggedIn(false);
    };

    return (
        <>
        <header>
            <div>
            <nav className="navbar">
            <img src={myLogo} id="logo"/>
                <ul className="navbar-nav">
                    <li className="nav-item"><Link to="/" className="active">Home</Link></li>
                    {!loggedIn && <li className="nav-item"><Link to="/login">Login</Link></li>}                        
                    {!loggedIn && <li className="nav-item"><Link to="/SignUp">Sign Up</Link></li>}
                    {loggedIn && <li className="nav-item"><Link onClick={handleClick}>Sign Out</Link></li>}
                    {/* <li className="nav-item"><Link to="/admin">Admin Access (Not Active Yet) </Link></li> */}
                    {/* <Link to="/project">Project</Link> */}
                    </ul>
            </nav>
            </div>
            <div><Link className="repo" to={"https://github.com/alanychan/crowdfunding"} target={"_blank"}>Link to repo</Link></div>
        </header>
        </>
    );
}

export default Nav;