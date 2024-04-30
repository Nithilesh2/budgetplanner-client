import "./App.css";
import Login from "./components/login";
import SignUp from "./components/signup";
import Expenses from "./components/expenses";
import Dashboard from "./components/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
