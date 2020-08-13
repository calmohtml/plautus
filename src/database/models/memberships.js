module.exports = (sequelize, DataTypes) => {
    const membership = sequelize.define(
        'Membership',
        {
            name: DataTypes.STRING,
            deleted_at: DataTypes.DATE
        },
        {
            timestamps: false
        },
    );
    membership.associate = (models) => {
        membership.hasMany(models.User, {
            as: "users",
            foreignKey: 'membership_id'
        })
    }
    return membership
}
