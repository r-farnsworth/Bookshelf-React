import React from 'react'
import BookDetails from './BookDetails'

class BookShelf extends React.Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                      {/* map over the books, ensuring they have individual IDs */}
                        {this.props.books.map((book) =>
                            <li key={book.id}>
                              {/* render the BookDetails component */}
                      <BookDetails
                      // add placeholder in case there isn't a cover image
                      thumbnail={book.imageLinks ? book.imageLinks.thumbnail:`http://via.placeholder.com/128x193?text=Cover`}
                      title={book.title}
                      authors={book.authors}
                      shelf={book.shelf}
                      changeShelf={this.props.changeShelf}
                      book={book}
                  />
              </li>
              )}
              </ol>
          </div>
          </div>
        )}};

export default BookShelf;
