import React, { Component } from "react";

class BookDetails extends Component {
// we can just go straight to render as I haven't put in any helper functions
    render() {
        return (
          // using the structure from the starter code
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128, height: 193,
                        // yay I love ES6 object literals :)
                        backgroundImage: `url(${this.props.thumbnail})`
                    }}>
                    </div>
                    <div className="book-shelf-changer">
                      <select
                        value={this.props.shelf||"none"}
                        // using onChange here. Initially tried onClick but it just wasn't working in the way I wanted
                        // and lots of people on Slack suggested it
                        onChange={(e) => this.props.changeShelf(this.props.book, e.target.value)} >
                          <option disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                    </div>
                </div>
                {/* props supplies the title and author details */}
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.authors}</div>
            </div>
        )}};

export default BookDetails;
