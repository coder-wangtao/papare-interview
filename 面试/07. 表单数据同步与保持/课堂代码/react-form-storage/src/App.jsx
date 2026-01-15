import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Page1 from "./views/Page1";
import Page2 from "./views/Page2";
import Page3 from "./views/Page3";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/page1" replace />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
      </Routes>
    </Router>
  );
};

export default App;
