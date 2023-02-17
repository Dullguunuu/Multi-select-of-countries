import { useEffect, useState } from 'react';
import Select from "react-select";
import './App.css';

function App() {
  const [fetchedData, setFetchedData] = useState()
  const [countries, setCountries] = useState()

  const [dropdown, setDropdown] = useState(false)
  const [text, setText] = useState()
  function getData() {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCountries(data)
        setFetchedData(data)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  function onSearch() {
    console.log("a");
    setDropdown(!dropdown)
    let newArr = []
    fetchedData.map((j) => {
      if (j.name.official.includes(text)) {
        newArr.push(j)
      }
      setCountries(newArr)
    })
  }

  return (
    <div className="col-8 m-5">

      <div className='border d-flex justify-content-between p-3'>
        <input className='border-0 w-75' value={text} onChange={(e) => setText(e.target.value)} onClick={() => onSearch()} />
        <div className='d-flex gap-2'>
          <button className='btn border'><i class="bi bi-x"></i></button>
          <button className='btn border' onClick={() => setDropdown(!dropdown)}><i class="bi bi-chevron-down"></i></button>
        </div>
      </div>
      {
        countries?.map((e, index) => (
          <option value={index} style={{ display: dropdown ? "block" : "none" }}>{e.name.official}</option>
        ))
      }
    </div >
  );
}

export default App;
