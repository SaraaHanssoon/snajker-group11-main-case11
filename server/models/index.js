const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "mysql", 
  host: "localhost",
  database: "newdb", 
  username: "newuser",
  password: "newpassword",
  port: 3307, 
  logging: console.log, 
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const Cart = require("./cart")(sequelize, DataTypes);
const CartItem = require("./cartItem")(sequelize, DataTypes);
const Deal = require("./deal")(sequelize, DataTypes);
const Order = require("./order")(sequelize, DataTypes);
const OrderItem = require("./orderItem")(sequelize, DataTypes);
const Product = require("./product")(sequelize, DataTypes);
const Review = require("./review")(sequelize, DataTypes);
const User = require("./user")(sequelize, DataTypes);
const Category = require("./category")(sequelize, DataTypes);

User.hasMany(Cart, { foreignKey: "fk_userid" });
Cart.belongsTo(User, { foreignKey: "fk_userid" });

Cart.hasMany(CartItem, { foreignKey: "fk_cartid" });
CartItem.belongsTo(Cart, { foreignKey: "fk_cartid" });

Product.hasMany(CartItem, { foreignKey: "fk_productid" });
CartItem.belongsTo(Product, { foreignKey: "fk_productid" });

Product.hasMany(Deal, { foreignKey: "fk_productid" });
Deal.belongsTo(Product, { foreignKey: "fk_productid" });

Product.hasMany(Review, { foreignKey: "fk_productid" });
Review.belongsTo(Product, { foreignKey: "fk_productid" });

User.hasMany(Review, { foreignKey: "fk_userid" });
Review.belongsTo(User, { foreignKey: "fk_userid" });

Category.hasMany(Product, { foreignKey: "fk_categoryid" });
Product.belongsTo(Category, { foreignKey: "fk_categoryid" });

User.hasMany(Order, { foreignKey: "fk_userid" });
Order.belongsTo(User, { foreignKey: "fk_userid" });

Order.hasMany(OrderItem, { foreignKey: "fk_orderid" });
OrderItem.belongsTo(Order, { foreignKey: "fk_orderid" });

Product.hasMany(OrderItem, { foreignKey: "fk_productid" });
OrderItem.belongsTo(Product, { foreignKey: "fk_productid" });

sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((err) => {
    console.error('Error syncing the database:', err);
  });

module.exports = {
  sequelize,
  Cart,
  CartItem,
  Deal,
  Order,
  OrderItem,
  Product,
  Review,
  User,
  Category
};
