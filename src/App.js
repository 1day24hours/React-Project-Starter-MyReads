import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link} from 'react-router-dom'
import Book from './Book'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    searchBooks:[],
    books:[]
  }
  // get all books data
  getBooks () {
    BooksAPI.getAll().then((books) => 
    this.setState({ books }));
  }
  // componentDidMout() to fetch data
  componentDidMount() {
    this.getBooks();
    // BooksAPI.getAll().then((books) => this.setState({books: books}));
  }
  // update or change book's state on the shelf
  updateShelf (book,shelf) {
    BooksAPI.update(book, shelf).then((books) => 
    this.setState({ books })); //something wrong with it
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
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf 
                title='読んでいる本です'
                books={this.state.books.filter((book) => book.shelf === 'currentlyReading')}
                // bind 'this' to App.js
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
