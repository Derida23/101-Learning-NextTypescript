export default (sequelize: any, DataTypes: any) => {
  const province = sequelize.define(
    "provinces",
    {
      id: {
        type: DataTypes.CHAR(2),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: "2020-06-08 14:48:52",
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: "2020-06-08 14:48:52",
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "provinces",
    }
  );
  return province;
};
