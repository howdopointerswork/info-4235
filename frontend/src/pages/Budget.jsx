import NavBar from "../components/Navbar.jsx";

import { useState, useEffect } from "react";
import {LineChart, PieChart, Pie, Legend, Cell, Line, XAxis, YAxis, Tooltip} from "recharts";


function Budget(){

	const [transactions, setTransactions] = useState([]);
	const [target, setTarget] = useState(0);

	const ID = localStorage.getItem("ID");
	
	let revSum = 0;
	let expSum = 0;
	let diff = 0;
	let goal = 0;
	let values = [0,0,0,0,0,0,0,0,0,0,0];
	let percents = [];
	let categories = ["Housing", "Food", "Transportation", "Health", "Shopping", "Entertainment", "Education", "Finance", "Personal", "Travel", "Misc"];
	
	let data = [];

	const colors = ["#4287F5", "#16AB2A", "#CC5F10", "#CC2010", "#370A52", "#D9B60B", "#CB0BD9", "#0BD9B6", "#0B3001", "#300701", "#050130"]



useEffect(() => {
	async function getTransactions(){
		const res = await fetch(`http://localhost:3000/transaction/${ID}`);
		const data = await res.json();

		setTransactions(data);

		}
	getTransactions()
}, []);


useEffect(() => {	

	async function getTarget(){

		const resp = await fetch(`http://localhost:3000/target/${ID}`);
		const data = await resp.json();

		setTarget(data.target);
	}

	getTarget();

}, [localStorage.getItem("userName")]);


async function changeTarget() {
	const resp = await fetch(`http://localhost:3000/target/${ID}`,
		{
			method: "PUT",
			headers: {
					"Content-Type": "application/json"
			},
			body: JSON.stringify({
				target: target
			})
		}
	);

	const data = await resp.json();





}



	if(transactions.length > 0){
		for(const transaction of transactions){

			if(transaction.type == "income" || transaction.type == ""){

				revSum += transaction.amount;
			}else{
				expSum += transaction.amount;
			}
		}

		diff = revSum - expSum;

	}

	if(transactions.length > 0){
		for(const transaction of transactions){
			
			if(transaction.type == "expense"){
			switch(transaction.category.toLowerCase()){
			

			case "housing":
				values[0] += transaction.amount;
				break;
			case "food":
				values[1] += transaction.amount;
				break;
			case "transportation":
				values[2] += transaction.amount;
				break;
			case "health":
				values[3] += transaction.amount;
				break;
			case "shopping":
				values[4] += transaction.amount
				break;
			case "entertainment":
				values[5] += transaction.amount;
				break;
			case "education":
				values[6] += transaction.amount;
				break;
			case "finance":
				values[7] += transaction.amount;
				break;
			case "personal":
				values[8] += transaction.amount;
				break;
			case "travel":
				values[9] += transaction.amount;
				break;
			case "misc":
				values[10] += transaction.amount;
				break;

			default:
				values[10] += transaction.amount;
				break;

		}
		}
	}
}

	for(const value of values){

		percents.push((value/expSum).toFixed(2));


	}


	for(let i=0; i<values.length; i++){

		data.push( {name: categories[i], value: values[i], percent: percents[i] } );
	}



	


	return(

		<div>
			<NavBar />

				<h2>Overview</h2>
				<table style={{ margin: "0 auto", fontSize: "1.5em", borderSpacing: "20px" }}>
				
					<tbody>
						<tr>
							<td>Income</td>
							<td style={{ color: "green" }}>${revSum}</td>
						
						</tr>

						<tr>
							<td>Expenses</td>
							<td style={{ color: "red" }}>${expSum}</td>
						</tr>

						<tr>
							<td>Remaining</td>
							<td style={{ color:  revSum - expSum > 0 ? "green" : "red" }}>${revSum - expSum}</td>
						</tr>

						<tr>
							<td>Savings Rate</td>
							<td>{((revSum - expSum)/revSum).toFixed(2)}%</td>

						</tr>

					</tbody>

				</table>
				<div id="goal">
				<h2>Goal</h2>
				<p>{diff}/{target}</p>
				<progress value={diff} max={target}/>
				<form onSubmit={(e) => { e.preventDefault(); changeTarget(); }}>
				
				<input type="number" placeholder="New Target" onChange={(e) => setTarget(e.target.value)}/>
				
				<button type="submit">Update</button>
				
				</form>
		
				</div>

				<h2 style={{ marginTop: "2em" }}>Your Spending</h2>
			
				<PieChart style={{ float: "left"  }} width={600} height={600}>
				<Pie 
					data={data}
					dataKey="value"
					nameKey="name"
				>
				

				{data.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={colors[index]} />
				))}
				</Pie>
				<Tooltip labelStyle={{color: "black"}} contentStyle={{color: "black"}} itemStyle={{color: "black"}} />
				<Legend />
				</PieChart>
			
				
				
		
				<div className="breakdown" style={{float: "right" }}>
					<h2>Breakdown</h2>
					{data.map((entry) => (
						<p key={entry.name} style={{ padding: "1em"}}>{entry.name}: ${entry.value} ({entry.percent*100}%)</p>
					))}
			
				</div>



		
		</div>
	);

}

export default Budget;
