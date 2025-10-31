import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import experienceRoutes from "./routes/experience.routes";
import bookingRoutes from "./routes/booking.routes"
import promoRoutes from "./routes/promo.routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/experiences", experienceRoutes);
app.use("/bookings", bookingRoutes);
app.use("/promo", promoRoutes);

app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

export default app;
