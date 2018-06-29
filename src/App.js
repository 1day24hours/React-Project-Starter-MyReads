import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import Book from './Book'
import Header from './Header'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  state = {
    searchBooks:[],
    books:[]
  }
  // get all books data
  getBooks () {
    BooksAPI.getAll().then((books) => 
    this.setState({ books }));
  }
  componentDidMount() {
    this.getBooks();
  }
  // update or change book's state on the shelf
  updateShelf (book,shelf) {
    BooksAPI.update(book, shelf).then(() => {
      this.getBooks;
    })
  }
  //Every bind call returns a new func,in order to avoid a new func,
  //it is suggested to bind the event handler for the rendering method in the constructor
  constructor() {
    super();
    this.updateShelf = this.updateShelf;
  }
  //search book and books'state
  search(query) {
    if (query.isArray) {
      BooksAPI.search(query).then((books) => this.setState({ searchBooks: books }));
    } else {
      alert('There is no key words.');
    }
  }
  render() {
    return (
      <div className="app">
          {/* {JSON.stringify(this.setState.books)} */}
        <Route exact path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text" 
                  placeholder="Search by title or author"
                  onChange={(event) => this.search(event.target.value)}
                 />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchBooks.map((books) => (
                  <Book
                    key={books.id}
                    book={books}
                    //as well as need to bind to 'this'
                    updateShelf={this.updateShelf} />
                ))}
              </ol>
            </div>
          </div>
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <Header />
            <div className="list-books-content">
              <div>
                <BookShelf 
                title='読んでいる本です'
                books={this.state.books.filter((book) => book.shelf === 'currentlyReading')}
                updateShelf={this.updateShelf}
                />
                <BookShelf
                title='読みたい本'
                books={this.state.books.filter((book) => book.shelf ==='wantToRead')}
                updateShelf={this.updateShelf}
                 />
                <BookShelf
                title='読み終わった本'
                books={this.state.books.filter((book) => book.shelf === 'read')}
                updateShelf={this.updateShelf}
                 /> 
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
