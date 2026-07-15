import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar(){

	return (
		
		<nav className="navigation">
				
			<Link to="/home">Home</Link>
			<Link to="/transactions">Transactions</Link>
			<Link to="/budgeting">Budgeting</Link>
			<Link to="/investing">Investing</Link>
			<Link to="/">Page4</Link>
			
		</nav>

	);

}

export default NavBar;
