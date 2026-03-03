const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filters button");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;
let visibleItems = [];


filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".filters .active").classList.remove("active");
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        galleryItems.forEach(item => {
            if (filter === "all" || item.dataset.category === filter) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});


galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        visibleItems = Array.from(document.querySelectorAll(".gallery-item"))
            .filter(el => el.style.display !== "none");

        currentIndex = visibleItems.indexOf(item);
        lightboxImg.src = item.querySelector("img").src;
        lightbox.style.display = "flex";
    });
});


closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});


nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    lightboxImg.src = visibleItems[currentIndex].querySelector("img").src;
});


prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    lightboxImg.src = visibleItems[currentIndex].querySelector("img").src;
});