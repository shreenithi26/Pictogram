const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const path = require("path");
const uploadImage = require("./routes/UploadImage");
const uploadAudio = require("./routes/UploadAudio")

dotenv.config();
app.use(
  express.json({
    limit: "10mb",
  })
);
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.post("/api/upload", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err)
    });
});

app.post("/api/uploadAudio", (req, res) => {
  uploadAudio(req.body.audio)
    .then((url) => res.send(url))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err)
    });
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});
