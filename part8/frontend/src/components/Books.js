import React from 'react'
import { useQuery } from "@apollo/client"
import { ALL_BOOKS} from "../queries"

const Books = () => {
    
const result = useQuery(ALL_BOOKS)

    if(result.loading){
        return <div>Loading..</div>
    }

  return (
    <div>
        <h2>Books</h2>

        <table>
            <tbody>
            <tr>
                <th></th>
                <th>
                Author
                </th>
                <th>
                Published
                </th>
            </tr>
            {result.data.allBooks.map(a =>
                <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
                </tr>
            )}
            </tbody>
        </table>
    </div>
  )
}

export default Books