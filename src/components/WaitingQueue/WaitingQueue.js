import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { Link, Redirect } from "react-router-dom";

let initUsersState = [
  { uuid: 1, name: "poomwarawat" },
  { uuid: 2, name: "kaiky" },
  { uuid: 3, name: "mephoo" },
];

let socket;
let ENDPOINT = "localhost:5000";

export default function WaitingQueue({ location, history }) {
  const [users, setUsers] = useState(initUsersState);
  const [uuid, setUUID] = useState("");
  const [myProfile, setMyProfile] = useState(null);
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    const { uuid } = queryString.parse(location.search);
    setMyProfile(users[uuid - 1]);
    setUUID(users[uuid - 1].uuid);
  }, [uuid]);

  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);

  useEffect(() => {
    const { uuid } = queryString.parse(location.search);
    const toId = uuid;
    socket.emit("waiting-queue", { toId }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("receive-queue", (message) => {
      setQueues((myqueues) => [...myqueues, message]);
    });
  }, []);

  const handleClickToRoom = (e) => {
    let id = e.target.id;
    const roomId = id.split("-")[0];
    const fromId = id.split("-")[1];
    history.push(`room/${roomId}`);
    triggerRoom(roomId, fromId);
  };

  const triggerRoom = (roomId, fromId) => {
    socket.emit("sending-room", { roomId, fromId });
  };

  return (
    <div>
      {myProfile !== null && (
        <div>
          <h1>name : {myProfile.name}</h1>
          <p>uuid : {uuid}</p>
        </div>
      )}
      <hr />
      <h3>My queue</h3>
      {queues.length > 1 &&
        queues.map((queue, index) => {
          return (
            index > 0 && (
              <div key={index}>
                <h1>fromId : {queue.fromId}</h1>
                <p>roomId : {queue.roomId}</p>
                <button
                  id={`${queue.roomId}-${queue.fromId}`}
                  onClick={handleClickToRoom}
                >
                  Go
                </button>
              </div>
            )
          );
        })}
    </div>
  );
}
