const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('newdb', 'newuser', 'newpassword', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
  port: 3307 
});

sequelize.authenticate()
  .then(() => {
    console.log("Anslutning lyckades!");
  })
  .catch((err) => {
    console.error("Kunde inte ansluta:", err);
  });
