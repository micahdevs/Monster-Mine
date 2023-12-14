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
            allowNull: false,       
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,        
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,       
        },
        // may need to update this field and/or add additional attributes to work with the JSON -Research-
        armor_class: {
            type: DataTypes.JSON
        },
        hit_points: {
            type: DataTypes.INTEGER
        },
        hit_dice: {
            type: DataTypes.JSON
        },
        hit_points_roll: {
            type: DataTypes.STRING
        },
        // same for this JSON datatype
        speed: {
            type: DataTypes.JSON
        },
        strength: {
            type: DataTypes.INTEGER
        },
        dexterity: {
            type: DataTypes.INTEGER
        },
        constitution: {
            type: DataTypes.INTEGER
        },
        intelligence: {
            type: DataTypes.INTEGER
        },
        wisdom: {
            type: DataTypes.INTEGER
        },
        charisma: {
            type: DataTypes.INTEGER
        },
        // recommend simplification of this field object -consult Alan-
        proficiencies: {
            type: DataTypes.JSON
        },
        damage_vulnerabilites: {
            type: DataTypes.JSON
        },
        damage_resistances: {
            type: DataTypes.JSON
        },
        damage_immunities: {
            type: DataTypes.JSON
        },
        condition_immunities: {
            type: DataTypes.JSON
        },
        senses: {
            type: DataTypes.JSON
        },
        languages: {
            type: DataTypes.JSON
        },
        challenge_rating: {
            type: DataTypes.INTEGER
        },
        proficiency_bonus: {
            type: DataTypes.INTEGER
        },
        xp: {
            type: DataTypes.INTEGER
        },
        special_abilities: {
            type: DataTypes.JSON
        },
        actions: {
            type: DataTypes.JSON
        },
        legendary_actions: {
            type: DataTypes.JSON
        },
        // image file URL?
        image: {
            type: DataTypes.STRING
        },
        // api endpoint
        url: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'monster',
    }
);

module.exports = Monster;