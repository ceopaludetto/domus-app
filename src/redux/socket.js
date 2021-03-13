import openSocket from "socket.io-client";

const socket = openSocket("http://192.168.1.2:3001");

export { socket };
