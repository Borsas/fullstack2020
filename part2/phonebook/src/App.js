import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Input from './components/Input'
import PersonForm from './components/PersonForm'
import NumberService from './services/Numbers'


const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newFilter, setNewFilter ] = useState('')
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    useEffect(() => {
        NumberService
        .getNumbers()
        .then(resp => {
            setPersons(resp.data)
        })
    }, [])

    const handleNewName = (e) => {
        setNewName(e.target.value)
    }

    const handleNewNumber = (e) => {
        setNewNumber(e.target.value)
    }
    
    const handleNewFilter = (e) => {
        setNewFilter(e.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (persons.some((person) => {return person.name === newName})) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const newPerson = {"name": newName, "number": newNumber}
            NumberService
            .create(newPerson)
            .then(resp => {
                setPersons(persons.concat(resp.data))
                setNewName("")
                setNewNumber("")
            })
        }

    }


    return (
        <div>
            <div>
                <h2>Phonebook</h2>
                <Input name="filter shown with" value={newFilter} onChange={handleNewFilter}/>
            </div>

            <h3>Add a new</h3>
            <PersonForm newNumber={newNumber} newName={newName}
            handleNewName={handleNewName}
            handleNewNumber={handleNewNumber}
            handleSubmit={handleSubmit} />

            <h2>Numbers</h2>
            <Persons persons={persons} filter={newFilter} />
        </div>
    )
    }

export default App