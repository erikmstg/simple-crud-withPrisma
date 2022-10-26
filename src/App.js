import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddData from "./components/AddData";
import EditData from "./components/EditData";
import Products from "./components/Products";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/add" element={<AddData />} />
          <Route path="/product/:id" element={<EditData />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
