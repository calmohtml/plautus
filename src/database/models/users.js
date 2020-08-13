module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'User',
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            avatar: DataTypes.STRING,
            membership_id: DataTypes.INTEGER,
            rol_id: DataTypes.INTEGER,
            deleted_at: DataTypes.DATE
        },
        {
            timestamps: false
        },
    );
    user.associate = (models) => {
        user.belongsTo(models.Membership, {
            as: 'membership',
            foreignKey: 'membership_id',
        });
        user.belongsTo(models.Rol, {
            as: 'rol',
            foreignKey: 'rol_id',
        });
    }
    return user
}