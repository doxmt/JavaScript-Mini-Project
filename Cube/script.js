let cubeState = {
  front:  Array(9).fill("red"),     // 오른쪽이 정면
  left:   Array(9).fill("white"),   // 화면 왼쪽
  top:    Array(9).fill("blue"),    // 화면 위
  right:  Array(9).fill("yellow"),  // 보이지 않음 red 오른쪽편에있음
  back:   Array(9).fill("green"),   // 보이지 않음 red의 반대편
  bottom: Array(9).fill("orange"),  // 보이지 않음 아래에있음
};



// 2. face 클래스 이름 → cubeState 이름 매핑
const faceMap = {
  cube1: "front",
  cube2: "top",
  cube3: "back",
  cube4: "bottom",
  cube5: "right",
  cube6: "left"
};

// 3. 각 face > tile에 data-face, data-index 붙이기
document.querySelectorAll('.face').forEach(faceEl => {
  const classList = Array.from(faceEl.classList);
  const cubeClass = classList.find(cls => cls.startsWith("cube"));
  const faceName = faceMap[cubeClass];

  const tiles = faceEl.querySelectorAll('div');
  tiles.forEach((tile, index) => {
    tile.dataset.face = faceName;
    tile.dataset.index = index;
  });
});

// 4. 행 번호 추출 함수
function getRow(index) {
  return Math.floor(index / 3); // 0, 1, 2
}

const rowIndices = {
  0: [0, 1, 2],
  1: [3, 4, 5],
  2: [6, 7, 8]
};

// 5. 행을 오른쪽으로 회전시키는 함수
function rotateRowRight(row) {
  const idxs = rowIndices[row];

  const frontRow = idxs.map(i => cubeState.front[i]);
  const rightRow = idxs.map(i => cubeState.right[i]);
  const backRow  = idxs.map(i => cubeState.back[i]);
  const leftRow  = idxs.map(i => cubeState.left[i]);

  // left → front
  idxs.forEach((i, j) => cubeState.front[i] = leftRow[j]);
  // front → right
  idxs.forEach((i, j) => cubeState.right[i] = frontRow[j]);
  // right → back (역순)
  idxs.forEach((_, j) => cubeState.back[idxs[j]] = rightRow[2 - j]);
  // back → left (역순)
  idxs.forEach((_, j) => cubeState.left[idxs[j]] = backRow[2 - j]);

  // ✔ 올바른 면 회전
  if (row === 0) rotateFaceCounterClockwise("top");
  if (row === 2) rotateFaceClockwise("bottom");

  updateDOM();
}

function rotateRowLeft(row) {
  const idxs = rowIndices[row];

  const frontRow = idxs.map(i => cubeState.front[i]);
  const leftRow  = idxs.map(i => cubeState.left[i]);
  const backRow  = idxs.map(i => cubeState.back[i]);
  const rightRow = idxs.map(i => cubeState.right[i]);

  // right → front
  idxs.forEach((i, j) => cubeState.front[i] = rightRow[j]);
  // front → left
  idxs.forEach((i, j) => cubeState.left[i] = frontRow[j]);
  // left → back (역순)
  idxs.forEach((_, j) => cubeState.back[idxs[j]] = leftRow[2 - j]);
  // back → right (역순)
  idxs.forEach((_, j) => cubeState.right[idxs[j]] = backRow[2 - j]);

  // ✔ 올바른 면 회전
  if (row === 0) rotateFaceClockwise("top");
  if (row === 2) rotateFaceCounterClockwise("bottom");

  updateDOM();
}



function rotateFaceClockwise(face) {
  const old = cubeState[face].slice();
  const map = [6,3,0,7,4,1,8,5,2]; // 시계 방향 회전
  cubeState[face] = map.map(i => old[i]);
}

function rotateFaceCounterClockwise(face) {
  const old = cubeState[face].slice();
  const map = [2,5,8,1,4,7,0,3,6]; // 반시계 방향 회전
  cubeState[face] = map.map(i => old[i]);
}


// 6. DOM에 cubeState 반영
function updateDOM() {
  Object.entries(cubeState).forEach(([face, arr]) => {
    arr.forEach((color, i) => {
      let correctedIndex = i;

      // back face만 상하 반전 보정
      if (face === "back") {
        const flipIndex = [6, 7, 8, 3, 4, 5, 0, 1, 2];
        correctedIndex = flipIndex[i];
      }

      const tile = document.querySelector(`[data-face="${face}"][data-index="${correctedIndex}"]`);
      if (tile) {
        tile.querySelector("img").src = `images/${color}.png`;
      }
    });
  });
}


// 7. 타일마다 방향 버튼 생성 및 이벤트 연결
document.querySelectorAll('.face > div').forEach(tile => {
  const arrowsContainer = document.createElement('div');
  arrowsContainer.classList.add('arrows');

  const directions = ['up', 'down', 'left', 'right'];
  const symbols = { up: '↑', down: '↓', left: '←', right: '→' };

  directions.forEach(dir => {
    const btn = document.createElement('button');
    btn.classList.add('arrow', dir);
    btn.innerText = symbols[dir];

    // ✔ 클릭 이벤트 여기서 바로 연결
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
    
      const tile = btn.closest('[data-face][data-index]');
      const face = tile.dataset.face;
      const index = Number(tile.dataset.index);
    
      handleArrowClick(face, index, dir); // ✅ 여기만 바꿈
    });
    

    arrowsContainer.appendChild(btn);
  });

  tile.appendChild(arrowsContainer);
});

// 8. 큐브 전체 회전 제어 (기존 4방향 버튼용)
let rotateX = -25;
let rotateY = 45;

const cube = document.querySelector('.cube');
const buttons = document.querySelectorAll('.controls > button');

buttons.forEach(button => {
  button.addEventListener('click', function () {
    const className = this.className;

    if (className.includes('up')) {
      rotateX += 180;
    } else if (className.includes('down')) {
      rotateX -= 180;
    } else if (className.includes('left')) {
      rotateY -= 90;
    } else if (className.includes('right')) {
      rotateY += 90;
    }

    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
});

const colIndices = {
  0: [0, 3, 6],
  1: [1, 4, 7],
  2: [2, 5, 8]
};

function rotateColumnUp(col) {
  const idxs = colIndices[col];

  const frontCol  = idxs.map(i => cubeState.front[i]);
  const topCol    = idxs.map(i => cubeState.top[i]);
  const backCol   = idxs.map(i => cubeState.back[i]);
  const bottomCol = idxs.map(i => cubeState.bottom[i]);

  // bottom → front
  idxs.forEach((i, j) => cubeState.front[i] = bottomCol[j]);

  // front → top
  idxs.forEach((i, j) => cubeState.top[i] = frontCol[j]);

  // top → back (역방향)
  idxs.forEach((_, j) => cubeState.back[idxs[j]] = topCol[2 - j]);

  // back → bottom (역방향)
  idxs.forEach((_, j) => cubeState.bottom[idxs[j]] = backCol[2 - j]);

  // 회전면 회전 (좌우면 돌려야 함)
  if (col === 0) rotateFaceCounterClockwise("left");
  if (col === 2) rotateFaceClockwise("right");

  updateDOM();
}

function rotateColumnDown(col) {
  const idxs = colIndices[col];

  const frontCol  = idxs.map(i => cubeState.front[i]);
  const topCol    = idxs.map(i => cubeState.top[i]);
  const backCol   = idxs.map(i => cubeState.back[i]);
  const bottomCol = idxs.map(i => cubeState.bottom[i]);

  // top → front
  idxs.forEach((i, j) => cubeState.front[i] = topCol[j]);

  // front → bottom
  idxs.forEach((i, j) => cubeState.bottom[i] = frontCol[j]);

  // bottom → back (역방향)
  idxs.forEach((_, j) => cubeState.back[idxs[j]] = bottomCol[2 - j]);

  // back → top (역방향)
  idxs.forEach((_, j) => cubeState.top[idxs[j]] = backCol[2 - j]);

  // 회전면 회전
  if (col === 0) rotateFaceClockwise("left");
  if (col === 2) rotateFaceCounterClockwise("right");

  updateDOM();
}

function handleArrowClick(face, index, dir) {
  let row = Math.floor(index / 3);
  let col = index % 3;

  // 왼쪽 면만 세로가 index / 3 아님 → 행, 열 바뀜처럼 생각해야 함
  if (face === "left" || face === "right") {
    row = index % 3;
    col = Math.floor(index / 3);
  }

  switch (face) {
    case "front":
      if (dir === "up") rotateColumnUp(col);
      else if (dir === "down") rotateColumnDown(col);
      else if (dir === "left") rotateRowLeft(row);
      else if (dir === "right") rotateRowRight(row);
      break;

  }

  updateDOM();
}

function rotateLeftFaceColumnUp(col) {
  const idxs = colIndices[col];

  const topCol = idxs.map(i => cubeState.top[i]);
  const frontCol = idxs.map(i => cubeState.front[i]);
  const bottomCol = idxs.map(i => cubeState.bottom[i]);
  const backCol = idxs.map(i => cubeState.back[i]);
  const leftCol = idxs.map(i => cubeState.left[i]);

  // back → top (역순)
  idxs.forEach((_, j) => cubeState.top[idxs[j]] = backCol[2 - j]);
  // top → front
  idxs.forEach((i, j) => cubeState.front[i] = topCol[j]);
  // front → bottom
  idxs.forEach((i, j) => cubeState.bottom[i] = frontCol[j]);
  // bottom → back (역순)
  idxs.forEach((_, j) => cubeState.back[idxs[j]] = bottomCol[2 - j]);
  // left → left (회전으로 처리)
  rotateFaceCounterClockwise("left");

  updateDOM();
}



function shuffleCube(times = 20) {
  const directions = ["up", "down", "left", "right"];
  const faces = ["front", "left", "top"];

  for (let i = 0; i < times; i++) {
    const face = faces[Math.floor(Math.random() * faces.length)];
    const index = Math.floor(Math.random() * 9);
    const dir = directions[Math.floor(Math.random() * directions.length)];
    handleArrowClick(face, index, dir);
  }
}

document.querySelector(".shuffle-btn").addEventListener("click", () => {
  shuffleCube(30); // 30번 섞기
});
