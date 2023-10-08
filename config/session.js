import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import sequelize from './sequelize.js';

const SessionStore = SequelizeStore(session.Store);

// Configure the session store
const sessionStore = new SessionStore({
  db: sequelize, // Pass your Sequelize instance here
  expiration: 1000 * 60 * 60 * 24, // Session duration (1 day)
  checkExpirationInterval: 15 * 60 * 1000, // How frequently expired sessions are cleaned up (15 minutes)
  tableName: 'sessions', // Customize the name of the sessions table
});

// Create the session middleware
const sessionMiddleware = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: sessionStore, // Use the Sequelize session store
  cookie: {
    secure: true, // Use HTTPS
    httpOnly: true, // Prevent client-side JavaScript access
    maxAge: 1000 * 60 * 60 * 24, // Session duration (1 day)
  },
});
export default sessionMiddleware;