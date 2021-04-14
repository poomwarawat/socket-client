import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button } from "reactstrap";
import io from "socket.io-client";

let socket;
let endpoint = "localhost:5000";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [UUID] = useState("60080501666");

  useEffect(() => {
    const initSocket = () => {
      socket = io(endpoint);
    };
    initSocket();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/get-doctors");
        const { data } = await res;
        setDoctors(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctors();
  }, []);

  const handleQueueDoctor = async (e) => {
    const uuid = e.target.id;
    const fromId = UUID;
    socket.emit("getting-room", { uuid, fromId });
  };
  return (
    <div>
      <h1>Doctor list page</h1>
      <hr />
      <Row>
        {doctors.length > 0 &&
          doctors.map((doctor, index) => {
            return (
              <Col md={3} key={index}>
                <h3>Name : {doctor.name}</h3>
                <p>UUID : {doctor.uuid}</p>
                <Button
                  color="primary"
                  id={doctor.uuid}
                  onClick={handleQueueDoctor}
                >
                  Queue
                </Button>
              </Col>
            );
          })}
      </Row>
    </div>
  );
}
