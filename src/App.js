import React from "react";

// import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import Doctors from "./components/Doctors/Doctors";
import Waiting from "./components/Waiting/Waiting";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/waiting-queue" component={Waiting} />
      <Route path="/doctor-list" component={Doctors} />
    </Router>
  );
};

export default App;
