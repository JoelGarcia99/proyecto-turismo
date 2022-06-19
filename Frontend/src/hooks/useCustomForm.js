import {useState} from 'react';

const useCustomForm = (initState={}) => {
  
  const [entries, setEntries] = useState(initState);

  const handleChange = (e)=>{
    setEntries({
      ...entries,
      [e.target.name]: e.target.value
    });
  }

  const handleReset = (newState = initState)=>setEntries(newState);

  return [entries, handleChange, handleReset];
}

export default useCustomForm;