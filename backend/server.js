require("dotenv").config();


console.log(process.env.DATABASE_URL);

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const path = require('path');
const cors = require('cors');


const ex  = express();
const port = 3000;
var id = 0;
const popular = ["AAPL", "MSFT", "NVDA", "AMZN", "TSLA", "GOOGL"];


ex.use(cors());

ex.use(express.static(__dirname));
ex.use(express.json());




ex.post('/login', async (req, res) => {

	const { username, password } = req.body;
	 


	try{

		const user = await prisma.user.findFirst({
			where: { username }
		});
	
		if(!user){
			console.log("not found");
			res.json({ success: false,
				user });
			//sign up here
		}else{
			console.log("found");
		
			if(user.password != password){
				console.log("invalid credentials");
				res.json({ success: false,
					user });
			}else{
				console.log("success!");
				console.log(user.id);
				id = user.id; 
				console.log("ID: " + id);
				
				res.json({ success: true,
					user });
					
			}
		}

	

	}catch(e){
		console.error(e);
		res.status(500).json({ e: 'Error getting data' });
	}




});


ex.put("/transaction/:id", async (req, res) => {


	const { id, amount, category, type, description, userId } = req.body;

	try{
		const transaction = await prisma.transaction.update({
			where: {
				id: id,
				userId: userId
			},
			data: {
				amount: Number(amount),
				category,
				type,
				description
			}
		});

		res.json();

		
	}catch(error){
		console.error(error);
	}

});
				


ex.delete("/transaction/:id", async (req, res) => {

	const {id, userId} = req.body;

	try{

		const transaction = await prisma.transaction.findFirst({

			where: {
				id: id,
				userId: userId
			}
		});
		if(!transaction){

			console.log("Failed to delete transaction");
		}else{

			console.log("Successfully deleted");
		
		

		await prisma.transaction.delete({
			where: {
				id: id
			}
		});

			res.json()

		}

	}catch(error){

		console.error(error);
	}

});

	


ex.get('/User/:username', async (req, res) => {
	
	const { username } = req.params.username;


	try{
		const user = await prisma.User.findFirst({

			where: { username: username }
			
		});
		res.json(user);

	}catch(error){
		console.error(error);
		res.status(500).json({ error: 'Error getting data' });
	}

});


ex.get('/transaction/count/:userId', async (req, res) => {

	const id = Number(req.params.userId);



	const count = await prisma.transaction.count({

		where: {
			userId: id
		}
	});

	res.json({

		count: count
	});

});


ex.post('/transaction', async (req, res) => {


	const { amount, category, type, description } = req.body;
	

	try{

		const transaction = await prisma.transaction.create({
			data: {
				amount: parseFloat(amount),
				category: category,
				type: type,
				description: description,
				user: {
					connect: { id: id },
				},
			},
		});
		res.json(transaction);

}catch(error){
	console.error(error);	
	res.status(500).json({ error: 'Error getting data' });
}

});


ex.get("/transaction/:userId", async (req, res) => {

	console.log("Found route");
	const { userId } = req.params; 
	
	const transactions = await prisma.transaction.findMany({

		where: { userId: Number(userId) },
	});
	console.log(transactions);
	res.json(transactions);


});



ex.get('/stock/history/:symbol', async (req, res) => {

		const symbol = req.params.symbol.toUpperCase();

	

	try{

		const resp = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);

		const data = await resp.json();

		console.log(data);

		res.json(data);
		
		

		
	}catch(err){
		console.error(err);
		res.status(500).json({ err: "Failed to retrieve history"  });
	}

});


//for testing API
ex.get('/stock/:symbol', async (req, res) => {
	
	try{
		const symbol = req.params.symbol.toUpperCase();

		const resp = await fetch(
			`http://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`
		);

		const data = await resp.json();

		res.json(data);

		
	}catch(err){
		console.error(err);
	}

});


ex.get('/stock/profile/:symbol', async (req, res) => {

	try{
		const symbol = req.params.symbol.toUpperCase();

		const resp = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);

		const data = await resp.json();

		res.json(data);

	}catch(err){
		console.error(err);
	}


});


ex.get('/stocks/popular', async (req, res) => {
	console.log("testing...");
	try{
		
		const stocks = [];


		for(const symbol of popular){

			const resp = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);
			const data = await resp.json();
			
		//	console.log(symbol, data);

			stocks.push({

				symbol: symbol,
				price: data.c,
				change: data.d,
				percentChange: data.dp
			});
		}
	
		res.json(stocks);

	}catch(err){
		console.error(err);
	}

});





ex.post('/User', async (req, res) => {

	const { username, password } = req.body;

	try{

		const user = await prisma.user.create({

			data: { username, password }
		});
		res.status(201).json(user);

	}catch(e){
		console.error("Could not create user:", e);
		
	}

});

ex.listen(port, () => {

	console.log("Server is running");


});

