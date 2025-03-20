//Förberett för vidare arbete med webbsidan
module.exports = (sequelize, DataTypes) => {
	const OrderItem = sequelize.define('OrderItem', {
	  orderitem_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	  },
	  fk_orderid: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	  quantity: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	  price: {
		type: DataTypes.DECIMAL(10, 0),
		allowNull: false,
	  },
	  fk_productid: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	});
  
	OrderItem.associate = (models) => {
	  OrderItem.belongsTo(models.Order, { foreignKey: 'fk_orderid' });
	  OrderItem.belongsTo(models.Product, { foreignKey: 'fk_productid' });
	};
  
	return OrderItem;
  };
  