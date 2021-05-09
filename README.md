# MyReads Project

The project includes two pages , home and search, in which you can assign books to desired shelves and search for other books from the data base.

## To Start running the Project

To get started with the project right away:

* install all project dependencies with `npm install`
* start the development server with `npm start` as simple as all React projects

# The Project's Archeticture

In the **src** folder you'll find:

> Components folder
- home.js :  contains 3 shelves with books included
- search.js : responsible of searching
- shelf.js : dynamic component to hold books and display them

> Icons folder
inclues 3 svg files

> Other files

- index.js : the main file to start the project 
- index.css: golbal styles
- BooksAPI.js : contains methods to run against the Api
- App.test.js : test file
- App.js : the main file that incluedes the entry to the project ( it contains the routes of home and search)
- App.css : styles for the application UI design