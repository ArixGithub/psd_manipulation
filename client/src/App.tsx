import "./App.css";
import React, { useEffect, useState } from "react";
import Users from "./Types/Users";

function App() {
  const [data, setData] = useState<Users>();

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then(setData);
  }, []);

  console.log(data);

  return <div>{data?.users}</div>;
}

export default App;
