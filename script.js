let currentImage = 1;
const totalImages = 12;

const img = document.getElementById("galleryImage");
const counter = document.getElementById("galleryCounter");
const nextButton = document.querySelector(".nav:last-of-type");
const prevButton = document.querySelector(".nav:first-of-type");

nextButton.onclick = () => changeImage(1);
prevButton.onclick = () => changeImage(-1);

function changeImage(dir) {
    currentImage += dir;

    if (currentImage > totalImages) currentImage = 1;
    if (currentImage < 1) currentImage = totalImages;

    img.src = `image${currentImage}.jpg`;
    counter.textContent = `${currentImage} / ${totalImages}`;
}

function copyDiscord() {
    navigator.clipboard.writeText("zlodeykapass");
    alert("Discord скопирован");
}

const inputs = document.querySelectorAll("select, input");
inputs.forEach((input) => {
    input.addEventListener("change", calculate);
    input.addEventListener("input", calculate);
});

function normalizeCount(value) {
    return Math.max(0, parseInt(value || 0, 10) || 0);
}

function calculate() {
    const base = parseInt(document.getElementById("format").value, 10);
    const bg = parseInt(document.getElementById("background").value, 10);
    const extraCharactersInput = document.getElementById("extraCharacters");
    const extrasInput = document.getElementById("extras");
    const extraCharacters = normalizeCount(extraCharactersInput.value);
    const extras = normalizeCount(extrasInput.value);

    extraCharactersInput.value = extraCharacters;
    extrasInput.value = extras;

    let total = base + bg;

    total += base * extraCharacters;
    total += extras * 500;

    if (document.getElementById("heavyDetails").checked) {
        total *= 1.3;
    }

    if (document.getElementById("process").checked) total += 50;
    if (document.getElementById("nsfw").checked) total += 500;
    if (document.getElementById("deadline").checked) total += 500;

    if (document.getElementById("discount").checked) {
        total *= 0.8;
    }

    document.getElementById("totalPrice").textContent = Math.round(total);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") changeImage(1);
    if (event.key === "ArrowLeft") changeImage(-1);
});

calculate();
