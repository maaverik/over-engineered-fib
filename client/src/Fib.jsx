import React, { useEffect, useState } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndices, setSeenIndices] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues();
    fetchIndices();
  }, []);

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  };

  const fetchIndices = async () => {
    const seenIndices = await axios.get("/api/values/all");
    setSeenIndices(seenIndices.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("/api/values", {
      index,
    });
    setIndex("");
  };

  const renderSeenIndices = () => {
    return seenIndices.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Enter your index </label>
        <input
          value={index}
          onChange={(event) => setIndex(event.target.value)}
        />
        <button> Submit </button>
      </form>

      <h3> Indices I've seen: </h3>
      {renderSeenIndices()}

      <h3> Calculated values: </h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
