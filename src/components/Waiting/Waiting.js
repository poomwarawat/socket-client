import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import { Button } from "reactstrap";

let endpoint = "localhost:5000";
let socket;

export default function Waiting({ location }) {
  const [uuid, setUUID] = useState(1);
  const [queues, setQueues] = useState([]);
  useEffect(() => {
    const getQueryString = () => {
      const { uuid } = queryString.parse(location.search);
      setUUID(uuid);
    };
    getQueryString();
  }, [location.search]);

  useEffect(() => {
    const initSocket = () => {
      socket = io(endpoint);
    };
    initSocket();
  }, []);

  useEffect(() => {
    const initWaitingRoom = () => {
      socket.emit("waiting-room", { uuid });
    };
    initWaitingRoom();
  }, [uuid]);

  useEffect(() => {
    const receiveQueue = () => {
      socket.on("queue", (message) => {
        if (message.roomId) {
          setQueues((queue) => [...queue, message]);
        }
      });
    };
    receiveQueue();
  }, []);
  return (
    <div>
      <h1>Waiting Queue {uuid}</h1>
      <hr />
      {queues.length > 0 &&
        queues.map((queue, index) => {
          return (
            <div key={index}>
              <h3>roomId : ${queue.roomId}</h3>
              <p>from : ${queue.fromId}</p>
              <Button id={queue.roomId} color="primary">
                Start
              </Button>
            </div>
          );
        })}
    </div>
  );
}
