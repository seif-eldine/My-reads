import React, { Component } from "react";
import { Link } from "react-router-dom";
import { update } from "../BooksAPI";
// My Shelfs
import Shelf from "./shelf";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyReading: [],
      read: [],
      wantToRead: [],
      none: [],
      shelves: [
        { title: "Currently Reading", type: "currentlyReading" },
        { title: "Read", type: "read" },
        { title: "Want to Read", type: "wantToRead" },
      ],
    };
  }
  //          "currentlyReading"
  updateBooks(shelfType, books) {
    // re-assigns new arrays to my state arrays
    const newObj = {};
    newObj[shelfType] = books;
    // { currentlyReading: books... }
    this.setState(newObj);
  }

  async moveBookFromShelf(currentShelf, targetShelf, book) {
    if (book.shelf === targetShelf) return; // if book current shelf and the passed shelf are the same then don't add no books
    if (targetShelf !== "none") {
      // if the target is NOT none , update the book's shelf in data base
      await update(book, targetShelf);
    }
    book.shelf = targetShelf; // let the new shelf of the book to be the targeted one
    const DeleteBookObj = {};
    DeleteBookObj[currentShelf] = this.state[currentShelf].filter(
      //Returns array that doesn't contain the book of the passed ID
      (b) => b.id !== book.id
    );
    this.setState(DeleteBookObj); // update the state with the new array

    const arr = [...this.state[targetShelf]]; // spreads the books of the targeted shelf to const arr
    arr.push(book); // pushes the passed book to the array
    const addBookObj = {};
    addBookObj[targetShelf] = arr; // makes a new object of the array to be passed to set state

    this.setState(addBookObj); // updating the current state with the new array
  }

  render() {
    return (
      <div className='shelves-wrapper'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          {this.state.shelves.map((shelf) => (
            <Shelf
            key={shelf.type}
              updateParent={(shelfType, books) =>
                this.updateBooks(shelfType, books)
              }
              books={this.state[shelf.type]}
              title={shelf.title}
              shelfType={shelf.type}
              moveBookFromShelf={async (current, target, book) =>
                await this.moveBookFromShelf(current, target, book)
              }
            />
          ))}
        </div>
        <div className='open-search'>
          <Link to='/search'>
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}
