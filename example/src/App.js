import { useEffect, useState } from "react";
import "./App.css";
import FoodieReact from "foodie-react";

function App() {
  useEffect(() => {
    console.log(process.env);
  }, []);

  return (
    <div className="App">
      <h1>MY APP</h1>
      <p>TESTING</p>
      <FoodieReact
        GMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        environment={process.env.NODE_ENV}
        radius={5000}
      />
    </div>
  );
}

export default App;
