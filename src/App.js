// import logo from './logo.svg';
import './App.css';
import './Table.css';
import { useEffect, useState} from "react";

function App() {
	const [data, setData] = useState([]);
  /*New consts useState for filtering and sorting*/
  const [updatedData, setUpdatedData] = useState([]); //copy of data
  const [filterInstitutions, setFilterInstitutions] = useState(""); //1. filter by being able to search up instiutions.
  const [filterDiscipline, setFilterDiscipline] = useState("") //2. filter discipline
  const [sortData, setSortData] = useState(false);//3. sort project title from a-z
  const [filterProgram, setfilterProgram] = useState("") //4. filter program

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

  useEffect(()=>
  {
    let copiedData = [...data];
        
    //1. filter through and find the name of institution, ANY CAPS friendly
    if(filterInstitutions.length > 0)
    {//if there is user input, update!!!
      copiedData = copiedData.filter(grant => 
      grant.Institution.toLowerCase().includes(filterInstitutions.toLowerCase())
      );
    }

    //2. filter though a drop down of disciplines
    if(filterDiscipline.length > 0)
    {
      copiedData = copiedData.filter(grant => grant.PrimaryDiscipline === filterDiscipline
      );
    }

    //3. sort project titles a-z
    if(sortData)
    {
      copiedData.sort((a,b) => 
      {
        let caseA = a.ProjectTitle.toLowerCase();
        let caseB = b.ProjectTitle.toLowerCase();
        if(caseA < caseB)
        {
          return -1;
        }
        if(caseA > caseB)
        {
          return 1;
        }
        
        return 0;
  
      }
  )}
  //3. filter though a drop down of disciplines
    if(filterProgram.length > 0)
    {
      copiedData = copiedData.filter(grant => grant.Program === filterProgram
      );
    }
    setUpdatedData(copiedData);


  }, [filterInstitutions, filterDiscipline, sortData, filterProgram, data])

  
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
      <label>
        Filter by Institution:
          <input type="text" value={filterInstitutions} onChange={(e) => setFilterInstitutions(e.target.value)}
              placeholder='Name of Institution'
          />
      </label>
      <label>
        Filter by Disciplines:
          <select value={filterDiscipline} onChange={(e) => setFilterDiscipline(e.target.value)}>
              <option value ="">Every Option</option>
              <option value ="African American History">African American History</option>
              <option value ="African Studies">African Studies</option>
              <option value ="American Literature">American Literature</option>
              <option value ="Art History and Criticism">Art History and Criticism</option>
              <option value ="British Literature">British Literature</option>
             
              <option value ="Classical History	">Classical History	</option>
              <option value ="Communications">Communications</option>
              <option value ="Cultural History">Cultural History</option>

              <option value ="Film History and Criticism">Film History and Criticism</option>
              <option value ="History of Science">History of Science</option>
              <option value ="Immigration History">Immigration History</option>
              <option value ="Interdisciplinary Studies, Other">Interdisciplinary Studies, Other</option>
              <option value ="Italian Literature">Italian Literature</option>
              <option value ="Latin American History">Latin American History</option>
              <option value ="Latino History">Latino History</option>
              <option value ="Literary Criticism">Literary Criticism</option>
              <option value ="Literature, General">Literature, General</option>
                            
              <option value ="Medieval History">Medieval History</option>
              <option value ="Near and Middle Eastern History">Near and Middle Eastern History</option>

              <option value ="Philosophy, General">Philosophy, General</option>
              <option value ="Political Theory">Political Theory</option>              

              <option value ="Renaissance History">Renaissance History</option>
              <option value ="South Asian Studies">South Asian Studies	</option>
              <option value ="Theater History and Criticism">Theater History and Criticism</option>
              <option value ="U.S. History">U.S. History</option>
              <option value ="Women's History">Women's History</option>

          </select>
        </label>

      <button onClick={() => setSortData(!sortData)}>
        {sortData ? "Sorted!!" : "Sort Project Title Alphabetically"}
      </button>

      <label>
        Choose Program Type:
          <select value={filterProgram} onChange={(e) => setfilterProgram(e.target.value)}>
              <option value ="">Every Option</option>
              <option value ="Infrastructure and Capacity Building Challenge Grants">Infrastructure and Capacity Building Challenge Grants</option>
              <option value ="Fellowships">Fellowships</option>
              <option value ="Awards for Faculty">Awards for Faculty</option>
              <option value ="State Humanities Councils General Operating Support Grants">State Humanities Councils General Operating Support Grants</option>
          </select>
      </label>



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
