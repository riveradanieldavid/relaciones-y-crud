const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList', { movies })
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', { movie });
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', { movies });
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: { [db.Sequelize.Op.gte]: 8 }
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', { movies });
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    // add: function (req, res) {

    // },
    // create: function (req,res) {

    // },
    // edit: function(req,res) {

    // },
    // update: function (req,res) {

    // },
    // delete: function (req,res) {

    // },
    // destroy: function (req,res) {

    // }


    add: (req, res) => {
        db.Genre.findAll()
            .then((genres) => {
                return res.render('moviesAdd', {
                    allGenres: genres
                });
            })
            .catch(error => console.log(error))
    },

    create: (req, res) => {
        // CREAR PRODUCTO CON ESTOS DATOS QUE VIENEN DEL FORM
        db.Movie.create({
            title: req.body.title.trim(),
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
        })
            // LUEGO CUANDO LO ANTERIOR TERMINE...
            .then((result) => {
                // FINALMENTE REDIRIGIR
                // return res.send(req.body);//COMPROBAR
                return res.redirect('/movies');
            })
            .catch(error => console.log(error))
    }, //STORE /

    edit: (req, res) => {
        let peliEditar = db.Movie.findByPk(req.params.id, { //PARA EDITAR, ELIMINAR findBtPk()
            include: [{ all: true }] // SI NO ESTA ESTO NO SE PUEDE EDITAR
        })
        let generos = db.Genre.findAll({
            include: [{ all: true }]
        })
        Promise.all([generos, peliEditar])
            .then(([generos, peliEditar]) => {
                // return res.send(peliEditar)
                return res.render('MoviesEdit', {
                    allGenres: generos,
                    Movie: peliEditar
                });
            })
            .catch(error => console.log(error))
    },

    update: (req, res) => {
        // CREAR PRODUCTO CON ESTOS DATOS QUE VIENEN DEL FORM
        db.Movie.update({
            title: req.body.title.trim(),
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id
        },
            {
                where: {
                    id: req.params.id
                }
            })
            // LUEGO CUANDO LO ANTERIOR TERMINE...
            .then((result) => {
                // FINALMENTE REDIRIGIR
                // return res.send(req.body);//COMPROBAR
                return res.redirect('/movies/detail/' + req.params.id);
            })
            .catch(error => console.log(error))

    },

    //ELIMINAR PRODUCTO DELETE DESTROY
    delete: (req, res) => {
        db.Movie.findByPk(req.params.id, { //PARA EDITAR, ELIMINAR findBtPk()
            include: [{ all: true }] // SI NO ESTA ESTO NO SE PUEDE EDITAR
        })
            .then((Movie) => {
                return res.render('moviesDelete', {
                    Movie,
                });
            })
            .catch(error => console.log(error))
    },

    destroy: (req, res) => {
        db.Movie.destroy({
            where: {
                id: req.params.id,
            }
        })
            .then((Movie) => {
                return res.redirect('/movies')
            })
            .catch(error => console.log(error))
    },






}

module.exports = moviesController;