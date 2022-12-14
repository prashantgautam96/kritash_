const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const eventRoute = require("./routes/events");
const postRoute = require("./routes/posts");
const teamRoute = require("./routes/team");
const bloodRoute = require("./routes/blood");
const aksharsala = require("./routes/aksharshalafront");
const categoryRoute = require("./routes/categories");
const getInRoute = require("./routes/getin");
const joinRoute = require("./routes/join");
const testimonialRoute = require("./routes/testimonial");
const path = require("path");
const cors = require("cors");
const { deserializeUser } = require("./middleware/deserializerUser");
const helmet = require("helmet");
// to access dotenv data++ to read json file++ to take static data
dotenv.config();
// app.use(cors);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(express.urlencoded({ extended: true }));
app.use("/api/image", express.static(path.join(__dirname, "./images/user")));
app.use(deserializeUser);
// connecting to the mongoDB database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/events", eventRoute);
app.use("/api/teams", teamRoute);
app.use("/api/getin", getInRoute);
app.use("/api/join", joinRoute);
app.use("/api/akshar", aksharsala);

app.use("/api/blood", bloodRoute);
app.use("/api/testimonial", testimonialRoute);
app.use("/api/categories", categoryRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Backend is running.");
  console.log(`Port ${PORT}...`);
});
