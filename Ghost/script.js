const body = document.querySelector("body")
body.addEventListener("mousemove", function(e){
  console.log(e)
  const ghost = document.querySelector(".ghost")
  ghost.style.left = e.pageX + 'px';
  ghost.style.top = e.pageY + 'px';
})
// 이벤트객체 e로 마우스의 xy위치를 유령이 마우스를 따라다니도록

