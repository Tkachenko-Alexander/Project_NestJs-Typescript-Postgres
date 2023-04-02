import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { Role } from "./roles.model";
import { User } from "src/users/users.model";




@Table({tableName: 'user_roles', createAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {

    
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
    
}