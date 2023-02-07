import "./App.css";
import React, { useEffect, useState } from "react";
import Users from "./Types/Users";

const PSDComponent: React.FC = () => {
  const [file, setFile] = useState(null);

  const handleFileInput = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    fetch("/getpsd", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        // Do something with the data received from the server
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileInput} />
      <button type="submit">Submit</button>
    </form>
  );
};

function App() {
  const [data, setData] = useState<Users>();

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then(setData);
  }, []);

  return <PSDComponent />;
}

export default App;
