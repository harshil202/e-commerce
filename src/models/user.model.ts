import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../db/db";

interface UserInterface {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface UserInput extends Optional<UserInterface, 'id'> { }
export interface UserOutput extends Required<UserInterface> { }

export class UserModel extends Model<UserInterface, UserInput> implements UserInterface {
    public id!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;

    public readonly createdAt?: Date | undefined;
    public readonly updatedAt?: Date | undefined;
    public readonly deletedAt?: Date | undefined;
}

UserModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelizeConnection,
    paranoid: true,
    tableName: 'user'
})
