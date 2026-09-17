let currentImage = 1;
const totalImages = 14;

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
    alert(currentLanguage === "ru" ? "Discord скопирован" : "Discord copied");
}

const pricing = {
    ru: {
        formats: [
            { value: 2000, label: "Бюст: 2000₽" },
            { value: 4000, label: "По бёдра: 4000₽" },
            { value: 6000, label: "Фулл: 6000₽" },
            { value: 250, label: "Чиби line: 250₽" },
            { value: 500, label: "Чиби color: 500₽" }
        ],
        backgrounds: [
            { value: 0, label: "Без фона" },
            { value: 0.5, label: "Средний: +50%" },
            { value: 1, label: "Детальный: +100%" }
        ]
    },
    en: {
        formats: [
            { value: 45, label: "Head: $45" },
            { value: 80, label: "Half: $80" },
            { value: 120, label: "Full: $120" },
            { value: 5, label: "Chibi line: $5" },
            { value: 10, label: "Chibi color: $10" }
        ],
        backgrounds: [
            { value: 0, label: "No background" },
            { value: 0.5, label: "Medium: +50%" },
            { value: 1, label: "Detailed: +100%" }
        ]
    }
};

const translations = {
    ru: {
        artistName: "Диана Злодейка",
        galleryTitle: "Галерея",
        calculatorTitle: "Калькулятор стоимости",
        formatLabel: "Формат персонажа",
        extraCharactersLabel: "Доп. персонаж (+100%)",
        backgroundLabel: "Фон",
        heavyDetailsLabel: "Доп. детали, крылья, броня и т. д. (+20%)",
        deadlineLabel: "Установление дедлайна (+25%)",
        discountLabel: "Подписка на платку (скидка 20%)",
        totalLabel: "Итог",
        importantTitle: "Важно",
        prepaymentText: "Предоплата 100% после одобрения скетча",
        animationText: "Анимации: <strong>от 30$</strong> (цена за арт считается отдельно)",
        customsText: "Кастомы: <strong>от 7000₽</strong>",
        paymentText: "Оплата: Boosty, Tribute, СБП",
        imageAlt: "Работа художницы",
        prevImage: "Предыдущее изображение",
        nextImage: "Следующее изображение"
    },
    en: {
        artistName: "Zlodeykapass",
        galleryTitle: "Gallery",
        calculatorTitle: "Price calculator",
        formatLabel: "Character format",
        extraCharactersLabel: "Extra character (+100%)",
        backgroundLabel: "Background",
        heavyDetailsLabel: "Extra details, wings, armor, etc. (+20%)",
        deadlineLabel: "Set deadline (+25%)",
        discountLabel: "Subscription discount (20%)",
        totalLabel: "Total",
        importantTitle: "Important",
        prepaymentText: "100% prepayment after sketch approval",
        animationText: "Animation: <strong>from $40</strong> (art price is calculated separately)",
        customsText: "Customs: <strong>from $160</strong>",
        paymentText: "Payment: Boosty, Tribute",
        imageAlt: "Artist's work",
        prevImage: "Previous image",
        nextImage: "Next image"
    }
};

let currentLanguage = "ru";

const formatSelect = document.getElementById("format");
const backgroundSelect = document.getElementById("background");
const discountRow = document.getElementById("discountRow");
const discountInput = document.getElementById("discount");
const languageButtons = document.querySelectorAll(".language-option");

function setLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;
    document.title = language === "ru"
        ? "Рыбинская Психопатка"
        : "Zlodeykapass";

    Object.entries(translations[language]).forEach(([id, value]) => {
        if (["imageAlt", "prevImage", "nextImage"].includes(id)) return;
        const element = document.getElementById(id);
        if (!element) return;
        if (["animationText", "customsText"].includes(id)) element.innerHTML = value;
        else element.textContent = value;
    });

    formatSelect.innerHTML = pricing[language].formats
        .map((format) => `<option value="${format.value}">${format.label}</option>`)
        .join("");

    backgroundSelect.innerHTML = pricing[language].backgrounds
        .map((background) => `<option value="${background.value}">${background.label}</option>`)
        .join("");

    discountRow.hidden = language === "en";
    if (language === "en") discountInput.checked = false;

    img.alt = translations[language].imageAlt;
    prevButton.setAttribute("aria-label", translations[language].prevImage);
    nextButton.setAttribute("aria-label", translations[language].nextImage);

    languageButtons.forEach((button) => {
        const isActive = button.dataset.language === language;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    calculate();
}

languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
});

document.querySelectorAll("select, input").forEach((input) => {
    input.addEventListener("change", calculate);
    input.addEventListener("input", calculate);
});

function normalizeCount(value) {
    return Math.max(0, parseInt(value || 0, 10) || 0);
}

function calculate() {
    const base = parseInt(formatSelect.value, 10) || 0;
    const extraCharactersInput = document.getElementById("extraCharacters");
    const extraCharacters = normalizeCount(extraCharactersInput.value);

    extraCharactersInput.value = extraCharacters;

    let total = base * (1 + extraCharacters);

    const backgroundRate = parseFloat(backgroundSelect.value) || 0;
    total *= 1 + backgroundRate;

    if (document.getElementById("heavyDetails").checked) total *= 1.2;

    const isEstimate = document.getElementById("nsfw").checked;
    if (isEstimate) total *= 1.5;
    if (document.getElementById("deadline").checked) total *= 1.25;

    if (currentLanguage === "ru" && discountInput.checked) total *= 0.8;

    const roundedTotal = Math.round(total);
    const estimateMark = isEstimate ? "~" : "";
    document.getElementById("totalValue").textContent = currentLanguage === "en"
        ? `$${roundedTotal}${estimateMark}`
        : `${roundedTotal}${estimateMark} ₽`;
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") changeImage(1);
    if (event.key === "ArrowLeft") changeImage(-1);
});

setLanguage("ru");
