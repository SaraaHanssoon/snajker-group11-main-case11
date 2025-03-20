//Förberett för vidare arbete med webbsidan
module.exports = (sequelize, DataTypes) => {
	const Order = sequelize.define('Order', {
	  order_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	  },
	  fk_userid: {
		type: DataTypes.INTEGER,
		allowNull: false,
	  },
	  total_price: {
		type: DataTypes.DOUBLE,
		allowNull: false,
	  },
	  status: {
		type: DataTypes.TEXT,
		allowNull: false,
	  },
	}, {
	  timestamps: true, 
	  createdAt: 'created_at', 
	  updatedAt: 'updated_at',
	  defaultScope: {
		attributes: { exclude: ['createdAt', 'updatedAt'] },
	  },
	});
  
	Order.associate = (models) => {
	  Order.belongsTo(models.User, { foreignKey: 'fk_userid' });
	  Order.hasMany(models.OrderItem, { foreignKey: 'fk_orderid' });
	};
  
	return Order;
  };
  