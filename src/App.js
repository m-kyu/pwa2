import React from 'react';
import './App.css';
import axios from 'axios'

function App() {

  // https://github.com/mdn/serviceworker-cookbook/blob/master/push-clients/index.js
  // https://blog.hoseung.me/2021-11-28-web-push-notification
    function makeNoti() {
      if (Notification.permission === "denied" || Notification.permission === "default") {
        alert("알림이 차단된 상태입니다. 알림 권한을 허용해주세요.");
      } else {
    
        let notification = new Notification("test", { 
          body: "웹 알림 입니다.", 
          icon: `/lib/img/novalogo_copy.png`, 
          requireInteraction: true,
          //actions: [{ title: "Check", action: "check" }],
          tag: "notification-tag",
          renotify: true, // 알림 중첩 시 미작동 방지
        });
    
        //알림 클릭 시 이벤트
        notification.addEventListener("click", () => {
          window.open('https://www.naver.com/');
        });
    
      }
    }
    function aa(){
      if ("Notification" in window) {
        Notification.requestPermission().then((a)=>{
          //makeNoti()
          console.log('client  권한부여했음')
          
        });
      }else{
        console.log("이 브라우저는 알림을 지원하지 않습니다.");
      }
    }



  return (
    <div className="App">
      <button onClick={aa}>권한요청하기</button>      
      <button id="doIt">구독하기</button>      
      
    </div>
  );
}

export default App;
