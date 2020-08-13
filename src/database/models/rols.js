module.exports = (sequelize, DataTypes) => {
    const rol = sequelize.define(
        'Rol',
        {
            name: DataTypes.STRING,
            deleted_at: DataTypes.DATE
        },
        {
            timestamps: false
        },
    );
    rol.associate = (models) => {
        rol.hasMany(models.User, {
            as: "users",
            foreignKey: 'rol_id'
        })
    }
    return rol
}