// const { TINYINT, INTEGER } = require("sequelize/types");

module.exports = (sequelize, dataTypes) => {
    let alias = "Genre";
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        ranking: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false,
        },
        active: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        },
    };
    let config = {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: false,
    };
    const Genre = sequelize.define(alias, cols, config);












    'use strict';
    const {
        Model
    } = require('sequelize');
    module.exports = (sequelize, DataTypes) => {
        class Genre extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                // define association here
                Genre.hasMany(Movie, {
                    as: "movies", // TAL CUAL DEBE INCLUIRSE EN COMO include: [movies, ...]
                    foreignKey: "movie_id", // PERTENECE A... REFIERE A OTRO (sectionId)
                })
            }
        };
        Genre.init({ // ESCRIBIR AQUI TODOS LOS ITEMS DE TU TABLA PARA QUE SE MUESTREN EN NAVEGDOR
            name: DataTypes.STRING
        }, {
            sequelize,
            modelName: 'Genre',
        });
        return Genre;
    };






    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie)

    return Genre;
};
