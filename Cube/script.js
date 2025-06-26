document.querySelectorAll('.face > div').forEach(tile => {
  const arrowsContainer = document.createElement('div');
  arrowsContainer.classList.add('arrows');

  const directions = ['up', 'down', 'left', 'right'];
  const symbols = { up: '↑', down: '↓', left: '←', right: '→' };

  directions.forEach(dir => {
    const btn = document.createElement('button');
    btn.classList.add('arrow', dir);
    btn.innerText = symbols[dir];

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      alert(`방향: ${dir}, 타일 클래스: ${tile.className}`);
    });

    arrowsContainer.appendChild(btn);
  });

  tile.appendChild(arrowsContainer);
});

let rotateX = -25; 
let rotateY = 45; 

const cube = document.querySelector('.cube');
const buttons = document.querySelectorAll('.controls > button');

buttons.forEach(button => {
  button.addEventListener('click', function () {
    const className = this.className;

    if (className.includes('up')) {
      rotateX += 90;
    } else if (className.includes('down')) {
      rotateX -= 90;
    } else if (className.includes('left')) {
      rotateY -= 90; 
    } else if (className.includes('right')) {
      rotateY += 90; 
    }

    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
});

