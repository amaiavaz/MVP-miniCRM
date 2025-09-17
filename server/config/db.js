import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db = null;

export const getDatabase = async () => {
  if (!db) {
    db = await open({
      filename: './database.db',
      driver: sqlite3.Database
    });
  }
  return db;
};

const executeQuery = async (sql, values = []) => {
  try {
    const database = await getDatabase();
    
    if (sql.trim().toLowerCase().startsWith('select')) {
      return await database.all(sql, values);
    } else {
      return await database.run(sql, values);
    }
  } catch (error) {
    throw error;
  }
};

const initDatabase = async () => {
  try {
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS user (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        lastname TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone_number TEXT NOT NULL,
        company TEXT
      )
    `);

    await executeQuery(`
      CREATE TABLE IF NOT EXISTS opportunity (
        opportunity_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        status INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
      )
    `);

    console.log('Tablas creadas correctamente');
  } catch (error) {
    console.error(error);
  }
};

export { initDatabase };
export default executeQuery;
