// import React
import React from "react";
import { Route } from "react-router-dom";

// import the Books API - use * to ensure everything is imported over
import * as BooksAPI from "./BooksAPI";

// styles
import "./App.css";

// import my components
import SearchBooks from "./SearchBooks";
import Shelves from "./Shelves";

// create the main App component
class App extends React.Component {
  constructor(props) {
    // need to use super alongside constructor - see Tyler McGinnis bootcamp day 1
    super(props)
    this.state = {
      // ensure the array is empty to start with
      books: []
    }
  };

  // use Fetch API to get data from BooksAPI and store them
  // this won't fire until the component has appeared in the DOM so it's good for network requests
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
    this.setState({ books });
  });
};

//Pass the searched book to the state and then update the shelves
// ACKNOWLEDGEMENT! Thanks to @Stamatis on Slack!
  changeShelf = (book, shelf) => {
    // use BooksAPI update with promises
    BooksAPI.update(book, shelf)
      .then(() => {
        this.setState(prevState => ({
          // add the book to the shelf if it isn't there already
          books: prevState.books.filter(b => b.id !== book.id).concat([book])
        }));
      })
      .then(() => {
        this.setState((prevState) => {
          return {
            //map applies a function to every item in an array then returns a new array
            books: prevState.books.map(searchedBook => {
              // if there is a matching record, put the book on the shelf!
              if (book.id === searchedBook.id) {
                searchedBook.shelf = shelf
              }
              return searchedBook;
            })
          }
        })
      })
      // update the books
      .then(() => {
        BooksAPI.getAll().then((books) => {
          this.setState({ books });
        })
      })};


// render the UI of the component. Remember that components must have a render method.
  render() {
    return (
      //JSX components must always be wrapped in a div tag
      <div className="app">

        {/* use exact path so that the app doesn't break the browser back button */}
        <Route exact path="/"
        // use arrow functions for render like we did in the Contacts app
          render={() => (
            <Shelves
              // all children need a key
              key={this.props.key}
              books={this.state.books}
              shelf={this.state.shelf}
              changeShelf={this.changeShelf}
              book={this.state.book}
            />
        )}
        />
        {/* the SearchBooks pane, much like how we did it in the Contacts app */}
        <Route path = "/SearchBooks" render={({ history }) => (
          <SearchBooks
            key={this.props.key}
            books={this.state.books}
            results={this.props.results}
            changeShelf={this.changeShelf}
            book={this.props.book}
            shelf={this.state.shelf}
          />
        )}/>
        
      </div>
    )}};

export default App;
