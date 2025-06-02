function createSnow(){
  const el = document.createElement("div")
  el.classList.add('snow')
  document.body.appendChild(el)
  el.style.marginLeft = Math.floor(Math.random()*window.innerWidth) + 'px'
}

for(let i = 0; i < 300; i++){
  createSnow()
}