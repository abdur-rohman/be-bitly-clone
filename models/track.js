'use strict';
module.exports = (sequelize, DataTypes) => {
  const track = sequelize.define('track', {
    short_url_id: DataTypes.INTEGER,
    ip_address: DataTypes.STRING,
    referrer_url: DataTypes.STRING
  }, {});
  track.associate = (models) => {
    track.belongsTo(models.short_url, {
      foreignKey: 'short_url_id',
      onUpdate: 'CASCADE'
    })
  };
  return track;
};