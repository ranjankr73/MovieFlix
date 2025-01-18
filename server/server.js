const express = require(`express`);
const cookieParser = require('cookie-parser');
const cors = require('cors');
require("dotenv").config();

const { connectDB } = require("./config/dbConfig");

const app = express();

connectDB();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const userRoute = require("./routes/usersRoute");
const moviesRoute = require("./routes/moviesRoute");
const theatresRoute = require("./routes/theatresRoute");
const bookingsRoute=require("./routes/bookingsRoute");

app.use("/api/users", userRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/theatres", theatresRoute);
app.use("/api/bookings", bookingsRoute);

app.listen(process.env.PORT, () => {
    console.log(`Started... on port ${process.env.PORT}`);
});
