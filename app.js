const imgUrls = ["./assets/dog.png", "./assets/cat.png"];

const state = {
  images: [],
  canvas: null,
  canvasContext: null,
  isMouseDown: false,
  selectedElement: {
    offsetX: 0,
    offsetY: 0,
    index: -1,
  },
};

async function loadImages(imageUrls) {
  const images = [];
  for (let i = 0; i < imgUrls.length; i++) {
    try {
      const element = await loadImage(imageUrls[i]);
      images.push({
        element,
        data: {
          x: 0,
          y: 0,
          width: element.width,
          height: element.height,
        },
        zIndex: i,
      });
    } catch (err) {
      console.error(err.message);
    }
  }
  return images;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.addEventListener("error", reject);
    image.src = src;
  });
}

function render() {
  state.canvasContext.clearRect(0, 0, state.canvas.width, state.canvas.height);
  drawImages();
  requestAnimationFrame(render);
}

function drawDottedLineAround(startX, startY, width, height) {
  state.canvasContext.setLineDash([5, 3]);
  state.canvasContext.lineWidth = 2;
  state.canvasContext.strokeStyle = "green";
  state.canvasContext.beginPath();
  state.canvasContext.rect(startX - 2, startY - 2, width + 4, height + 4);
  state.canvasContext.stroke();
}

function drawImages() {
  state.images.forEach((image, index) => {
    const imageRect = new Path2D();
    imageRect.rect(0, 0, image.data.width, image.data.height);
    image.path = imageRect;
    if (index === state.selectedElement.index) {
      drawDottedLineAround(
        image.data.x,
        image.data.y,
        image.data.width,
        image.data.height
      );
    }
    state.canvasContext.drawImage(
      image.element,
      image.data.x,
      image.data.y,
      image.data.width,
      image.data.height
    );
  });
}

function adjustCanvasSize() {
  const { innerWidth } = window;
  state.canvas.width = innerWidth;
  state.canvas.height = Math.floor((innerWidth / 16) * 9);
}

async function setInitialState() {
  state.images = await loadImages(imgUrls);
  const store = JSON.parse(localStorage.getItem("canvas"));
  for (let index = 0; index < store.images.length; index++) {
    if (state.images[index]) {
      state.images[index].data = store.images[index].data;
    }
  }
  state.canvas = document.getElementById("canvas");
  state.canvasContext = state.canvas.getContext("2d");
}

function onMouseDown(e) {
  for (let index = 0; index < state.images.length; index++) {
    const item = state.images[index];
    if (
      e.y > item.data.y &&
      e.y < item.data.y + item.data.height &&
      e.x > item.data.x &&
      e.x < item.data.x + item.data.width
    ) {
      state.selectedElement.offsetX = e.x - item.data.x;
      state.selectedElement.offsetY = e.y - item.data.y;
      state.selectedElement.index = index;
    }
  }
}

function onMouseMove(e) {
  const image = state.images[state.selectedElement.index];
  if (!image) return;

  image.data.x = e.x - state.selectedElement.offsetX;
  image.data.y = e.y - state.selectedElement.offsetY;
  // Left wall
  if (image.data.x < 0) {
    image.data.x = 0;
  }
  // Right Wall
  if (image.data.x + image.data.width > state.canvas.width) {
    image.data.x = state.canvas.width - image.data.width;
  }
  // Top wall
  if (image.data.y < 0) {
    image.data.y = 0;
  }
  // Bottom Wall
  if (image.data.y + image.data.height > state.canvas.height) {
    image.data.y = state.canvas.height - image.data.height;
  }

  localStorage.setItem("canvas", JSON.stringify(state));
}

function onMouseUp(e) {
  state.selectedElement.index = -1;
}

function onMouseLeave() {
  state.selectedElement.index = -1;
}

function initEventListeners() {
  state.canvas.addEventListener("mousedown", onMouseDown);
  state.canvas.addEventListener("mouseup", onMouseUp);
  state.canvas.addEventListener("mousemove", onMouseMove);
  state.canvas.addEventListener("mouseleave", onMouseLeave);
}

window.addEventListener("load", async () => {
  await setInitialState();
  adjustCanvasSize();
  initEventListeners();
  render();
});
