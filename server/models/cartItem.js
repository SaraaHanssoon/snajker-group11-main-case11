module.exports = (sequelize, DataTypes) => {
	const CartItem = sequelize.define('CartItem', {
	  cartItem_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	  },
	  fk_cartid: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	  fk_productid: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	  quantity: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	});
  
	CartItem.associate = (models) => {
	  CartItem.belongsTo(models.Cart, { foreignKey: 'fk_cartid' });
	  CartItem.belongsTo(models.Product, { foreignKey: 'fk_productid' });
	};
  
	return CartItem;
  };
  