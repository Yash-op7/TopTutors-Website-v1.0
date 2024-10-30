import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import userRouter from './routers/userRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());        // parse incoming json
app.use(helmet());              // set security headers on http reqs
app.use(cookieParser());        // set and parse cookies
app.use(cors({                  // allow cross origin requests
  origin: 'http://localhost:5173',
  credentials: true, // Allow credentials (cookies) 
}));

app.use('/test', (req, res) => {
    res.send('<h1>✅ Server is live.</h1>');
})

app.use('/users', userRouter);

export default app;