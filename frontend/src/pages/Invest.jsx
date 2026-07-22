import NavBar from "../components/NavBar.jsx";
import Header from "../components/Header.jsx";

import { useState, useEffect, useRef } from "react";
import {LineChart, Line, XAxis, YAxis, Tooltip} from "recharts";
import "./Invest.css";
import { rowCount } from "../components/Table.jsx";

function Invest(){

	const [stock, setStock] = useState(null);
	const [symbol, setSymbol] = useState("");
	const [profile, setProfile] = useState(null);
	const [popular, setPopular] = useState([]);
	const [history, setHistory] = useState({});
	const [count, setCount] = useState(0);
	const [transactions, setTransactions] = useState([]);
	const [gains, setGains] = useState(true);
	const [revTotal, setRevTotal] = useState(0);
	const [expTotal, setExpTotal] = useState(0);
	const [searchSymbol, setSearchSymbol] = useState("AAPL");
	const [feed, setFeed] = useState([]);


	let rev = [];
	let exp = [];
	
	let revSum = 0;
	let expSum = 0;
	

	const ID = localStorage.getItem("ID");
	const btnRef = useRef();
	


useEffect(() => {
	async function fetchData(){
		const res = await fetch(`http://localhost:3000/transaction/${ID}`);
		const data = await res.json();

		setTransactions(data);

	}

	fetchData();

}, []);

//useEffect(() => {
	async function getHistory(){

		const resp = await fetch(`http://localhost:3000/stock/history/${symbol}`);

		const data = await resp.json();
		console.log("History data: ");
		console.log(data);
		
		setHistory(data);

	}
//	getHistory();
//		}, []);
	

	async function getFeed(){

		let url = "";

		switch(symbol.toUpperCase()){

			case "AAPL":
				console.log("Fetch apple");
				url = "https://feeds.finance.yahoo.com/rss/2.0/headline?s=AAPL&region=US&lang=en-US";
				break;
			case "TSLA":
				console.log("Fetch tesla");
				url = "https://feeds.finance.yahoo.com/rss/2.0/headline?s=TSLA&region=US&lang=en-US";
				break;
			case "MSFT":
				console.log("Fetch microsoft");
				url = "https://feeds.finance.yahoo.com/rss/2.0/headline?s=MSFT&region=US&lang=en-US";
				break;
			case "AMZN":
				console.log("Fetch amazon");
				url = "https://feeds.finance.yahoo.com/rss/2.0/headline?s=AMZN&region=US&lang=en-US";
				break;
			case "NVDA":
				console.log("Fetch nvidia");
				url = "https://feeds.finance.yahoo.com/rss/2.0/headline?s=NVDA&region=US&lang=en-US";
				break;
			case "GOOGL":
				console.log("Fetch google");
				url = "https://feeds.finance.yahoo.com/rss/2.0/headline?s=GOOGL&region=US&lang=en-US";
				break;
			default:
				console.log("No match");
				url = "";
				break;


		}

			if(url != ""){

				const resp = await fetch(`http://localhost:3000/rss?url=${url}`);

				const data = await resp.json();

				setFeed(data);

				console.log(data);


			}
		
	}





	useEffect(() => {
		async function loadPopular(){

			const resp = await fetch("http://localhost:3000/stocks/popular");

			const data = await resp.json();

			setPopular(data);
		}

		loadPopular();

	}, []);



	async function searchStock(){
		
		
		console.log("search symbol:",searchSymbol);
	
		console.log("symbol:",symbol);
	
		if(symbol != ""){
		const resp = await fetch(`http://localhost:3000/stock/${symbol}`);

		const data = await resp.json();

	//	console.log(data);

		setStock(data);

		const profileResp = await fetch(`http://localhost:3000/stock/profile/${symbol}`);

		const profileData = await profileResp.json();

		setProfile(profileData);
		}else{
			console.log("Empty");
		
		}
	}



	
	
	function conductSearch(){

		setSymbol(searchSymbol);


		if(symbol != ""){

			getHistory();
			searchStock();
		}
	}
	

	const chartData = history && history["Time Series (Daily)"] ? Object.entries(history["Time Series (Daily)"]).map(([date, values]) => ({
		date: date,
		price: Number(values["4. close"])
	})).reverse() : [];


	rowCount().then(newCount => {
		setCount(newCount);	
	});


	


	if(transactions.length == count && gains && count > 0){
		
		for(const transaction of transactions){

			if(transaction.type == "income" || transaction.type == ""){
				rev.push(transaction);	
			}else{
				exp.push(transaction);
			}
		}

		for(const revenue of rev){

			revSum = revSum + revenue.amount;	
		}

		for(const expense of exp){

			expSum = expSum + expense.amount;
		}
		console.log("Rev:",revSum);
		console.log("Exp:",expSum);
		setRevTotal(revSum);
		setExpTotal(expSum);

		setGains(false);

	}

	return(
		<div className="main">

			<Header />

			<NavBar />
		

			<div className="stats" style={{ margin: "5em" }}>
				<table style= {{ margin: "0 auto" }}>
					<thead>
						<tr> 
							<td style={{ padding: "2em" }}><h2>Total Transactions</h2></td>
							<td style={{ padding: "2em" }}><h2>Total Gain</h2></td>
							<td style={{ padding: "2em" }}><h2>Total Invested</h2></td>

						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{count}</td>
							<td style={{ color: revTotal-expTotal > 0 ? "green" : "red" }}>${revTotal-expTotal}</td>
							<td style={{ color: "green" }}>${revTotal}</td>
						</tr>
					</tbody>
				</table>
			</div>
		
			<div className="gridView">

			<div className="search">

			<input value={searchSymbol} onChange={(e) => setSearchSymbol(e.target.value)} placeholder="Find Stock" />
			<button ref={btnRef} onClick={() => {setSymbol(searchSymbol); conductSearch(); getFeed() }}>Search</button>
			
			{profile && (

				<div className="profile">
					<img src={profile.logo} alt={profile.name} width="80" />
					<h2>{profile.name}</h2>
					<p>{profile.exchange}</p>
					

				</div>

			)}

		


			{stock && (
				<div>
					<table style={{ margin: "0 auto", textAlign: "center"}}>
						<thead>
						<tr>
							<td><h2>{symbol.toUpperCase()}</h2></td>
						</tr>
						</thead>
						<tbody>
						<tr>	
							<td>Price: ${stock.c}</td>
						</tr>
						<tr>
							<td>Changes Today: {stock.d}%</td>
						</tr>
						<tr>
							<td>Percent Change: {stock.dp}%</td>
						</tr>
						<tr>
							<td>High: ${stock.h}</td>
						</tr>
						<tr>
							<td>Low: ${stock.l}</td>
						</tr>
						<tr>
							<td>Open: ${stock.o}</td>
						</tr>
						<tr>
							<td>Previous Close: ${stock.pc}</td>
						</tr>
						</tbody>
					</table>
				</div>
			)}
				</div>

				<div className="chart">
					
					<LineChart width={700} height={300} data={chartData}>
					<XAxis dataKey="date"/>
					<YAxis/>
					<Tooltip/>
					<Line type="monotone" dataKey="price" />
					</LineChart>

				</div>
				
		


			<div className="pop">
				<h2>Popular Stocks</h2>

				{popular.map(stock => (

					<div className="pop" key={stock.symbol}>

						<h3>{stock.symbol}</h3>
						<ul className="popular">
						<li>Price: ${stock.price}</li>
						<li>Change: {stock.change}</li>
						<li>{stock.percentChange}%</li>
						</ul>
					</div>
				))}

			</div>


			<div className="feed">
			{feed.map((article) => (
					<div key={article.guid || article.link}>
						<h2>{article.title}</h2>
						<p>{article.contentSnippet}</p>
						<a href={article.link} target="_blank" rel="noreferrer">Read More</a>
				
					</div>
				))}

			</div>

		</div>


		</div>


			);

}

export default Invest;
