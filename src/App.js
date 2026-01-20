// import logo from './logo.svg';
import './App.css';
import { useEffect, useState} from "react";

function App() {
	const [data, setData] = useState([{}]);

	useEffect(() => 
  {
		async function fetchData()
    {
			const url = "/NEH2020sGrant_Short.json";
			const response = await fetch(url);

      if (response.ok) 
      {
		    const result = await response.json();
        console.log(result.Grants.Grant);

        setData(result.data);
      }
		}
		fetchData();

	}, [data]);
  
// function TableRow(props){
// 
// }



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
      
      <table>
        <thead>
          <tr>
            <th>
              Grant Project
            </th>
            <td>
               - Institution
            </td>
          </tr>
        </thead>
        
        <tbody> 
          {/*Grant information Here */}

          

        </tbody>
      </table>



    </div>
  );
}

export default App;
