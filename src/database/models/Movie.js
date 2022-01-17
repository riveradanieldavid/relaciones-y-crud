module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        title: {
            type: dataTypes.STRING(500),
            allowNull: false,
        },
        rating: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false,
        },
        awards: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false,
        },
        release_date: {
            type: dataTypes.DATEONLY,
            allowNull: false,
        },
        length: dataTypes.BIGINT(10),
        genre_id: dataTypes.BIGINT(10),
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
    };
    const Movie = sequelize.define(alias, cols, config);

    ('use strict');
    const { Model } = require('sequelize');
    module.exports = (sequelize, DataTypes) => {
        class Movie extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                // define association here
                Movie.belongsTo(Genre, {
                    as: 'genres', // TAL CUAL DEBE INCLUIRSE EN COMO include: [genres, ...]
                    foreignKey: 'genre_id', // PERTENECE A... REFIERE A OTRO (genre_id)
                }),
                    Movie.belongsToMany(Actor, {
                        as: 'actors',
                        through: 'actor_movie',
                        foreignKey: 'movie_id',
                        otherKey: 'actor_id',
                    });
            }
        }
        Movie.init(
            {
                // ESCRIBIR AQUI TODOS LOS ITEMS DE TU TABLA PARA QUE SE MUESTREN EN NAVEGDOR
                name: DataTypes.STRING,
            },
            {
                sequelize,
                modelName: 'Movie',
            }
        );
        return Movie;
    };

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    return Movie;
};
