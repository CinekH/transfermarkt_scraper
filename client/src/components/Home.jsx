import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Form from './Form';

import './styles.css';

const Home = () => {
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setTeamName(e.target.value);
  }
  
  const handleButtonSubmit = async (e) => {
    e.preventDefault();
    navigate(`search/${teamName}`);
  }

  return (
    <div className="container">
        <Form onSubmitFunction={handleButtonSubmit} onChangeFunction={handleInputChange} labelText="Wpisz nazwę drużyny" formClassName='form_teamName'/>
    </div>
  )
}

export default Home