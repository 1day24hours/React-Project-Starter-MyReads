import React from 'react'
import Book from './Book'
import BooksApp from './App'

class BookShelf extends React.Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book) => (
                            <Book
                            key={book.id}
                            book={book}
                            updateShelf={this.props.updateShelf}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf