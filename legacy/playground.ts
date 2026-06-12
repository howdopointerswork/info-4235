var script = document.createElement('script');

script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
script.type = "text/javascript";

async function getUser(username: string){
	const resp = await fetch(`http://localhost:3000/User/username/${username}`);
	const user = await resp.json();

	if(user == null){
		alert("user not found");
		return null;
	}else{

		alert("user found");
		return user;
	}

	
}


async function addUser(username: string, password: string){

	const user = {

		username: username,
		password: password
	}


	try{

		const res = await fetch('http://localhost:3000/User', {

			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});

		const data = await res.json();
	}catch(e){

		console.error("Error: ", e);
	}
}




script.onload = function(){


	$(document).ready(function(){


		


		$('#login').click(async function(){

			const check_user = ($('#username').val() != '' && $('#username').val() != undefined);
			const check_pw = ($('#password').val() != '' && $('#password').val() != undefined);

			if(check_user && check_pw){
				alert("Good!");
				
				const username = $('#username').val() as string;
				const password = $('#password').val() as string;

				console.log("Username: " + username);
				console.log(typeof username);

				const findUser = await getUser(username);

				if(findUser == null){
					console.log('Signing up...');
					await addUser(username, password);

				}else{
					console.log('Logging in...');
					//match password
					if(findUser.password == password){
						console.log("log in successful!");
					}else{
						console.log("invalid credentials");
					}
				}


			
				

			}else{
				alert("Bad!");
			}
			
		});
	});
}



document.head.appendChild(script);
