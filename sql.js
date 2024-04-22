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
  
/**
 * a function desigend to allow users to create events
 * @param {String} name the name of the event
 * @param {Date} start the date that the event occurred
 * @param {Data} from the starting time. this can be the same as the data, however this can be more specivic, incliding the exact timestamp
 * @param {Data} to the ending time of this event
 * @param {Blob} file a file to show the event off
 * @returns {Boolean} true if the event was successfully created and false otherwise
 */
  async function addEvent (name, start, from, to, file) {
    try {
    await Events.create({name, start, from, to, file})
    return true
    } catch (e) {
        return false;
    }
  }

  (async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

      await sequelize.sync({ force: true });

  })();