import React, { Component } from "react";
import { getAll } from "../BooksAPI";

export default class Shelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelfOptions: [
        { title: "Currently Reading", value: "currentlyReading" },
        { title: "Read", value: "read" },
        { title: "Want to Read", value: "wantToRead" },
        { title: "None", value: "none" },
      ],
    };
  }

  componentDidMount() {
    getAll().then((data) => {
      const arr = [];
      for (let book of data) {
        if (book.shelf === this.props.shelfType) {
          arr.push(book);
        }
      }
      this.props.updateParent(this.props.shelfType, arr);
    });
  }

  render() {
    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{this.props.title}</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {this.props.books.map((book) => (
              <li key={book.id}>
                <div className='book'>
                  <div className='book-top'>
                    <div
                      className='book-cover'
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url('${book.imageLinks.thumbnail}')`,
                      }}
                    ></div>
                    <div className='book-shelf-changer'>
                      <select
                        defaultValue={book.shelf}
                        onChange={(e) =>
                          this.props.moveBookFromShelf(
                            this.props.shelfType,
                            e.target.value,
                            book
                          )
                        }
                      >
                        <option value='move' disabled>
                          Move to...
                        </option>
                        {this.state.shelfOptions.map((shelf) => (
                          <option
                            key={shelf.value}
                            value={shelf.value}
                          >
                            {shelf.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='book-title'>{book.title}</div>
                  <div className='book-authors'>{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
