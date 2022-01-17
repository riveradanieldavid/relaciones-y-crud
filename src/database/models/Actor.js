module.exports = (sequelize, dataTypes) => {
    let alias = 'Actor';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        first_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3, 1),
            allowNull: false
        },
        favorite_movie_id: dataTypes.BIGINT(10).UNSIGNED
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Actor = sequelize.define(alias, cols, config);






    'use strict';
    const {
        Model
    } = require('sequelize');
    module.exports = (sequelize, DataTypes) => {
        class Actor extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                // define association here
                Actor.belongsToMany(Movie, {
                    as: 'movies',
                    through: 'actor_movie',
                    foreignKey: 'actor_id',
                    otherKey: 'movie_id'
                })
            }
        };
        Actor.init({ // ESCRIBIR AQUI TODOS LOS ITEMS DE TU TABLA PARA QUE SE MUESTREN EN NAVEGDOR
            name: DataTypes.STRING
        }, {
            sequelize,
            modelName: 'Actor',
        });
        return Actor;
    };




    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie)

    return Actor
};