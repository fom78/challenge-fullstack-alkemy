import Operation from './Operations'
import Category from './Categories'
import User from './Users'

Operation.belongsTo(Category, { foreignKey: 'category_id' })
Category.hasOne(Operation, { foreignKey: 'category_id' })

Operation.belongsTo(User, { foreignKey: 'user_id' })
User.hasOne(Operation, { foreignKey: 'user_id' })

export { Category, Operation, User }
