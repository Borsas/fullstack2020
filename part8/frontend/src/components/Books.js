import React from 'react'

const Books = (props) => {
    if (!props.show) {
        return null
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
            {props.books.data.allBooks.map(a =>
                <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
                </tr>
            )}
            </tbody>
        </table>
    </div>
  )
}

export default Books