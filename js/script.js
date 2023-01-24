let cdi = 0; // current display img
const timeoutTime = 5000;
const bodyCons = document.getElementsByClassName("body-window");
let sCon = 2; // shown container (?)
let mainDisplay = document.getElementById("main-body-display-img-main");
let tempDisplay = document.getElementById("main-body-display-img-temp");
let svgImagePos;
let headerRight = document.getElementById("main-header-right");

let cdiTimeout = setTimeout(() => {
  moveDisplayContainer(1);
}, timeoutTime);

let displayImageSwapTimeout;

window.addEventListener("load", () => {
  if (window.innerWidth <= 1000) swapHalfWidthImgLeft();
  else swapHalfWidthImgRight();
  resizeCanvas();
  changeShownContainerWindowCustom(0);
  addHeaderScrollShadow();
});

window.addEventListener("resize", () => {
  if (window.innerWidth <= 1000 && svgImagePos == "right")
    swapHalfWidthImgLeft();
  else if (window.innerWidth > 1000 && svgImagePos == "left")
    swapHalfWidthImgRight();
  resizeCanvas();
  resizeBody();
  addHeaderScrollShadow();
});

function swapHalfWidthImgLeft() {
  let tmp = document.getElementById("main-body-container-side-svg-img");
  document.getElementById("main-body-sides-container").append(tmp);

  let tmp2 = document.getElementById("main-body-container-side-svg-text");
  tmp.classList.remove("animateRightToLeft");
  tmp2.classList.remove("animateLeftToRight");
  tmp2.classList.remove("animateRightToLeft");
  tmp.classList.remove("animateLeftToRight");

  tmp.classList.add("animateRightToLeft");
  tmp2.classList.add("animateLeftToRight");

  svgImagePos = "left";
}

function swapHalfWidthImgRight() {
  let tmp = document.getElementById("main-body-container-side-svg-text");
  document.getElementById("main-body-sides-container").append(tmp);

  let tmp2 = document.getElementById("main-body-container-side-svg-img");

  tmp.classList.remove("animateRightToLeft");
  tmp2.classList.remove("animateLeftToRight");
  tmp2.classList.remove("animateRightToLeft");
  tmp.classList.remove("animateLeftToRight");

  tmp.classList.add("animateRightToLeft");
  tmp2.classList.add("animateLeftToRight");

  svgImagePos = "right";
}

function resizeCanvas() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const mainCanvas = document.getElementById("canvas-main");
  const mainCtx = mainCanvas.getContext("2d");

  canvas.height = 224;
  canvas.width = 432;

  mainCanvas.height = canvas.height;
  mainCanvas.width = canvas.width;

  drawShape(ctx, -78, -223);
  drawShape(mainCtx, -78, -223);

  let scale =
    document.getElementById("main-body-display-img").offsetWidth / 4.3;
  let scale2 =
    document.getElementById("half-width-img-bezier").offsetWidth / 4.3;
  if (scale > 150) scale -= 1.5; // fix for bad sizing at high scale
  document.getElementById("canvas-main").style.transform =
    "scale(" + scale + "%)";

  document.getElementById("canvas").style.transform = "scale(" + scale2 + "%)";
}

function setDefault() {
  cdi = 0;
  document.getElementById("main-body-display-img-background").src =
    "img/nike-shoe.png";
  document.getElementById("main-body-display-img-overlay-png").style.opacity =
    "0%";
  document.getElementById(
    "main-body-display-img-overlay-svg"
  ).style.opacity = 0;
  document.getElementById("canvas-main").style.opacity = 0;

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

function setPNG() {
  setDefault();
  cdi = 1;
  document.getElementById("main-body-display-img-background").src =
    "img/nike-shoe-yello-white-darkened3.png";
  document.getElementById("main-body-display-img-overlay-png").style.opacity =
    "70%";

  document.getElementById("main-body-display-selected-img-title").innerText =
    "PNG Version";

  removeSelectedImgIcon();
  document
    .getElementById("main-body-display-selected-img-icon-png")
    .classList.add("main-body-display-selected-img-icon-selected");

  document
    .getElementById("main-body-display-selected-img-icon-png-overlay")
    .classList.add("main-body-display-selected-img-icon-overlay-selected");
  timeoutHandler();
}

function setSVG() {
  setDefault();
  cdi = 2;
  document.getElementById("main-body-display-img-background").src =
    "img/nike-shoe-blue-white2.png";
  document.getElementById("main-body-display-img-overlay-svg").style.opacity =
    "70%";

  document.getElementById("main-body-display-selected-img-title").innerText =
    "SVG Version";

  removeSelectedImgIcon();
  document
    .getElementById("main-body-display-selected-img-icon-svg")
    .classList.add("main-body-display-selected-img-icon-selected");

  document
    .getElementById("main-body-display-selected-img-icon-svg-overlay")
    .classList.add("main-body-display-selected-img-icon-overlay-selected");
  timeoutHandler();
}

function setBezier() {
  setDefault();
  cdi = 3;
  document.getElementById("canvas-main").style.opacity = 100;

  document.getElementById("main-body-display-selected-img-title").innerText =
    "Bezier Version";

  removeSelectedImgIcon();
  document
    .getElementById("main-body-display-selected-img-icon-bezier")
    .classList.add("main-body-display-selected-img-icon-selected");

  document
    .getElementById("main-body-display-selected-img-icon-bezier-overlay")
    .classList.add("main-body-display-selected-img-icon-overlay-selected");
  timeoutHandler();
}

function changeDisplayImage() {
  switch (cdi) {
    case 0:
      setDefault();
      break;
    case 1:
      setPNG();
      break;
    case 2:
      setSVG();
      break;
    case 3:
      setBezier();
      break;
  }
}

function moveDisplayContainer(imgNum) {
  let side;
  if (imgNum > cdi) side = 100;
  else if (imgNum < cdi) side = -100;
  else side = 0;

  if (imgNum < 0) {
    imgNum = 3;
    side = -100;
  } else if (imgNum > 3) {
    imgNum = 0;
    side = 100;
  }

  cdi = imgNum;
  displayImageSwap(side);
}

function displayImageSwap(side) {
  if (clearTimeout != 0) clearTimeout(displayImageSwapTimeout);
  mainDisplay.style.transition = "transform 0s";
  mainDisplay.style.left = 0;
  mainDisplay.style.transform = "translateX(0)";

  tmp = mainDisplay.cloneNode(true);
  tmp.style.position = "relative";

  tempDisplay.innerHTML = "";
  tempDisplay.style.transition = "transform 0s";

  tempDisplay.style.transform = "translateX(0)";

  tempDisplay.appendChild(tmp);

  for (const element of tempDisplay.querySelectorAll("div, img, canvas, svg"))
    element.id += "-temp";

  const tempCanvas = tempDisplay.getElementsByTagName("canvas")[0];
  const tempCtx = tempCanvas.getContext("2d");

  tempCanvas.height = 224;
  tempCanvas.width = 432;

  drawShape(tempCtx, -78, -223);

  mainDisplay.style.left = (side / 100) * mainDisplay.offsetWidth + "px";

  changeDisplayImage();

  tempDisplay.style.transition = "transform 0.3s ease";
  mainDisplay.style.transition = "transform 0.3s ease";
  mainDisplay.style.transform = "translateX(" + -1 * side + "%)";
  side *= -1;
  tempDisplay.style.transform = "translateX(" + side + "%)";
  displayImageSwapTimeout = setTimeout(() => {
    mainDisplay.style.transition = "transform 0s";
    mainDisplay.style.left = 0;
    mainDisplay.style.transform = "translateX(0)";
  }, 300);
}

function timeoutHandler() {
  if (cdiTimeout != null) clearTimeout(cdiTimeout);
  cdiTimeout = setTimeout(() => {
    let imgNum = cdi;
    if (imgNum == 3) {
      imgNum = 0;
      cdi = -1;
    } else imgNum++;
    moveDisplayContainer(imgNum);
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
  if (sCon == setTo) return;
  bodyCons[sCon].style.opacity = 0;
  bodyCons[setTo].style.opacity = 1;
  sCon = setTo;

  let animatedNodesLeft =
    bodyCons[setTo].getElementsByClassName("animateLeftToRight");
  let animatedNodesRight =
    bodyCons[setTo].getElementsByClassName("animateRightToLeft");

  for (i = 0; i < animatedNodesLeft.length; i++) {
    animatedNodesLeft[i].style.animation = "";
    void animatedNodesLeft[i].offsetWidth;
    animatedNodesLeft[i].style.animation = "flyInAnimationLeft 0.5s ease";
  }

  for (i = 0; i < animatedNodesRight.length; i++) {
    animatedNodesRight[i].style.animation = "";
    void animatedNodesRight[i].offsetWidth;
    animatedNodesRight[i].style.animation = "flyInAnimationRight 0.5s ease";
  }

  selectButton();
  resizeBody();
  window.scrollTo({ top: 0, behavior: "smooth" });
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

function addHeaderScrollShadow() {
  if (
    headerRight.scrollWidth != window.innerWidth &&
    headerRight.scrollLeft < headerRight.scrollWidth - window.innerWidth
  ) {
    document.getElementById("main-header-move-menu-right").style.opacity = 1;
  } else
    document.getElementById("main-header-move-menu-right").style.opacity = 0;
  if (
    headerRight.scrollWidth != window.innerWidth &&
    headerRight.scrollLeft > 0
  ) {
    document.getElementById("main-header-move-menu-left").style.opacity = 1;
  } else
    document.getElementById("main-header-move-menu-left").style.opacity = 0;
}

headerRight.addEventListener("scroll", () => {
  addHeaderScrollShadow();
});

for (const button of document.getElementsByClassName("header-button")) {
  button.addEventListener("mouseover", () => {
    button.classList.add("header-button-selected");
  });
  button.addEventListener("mouseout", () => {
    if (document.getElementsByClassName("header-button")[sCon] != button)
      button.classList.remove("header-button-selected");
  });
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
