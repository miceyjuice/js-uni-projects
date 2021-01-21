// Zmienne globalne

const imageSet = [
  {
    urlSet: "https://picsum.photos/1300/900?random=1",
    key: 0,
  },
  {
    urlSet: "https://picsum.photos/1300/900?random=2",
    key: 1,
  },
  {
    urlSet: "https://picsum.photos/1300/900?random=3",
    key: 2,
  },
  {
    urlSet: "https://picsum.photos/1300/900?random=4",
    key: 3,
  },
  {
    urlSet: "https://picsum.photos/1300/900?random=5",
    key: 4,
  },
  {
    urlSet: "https://picsum.photos/1300/900?random=6",
    key: 5,
  },
];

let actualLeft = 0;
const addGalleryImgs = () =>
  imageSet.map((value) =>
    createImage(
      "img",
      value.urlSet,
      document.querySelector(".gallery"),
      value.key
    )
  );
const addMoveImgs = () =>
  imageSet.map((value) =>
    createDivImage(
      "img",
      value.urlSet,
      document.querySelector(".move"),
      value.key
    )
  );

// Dodawanie zdjęć

const createImage = (targetElement, url, parentNode, key) => {
  const img = document.createElement(targetElement);

  img.src = url;
  img.setAttribute("data-key", key);
  parentNode.appendChild(img);
};

const createDivImage = (targetElement, url, parentNode, key) => {
  const img = document.createElement(targetElement);
  const imgDiv = document.createElement("div");

  imgDiv.classList.add("move__img");
  imgDiv.classList.add("notClosable");
  img.src = url;
  img.setAttribute("data-key", key);

  imgDiv.appendChild(img);

  parentNode.appendChild(imgDiv);
};

const toggleBox = (key) => {
  const lightBoxDiv = document.querySelector(".lightBox");
  const moveBox = document.querySelector(".move");
  const imageText = document.querySelector(".imgText");

  imageText.innerHTML = parseInt(key) + 1 + " / " + imageSet.length;
  moveBox.style.left = key * 100 * -1 + "%";
  actualLeft = key * 100 * -1;

  if (actualLeft === -0) {
    document.querySelector(".left").style.display = "none";
  } else if (actualLeft < -1) {
    document.querySelector(".left").style.display = "block";
  }
  if (actualLeft <= -500) {
    document.querySelector(".right").style.display = "none";
  } else if (actualLeft > -500) {
    document.querySelector(".right").style.display = "block";
  }

  console.log(actualLeft);

  lightBoxDiv.classList.toggle("visibility");
};

const closeView = () => {
  const closeButton = document.querySelector(".closeBtn");
  const moveBox = document.querySelector(".move");

  moveBox.addEventListener("click", (event) => {
    console.log(event.target.classList);
    if (event.target.classList.contains("move")) {
      const lightBoxDiv = document.querySelector(".lightBox");
      lightBoxDiv.classList.toggle("visibility");
    }
  });

  closeButton.addEventListener("click", () => {
    const lightBoxDiv = document.querySelector(".lightBox");
    lightBoxDiv.classList.toggle("visibility");
  });
};

const clickableImage = () => {
  const gallery = document.querySelectorAll(".gallery img");
  for (let i = 0; i < gallery.length; i++) {
    gallery[i].addEventListener("click", (e) => {
      toggleBox(gallery[i].dataset.key);
    });
  }
};

const moveImg = () => {
  const right = document.querySelector(".right");
  const left = document.querySelector(".left");

  right.addEventListener("click", () => {
    const move = document.querySelector(".move");
    const imageText = document.querySelector(".imgText");

    move.style.left = actualLeft - 100 + "%";
    actualLeft = actualLeft - 100;
    imageText.innerHTML = actualLeft / -100 + 1 + " / " + imageSet.length;

    if (actualLeft > -500) {
      left.style.display = "block";
    } else right.style.display = "none";
  });

  left.addEventListener("click", () => {
    console.log(actualLeft);
    const move = document.querySelector(".move");
    const imageText = document.querySelector(".imgText");

    move.style.left = actualLeft + 100 + "%";
    actualLeft = actualLeft + 100;
    console.log(actualLeft);
    imageText.innerHTML = actualLeft / -100 + 1 + " / " + imageSet.length;

    if (actualLeft < -1) {
      right.style.display = "block";
    } else left.style.display = "none";
  });
};

// Wywołanie funkcji

addGalleryImgs();
addMoveImgs();
clickableImage();
moveImg();
closeView();
