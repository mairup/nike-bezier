window.addEventListener("load", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  canvas.height = document.getElementById("half-width-img-bezier").height;
  canvas.width = document.getElementById("half-width-img-bezier").width;

  drawShape(ctx, -(canvas.width * 0.197), -(canvas.height * 0.961));
});

function drawShape(ctx, xoff, yoff) {
  ctx.beginPath();
  ctx.moveTo(328 + xoff, 297 + yoff);
  ctx.bezierCurveTo(
    313 + xoff,
    300 + yoff,
    270 + xoff,
    331 + yoff,
    302 + xoff,
    356 + yoff
  );
  ctx.bezierCurveTo(
    315 + xoff,
    366 + yoff,
    361 + xoff,
    358 + yoff,
    394 + xoff,
    351 + yoff
  );
  ctx.bezierCurveTo(
    410 + xoff,
    348 + yoff,
    548 + xoff,
    306 + yoff,
    502 + xoff,
    305 + yoff
  );
  ctx.bezierCurveTo(
    470 + xoff,
    304 + yoff,
    460 + xoff,
    320 + yoff,
    407 + xoff,
    327 + yoff
  );
  ctx.bezierCurveTo(
    361 + xoff,
    333 + yoff,
    319 + xoff,
    347 + yoff,
    329 + xoff,
    296 + yoff
  );
  ctx.fillStyle = "#fcaa26";
  ctx.fill();
}
