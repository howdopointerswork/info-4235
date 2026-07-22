import NavBar from '../components/NavBar.jsx';
import Button from '../components/Button.jsx';
import Table from '../components/Table.jsx';

import "./Transactions.css";
import { rowCount } from "../components/Table.jsx";
import { useState, useEffect } from "react";

function Transactions(){

	const [cat, setCat] = useState("");
	const [type, setType] = useState("");
	const [amount, setAmount] = useState("");
	const [desc, setDesc] = useState("");
	const [active, setActive] = useState(false);
	const [text, setText] = useState("+ Add");
	const [transactions, setTransactions] = useState([]);
	const [id, setID] = useState(0);
	const [count, setCount] = useState(0);
	const [sortBy, setSortBy] = useState("amount");
	const [orderBy, setOrderBy] = useState("ascending");
	const [query, setQuery] = useState("");
	const [restore, setRestore] = useState([]);
	const [flag, setFlag] = useState(true);


	const headers = ["ID", "Date", "Category", "Type", "Notes", "Amount"];

	const user = localStorage.getItem("userName");
	const ID = localStorage.getItem("ID");
	let copyTransactions = [...transactions];


	

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


		
			
	

		for(const transaction of restore){
			if(transaction.category.includes(query) || 
				transaction.type.includes(query) || 
				transaction.amount.toString().includes(query) ||
				transaction.description.includes(query) ||
				transaction.id.toString().includes(query) ||
				transaction.date.toString().includes(query)){
			
				copyTransactions.push(transaction);	
			}else{
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

			if(sortBy == "date" && orderBy == "ascending"){
				
				copyTransactions = [...transactions].sort((a,b) => a.date.toString().localeCompare(b.date.toString()));
				console.log("working...");
				setTransactions(copyTransactions);

			}else if(sortBy == "date" && orderBy == "descending"){
				console.log("also working...");
				copyTransactions = [...transactions].sort((a,b) => b.date.toString().localeCompare(a.date.toString()));
				setTransactions(copyTransactions);
			}
		}
	}


	async function addTransaction(e){
		
		e.preventDefault();
			
		console.log("adding...");

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

		setRestore(prev => [...prev, res]);
			
		

	}



	

	
		
	console.log("Size here: " + transactions.length);
	rowCount().then(newCount => {
		setCount(newCount);	
	});
	console.log("Row count: " + count);

	if(transactions.length > 0 && count > 0 && flag){

			if(transactions.length == count){
			setRestore(transactions);
			setFlag(false);
		}
	}


	return (

		<body>
		
		<div id="transactionsButtons">
			<NavBar />
		
		

			<input id="import" type="file" name="import" id="import"/>

			<div>
				
			<button id="new" onClick={() => {setActive(!active); active ? setText("+ Add") : setText("Cancel");}} 		
			>{ text }</button>					
		
			


			
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




		<form onSubmit={search}>
				<input id="search" type="text" placeholder="Search" onChange={(e) => setQuery(e.target.value)}/>		
			</form>

			<form onSubmit={sortArray}>
				<label htmlFor="sort">Sort By: </label>
		
				<select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
					<option value="amount">Amount</option>
					<option value="id">ID</option>
					<option value="category">Category</option>
					<option value="type">Type</option>
					<option value="date">Date</option>
				</select>

				<select id="order" value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
					<option value="ascending">Ascending</option>
					<option value="descending">Descending</option>

				</select>	
				<button type="submit">Filter</button>
					<button onClick={() => reset()}>Reset</button>
			</form>

			
		</div>


			<Table headers={headers} transactions={copyTransactions} setTransactions={setTransactions} restore={restore} setRestore={setRestore} id="transactionsTable"/>

		</div>

		</body>
	);
}

export default Transactions;
