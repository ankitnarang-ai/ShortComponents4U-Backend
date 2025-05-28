import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import cors from 'cors';
import morgan from 'morgan';


dotenv.config();

export const app = express();

// const allowedOrigins = ['http://localhost:4200', 'https://www.shortcomponents4u.com'];

// const corsOptions: cors.CorsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, 
// };

// app.use(cors(corsOptions)); 

app.use(cors({
  origin: true,           // Reflects the request origin
  credentials: true       // Important: allows cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());

app.use(morgan('dev'));

app.use("/authentication", authRouter);
app.use("/user", userRouter);

/** Global Error handling */
app.use( "/", ( error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction ) => {
    if (error instanceof Error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
