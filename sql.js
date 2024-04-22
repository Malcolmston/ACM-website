const { Sequelize, DataTypes} = require('sequelize');

const path = require('path');
const fs = require('fs');

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


  async function add () {
    let arr = fs.readdirSync("events");
    /*
    ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
*/

    arr = arr.map(async function (fname) {
      let  data = fs.readFileSync( "events/"+fname, { encoding: 'utf8', flag: 'r' });
      switch(fname) {
        case "a.svg":
          return await addEvent("headquater of electronic arts", new Date(2024, 2, 21, 0,0,0), new Date(2024, 2, 21, 13,0,0), new Date(2024, 2, 21, 17,0,0), data);
        case "b.svg": 
          return await addEvent("orlando code camp", new Date(2024, 1, 24, 0,0,0), new Date(2024, 1, 24, 7,30,0), new Date(2024, 2, 21, 18,0,0), data);
        case "c.svg":
          return await addEvent("social", new Date(2024, 0, 24,0,0,0), new Date(2024, 0, 24,  17,15,0), null, data);
        case "d.svg":
          return await addEvent("computer science alumni panel", new Date(2023, 2, 29, 0,0,0), new Date(2023, 2, 29, 13,0,0), new Date(2023, 2, 29, 14,15,0), data);
        case "e.svg":
            return await addEvent("research particimant", null, null, null, data);
        case "f.svg":
            return await addEvent("A conversation with", new Date(2023, 9, 28, 0, 0,0), new Date(2023, 9, 28, 12, 30,0), new Date(2023, 9, 28, 13, 30,0),data)
        default:
          return false;
      }

    })

    let a = (await Promise.all(arr));
    if( a.filter(_ => _).length != a.length ) return false;
    return true;
  }

export default async function getData () {
    return await Events.findAll({attributes: ['id', 'data', 'name'], raw: true});
  }


  (async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

      await sequelize.sync({ force: true });

      console.log( await add() );
  })();