import NavBar from "../components/NavBar.jsx";

import { useState, useEffect } from "react";
import {LineChart, Line, XAxis, YAxis, Tooltip} from "recharts";
import "./Invest.css";

function Invest(){

	const [stock, setStock] = useState(null);
	const [symbol, setSymbol] = useState("");
	const [profile, setProfile] = useState(null);
	const [popular, setPopular] = useState([]);
	const [history, setHistory] = useState(null);


	useEffect(() => {
		async function loadPopular(){

			const resp = await fetch("http://localhost:3000/stocks/popular");

			const data = await resp.json();

			setPopular(data);
		}

		loadPopular();

	}, []);

	async function searchStock(){
		const resp = await fetch(`http://localhost:3000/stock/${symbol}`);

		const data = await resp.json();

	//	console.log(data);

		setStock(data);

		const profileResp = await fetch(`http://localhost:3000/stock/profile/${symbol}`);

		const profileData = await profileResp.json();

		setProfile(profileData);
	}
	
	
useEffect(() => {
	async function getHistory(){

		const resp = await fetch(`http://localhost:3000/stock/history/${symbol}`);

		const data = await resp.json();
		console.log("History data: ");
		console.log(data);
		
		setHistory(data);

	}
	getHistory();
		}, [symbol]);

	

	const chartData = history && history["Time Series (Daily)"] ? Object.entries(history["Time Series (Daily)"]).map(([date, values]) => ({
		date: date,
		price: Number(values["4. close"])
	})).reverse() : [];


	return(
		<div>
			<h1>Investing</h1>
			<NavBar />

			<input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Search Stock" />
			<button onClick={searchStock}>Search</button>
			
			{profile && (

				<div>
					<img src={profile.logo} alt={profile.name} width="80" />
					<h2>{profile.name}</h2>
					<p>{profile.exchange}</p>
					

				</div>

			)}



			{stock && (
				<div>
					<table>
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


			<div>
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


				<div>
					
					<LineChart width={700} height={300} data={chartData}>
					<XAxis dataKey="date"/>
					<YAxis/>
					<Tooltip/>
					<Line type="monotone" dataKey="price" />
					</LineChart>

				</div>

			</div>
	);

}

export default Invest;
