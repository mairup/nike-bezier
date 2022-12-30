window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const mainCanvas = document.getElementById("canvas-main");
  const mainCtx = mainCanvas.getContext("2d");

  canvas.height = document.getElementById("half-width-img-bezier").height;
  canvas.width = document.getElementById("half-width-img-bezier").width;

  mainCanvas.height = canvas.height;
  mainCanvas.width = canvas.width;

  drawShape(ctx, -78, -223);
  drawShape(mainCtx, -78, -223);
  resizeMainCanvas();
});

function drawShape(ctx, xoff, yoff) {
  ctx.beginPath();
  ctx.moveTo(318 + xoff, 308 + yoff);
  ctx.bezierCurveTo(
    305 + xoff,
    313 + yoff,
    278 + xoff,
    327 + yoff,
    289 + xoff,
    352 + yoff
  );
  ctx.bezierCurveTo(
    295 + xoff,
    365 + yoff,
    316 + xoff,
    365 + yoff,
    332 + xoff,
    362 + yoff
  );
  ctx.bezierCurveTo(
    361 + xoff,
    357 + yoff,
    382 + xoff,
    353 + yoff,
    413 + xoff,
    343 + yoff
  );
  ctx.bezierCurveTo(
    446 + xoff,
    332 + yoff,
    446 + xoff,
    331 + yoff,
    452 + xoff,
    328 + yoff
  );
  ctx.bezierCurveTo(
    461 + xoff,
    324 + yoff,
    477 + xoff,
    321 + yoff,
    462 + xoff,
    317 + yoff
  );
  ctx.bezierCurveTo(
    448 + xoff,
    313 + yoff,
    449 + xoff,
    318 + yoff,
    420 + xoff,
    326 + yoff
  );
  ctx.bezierCurveTo(
    394 + xoff,
    333 + yoff,
    349 + xoff,
    341 + yoff,
    333 + xoff,
    339 + yoff
  );
  ctx.bezierCurveTo(
    313 + xoff,
    336 + yoff,
    317 + xoff,
    321 + yoff,
    318 + xoff,
    312 + yoff
  );
  ctx.fillStyle = "rgba(252, 170, 38, 0.7)";
  ctx.fill();
}

window.addEventListener("resize", () => {
  if (window.innerWidth <= 1000) swapHalfWidthImgLeft();
  else swapHalfWidthImgRight();
  resizeMainCanvas();
});

function swapHalfWidthImgLeft() {
  let tmp = document
    .getElementById("main-body-container-side-svg-img")
    .cloneNode(true);
  document.getElementById("main-body-container-side-svg-img").remove();
  document.getElementById("main-body-sides-container").append(tmp);
}

function swapHalfWidthImgRight() {
  let tmp = document
    .getElementById("main-body-container-side-svg-text")
    .cloneNode(true);
  document.getElementById("main-body-container-side-svg-text").remove();
  document.getElementById("main-body-sides-container").append(tmp);
}

function resizeMainCanvas() {
  let scale =
    document.getElementById("main-body-display-img").offsetWidth / 4.3;
  scale = Math.floor(scale);
  document.getElementById("canvas-main").style.transform =
    "scale(" + scale + "%)";
  let scale2 =
    document.getElementById("half-width-img-bezier").offsetWidth / 4.3;
  scale2 = Math.floor(scale2);
  document.getElementById("canvas").style.transform = "scale(" + scale2 + "%)";
}
