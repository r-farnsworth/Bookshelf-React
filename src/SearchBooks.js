// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// Books
import * as BooksAPI from './BooksAPI';
import BookDetails from './BookDetails';

// code for searching through the books available
class SearchBooks extends Component {
    constructor(props) {
        super(props)
        this.state = {
          // start with an empty array
            results: []
        }};

    searchInput = (query) => {
        const trimQuery = query.trim()

        // don't return anything if there's nothing in the query box
        if (!trimQuery.length) {
            this.setState({results:[]})
            return;
          }

        // will only fire if there's actually a query to search
        if (trimQuery !== 0) {
            // search the books API for the query
            BooksAPI.search(trimQuery)
            .then(returned => {
                if (!returned || returned.error) {
                    return this.setState({results:[]});
                }
    // ACKNOWLEDGEMENT: Stamatis and Zedekial helped!
                const matchingBooks = returned.map(returnedItem => {
                  // note to self. Would another method be better than forEach? look it up.
                    this.props.books.forEach(book => {
                        if (book.id === returnedItem.id) returnedItem.shelf = book.shelf
                    })
                    return returnedItem;
                })
                this.setState({results:matchingBooks});
            })}

        // if the query doesn't match any book IDs, don't show anything
        else {
            return this.setState({results:[]});
        }};

    render() {
        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>

                  <div className="search-books-input-wrapper">
                    <input
                      type="text"
                      placeholder="Search by title or author"
                      // used this in Tyler McGinnis bookcamp
                      onChange={(e) => this.searchInput(e.target.value)} />
                    </div>
                </div>

                <div className="search-books-results">
                  <ol className="books-grid">
                      {/*pass in any books which have come up in the search result */}
                      {this.state.results.map((book) =>
                          // ensure all books have a key
                      <li key={book.id}>
                      <BookDetails
                        thumbnail={book.imageLinks?book.imageLinks.thumbnail:`http://via.placeholder.com/128x193?text=No%20Cover`}
                        title={book.title}
                        authors={book.authors}
                        shelf={book.shelf}
                        changeShelf={this.props.changeShelf}
                        book={book} />
            </li>
            )}
          </ol>
          </div>
          </div>
    )}};

export default SearchBooks;
