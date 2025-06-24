document.querySelectorAll('.face > div').forEach(tile => {
  const arrowsContainer = document.createElement('div');
  arrowsContainer.classList.add('arrows');

  const directions = ['up', 'down', 'left', 'right'];
  const symbols = { up: '↑', down: '↓', left: '←', right: '→' };

  directions.forEach(dir => {
    const btn = document.createElement('button');
    btn.classList.add('arrow', dir);
    btn.innerText = symbols[dir];

    // 클릭 이벤트 예시
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      alert(`방향: ${dir}, 타일 클래스: ${tile.className}`);
    });

    arrowsContainer.appendChild(btn);
  });

  tile.appendChild(arrowsContainer);
});
