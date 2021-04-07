import config from "../config/config.json";
import mysql2 from "mysql2";
import users from "./users";
import district from "./districts";
import regency from "./regencies";
import province from "./provinces";

const Sequelize = require("sequelize");
const env = "development"; //this mode can setup in ENV and trigger obj config to access db condition
const db = {};

console.log(config[env]);

let sequelize = new Sequelize({
  ...config[env],
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    underscored: true,
    paranoid: true,
  },
  logging: (e) => {},
  dialectModule: mysql2,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.users = users(sequelize, Sequelize);
db.districts = district(sequelize, Sequelize);
db.regencies = regency(sequelize, Sequelize);
db.provinces = province(sequelize, Sequelize);

// <------ ##### Users X Address ##### ------> //

db.users.belongsTo(db.provinces, {
  foreignKey: "addr_province_code",
  targetKey: "id",
  as: "address_province",
});

db.users.belongsTo(db.regencies, {
  foreignKey: "addr_city_code",
  targetKey: "id",
  as: "address_city",
});

db.users.belongsTo(db.districts, {
  foreignKey: "addr_district_code",
  targetKey: "id",
  as: "address_district",
});

// ------>

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

export default db;
