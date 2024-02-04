// sw.js
self.addEventListener('install',(event)=>{
    event.waitUntil(self.skipWaiting());
})

self.addEventListener('activate',(event)=>{
    event.waitUntil(self.clients.claim());
})

self.addEventListener('push',(event)=>{
   const data = JSON.parse(event.data.text());
   console.log('메세지가?....', event.data.text());

   const option = {
    body: data.msg,
    icon:'1.jpg',    /* 제목옆에 작은 원형이미지 */
    image:'2.jpg',  /* 내용썸네일 */
    badge:'3.jpg',
    vibrate:[200,100,300],
    actions:[
        {action:'open', title:'자세히보기'},
        {action:'close', title:'닫기'}
    ],
    tag:'abc'
   }
   
   event.waitUntil(self.registration.showNotification('title', option));
})


self.addEventListener('notificationclick',(event)=>{
    // console.log(event)
    // console.log(clients)
    event.waitUntil(
        self.clients.matchAll().then(function(clientList) {
            console.log(clientList)
            if(event.action == 'open'){
                //자세히보기 
                return self.clients.openWindow('https://naver.com');
            }else{
                //닫기
                return event.notification.close();
            }
        })
    );
});
