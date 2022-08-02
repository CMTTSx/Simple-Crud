import React, { useState } from 'react';
import './App.css';

import Axios from 'axios';

function App() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [pais, setPais] = useState('');
  const [cargo, setCargo] = useState('');
  const [salario, setSalario] = useState(0);

  const [newSalario, setNewSalario] = useState(0);

  const [employeeList, setEmployeeList] = useState ([]);

  //Função Adicionar Empregado
  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      nome: nome,
      idade: idade,
      pais:  pais,
      cargo: cargo,
      salario: salario,
    }).then( () => {
      console.log('Valores Adicionados com Sucesso!')
    })
  }

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  

  //Função Update Empregado
  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { salario: newSalario, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  nome: val.nome,
                  idade: val.idade,
                  pais: val.pais,
                  cargo: val.cargo,
                  salario: newSalario,
                }
              : val;
          })
        );
      }
    );
  };

  //Deletar
  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      
      <div className='information' >
        
      <label>Nome:</label>
      <input type="text" 
        onChange={ (event) => {
          setNome(event.target.value);
        } }
      />
      <label>Idade:</label>
      <input type="text" 
        onChange={ (event) => {
          setIdade(event.target.value);
        } }
      />      
      <label>País:</label>
      <input type="text" 
        onChange={ (event) => {
          setPais(event.target.value);
        } }
      />
      <label>Cargo:</label>
      <input type="text" 
        onChange={ (event) => {
          setCargo(event.target.value);
        } }
      />
      <label>Remuneração:</label>
      <input type="text" 
        onChange={ (event) => {
          setSalario(event.target.value);
        } }
      />
      <button onClick={addEmployee} >Adicionar</button>
      </div>
      
      <div className="employees">
        <button onClick={getEmployees}>Mostrar Empregados</button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Nome: {val.nome}</h3>
                <h3>Idade: {val.idade}</h3>
                <h3>Pais: {val.pais}</h3>
                <h3>Cargo: {val.cargo}</h3>
                <h3>Salario: R${val.salario}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewSalario(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;