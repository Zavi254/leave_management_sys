import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import BookingPage from "./pages/BookingPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* </Route> */}
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
