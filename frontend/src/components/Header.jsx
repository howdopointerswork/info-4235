


function Header(){
	
	return (

		 <header className="head">
			<ul>
				<li className="signedIn">Signed in as: {localStorage.getItem("userName")}</li>
				<li className="logo"><img width={50} height={50} src="dummy.png" alt="Logo"/></li>
				<li className="profile"><a href="">{localStorage.getItem("userName")}</a></li>
			
			</ul>
			
	

		</header>

	);
	

}

export default Header;
