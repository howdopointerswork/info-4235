import NavBar from "../components/NavBar.jsx";
import Header from "../components/Header.jsx";

import "./Home.css";

import { useState, useEffect } from "react";
import React from "react";

function Home(){

	const [news, setNews] = useState([]);
	const [current, setCurrent] = useState(0);
	const [markets, setMarkets] = useState([]);

useEffect(() => {
	
	async function getMarkets(){
	
		try{

			const resp = await fetch("http://localhost:3000/markets");

			const data = await resp.json();

			setMarkets(data);

		}catch(err){

			console.error(err);	
		}

	}
	getMarkets();
}, []);


useEffect(() => {

		fetch("http://localhost:3000/news").then(res => res.json()).then(setNews);
	



}, []);


useEffect(() => {
	if(news.length == 0){
		return;
	}

	const timer = setInterval(() => {

		setCurrent(prev => (prev + 1) % news.length);
}, 5000);

	return () => clearInterval(timer);

	}, [news]);


if(news.length === 0){
	return <p>Loading news...</p>
}


//console.log("Current is:",current);
//console.log("News:",news);



	return (
	
		<div>
			<Header />
			<NavBar />
		
			<div className="newsTicker">
		
					<div className="overlay">
					<img width={400} height={400} src={`${current}.png`}/>
					<h2>{news[current].title}</h2>
					<p>{news[current].desc}</p>

				<a href={news[current].link}>Read more</a>

					</div>

			</div>


			<div className="markets">
				<table style={{ margin: "0 auto" }}>
					<thead>

						<tr>
							<td colSpan={4}><h2>Market Overview</h2></td>
						</tr>
						<tr>
							<td><h3>Name</h3></td>
							<td><h3>Symbol</h3></td>
							<td><h3>Price</h3></td>
							<td><h3>Change</h3></td>
						</tr>
					</thead>

					<tbody>
						{markets.map((market) => (
						

							<tr key={market.symbol}>
								<td>{market.name}</td>
								<td>{market.symbol}</td>
								<td>{market.price}</td>
								<td style={{ color: market.change > 0 ? "green" : "red" }}>{market.change}</td>
							</tr>

						))}

						
					</tbody>
				</table>
				
			</div>




		<div className="links">
			<h2 style={{ marginTop: "4em" }}>Useful Resources</h2>
			<table style={{ margin: "0 auto", borderSpacing: "2em" }}>
				<thead>

					<tr>
						<td colSpan={3}><h3>Investing</h3></td>
					</tr>
					<tr>
						<td>WealthSimple</td>
						<td>Questrade</td>
						<td>Interactive Brokers</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><a href="https://www.wealthsimple.com"><img width={200} height={200} src="ws.png"/></a></td>
						<td><a href="https://www.questrade.com"><img width={200} height={200} src="questrade.png"/></a></td>
						<td><a href="https://www.interactivebrokers.com"><img width={200} height={200} src="ib.jpg"/></a></td>
					</tr>

					
					<tr>
						<td colSpan={3}><h3>Market Research</h3></td>
					</tr>

					<tr>
						<td>Motley Fool</td>
						<td>Seeking Alpha</td>
						<td>MorningStar</td>
					</tr>

					<tr>
						<td><a href="https://www.fool.com"><img width={200} height={200} src="fool.png"/></a></td>
						<td><a href="https://www.seekingalpha.com"><img width={200} height={200} src="alpha.png"/></a></td>

						<td><a href="https://www.morningstar.com"><img width={200} height={200} src="star.png"/></a></td>
						
					</tr>


					<tr>
						<td colSpan={3}><h3>News</h3></td>

					</tr>

					<tr>
						<td>CNBC</td>
						<td>Bloomberg</td>
						<td>Yahoo Finance</td>
					</tr>


					<tr>
						<td><a href="https://www.cnbc.com"><img width={200} height={200} src="cnbc.png"/></a></td>
						<td><a href="https://www.bloomberg.com"><img width={200} height={200} src="bloomberg.png"/></a></td>

						<td><a href="https://www.ca.finance.yahoo.com"><img width={200} height={200} src="yahoo.gif"/></a></td>
					</tr>
				</tbody>
			
			</table>
		</div>

		
		</div>

	);

}


export default Home;
	
