import { useEffect } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import WebFont from "webfontloader";

function App() {
  // loading font styles before the page gets load
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Footer />
    </Router>
  );
}
 
export default App;
