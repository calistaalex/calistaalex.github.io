/*
MAIN [P03: Portfolio Project]
By: Calista Alex
*/

const body = document.body;
const header = document.querySelector("header");
const main = document.querySelector("main");
const headerHeight = document.querySelector("header").offsetHeight;

main.style.top = headerHeight + "px";

let lastScroll = 0;

window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset;
  // console.log("current: ", currentScroll);
  // console.log("last: ", lastScroll);
  if (currentScroll - lastScroll > 0) {
    header.classList.add("scroll-down");
    header.classList.remove("scroll-up");
  }
  else {
    header.classList.add("scroll-up");
    header.classList.remove("scroll-down");
  }
  lastScroll = currentScroll;
  // console.log("last: ", lastScroll);
});

var x, i, j, l, ll, selElmnt, a, b, c;
x = document.getElementsByClassName("select-field");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element, create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box, and the selected item: */
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /* When the select box is clicked, close any other select boxes, and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document, except the current select box: */
  var x,
  y,
  i,
  xl,
  yl,
  arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box, then close all select boxes: */
document.addEventListener("click", closeAllSelect);

const images = [
  './img/art-curator/overview.jpg',
  './img/lpm-microsite/overview.jpg',
  './img/lpm-print/overview.jpg',
];

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

window.addEventListener('load', () => {
  const content = document.querySelector('.work-content');
  let main = null;

  images.forEach((url, index) => {
    const stickyBound = document.createElement('div');
    stickyBound.className = 'sticky-bound';

    const posterContainer = document.createElement('section');
    posterContainer.className = 'work-container';
    posterContainer.style.zIndex = 100 - index;
    posterContainer.style.marginLeft = `${random(-5, 5)}vh`;
    posterContainer.style.transform = `rotate(${random(-10, 10)}deg)`;

    const image = document.createElement('img');
    image.src = url;

    if (!main) {
      posterContainer.appendChild(image);
      stickyBound.appendChild(posterContainer);

      main = stickyBound;
    } else {
      posterContainer.appendChild(image);
      stickyBound.appendChild(main);
      stickyBound.appendChild(posterContainer);

      main = stickyBound;

      console.log(main);
    }
  });

  content.appendChild(main);
});
