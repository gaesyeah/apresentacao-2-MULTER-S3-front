import axios from "axios";
import { useState } from "react";
import { styled } from "styled-components";

function App() {

  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const sendFile = async (URL) => {
    if (!file || loading) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await axios.post(`http://localhost:5000/${URL}`, formData);
      console.log(data);
      setLoading(false);
    } catch ({ response }) {
      console.log(response.data.message);
      setLoading(false);
    }
  }

  const getFile = async () => {
    if (!file || loading) return;

    setLoading(true);
    
    try {
      console.log(file.name);
      const { data } = await axios.get(`http://localhost:5000/uploadS3/${file.name}`);
      console.log(data);
      setLoading(false);
    } catch ({ response }) {
      console.log(response.data.message);
      setLoading(false);
    }
    
  }

  const fileFromInput = (e) => {
    const eventFile = e.target.files[0];
    console.log(eventFile);
    setFile(eventFile);
  }

  return (
    <StyledBody>
      <div>
        <input onChange={(e) => fileFromInput(e)} type="file"></input>
        <button onClick={() => sendFile('upload')}>{loading ? 'carregando...' : 'upload'}</button>
        <button onClick={() => sendFile('uploadS3')}>{loading ? 'carregando...' : 'uploadS3'}</button>
        <button onClick={getFile}>{loading ? 'carregando...' : 'getS3'}</button>
      </div>
    </StyledBody>
  )
}

export default App

const StyledBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  div{
    padding: 15px;
    width: 300px;
    height: autopx;
    background-color: lightgray;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    button:nth-child(4){
      background-color: gray;
    }
    button{
      margin-top: 10px;
      width: 100px;
      height: 30px;
      background-color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      &:hover{
        opacity: 0.75;
      }
    }
  }
`
