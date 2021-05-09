import React, { Component } from "react";
import { Link } from "react-router-dom";
import { search, update } from "../BooksAPI";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      searchedBooks: [],
    };
    this.timeout = null;
  }

  updateSearchInput = (inputValue) => {
    this.setState(() => ({
      searchInput: inputValue,
    }));

    if (!inputValue) {
        this.setState({  searchedBooks: [] })
        return
    }

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      search(this.state.searchInput).then((res) => {
          if (! (res instanceof Array)) {
            this.setState({  searchedBooks: [] })
            return
          }
        this.setState({
          searchedBooks: res
        });
      });
    }, 300);
  };

  async addToShelf(shelf, book) {
    await update(book, shelf);
    alert(`Book has been added to ${shelf}`)
  }

  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/home'>
            <button className='close-search'>Close</button>
          </Link>
          <div className='search-books-input-wrapper'>
            {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
            <input
              type='text'
              placeholder='Search by title or author'
              value={this.state.searchInput}
              onChange={(event) => this.updateSearchInput(event.target.value)}
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
                        backgroundImage: `url('${book.imageLinks.thumbnail}')`,
                      }}
                    ></div>
                    <div className='book-shelf-changer'>
                      <select
                        defaultValue='move'
                        onChange={async (e) =>
                          await this.addToShelf(
                            e.target.value,
                            book
                          )
                        }
                      >
                        <option value='move' disabled>
                          Move to...
                        </option>
                        <option value='currentlyReading'>
                          Currently Reading
                        </option>
                        <option value='read'>Read</option>
                        <option value='wantToRead'>Want to Read</option>
                        <option value='none'>None</option>
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
