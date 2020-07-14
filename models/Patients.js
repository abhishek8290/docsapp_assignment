module.exports = (sequelize, DataTypes) => {
    const Patients_abhishek = sequelize.define( "Patients_abhishek" , {
        name: {
            type:   DataTypes.STRING,
            allowNull:  false
        },
        age:{
            type:   DataTypes.INTEGER
        },
        gender: {
            type:   DataTypes.STRING
        },
        walletAmount: {
            type:   DataTypes.INTEGER
        }

    });
    return Patients_abhishek;
};