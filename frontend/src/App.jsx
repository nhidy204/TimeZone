import { useState, useEffect } from "react";

function App() {
  const [calories, setCalories] = useState([]);
  const [value, setValue] = useState("");

  const fetchCalories = async () => {
    const res = await fetch("http://localhost:5000/api/calories");
    const data = await res.json();
    setCalories(data);
  };

  useEffect(() => {
    fetchCalories();
  }, []);

  const addCalorie = async () => {
    const body = {
      calories: Number(value),
      createdAt: new Date().toISOString()
    };

    await fetch("http://localhost:5000/api/calories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    setValue("");
    fetchCalories();
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleString();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Calorie Tracker</h2>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Calories"
      />

      <button onClick={addCalorie}>Add</button>

      <h3>History</h3>

      {calories.map((item) => (
        <div key={item._id}>
          {item.calories} kcal - {formatTime(item.createdAt)}
        </div>
      ))}
    </div>
  );
}

export default App;