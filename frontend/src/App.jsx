import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
//import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TestButton from "./components/TestButton";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import Invest from "./pages/Invest";


function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  return (
	<BrowserRouter>
		<Routes>
	  		<Route path="/" element={<Login />} />
			<Route path="/home" element={<Home />} />
	  		<Route path="/transactions" element={<Transactions />} />
	  		<Route path="/budgeting" element={<Budget />} />
	  		<Route path="/investing" element={<Invest />} />
		</Routes>
	</BrowserRouter>
	);

	
}

export default App;
