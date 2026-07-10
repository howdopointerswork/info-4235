import NavBar from '../components/NavBar.jsx';
import Button from '../components/Button.jsx';
import Table from '../components/Table.jsx';

import "./Transactions.css";

import { useState, useEffect } from "react";

function Transactions(){

	const [cat, setCat] = useState("");
	const [type, setType] = useState("");
	const [amount, setAmount] = useState("");
	const [desc, setDesc] = useState("");
	const [active, setActive] = useState(false);
	const [text, setText] = useState("New Transaction");
	const [transactions, setTransactions] = useState([]);
	const [id, setID] = useState(0);
	const [count, setCount] = useState(0);
	const [sortBy, setSortBy] = useState("amount");
	const [orderBy, setOrderBy] = useState("ascending");
	const [query, setQuery] = useState("");


	const headers = ["ID", "Category", "Type", "Description", "Amount"];

	const user = localStorage.getItem("userName");
	const ID = localStorage.getItem("ID");
	let copyTransactions = [...transactions];
	let returnTransactions = [];
	

	async function getUser(username){

		console.log('fetching...');	
		const resp = await fetch(
			`http://localhost:3000/User/${username}`
		);

		

		const res = await resp.json();

				
	
		console.log("ID INSIDE IS: " + res.id);
		setID(res.id);

	}


async function reset(){
	const res = await fetch(`http://localhost:3000/transaction/${ID}`);
	const data = await res.json();

	setTransactions(data);
}





useEffect(() => {
	async function fetchData() {
	
	
		getUser(user);	
		setID(Number(localStorage.getItem("ID")));
		
	
	
		
		const res = await fetch(`http://localhost:3000/transaction/${ID}`);
		const data = await res.json();

		setTransactions(data);
	
	
		}

	fetchData();

}, []);


	async function search(e){
		
		e.preventDefault();

		console.log("Searching...");
		
	

	
			
		copyTransactions = [];
		
		returnTransactions = [];


		

		for(const transaction of [...transactions]){
			if(transaction.category.includes(query) || 
				transaction.type.includes(query) || 
				transaction.amount.toString().includes(query) ||
				transaction.description.includes(query) ||
				transaction.id.toString().includes(query)){
			
				copyTransactions.push(transaction);	
			}else{
				returnTransactions.push(transaction);
				console.log("oops!");
			}
		}

		setTransactions(copyTransactions);

		if(query == ""){
			reset();
		}	
	}
		
	async function sortArray(e){
		e.preventDefault();
	
		if(sortBy != ""){
			if(sortBy == "amount" && orderBy == "ascending"){
			
				copyTransactions = [...transactions].sort((a,b) => a.amount - b.amount);
				setTransactions(copyTransactions);
				
			
			}else if(sortBy == "amount" && orderBy == "descending"){
				
				copyTransactions = [...transactions].sort((a,b) => b.amount - a.amount);
				setTransactions(copyTransactions);
		
			}

			if(sortBy == "id" && orderBy == "ascending"){
				
				copyTransactions = [...transactions].sort((a,b) => a.id - b.id);
				setTransactions(copyTransactions);
		

			}else if(sortBy == "id" && orderBy == "descending"){

				copyTransactions = [...transactions].sort((a,b) => b.id - a.id);
				setTransactions(copyTransactions);

			}
			
		

			if(sortBy == "category"){
			
				copyTransactions = [...transactions].sort((a,b) => a.category.localeCompare(b.category));			
				setTransactions(copyTransactions);
				
			}

			if(sortBy == "type"){
			
				copyTransactions = [...transactions].sort((a,b) => a.type.localeCompare(b.type));
				setTransactions(copyTransactions);
			}
		}
	}


	async function addTransaction(e){
		
		e.preventDefault();
		
	
		const resp = await fetch(
			"http://localhost:3000/transaction",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					amount: Number(amount),
					category: cat,
					type: type,
					description: desc
					

				}),
					
				
			
			});

		const res = await resp.json();

		setTransactions(prev => [
		...prev, res
		]);
			
		

	}


	


	
	


	return (
		
		<div>
			<h1>Transactions</h1>
			<NavBar />

			
				
			<button onClick={() => {setActive(!active); active ? setText("New Transaction") : setText("Cancel");}}
			>{ text }</button>



			<input type="file" name="import" id="import"/>
					
			<p>Total: { transactions.length }</p>



			<form onSubmit={search}>
				<input type="text" placeholder="Search" onChange={(e) => setQuery(e.target.value)}/>		
			</form>

			<form onSubmit={sortArray}>
				<label htmlFor="sort">Sort By: </label>
		
				<select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
					<option value="amount">Amount</option>
					<option value="id">ID</option>
					<option value="category">Category</option>
					<option value="type">Type</option>
				</select>

				<select id="order" value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
					<option value="ascending">Ascending</option>
					<option value="descending">Descending</option>

				</select>	


				<button type="submit">Filter</button>

			</form>



				<button onClick={() => reset()}>Reset</button>



			
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

						<option value="misc">Misc</option>
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


			<Table headers={headers} transactions={copyTransactions} setTransactions={setTransactions} id="transactionsTable"/>

		</div>
	);
}

export default Transactions;
