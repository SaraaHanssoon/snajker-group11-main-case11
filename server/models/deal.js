//Förberett för vidare arbete med webbsidan
module.exports = (sequelize, DataTypes) => {
	const Deal = sequelize.define('Deal', {
	  deal_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	  },
	  description: {
		type: DataTypes.TEXT,
		allowNull: false,
	  },
	  discount: {
		type: DataTypes.DECIMAL(5, 2),
		allowNull: false,
	  },
	  fk_productid: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	});
  
	Deal.associate = (models) => {
	  Deal.belongsTo(models.Product, { foreignKey: 'fk_productid' });
	};
  
	return Deal;
  };
  