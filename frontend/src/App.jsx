import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./HomePage.jsx";
import BoardPage from "./BoardPage.jsx";

function App() {
  const [isDark, setIsDark] = useState(false); // always starts off in light mode

  useEffect(() => {
    document.body.className = isDark ? "dark-mode" : "light-mode";
  }, [isDark]);

  const toggleMode = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<HomePage isDark={isDark} toggleMode={toggleMode} />}
          />
          <Route
            path="/board/:title/:id"
            element={<BoardPage isDark={isDark} toggleMode={toggleMode} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
