//Förberett för vidare arbete med webbsidan
module.exports = (sequelize, DataTypes) => {
	const Review = sequelize.define('Review', {
	  review_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	  },
	  fk_userid: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	  rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	  comment: {
		type: DataTypes.TEXT,
		allowNull: true,
	  },
	  fk_productid: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	});
  
	Review.associate = (models) => {
	  Review.belongsTo(models.User, { foreignKey: 'fk_userid' });
	  Review.belongsTo(models.Product, { foreignKey: 'fk_productid' });
	};
  
	return Review;
  };
  