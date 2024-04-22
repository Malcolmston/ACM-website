const { Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db'
  });
  

  const Events = sequelize.define('events', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    file: {
        type: DataTypes.BLOB
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    start: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    from: {type: DataTypes.DATE},
    to: {type: DataTypes.DATE}
  });
  
  (async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

      await sequelize.sync({ force: true });

  })();