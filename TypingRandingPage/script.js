let target = document.querySelector("#dynamic")
let stringArr = ["Learn to HTML", "Learn to CSS", "Learn to JAVASCRIPT"]
let selectString = stringArr[Math.floor(Math.random() * stringArr.length)]
let selectStringArr = selectString.split("") //단어 하나하나를 배열에 저장

// 한글자씩 텍스트 출력
function dynamic(randomArr){
  if(randomArr.length > 0){
    target.textContent += randomArr.shift();
    setTimeout(function(){
      dynamic(randomArr)
    },80)
  }
  else{
    setTimeout(resetTyping,3000)
  }
}

//타이핑 리셋
function resetTyping(){
  target.textContent=""
  dynamic(randomString())
}

function randomString(){
  let stringArr = ["Learn to HTML", "Learn to CSS", "Learn to JAVASCRIPT"]
  let selectString = stringArr[Math.floor(Math.random() * stringArr.length)]
  let selectStringArr = selectString.split("") //단어 하나하나를 배열에 저장

  return selectStringArr
}

dynamic(randomString())


//커서 깜빡임 효과
function blink(){
  target.classList.toggle("active");
}
setInterval(blink,500)