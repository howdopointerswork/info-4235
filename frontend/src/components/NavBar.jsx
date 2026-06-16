import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar(){

	return (
		
		<nav className="navigation">
				
			<Link to="/home">Home</Link>
			<Link to="/">Page1</Link>
			<Link to="/">Page2</Link>
			<Link to="/">Page3</Link>
			<Link to="/">Page4</Link>
			
		</nav>

	);

}

export default NavBar;
