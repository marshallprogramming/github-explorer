import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Favourites from "./pages/Favourties";
import Details from "./pages/Details";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/pokemon/:id" element={<Details />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
