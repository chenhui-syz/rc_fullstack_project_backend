import { DataTypes } from 'sequelize'
import { Column, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'userinfo',
})
export default class UserinfoModel extends Model<UserinfoModel> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      notEmpty: true,
    },
  })
  userid!: number
  @Column({
    type: DataTypes.STRING(30),
    field: 'username',
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  public username!: string
  @Column({
    type: DataTypes.STRING(20),
    field: 'psw',
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  psw!: string
  @Column({
    type: DataTypes.STRING(50),
    field: 'address',
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  address!: string
  @Column({
    type: DataTypes.TINYINT,
    field: 'valid',
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  valid!: number

  // token!: string
}
