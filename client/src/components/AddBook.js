import React from 'react'
import {graphql, compose} from 'react-apollo'

import '../styles/AddBook.sass'
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries'

class AddBook extends React.Component {
    state = {
        title: "",
        pages: 0,
        authorId: ""
    }



    displayAuthors = () => {
        if (!this.props.getAuthorsQuery.loading)
            return this.props.getAuthorsQuery.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)
        else
            return <option></option>
    }

    submitForm = (e) => {
        e.preventDefault()
        console.log(this.state, 'here')
        this.props.addBookMutation({
            variables: {
                title: this.state.title,
                pages: parseInt(this.state.pages),
                authorId: this.state.authorId
            },
            refetchQueries: [
                {
                    query: getBooksQuery
                }
            ]
        })
    }

    render() {
        return (
            <form onSubmit={e => this.submitForm(e)} id='addBook'>
                <div className='field'>
                    <label>Title</label>
                    <input type="text" onChange={(e) => this.setState({title: e.target.value})}/>
                </div>
                
                <div className='field'>
                    <label>Pages</label>
                    <input type="text" onChange={(e) => this.setState({pages: e.target.value})}/>
                </div>
                
                <div className='field'>
                    <label>Author</label>
                    <select value={this.state.authorId} onChange={(e) => this.setState({authorId: e.target.value})}>
                        <option value='' disabled>Select your option</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                
                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
    graphql(addBookMutation, {name: 'addBookMutation'})
)(AddBook)