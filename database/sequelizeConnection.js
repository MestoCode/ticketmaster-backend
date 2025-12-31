const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // For AWS RDS, we typically don't verify the certificate
      },
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Export sequelize first to avoid circular dependency
module.exports.sequelize = sequelize;

// Import models to register them with Sequelize (after sequelize is exported)
const Admin = require('../schemas/admin');
const User = require('../schemas/user');
const Order = require('../schemas/order');

const connectDatabase = async () => {
  try {
    // Log connection attempt details (without password)
    console.log('Attempting to connect to database...');

    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync models to create tables if they don't exist
    // Note: sync() doesn't accept a 'tables' parameter - it syncs all registered models
    console.log('Synchronizing database tables...');
    try {
      await sequelize.sync({ alter: true }); // Creates tables if they don't exist, updates if they do
      console.log('Database tables synchronized successfully.');
    } catch (syncError) {
      // Handle unique constraint errors during sync (e.g., duplicate emails)
      if (
        syncError.name === 'SequelizeUniqueConstraintError' ||
        (syncError.original && syncError.original.code === '23505')
      ) {
        console.warn(
          'Warning: Could not add unique constraint due to existing duplicate data.'
        );
      } else {
        throw syncError; // Re-throw if it's a different error
      }
    }

    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    if (error.original) {
      console.error('Original error:', error.original.message);
      console.error('Error code:', error.original.code);
    }
    process.exit(1);
  }
};

module.exports.connectDatabase = connectDatabase;
