const numbersDiv = document.querySelector(".numbers")
const drawButton = document.querySelector("#draw")
const resetButton = document.querySelector("#reset")

const lottoNumbers = []
const colors = ["orange", "blue", "red", "gray", "green"]

function paintNumber(number){
  let colorIndex = Math.floor(number/10) // 번호 대 마다 색상설정 
  const eachNumDiv = document.createElement("div") //div요소 생성
  eachNumDiv.style.backgroundColor = colors[colorIndex] // eachnumdiv의 배경 색 변경
  eachNumDiv.classList.add('eachnum') // 생성된 div요소에 eachnum 클래스 부여
  eachNumDiv.textContent = number // textcontent 설정
  numbersDiv.appendChild(eachNumDiv) // eachnumdiv를 numberdiv의 자식으로
}
drawButton.addEventListener('click', function(){
  while(lottoNumbers.length < 6){
    let ran = Math.floor(Math.random() * 45) + 1
    if(lottoNumbers.indexOf(ran) === -1){ //중복 방지
      lottoNumbers.push(ran)
      paintNumber(ran)  
    }
  }
  console.log(lottoNumbers)
})

resetButton.addEventListener('click', function(){
  lottoNumbers.splice(0,6) // 0번부터 6번 인덱스를 지움
  numbersDiv.innerHTML = "" //numbersdiv안에 있는 html코드를 없앰

})
