const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Monster extends Model {}

Monster.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,           
        },
        name: {
            type: DataTypes.STRING,  
        },
        size: {
            type: DataTypes.STRING,     
        },
        category:{
            type: DataTypes.STRING,  
        },
        // may need to update this field and/or add additional attributes to work with the JSON -Research-
        armor_class: {
            type: DataTypes.JSON
        },
        hit_points: {
            type: DataTypes.JSON
        },
        // same for this JSON datatype , can be null
        speed: {
            type: DataTypes.JSON
        },
        strength: {
            type: DataTypes.JSON
        },
        dexterity: {
            type: DataTypes.JSON
        },
        constitution: {
            type: DataTypes.JSON
        },
        intelligence: {
            type: DataTypes.JSON
        },
        wisdom: {
            type: DataTypes.JSON
        },
        charisma: {
            type: DataTypes.JSON
        },
        saves: {
            type: DataTypes.JSON
        },
        skills: {
            type: DataTypes.JSON
        },
        resistances: {
            type: DataTypes.JSON
        },
        immunities: {
            type: DataTypes.JSON
        },
        conditions: {
            type: DataTypes.JSON
        },
        senses: {
            type: DataTypes.JSON
        },
        languages: {
            type: DataTypes.JSON
        },
        challenge: {
            type: DataTypes.STRING
        },
        proficiency: {
            type: DataTypes.STRING
        },
        traits: {
            type: DataTypes.JSON
        },
        actions: {
            type: DataTypes.JSON
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'monster',
    }
);

module.exports = Monster;