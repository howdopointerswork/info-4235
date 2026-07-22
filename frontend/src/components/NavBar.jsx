import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar(){

	return (
		
		<nav className="navigation">
				
			<Link to="/home">Home</Link>
			<Link to="/transactions">Transactions</Link>
			<Link to="/budgeting">Budgeting</Link>
			<Link to="/investing">Invest</Link>
		
			
		</nav>

	);

}

export default NavBar;
