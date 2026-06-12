const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const path = require('path');
const cors = require('cors');


const ex  = express();
const port = 3000;

ex.use(cors());

ex.use(express.static(__dirname));
ex.use(express.json());

ex.get('/User/username/:username', async (req, res) => {

	const username = req.params.username;

	try{

		const user = await prisma.User.findFirst({
			where: { username }
		});
		res.json(user);

	}catch(error){
		res.status(500).json({ error: 'Error getting data' });
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

