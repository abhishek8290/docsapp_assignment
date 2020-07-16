module.exports = (sequelize, DataTypes) => {
    const Admin_abhishek = sequelize.define( "Admin_abhishek" , {
        name: {
            type:   DataTypes.STRING,
            allowNull:  false
        },
        email:{
            type:   DataTypes.STRING,
            allowNull:  false
        },
        password: {
            type:   DataTypes.STRING,
            allowNull:  false
        }

    });
    return Admin_abhishek;
};