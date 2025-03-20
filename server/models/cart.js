module.exports = (sequelize, DataTypes) => {
	const Cart = sequelize.define("Cart", {
	  cart_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	  },
	  fk_userid: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	});
  
	Cart.associate = (models) => {
	  Cart.belongsTo(models.User, { foreignKey: "fk_userid" });
	  Cart.hasMany(models.CartItem, { foreignKey: "fk_cartid" });
	};
  
	return Cart;
  };
  