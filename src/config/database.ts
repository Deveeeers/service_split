import mysql from 'mysql2/promise'

export const connectToDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        })
        console.log('MySQL connection successful.')
        await connection.end()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error connecting to MySQL:', error.message)
    }
}
