module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
	  user_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	  },
	  name: {
		type: DataTypes.TEXT,
		allowNull: false,
	  },
	  email: {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true,
	  },
	  password: {
		type: DataTypes.TEXT,
		allowNull: false,
	  },
	  role: {
		type: DataTypes.TEXT,
		allowNull: false,
	  },
	});
  
	User.associate = (models) => {
	  User.hasMany(models.Order, { foreignKey: 'fk_userid' });
	  User.hasMany(models.Cart, { foreignKey: 'fk_userid' });
	  User.hasMany(models.Review, { foreignKey: 'fk_userid' });
	};
  
	return User;
  };
  