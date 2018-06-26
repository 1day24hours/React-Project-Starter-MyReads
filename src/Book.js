import React from 'react'

class Book extends React.Component {
    render() {
        // initialize the shelf's state
        let shelf ='';
        if (this.props.book.shelf) {
            shelf = this.props.book.shelf;
        } else {
            shelf = 'none';
        }
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, 
                        //something wrong with it
                            backgroundImage: `{url('${this.props.book.imageLinks ? this.props.book.thumbnail : "https://books.google.com/googlebooks/images/no_cover_thumb.gif"})`}}></div>
                        <div className="book-shelf-changer">
                            <select 
                                //pass shelf's state to value
                                value={shelf}
                                onChange={(event) => this.props.updateShelf(this.props.book, event.target.value) }
                            >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    {this.props.book.authors.map((author) => (
                        <div className='book-authors' 
                        key={this.props.book.author}>{author}</div>
                    ))}
                </div>
            </li>
        )
    }
}

export default Book