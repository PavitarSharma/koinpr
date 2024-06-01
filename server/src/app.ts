import express, { Application } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import path from "path";
import morgan from "morgan"
import { errorHandler } from "./middlewares";
import routes from "./routes"

dotenv.config();

const app: Application = express();

app.use(
    cors({
        origin: [process.env.CLIENT_URL as string, "*"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", async (req, res) => {
    // await redisClient.set('foo', 'bar');
    res.status(200).json({
        status: 200,
        message: "Application is running successfully",
    });
});

app.use("/api", routes);

app.use("*", (req, res) => {
    res.status(404).json({
        status: 404,
        message: "Route not found",
    });
});

app.use(errorHandler);


export default app