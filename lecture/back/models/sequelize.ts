/* class Sequelize */
import { Sequelize } from 'sequelize';

import config from '../config/config';

/* process.env_NODE_ENV가 어떤 타입이 될지를 ts가 유추 못하기때문에 지정 */
const env = (process.env.NODE_ENV as 'production' | 'test' | 'development') || 'development';
const { database, username, password } = config[env];
/* instance sequelize */
const sequelize = new Sequelize(database, username, password, config[env]);

export { sequelize };
export default sequelize;
