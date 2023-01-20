let cdi = 0; // current display img
let timeoutTime = 1000;
const bodyCons = document.getElementsByClassName("body-window");
let sCon = 2; // shown container (?)

let cdiTimeout = setTimeout(() => {
  changeDisplayImage();
}, timeoutTime);

window.addEventListener("load", () => {
  if (window.innerWidth <= 1000) swapHalfWidthImgLeft();
  else swapHalfWidthImgRight();
  resizeCanvas();
  changeShownContainerWindowCustom(0);
});

window.addEventListener("resize", () => {
  if (window.innerWidth <= 1000) swapHalfWidthImgLeft();
  else swapHalfWidthImgRight();
  resizeCanvas();
  resizeBody();
});

function swapHalfWidthImgLeft() {
  let tmp = document
    .getElementById("main-body-container-side-svg-img")
    .cloneNode(true);
  document.getElementById("main-body-container-side-svg-img").remove();
  document.getElementById("main-body-sides-container").append(tmp);

  let tmp2 = document.getElementById("main-body-container-side-svg-text");
  tmp.classList.remove("animateRightToLeft");
  tmp2.classList.remove("animateLeftToRight");
  tmp2.classList.remove("animateRightToLeft");
  tmp.classList.remove("animateLeftToRight");

  tmp.classList.add("animateRightToLeft");
  tmp2.classList.add("animateLeftToRight");
}

function swapHalfWidthImgRight() {
  let tmp = document
    .getElementById("main-body-container-side-svg-text")
    .cloneNode(true);
  document.getElementById("main-body-container-side-svg-text").remove();
  document.getElementById("main-body-sides-container").append(tmp);

  let tmp2 = document.getElementById("main-body-container-side-svg-img");

  tmp.classList.remove("animateRightToLeft");
  tmp2.classList.remove("animateLeftToRight");
  tmp2.classList.remove("animateRightToLeft");
  tmp.classList.remove("animateLeftToRight");

  tmp.classList.add("animateRightToLeft");
  tmp2.classList.add("animateLeftToRight");
}

function resizeCanvas() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const mainCanvas = document.getElementById("canvas-main");
  const mainCtx = mainCanvas.getContext("2d");

  const mainCanvas2 = document.getElementById("canvas-main-2");
  const mainCtx2 = mainCanvas2.getContext("2d");

  canvas.height = 224;
  canvas.width = 432;

  mainCanvas.height = canvas.height;
  mainCanvas.width = canvas.width;

  mainCanvas2.height = mainCanvas.height;
  mainCanvas2.width = mainCanvas.width;

  drawShape(ctx, -78, -223);
  drawShape(mainCtx, -78, -223);
  drawShape(mainCtx2, -78, -223);

  let scale =
    document.getElementById("main-body-display-img").offsetWidth / 4.3;
  scale = Math.floor(scale);
  document.getElementById("canvas-main").style.transform =
    "scale(" + scale + "%)";
  document.getElementById("canvas-main-2").style.transform =
    "scale(" + scale + "%)";
  let scale2 =
    document.getElementById("half-width-img-bezier").offsetWidth / 4.3;
  scale2 = Math.floor(scale2);
  document.getElementById("canvas").style.transform = "scale(" + scale2 + "%)";
}

function setDefault(s) {
  cdi = 0;
  document.getElementById("main-body-display-img-background" + s).src =
    "img/nike-shoe.png";
  document.getElementById(
    "main-body-display-img-overlay-png" + s
  ).style.opacity = "0%";
  document.getElementById(
    "main-body-display-img-overlay-svg" + s
  ).style.opacity = 0;
  document.getElementById("canvas-main" + s).style.opacity = 0;

  if (s == "") {
    document.getElementById("main-body-display-selected-img-title").innerText =
      "Default";

    removeSelectedImgIcon();
    document
      .getElementById("main-body-display-selected-img-icon-default")
      .classList.add("main-body-display-selected-img-icon-selected");

    document
      .getElementById("main-body-display-selected-img-icon-default-overlay")
      .classList.add("main-body-display-selected-img-icon-overlay-selected");

    timeoutHandler();
  }
}

function setPNG(s) {
  setDefault(s);
  cdi = 1;
  document.getElementById("main-body-display-img-background" + s).src =
    "img/nike-shoe-yello-white-darkened3.png";
  document.getElementById(
    "main-body-display-img-overlay-png" + s
  ).style.opacity = "70%";

  if (s == "") {
    document.getElementById(
      "main-body-display-selected-img-title" + s
    ).innerText = "PNG Version";

    removeSelectedImgIcon();
    document
      .getElementById("main-body-display-selected-img-icon-png" + s)
      .classList.add("main-body-display-selected-img-icon-selected");

    document
      .getElementById("main-body-display-selected-img-icon-png-overlay" + s)
      .classList.add("main-body-display-selected-img-icon-overlay-selected");
    timeoutHandler();
  }
}

function setSVG(s) {
  setDefault(s);
  cdi = 2;
  document.getElementById("main-body-display-img-background" + s).src =
    "img/nike-shoe-blue-white2.png";
  document.getElementById(
    "main-body-display-img-overlay-svg" + s
  ).style.opacity = "70%";

  if (s == "") {
    document.getElementById(
      "main-body-display-selected-img-title" + s
    ).innerText = "SVG Version";

    removeSelectedImgIcon();
    document
      .getElementById("main-body-display-selected-img-icon-svg" + s)
      .classList.add("main-body-display-selected-img-icon-selected");

    document
      .getElementById("main-body-display-selected-img-icon-svg-overlay" + s)
      .classList.add("main-body-display-selected-img-icon-overlay-selected");
    timeoutHandler();
  }
}

function setBezier(s) {
  setDefault(s);
  cdi = -1;
  document.getElementById("canvas-main" + s).style.opacity = 100;

  if (s == "") {
    document.getElementById(
      "main-body-display-selected-img-title" + s
    ).innerText = "Bezier Version";

    removeSelectedImgIcon();
    document
      .getElementById("main-body-display-selected-img-icon-bezier" + s)
      .classList.add("main-body-display-selected-img-icon-selected");

    document
      .getElementById("main-body-display-selected-img-icon-bezier-overlay" + s)
      .classList.add("main-body-display-selected-img-icon-overlay-selected");
    timeoutHandler();
  }
}

function changeDisplayImage() {
  switch (cdi) {
    case 0:
      setDefault("");
      break;
    case 1:
      setPNG("");
      break;
    case 2:
      setSVG("");
      break;
    case 3:
      setBezier("");
      break;
  }
}

function displayImageSwap() {
  /*if (imgNum > cdi) {
    console.log("swap right");
  } else if (imgNum < cdi) {
    console.log("swap left");
  }*/

  let temp = document.getElementById("main-body-container-display-temp");
  let main = document.getElementById("main-body-container-display");

  displayImageSwapMove(main, "right");
}

function displayImageSwapMove(item, side) {
  if (side == "center") {
    item.style;
  } else {
    if (side == "left") side = "-";
    side = "";
    item.style.transform = "translateX(" + side + "10%)";
    item.style.transition = "";
  }
}

function moveDisplayContainer() {
  let temp = document.getElementById("main-body-display-img-temp");
  let main = document.getElementById("main-body-display-img-main");
  let clone = document
    .getElementById("main-body-display-img-items")
    .cloneNode();

  temp.append(clone);

  /*
  if (main.childElementCount > 0) {
    // if elements are in main

    temp.append(clone);
    console.log("a");
  } else {
    // if elements are in temp

    console.log("b");
    main.append(clone);
  }*/
}

function timeoutHandler() {
  if (cdiTimeout != null) clearTimeout(cdiTimeout);
  cdiTimeout = setTimeout(() => {
    cdi++;
    changeDisplayImage();
  }, timeoutTime);
}

function removeSelectedImgIcon() {
  let array1 = document.getElementsByClassName(
    "main-body-display-selected-img-icon-overlay-selected"
  );
  let array2 = document.getElementsByClassName(
    "main-body-display-selected-img-icon-selected"
  );

  while (array1.length > 0)
    array1[0].classList.remove(
      "main-body-display-selected-img-icon-overlay-selected"
    );

  while (array2.length > 0)
    array2[0].classList.remove("main-body-display-selected-img-icon-selected");
}
/*
document.addEventListener("click", () => {
  changeShownContainerWindow(true);
});*/

//   unused currently, leaving it in just in case
function changeShownContainerWindow(side) {
  bodyCons[sCon].style.opacity = 0;
  side ? sCon++ : sCon--;
  if (sCon >= bodyCons.length) sCon = 0;
  if (sCon < 0) sCon = bodyCons.length - 1;
  bodyCons[sCon].style.opacity = 1;
  resizeBody();
}

function changeShownContainerWindowCustom(setTo) {
  bodyCons[sCon].style.opacity = 0;
  bodyCons[setTo].style.opacity = 1;
  sCon = setTo;

  let animatedNodesLeft = document.getElementsByClassName("animateLeftToRight");
  let animatedNodesRight =
    document.getElementsByClassName("animateRightToLeft");
  for (i = 0; i < animatedNodesLeft.length; i++) {
    animatedNodesLeft[i].style.animation = "noAnimation";
    void animatedNodesLeft[i].offsetWidth;
    animatedNodesLeft[i].style.animation = "flyInAnimationLeft 0.3s ease";
  }

  for (i = 0; i < animatedNodesRight.length; i++) {
    animatedNodesRight[i].style.animation = "noAnimation";
    void animatedNodesRight[i].offsetWidth;
    animatedNodesRight[i].style.animation = "flyInAnimationRight 0.3s ease";
  }

  selectButton();
  resizeBody();
}

function resizeBody() {
  let currentBodyContainerHeight =
    Math.floor(bodyCons[sCon].clientHeight + 120) + "px";

  document.getElementById("main-body").style.height =
    currentBodyContainerHeight;
}

function unselectButtons() {
  arr = document.getElementsByClassName("header-button");

  for (i = 0; i < arr.length; i++)
    arr[i].classList.remove("header-button-selected");
}

function selectButton() {
  unselectButtons();

  document
    .getElementsByClassName("header-button")
    [sCon].classList.add("header-button-selected");
}

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
