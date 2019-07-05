import React from 'react'
import {graphql} from 'react-apollo'

import {getBookQuery} from '../queries/queries'
import '../styles/BookDetails.sass'


class BookDetails extends React.Component {
    displayBookDetails = () => {
        const {book} = this.props.data
        console.log( this.props.bookId, 'ppooii')
        if (this.props.bookId && !this.props.data.loading)
            return (
            <div>
                <p>Id: {this.props.bookId}</p>
                <p>Number pages: {book.pages}</p>
                <p>Author Info: {book.author.name}, {book.author.age}</p>
                <p>{this.props.bookId.id}</p>
                <p>{this.props.bookId.id}</p>
                <ul>
                    {book.author.books.map((book) => <li>{book.title}</li>)}
                </ul>

            </div>
            )
    }

    render() {
        return(
            <div id='bookDetails'>
                {this.displayBookDetails()}
            </div>
        )
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)