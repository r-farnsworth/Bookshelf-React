import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import Header from "./Header";

class Shelves extends Component {
  // take the shelf name and only return the books associated with it
  filterShelves = (shelf) => {
    return this.props.books.filter((book) =>
      book.shelf === shelf
    )
  };

  render() {
    return (
      <div className="list-books">
        {/* Header component is in a separate file and imported here.
          If I was revising this project, I wonder if I could separate out each shelf and import them
          in order to make my code smaller? */}
        <Header />

        <div className="list-books-content">

          {/* Bookshelf for books currently reading */}
          <BookShelf
            name="Currently Reading"
            books={this.filterShelves("currentlyReading")}
            book={this.props.book}
            changeShelf={this.props.changeShelf}
            shelf={this.props.shelf}
          />

          {/* Bookshelf for books to be read */}
          <BookShelf
            name="Want to Read"
            books={this.filterShelves("wantToRead")}
            book={this.props.book}
            changeShelf={this.props.changeShelf}
            shelf={this.props.shelf}
          />

          {/* Bookshelf for books already read */}
          <BookShelf
            name="Finished Reading"
            books={this.filterShelves("read")}
            book={this.props.book}
            changeShelf={this.props.changeShelf}
            shelf={this.props.shelf}
          />
        </div>

        <div className="open-search">
          <Link to="/SearchBooks">Add a book</Link>
        </div>
      </div>
    )}};

export default Shelves;
