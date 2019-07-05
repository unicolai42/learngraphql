import React from 'react'
import {graphql} from 'react-apollo'

import {getBooksQuery} from '../queries/queries'
import BookDetails from './BookDetails'
import '../styles/BookList.sass'


class BookList extends React.Component {
    state = {
        bookId: null
    }

    displayBooks = () => {
        if (!this.props.data.loading)
            return this.props.data.books.map(book => <li onClick={(e) => this.setState({bookId: book.id})} key={book.id}>{book.title}</li>)
        else {
            console.log('Data still loading')
            return []
        }
    }
    render() {
        console.log(this.props, 'eeee')
        
        return (
        <div>
            <ul id='bookList'>
                {this.displayBooks()}
            </ul>
            <BookDetails bookId={this.state.bookId}/>
        </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList)
