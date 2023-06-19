import logo from './logo.svg';
import './App.css';
import { askForPermissionToReceiveNotifications } from './push-notification';
import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';

function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="App">
      <Toast onClose={() => setShow(true)} show={show} delay={3000} autohide animation style={{
        position: 'absolute',
        top: 20,
        right: 20,
        minWidth: 200
      }}>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded mr-2"
            alt=""
          />
          <strong className="mr-auto">"testing"</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>"notification body"</Toast.Body>
      </Toast>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={askForPermissionToReceiveNotifications} >
          Click to receive notifications
        </button>
      </header>
    </div>
  );
}

export default App;