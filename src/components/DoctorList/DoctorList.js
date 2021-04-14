import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import "./DoctorList.css";

let socket;
let ENDPOINT = "localhost:5000";

let initUsersState = [
  { uuid: 1, name: "poomwarawat" },
  { uuid: 2, name: "kaiky" },
  { uuid: 3, name: "mephoo" },
];

export default function DoctorList({ location, history }) {
  const [myQueues, setMyQueues] = useState([]);
  const [fromId, setFromId] = useState("10");
  const [users] = useState(initUsersState);

  useEffect(() => {
    const { fromId } = queryString.parse(location.search);
    setFromId(fromId);
  }, [location.search]);

  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);

  useEffect(() => {
    socket.on("receive-queue", (message) => {
      //   console.log(message);
      //   setMyQueues((arr) => [...arr, message]);
    });
  }, []);

  const handleClick = (e) => {
    const toId = e.target.id;
    socket.emit("waiting-queue", { toId, fromId }, (error) => {
      if (error) {
        alert(error);
      }
    });
  };
  const handleClickToRoom = (e) => {
    const roomId = e.target.id;
    console.log(roomId);
  };

  useEffect(() => {
    const { fromId } = queryString.parse(location.search);
    socket.emit("sending-room", { fromId });
  }, []);

  useEffect(() => {
    socket.on("receive-room", (room) => {
      if (room.roomId) redirectToRoom(room.roomId);
    });
  }, []);

  const redirectToRoom = (roomId) => {
    history.push(`room/${roomId}`);
  };
  return (
    <div>
      <div>
        <h1>Doctor list</h1>
        {users.length > 0 &&
          users.map((user, index) => {
            return (
              <div key={index}>
                <h3>name : {user.name}</h3>
                <button onClick={handleClick} id={user.uuid}>
                  queue
                </button>
              </div>
            );
          })}
      </div>
      <hr />
      {myQueues.length > 0 &&
        myQueues.map((myQueue, index) => {
          return (
            <div key={index}>
              <p>message : {myQueue.message}</p>
              <button onClick={handleClickToRoom} id={myQueue.roomId}>
                to room
              </button>
            </div>
          );
        })}
    </div>
  );
}
