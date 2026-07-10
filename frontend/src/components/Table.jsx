import "./Table.css"; 

import { useState } from "react";
import React from "react";


function Table( { headers, transactions, setTransactions } ){
	
	const ID = Number(localStorage.getItem("ID"));

	const [editID, setEditID] = useState(0); 
	const [text, setText] = useState("Edit");

	const [newCategory, setNewCategory] = useState("");
	const [newType, setNewType] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [newAmount, setNewAmount] = useState(0);
	
	
	

	async function fetchData(){
		
		const res = await fetch(`http://localhost:3000/transaction/${ID}`);
		const data = await res.json();
		console.log("uh oh");
		setTransactions(transactions);
		
	

	}

	async function updateTransaction(tID){
		console.log("Update here");
		console.log("TID: " + tID);

		const resp = await fetch(`http://localhost:3000/transaction/${tID}`,
			{
				method: "PUT",
				headers: {
						"Content-Type": "application/json"
				},
				body: JSON.stringify({
					id: tID,
					amount: Number(newAmount),
					category: newCategory,
					type: newType,
					description: newDescription,
					userId: Number(localStorage.getItem("ID"))

				})


			
			});

		setEditID(0);
		fetchData();
	}
	
	
	async function deleteTransaction(tID){
	
		console.log("Deleting " + tID);
	

		const resp = await fetch(`http://localhost:3000/transaction/${tID}`,
			{
				method: "DELETE",

				headers: {
					"Content-Type": "application/json"
				},

				body: JSON.stringify({
					id: tID,
					userId: Number(localStorage.getItem("ID"))
				})
			}

		);

		fetchData();

			

	}

	


	for(const transaction of transactions){

		if(transaction.amount == ""){
			transaction.amount = 0;
		}

		if(transaction.type == ""){
			transaction.type = "income";
		}

		if(transaction.category == ""){

			transaction.category = "housing";

		}
	}



	return(
		<table className="tableStyle">
			<thead>
			<tr>
			{headers.map((header) => (
				
					<th key={header}>{header}</th>	
				
			))}
			</tr>
			</thead>

			<tbody>

			{transactions.map((transaction) => (
				<React.Fragment key={transaction.id}>	
				<tr>
					<td>{transaction.id}</td>
					<td>{transaction.category}</td>
					<td>{transaction.type}</td>
					<td>{transaction.description}</td>
					<td>{transaction.amount}</td>
					<td><button onClick={() => setEditID(transaction.id)}>Edit</button></td> 
					<td><button onClick={() => deleteTransaction(transaction.id)}>Delete</button></td>
				</tr>
				
				{editID == transaction.id && (
				<tr>


					<td></td>	
					<td><select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
										
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

						<option value="misc">Misc</option>
					</select>

					</td>



					<td>
						<select value={newType} onChange={(e) => setNewType(e.target.value) }>  	
						
							<option value="income">Income</option>
						
							<option value="expense">Expense</option>

						</select>

					</td>


					<td><textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
</td>

					<td>
						<input type="number" value={newAmount} onChange={(e) => setNewAmount(e.target.value)}/>	

					</td>
					
					<td>
						<button onClick={() => setEditID(0)}>Cancel</button>
					</td>
				

					<td>
						<button onClick={() => updateTransaction(transaction.id)}>Update</button>
					</td>
			
			


				</tr>

			)}

				
				</React.Fragment>
				
				
			))}

		
			</tbody>	

		</table>

	);
}

export default Table;
