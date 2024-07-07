const DB_NAME = process.env.DB_NAME || 'service_split_2';
export const config = {
  local: {
    username: process.env.DB_MYSQL_USER || 'admin',
    password: process.env.DB_MYSQL_PASS || 'admin123',
    database: process.env.DB_NAME || DB_NAME,
    host: process.env.DB_MYSQL_HOST || 'service-split.cjmeysg46ct0.ap-south-1.rds.amazonaws.com',
    port: process.env.DB_MYSQL_PORT || '3306',
    seederStorage: 'sequelize',
    dialect: 'mysql',
    logging: false,
  },
  dev: {
    username: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASS,
    database: process.env.DB_NAME || DB_NAME,
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT,
    seederStorage: 'sequelize',
    dialect: 'mysql',
    logging: false,
  },
};

export default config[process.env.ENV];
