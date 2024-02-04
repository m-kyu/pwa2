import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Camera from './Camera';

function App() {

  useEffect(()=>{
    if(Notification.permission != 'granted'){
      Notification.requestPermission().then();
    }    
  },[])

  function msg(){
    navigator.serviceWorker.controller.postMessage({
      message:'Hello, service worker~~~'
    })
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <button id="msg">구독하기</button>
        <button id="msgDel">알림취소</button>



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
        
      </header>
    </div>
  );
}

export default App;
