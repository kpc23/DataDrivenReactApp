// import logo from './logo.svg';
import './App.css';
import './Table.css';
import { useEffect, useState} from "react";

function App() {
	const [data, setData] = useState([]);

	useEffect(() => 
  {
		async function fetchData()
    {
			const url = "/NEH2020sGrant_Short.json";
			const response = await fetch(url);

      if (response.ok) 
      {
		    const result = await response.json();
        // console.log(result.Grants.Grant);

        setData(result.Grants.Grant);
      }
		}
		fetchData();

	}, []);
  
function TableRow(grant){
  return (
    <tr>
      <td>{grant.grant.InstCity}</td>
      <td>{grant.grant.Division}</td>
      <td>{grant.grant.ProjectTitle}</td>
      <td>{grant.grant.Institution}</td>
      <td>{grant.grant.PrimaryDiscipline}</td>
      <td>{grant.grant.ProjectDesc}</td>
      <td>{grant.grant.YearAwarded}</td>
    </tr>
  );
}

function Table({grants}){
  return(
    <table border= {1}>
      <thead>
          <tr>
            <th>
              City
            </th>
            <th>
              Division
            </th>
            <th>
              Grant Project
            </th>
            <th>
              Institution
            </th>
            <th>
              Primary Discipline
            </th>
            <th>
              Project Description
            </th>
            <th>
              Year Awarded
            </th>
          </tr>
        </thead>
        
        <tbody> 
          {grants.map((grant, index) =>
          
            <TableRow key = {index}
                      grant = {grant}
            />
          )}

        </tbody>
    </table>

  )
}

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header> */}
      <Table grants = {data}/>
    </div>
  );
}

export default App;
