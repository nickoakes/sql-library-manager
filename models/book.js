'use strict';

module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: "Title is required"
            }
        }
    },
    author: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: "Author is required"
            }
        }
    },
    genre: {
        type: DataTypes.STRING
    },
    year: {
        type: DataTypes.INTEGER
    },
    }
  );
  return Book;
};