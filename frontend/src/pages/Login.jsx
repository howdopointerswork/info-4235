import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login(){

	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	async function authUser(e) {

		e.preventDefault();
		
		const resp = await fetch(
			"http://localhost:3000/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					username,
					password
				})

			}

		);

		const res = await resp.json();

		if(res.success){
			console.log("YES");
			localStorage.setItem("userName", username);
			navigate("/home");
		}else{

			console.log("NO");
		}
	}



	async function getUser(username){

		const resp = await fetch(`http://localhost:3000/User/${username}`);

		const res = await resp.json();
		
	
		localStorage.setItem("ID", res.id);



	}
	
	if(username != ""){
	
		getUser(username);
		
	}


	return (

		<div>
			<h1>Log In</h1>

			<form onSubmit={authUser}>

			<input 
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				
			/>

			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button type="submit">Login</button>

			</form>



		</div>

	);

}

export default Login;
