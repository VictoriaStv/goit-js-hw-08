const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const galleryContainer = document.querySelector(".gallery");

function generateGalleryItem({ preview, original, description }) {
  return `<li class="gallery-item">
    <a class="gallery-link" href="${original}">
      <img
        class="gallery-image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
}

const galleryContent = images.map(generateGalleryItem).join("");
galleryContainer.insertAdjacentHTML("beforeend", galleryContent);

let currentIndex = 0;

galleryContainer.addEventListener("click", openModalImage);

function openModalImage(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery-image")) {
    return;
  }

  const imageList = Array.from(document.querySelectorAll(".gallery-image"));
  currentIndex = imageList.indexOf(event.target);

  showModal(
    imageList[currentIndex].dataset.source,
    imageList[currentIndex].alt
  );
}

function showModal(imageUrl, altText) {
  const modalMarkup = `
    <div class="modal">
      <span class="modal-arrow left">❮</span>
      <img src="${imageUrl}" alt="${altText}">
      <span class="modal-arrow right">❯</span>
      <span class="modal-close">&times;</span>
      <span class="modal-caption">${altText}</span>
      <span class="modal-counter">${currentIndex + 1}/${images.length}</span>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalMarkup);
  const modal = document.querySelector(".modal");
  const caption = modal.querySelector(".modal-caption");

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });

  modal
    .querySelector(".modal-close")
    .addEventListener("click", () => modal.remove());
  modal
    .querySelector(".modal-arrow.left")
    .addEventListener("click", showPrevImage);
  modal
    .querySelector(".modal-arrow.right")
    .addEventListener("click", showNextImage);

  setTimeout(() => caption.classList.add("visible"), 0);

  function showPrevImage() {
    currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    updateModalImage();
  }

  function showNextImage() {
    currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    updateModalImage();
  }

  function showPrevImage() {
    currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    updateModalImage("right");
  }

  function showNextImage() {
    currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    updateModalImage("left");
  }

  function updateModalImage(direction) {
    const img = modal.querySelector("img");
    const caption = modal.querySelector(".modal-caption");

    img.classList.add(
      direction === "left" ? "fade-out-left" : "fade-out-right"
    );
    caption.classList.add(
      direction === "left" ? "fade-out-left" : "fade-out-right"
    );

    setTimeout(() => {
      const { original, description } = images[currentIndex];

      const newImg = document.createElement("img");
      newImg.src = original;
      newImg.alt = description;
      newImg.classList.add("gallery-image");
      newImg.classList.add(
        direction === "left" ? "fade-in-right" : "fade-in-left"
      );

      modal.querySelector(".modal-counter").textContent = `${
        currentIndex + 1
      }/${images.length}`;

      caption.classList.remove("visible");

      setTimeout(() => {
        caption.textContent = description;
        caption.classList.add("visible");
      }, 500);

      modal.querySelector("img").replaceWith(newImg);

      setTimeout(() => {
        newImg.classList.remove(
          direction === "left" ? "fade-in-right" : "fade-in-left"
        );
        img.classList.remove(
          direction === "left" ? "fade-out-left" : "fade-out-right"
        );
        caption.classList.remove(
          direction === "left" ? "fade-out-left" : "fade-out-right"
        );
      }, 500);
    }, 500);
  }

}
