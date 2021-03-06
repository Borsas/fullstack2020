import React from 'react'
import SetBirthyear from "./SetBirthyear"
import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"

const Authors = () => {
    
    const result = useQuery(ALL_AUTHORS)

    if (result.loading){
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>Authors</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                    Born
                    </th>
                    <th>
                    Books
                    </th>
                </tr>
                {result.data.allAuthors.map(a =>
                    <tr key={a.name}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                        <td>{a.bookCount}</td>
                    </tr>
                )}
                </tbody>
            </table>
        <SetBirthyear/>
        </div>
    )
}

export default Authors
