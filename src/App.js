// import logo from './logo.svg';
import './App.css';
import './Table.css';
import { useEffect, useState} from "react";

function App() {
	const [data, setData] = useState([]);
  /*New consts useState for filtering and sorting*/
  const [updatedData, setUpdatedData] = useState([]); //copy of data
  const [filterInstitutions, setFilterInstitutions] = useState(""); //1. filter by being able to search up instiutions.

  //1. Grabs data, also setting the copy.
	useEffect(() => 
  {
		async function fetchData()
    {
			const url = "/NEH2020sGrant_Short.json";
			const response = await fetch(url);

      if (response.ok) 
      {
		    const result = await response.json();
        let finalResult=result.Grants.Grant;
        setData(finalResult);
        setUpdatedData(finalResult)
      }
		}
		fetchData();

	}, []);

  // filter and sort

  useEffect(()=>{
    //1. filter through and find the name of institution, ANY CAPS friendly
    let filteredData = [...data].filter(grant => 
      grant.Institution.toLowerCase().includes(filterInstitutions.toLowerCase()
    ));
    setUpdatedData(filteredData);
  }, [filterInstitutions, data])

  
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
          <label>
            Filter by Institution:
            <input type="text" value={filterInstitutions} onChange={(e) => setFilterInstitutions(e.target.value)}
              placeholder='Name of Institution'
            />
          </label>
        
        
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
