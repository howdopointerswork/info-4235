import "./Table.css"; 

function Table( { header, transactions } ){

	return(
		<table className="tableStyle">
			<th>{ header }</th>

			{transactions.map((transaction) => (

				<tr key={transaction.id}>
					<td>{transaction.id}</td>
					<td>{transaction.category}</td>
					<td>{transaction.type}</td>
					<td>{transaction.description}</td>
					<td>{transaction.amount}</td>
					<td><button>Edit</button</td>
					<td><button><Delete</button></td>
				</tr>
			))}
				

		</table>

	);
}

export default Table;
