import {gql} from 'apollo-boost'

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`

const getBooksQuery = gql`
    {
        books {
            title
            id
        }
    }
`

const getBookQuery = gql`
    query($id: ID!) {
        book(id: $id) {
            id
            pages
            author {
                name
                age
                books {
                    id
                    title
                }
            }
        }
    }
`

const addBookMutation = gql`
    mutation($title: String!, $pages: Int!, $authorId: ID!){
        addBook(title: $title, pages: $pages, authorId: $authorId) {
            title
            id
        }
    }
`

export {getAuthorsQuery, getBookQuery, getBooksQuery, addBookMutation}