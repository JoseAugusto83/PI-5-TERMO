import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    {
        dialect: "mysql",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // necessário para conectar ao Railway
            },
        },
        database: process.env.MYSQL_DB as string,
        username: process.env.MYSQL_USER as string,
        password: process.env.MYSQL_PASSWORD as string,
        host: process.env.MYSQL_HOST as string,
        port: parseInt(process.env.MYSQL_PORT as string)
    }
)

export default sequelize;