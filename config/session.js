import session from 'express-session';

const sessionMiddleware = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true, // Use HTTPS
    httpOnly: true, // Prevent client-side JavaScript access
    maxAge: 1000 * 60 * 60 * 24, // Session duration (1 day)
    domain: 'https://be-palembang-30.vercel.app'
  },
});

export default sessionMiddleware;