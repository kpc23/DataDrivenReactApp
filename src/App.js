// import logo from './logo.svg';
import './App.css';
import './Table.css';
import { useEffect, useState} from "react";

function App() {
	const [data, setData] = useState([]);
  /*New consts useState for filtering and sorting*/
  const [updatedData, setUpdatedData] = useState(data);
	useEffect(() => 
  {
		async function fetchData()
    {
			const url = "/NEH2020sGrant_Short.json";
			const response = await fetch(url);

      if (response.ok) 
      {
		    const result = await response.json();
        let finalresult=result.Grants.Grant;
        setData(finalresult);
        setUpdatedData(finalresult)
      }
		}
		fetchData();

	}, []);

  // const restoreData = (data) =>


  
  function TableRow(grant){
    return (
      <tr>
        <td title = {grant.grant.InstState}>{grant.grant.InstCity}</td>
        <td>{grant.grant.Division}</td>
        <td>{grant.grant.ProjectTitle}</td>
        <td>{grant.grant.Institution}</td>
        <td>{grant.grant.PrimaryDiscipline}</td>
        <td>{grant.grant.Program}</td>
        <td>{grant.grant.YearAwarded}</td>
      </tr>
    );
  }

  function Table({grants}){
    return(
      <table border= {1}>
        <caption>
          <h1>
          Grant Information
          </h1>
        </caption>

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
                Program
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
      {/* <label>	useEffect(() => 
  {

        Filter by Institution:
        <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)}
        placeholder='Name of Institution'
        />
      </label> */}
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
      {/* <Table grants = {data}/> */}
      <Table grants = {updatedData}/>
    </div>
  );
}

export default App;
