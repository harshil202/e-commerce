import { Sequelize } from 'sequelize';

const sequelizeConnection = new Sequelize('postgres', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres'
});

export default sequelizeConnection;