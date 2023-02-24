import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
// import Audio from "../../components/audio/audio";
import { Context } from "../../context/Context";
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [audio, setAudio] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioDetails, setAudioDetails] = useState({})
  const { user } = useContext(Context);


function  handleAudioStop(data){
    console.log(data)
    setAudioDetails(data);
}

function handleAudioUpload(file) {
    console.log(file);
    setAudio(file)
    console.log(audioUrl);
}

function handleCountDown(data) {
    console.log(data);
}

function handleReset() {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0
      }
    };
    setAudioDetails(reset);
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      audio,
      desc,
    };
    if (file) {
      // const data = new FormData();
      // const filename = Date.now() + file.name;
      // data.append("name", filename);
      // data.append("file", file);
      // newPost.photo = filename;
      console.log("Image is going to be uploaded");
      try {
        const base64 = await convertBase64(file);
        await axios.post("/upload", { image: base64 }).then((res) => {
          newPost.photo = res.data;
          console.log("Image Succesfully uploaded. The url is : ", res.data);
        });
      } catch (err) {
        console.log(err);
        console.log("Failed to upload the image");
      }
    }

    if (audio) {
      console.log("Audio is going to be uploaded");
      try {
        const base64 = await convertBase64(audio);
        await axios.post("/uploadAudio", { audio: base64 }).then((res) => {
          newPost.audio = res.data;
          console.log("audio Succesfully uploaded. The url is : ", res.data);
        });
      } catch (err) {
        console.log(err);
        console.log("Failed to upload the audio");
      }
    }

    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="write">
      <div className="imgcontent">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      
      </div>
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            name="file"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <p className="alink">Have difficulties framing sentences?
          <a href="https://app.inferkit.com/demo">Click here to generate text...</a>
      </p>
        <div className="content">

        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
      <Recorder
    record={true}
    title={"New recording"}
    audioURL={setAudioUrl}
    showUIAudio
    handleAudioStop={data => handleAudioStop(data)}
    handleAudioUpload={data => handleAudioUpload(data)}
    handleCountDown={data => handleCountDown(data)}
    handleReset={() => handleReset()}
    mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
    />
    </div>
  );
}
