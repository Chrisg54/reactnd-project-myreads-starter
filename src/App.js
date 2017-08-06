import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './BookSearch'
import Header from './Header'
import Bookshelf from './Bookshelf'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      
      this.setState({ books })
    
    })
  }

  moveBook = (book, shelf) => {
    
    if (this.state.books) {
      BooksAPI.update(book,shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    
    }
  }


  
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <Header/>
            <Bookshelf
              onMoveBook={this.moveBook}
              booksOnShelf={this.state.books}
            />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={() => (
          <BookSearch
            onMoveBook={this.moveBook}
            booksOnShelf={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
