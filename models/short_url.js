'use strict';
module.exports = (sequelize, DataTypes) => {
  const short_url = sequelize.define('short_url', {
    title: DataTypes.STRING,
    short_url: DataTypes.STRING,
    url: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  short_url.associate = (models) => {
    short_url.belongsTo(models.user, {
      foreignKey: "user_id",
      onUpdate: "CASCADE"
    })
    short_url.hasMany(models.track, {
      foreignKey: "short_url_id",
      onUpdate: "CASCADE"
    })
  };
  return short_url;
};