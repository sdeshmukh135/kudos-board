import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import BoardPage from "./BoardPage.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/board/:title/:id" element={<BoardPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
