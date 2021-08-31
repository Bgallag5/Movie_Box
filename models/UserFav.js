const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class UserFav extends Model {}

UserFav.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    favorites: {      ////favorites are TITLES OF FAVORITE MOVIES stored in string, to be called in loop { Movie.findOne(where title = title)}; res.render('single-view')
      type: DataTypes.STRING,     ////also JSON might work?
      allowNull: false,
      get() {
        return this.getDataValue('favorites').split(';')
      },
      set(val) {
        this.setDataValue('favorites', val.join(';'));
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "userfav",
  }
);

module.exports = UserFav;


////i think UserFav should just be an Array of Movie models? only have user_id and favorites: Array