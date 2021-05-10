import React, { Component } from "react";
import { Link } from "react-router-dom";
import { search, update, getAll } from "../BooksAPI";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      searchedBooks: [],
      shelfOptions: [
        { title: "Currently Reading", value: "currentlyReading" },
        { title: "Read", value: "read" },
        { title: "Want to Read", value: "wantToRead" },
        { title: "None", value: "none" },
      ],
      myBooks: [],
      searchDisabled: true
    };
    this.timeout = null;
    console.log(window.location.state)
  }

  updateSearchInput = (inputValue) => {
    this.setState(() => ({
      searchInput: inputValue,
    }));

    if (!inputValue) {
      this.setState({ searchedBooks: [] });
      return;
    }

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      search(this.state.searchInput).then((res) => {
        if (!(res instanceof Array)) {
          this.setState({ searchedBooks: [] });
          return;
        }
        this.setState({
          searchedBooks: res,
        });
      });
    }, 300);
  };

  async addToShelf(shelf, book) {
    await update(book, shelf);
    alert(`Book has been added to ${shelf}`);
  }

  componentDidMount() {
    getAll().then((data) => {
      const arr = [];
      for (let book of data) {
        arr.push({ id: book.id, shelf: book.shelf });
      }
      this.setState({
        myBooks: arr,
        searchDisabled: false
      });
    });
  }

  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/'>
            <button className='close-search'>Close</button>
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              value={this.state.searchInput}
              onChange={(event) => this.updateSearchInput(event.target.value)}
              disabled={this.state.searchDisabled}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.searchedBooks.map((book) => (
              <li key={book.id}>
                <div className='book'>
                  <div className='book-top'>
                    <div
                      className='book-cover'
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url('${book?.imageLinks?.thumbnail}')`,
                      }}
                    ></div>
                    <div className='book-shelf-changer'>
                      <select
                        defaultValue={
                          this.state.myBooks.filter((b) => b.id === book.id)[0]?.shelf ?? "none"
                        }
                        onChange={async (e) =>
                          await this.addToShelf(e.target.value, book)
                        }
                      >
                        <option value='move' disabled>
                          Move to...
                        </option>
                        {this.state.shelfOptions.map((shelf) => (
                          <option key={shelf.value} value={shelf.value}>
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
