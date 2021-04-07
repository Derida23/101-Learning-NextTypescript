import Sequelize from "sequelize";

export default function (sequelize: Sequelize.Sequelize, DataTypes: any) {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(6),
        allowNull: false,
      },
      profile_photo: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      firstname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      middlename: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      verification_status: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      addr_province_code: {
        type: DataTypes.INTEGER(100),
        allowNull: true,
        defaultValue: 0,
      },
      addr_city_code: {
        type: DataTypes.INTEGER(100),
        allowNull: true,
        defaultValue: 0,
      },
      addr_district_code: {
        type: DataTypes.INTEGER(100),
        allowNull: true,
        defaultValue: 0,
      },
      address_main: {
        type: DataTypes.STRING(45),
        allowNull: true,
        defaultValue: "",
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      gender: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
      status: {
        type: DataTypes.INTEGER(2),
        allowNull: false,
        defaultValue: 1,
      },
      role: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: null,
      },
    },
    {
      tableName: "users",
    }
  );
  return users;
}
