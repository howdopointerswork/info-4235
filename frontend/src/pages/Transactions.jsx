import NavBar from '../components/NavBar.jsx';
import Button from '../components/Button.jsx';

import "./Transactions.css";

import { useState } from "react";

function Transactions(){

	const [cat, setCat] = useState("");
	const [type, setType] = useState("");
	const [amount, setAmount] = useState("");
	const [desc, setDesc] = useState("");
	const [active, setActive] = useState(false);
	const [text, setText] = useState("New Transaction");
	


	async function addTransaction(e){
		
		e.preventDefault();
		console.log("hi");
		

		const resp = await fetch(
			"http://localhost:3000/transaction",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					amount: amount,
					category: cat,
					type: type,
					description: desc
					

				}),
					
				
			
			});

		const res = await resp.json();


		if(res.success){

			console.log("Added successfully!");
		}else{
			console.log("Add failed");
		}

	}


	return (
		
		<div>
			<h1>Transactions</h1>
			<NavBar />

			
				
			<button onClick={() => {setActive(!active); active ? setText("New Transaction") : setText("Cancel");}}
			>{ text }</button>

			<input type="file" name="import" id="import"/>
					
				
			
			<form onSubmit={addTransaction}>
			<ul id="addTransaction" style={{display: active ? "block" : "none"}}>
				<li>
					
					<input type="number" name="amount" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
				</li>

				<li>
					<select value={cat}
					onChange={(e) => setCat(e.target.value)}>
						<option value="housing">Housing</option>

						<option value="food">Food</option>
						<option value="transportation">Transportation</option>

						<option value="health">Health</option>

						<option value="shopping">Shopping</option>

						<option value="entertainment">Entertainment</option>

						<option value="education">Education</option>

						<option value="finance">Finance</option>

						<option value="personal">Personal</option>

						<option value="travel">Travel</option>

						<option value="Misc">Misc</option>
					</select>
				</li>

				<li>
					<select value={type} onChange={(e) => setType(e.target.value)}>  	
						<option value="income">Income</option>
						<option value="expense">Expense</option>

					</select>
				</li>

				<li>
					<textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Enter Description"/>
				</li>

				<li>
					<button type="submit">Add Transaction</button>
				</li>

			</ul>

			</form>

		</div>
	);
}

export default Transactions;
