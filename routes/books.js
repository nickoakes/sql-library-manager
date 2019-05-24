/*
    SQL Library Manager
    books.js
*/

//dependencies

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

/*********************
 *******Routes********
*********************/

//redirect to books listing from '/'

router.get('/', function(req, res, next) {
    res.redirect('/books')
.catch(function() {
    res.sendStatus(500);
});
});

//GET books listing
router.get('/books', function(req, res, next) {
    Book.findAll({order: [["createdAt", "DESC"]]}).then(function(books){
        res.render('index', {books: books});
    }).catch(function() {
        res.sendStatus(500);
    });
});


//show 'Create new book' form

router.get('/books/new', function(req, res, next) {
    res.render('new-book', {book: {}, title: 'New book'});
});

//post a new book to the database

router.post('/books', function(req, res, next) {
    Book.create(req.body).then(function(book) {
        res.redirect('/update/' + book.id);
    })
    .catch(function(error){
        if(error.name === "SequelizeValidationError") {
          res.render('new-book', {book: Book.build(req.body), error: error.errors, title: "New Book", message: "Oops!", author: "Author is required!", bookTitle: "Title is required!"});
        } else {
          throw error;
        }
    }).catch(function(error){
        res.sendStatus(500, error);
    });
});

//show detail for individual book

router.get("/update/:id", function(req, res, next) {
    Book.findAll({where: {id: req.params.id}}).then(function(book) {
        if(book) {
            res.render('update-book', {book: book[0].dataValues});
        } else {
            let error = new Error();
            error.statusCode = 404;
            next(error);
        }
    })
    .catch(function(error){
        if(error.name === "SequelizeValidationError") {
          var book = Book.build(req.body);
          book.id = req.params.id;
          res.render("new-book", {book: book, error: error.errors,});
          document.querySelector('.error').setAttribute('style', 'display: "";')
        } else {
          throw error;
        }
    }).catch(function(error){
        next(error);
     });
});

//update book

router.put('/update/:id', function(req, res, next) {
    Book.update(
        req.body,
        {where: {id: req.params.id}}
    )
    .then(function(book) {
        res.redirect('/update/' + req.params.id);
    })
    .catch(function(error) {
        if(error.name === "SequelizeValidationError") {
            var book = Book.build(req.body);
            book.id = req.params.id;
            res.render('update-book', {book: book, error: error.errors, message: "Oops!", author: "Author is required!", bookTitle: "Title is required!"});
      } else {
            throw error;
      }
    }).catch(function(error) {
        if(error.statusCode === 404) {
            res.sendStatus(404);
        } else {
            res.sendStatus(500);
        }
    });
});

//delete book

router.delete('/update/:id', function(req, res, next) {
    Book.destroy(
        {where: {id: req.params.id}}
    )
    .then(function() {
        res.redirect('/books');
    })
    .catch(function(error) {
        console.log(error.name);
        if(error.statusCode === 404) {
            res.sendStatus(404);
        } else {
            res.sendStatus(500);
        }
    });
});

//search for book

router.get('/books/search', function(req, res, next) {
    let {search} = req.query;
    Book.findAll({where: {
        [Op.or]: [
        {
            title: {[Op.substring]: search}
        },
        {
            author: {[Op.substring]: search}
        },
        {
            genre: {[Op.substring]: search}
        },
        {
            year: {[Op.substring]: search}
        }
    ]
}})
    .then(function(books) {
        if(books.length) {
            res.render('index', {books: books, back: "< Back"});
        } else {
            res.render('index', {books: {}, message: "Sorry, no books were found", back: "< Back"});
        }
    })
    .catch(function() {
        res.sendStatus(500);
    });
});

module.exports = router;