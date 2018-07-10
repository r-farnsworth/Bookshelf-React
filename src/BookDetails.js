import React, { Component } from "react";

class BookDetails extends Component {

    render() {
        return (
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
                            onChange={(e) => this.props.changeShelf(this.props.book, e.target.value)}
                            >
                            <option disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.authors}</div>
            </div>

        )}};

export default BookDetails;
