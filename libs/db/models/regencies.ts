export default (sequelize: any, DataTypes: any) => {
  const regency = sequelize.define(
    "regencies",
    {
      id: {
        type: DataTypes.CHAR(4),
        allowNull: false,
        primaryKey: true,
      },
      province_id: {
        type: DataTypes.CHAR(2),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "regencies",
    }
  );
  return regency;
};
