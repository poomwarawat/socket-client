import React from "react";

import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import DoctorList from "./components/DoctorList/DoctorList";
import WaitingQueue from "./components/WaitingQueue/WaitingQueue";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
      <Route path="/doctor-list" component={DoctorList} />
      <Route path="/waiting-queue" component={WaitingQueue} />
    </Router>
  );
};

export default App;
