export default (sequelize: any, DataTypes: any) => {
  const district = sequelize.define(
    "districts",
    {
      id: {
        type: DataTypes.CHAR(7),
        allowNull: false,
        primaryKey: true,
      },
      regency_id: {
        type: DataTypes.CHAR(4),
        allowNull: false,
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
      tableName: "districts",
    }
  );
  return district;
};
