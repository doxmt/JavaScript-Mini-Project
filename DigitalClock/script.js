const todayDiv = document.getElementById("today")
const timeDiv = document.getElementById("time")
const button = document.querySelector("button")

let showMili = false
button.addEventListener('click', function(){
  showMili = !showMili
})

todayDiv.textContent = "나는 날짜"
timeDiv.textContent = "나는 시간"

function getTime(){
  let now = new Date();
  timeDiv.textContent = now;
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let mili = now.getMilliseconds();

  month = month < 10 ? `0${month}` : month
  date = date < 10 ? `0${date}` : date
  hour = hour < 10 ? `0${hour}` : hour
  minute = minute < 10 ? `0${minute}` : minute
  second = second < 10 ? `0${second}` : second



  todayDiv.textContent = `${year}년 ${month}월 ${date}일`
  if(showMili){
    timeDiv.textContent = `${hour}시 ${minute}분 ${second}초 ${mili}`
  }else{
    timeDiv.textContent = `${hour}시 ${minute}분 ${second}초`
  }

  
  
}


getTime()
setInterval(getTime,10)
