/*
PM2란 Node.js 어플리케이션을 쉽게 관리할 수 있게 해주는 Process Manager이다. Node.js 어플리케이션을
cluster mode 로 실행시킨다거나, 메모리가 넘친다거나, 오류로 인해 프로세스가 종료되는 등의 상황에
직면했을 때 각각의 상황을 사용자가 모두 신경 써서 처리해줄 수도 있지만, 너무 복잡하고 신경 써야 할 일들이
많아진다 이럴 때 쓰는 것이 PM2이다.
싱글 쓰레드로 도는 Node.js를 멀티 쓰레드로 구동시켜준다
또한 다시 실행시킬 필요 없이 해당 Main에서 수정이 일어나면 자동으로 reload해준다.

PM2 
1) 설치방법
npm install pm2 -g  명령어 입력

2) 시작방법
pm2 start app.js
pm2 start main.js --watch

3) 모니터링 방법
pm2 monit
*/
