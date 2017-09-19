import React, { Component } from 'react';
import io from 'socket.io-client';

let socket = null;

class ReactWebsocketsComponent extends Component {
  constructor(props) {
    super(props);

    socket = io(props.uri);
    Object.keys(props).forEach((prop) => {
      const match = prop.match(/on([a-zA-Z0-9]+)/);
      let service = match && typeof props[prop] === 'function' && match[1];

      if (service) {
        service = service.slice(0,1).toLowerCase() + service.slice(1);
        socket.on(service, props[prop]);
      }
    });
  }

  render() {
    return <span />
  }
}

export const emitMessage = (type, payload) => {
  if (!socket) return {
    success: false,
    error: 'I don`t have a socket to send message to.'
  }

  socket.emit(type, payload);
}

export default ReactWebsocketsComponent;
