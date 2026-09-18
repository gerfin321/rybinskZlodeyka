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
            { value: 6000, label: "Полный рост: 6000₽" },
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
        nsfwLabel: "NSFW (+50%~)",
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
        nsfwLabel: "NSFW (+50%~)",
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

const helpContent = {
    ru: {
        format: {
            title: "Формат персонажа",
            images: ["headExample.jpg", "halfExample.jpg", "fullExample.jpg"],
            captions: ["Бюст", "По бёдра", "Полный рост"]
        },
        extraCharacters: {
            title: "Доп. персонаж (+100%)",
            description: "Если на рисунке должно быть больше одного человека, добавьте нужное количество, не считая первого.",
            images: ["extraCharExample1.jpg", "extraCharExample2.jpg", "extraCharExample3.jpg"]
        },
        background: {
            title: "Фон",
            description: "Выберите конкретную детализацию фона. Если фон не нужен либо он простой, оставьте «Без фона».",
            images: ["simpleBackgroundExample.jpg", "mediumBackgroundExample.jpg", "highBackgroundExample.jpg"],
            captions: ["Простой", "Средний", "Детализированный"]
        },
        heavyDetails: {
            title: "Доп. детали",
            images: ["extraDetailExample.jpg"]
        },
        nsfw: {
            title: "NSFW (+50%~)",
            description: "Если на рисунке должен быть 18+ контент: эротика, grimdark и т. д., поставьте галочку."
        },
        deadline: {
            title: "Установление дедлайна (+25%)",
            description: "Если вы хотите знать точный срок исполнения рисунка, поставьте галочку."
        },
        discount: {
            title: "Подписка на платку (скидка 20%)",
            description: "Если вы подписаны на платный ТГК, поставьте галочку, чтобы получить скидку."
        },
        customs: {
            title: "Кастомы",
            images: ["customExample.jpg"]
        },
        animation: {
            title: "Анимации",
            videos: ["aleriskun.webm", "armsmithkun.webm", "kevinkun.webm", "nalreschan.webm"],
            compact: true
        }
    },
    en: {
        format: {
            title: "Character format",
            images: ["headExample.jpg", "halfExample.jpg", "fullExample.jpg"],
            captions: ["Head", "Half", "Full body"]
        },
        extraCharacters: {
            title: "Extra character (+100%)",
            description: "If the artwork includes more than one person, add the required number without counting the first one.",
            images: ["extraCharExample1.jpg", "extraCharExample2.jpg", "extraCharExample3.jpg"]
        },
        background: {
            title: "Background",
            description: "Choose the desired background detail. If you do not need a background or it is simple, leave «No background» selected.",
            images: ["simpleBackgroundExample.jpg", "mediumBackgroundExample.jpg", "highBackgroundExample.jpg"],
            captions: ["Simple", "Medium", "Detailed"]
        },
        heavyDetails: {
            title: "Extra details",
            images: ["extraDetailExample.jpg"]
        },
        nsfw: {
            title: "NSFW (+50%~)",
            description: "For 18+ content, such as erotic or grimdark art, tick the checkbox."
        },
        deadline: {
            title: "Set deadline (+25%)",
            description: "Tick the checkbox if you want a precise completion deadline for your artwork."
        },
        discount: {
            title: "Subscription discount (20%)",
            description: "If you are subscribed to the paid Telegram channel, tick the checkbox to receive the discount."
        },
        customs: {
            title: "Customs",
            images: ["customExample.jpg"]
        },
        animation: {
            title: "Animations",
            videos: ["aleriskun.webm", "armsmithkun.webm", "kevinkun.webm", "nalreschan.webm"],
            compact: true
        }
    }
};

const helpPopover = document.getElementById("helpPopover");
const helpPopoverContent = document.getElementById("helpPopoverContent");
const helpTriggers = document.querySelectorAll(".help-trigger");
const imageRotationMs = 3000;
const animationRotationMs = 1500;
let activeHelpTrigger = null;
let helpHideTimer = null;
let helpCloseTimer = null;
let helpMediaTimer = null;
let activeHelp = null;
let activeHelpMediaIndex = 0;

function clearHelpHideTimer() {
    window.clearTimeout(helpHideTimer);
    helpHideTimer = null;
}

function clearHelpCloseTimer() {
    window.clearTimeout(helpCloseTimer);
    helpCloseTimer = null;
}

function stopHelpMediaRotation() {
    window.clearInterval(helpMediaTimer);
    helpMediaTimer = null;
}

function updateHelpMedia() {
    if (!activeHelp) return;

    const sources = activeHelp.images || activeHelp.videos;
    if (!sources || !sources.length) return;

    const source = sources[activeHelpMediaIndex % sources.length];
    const caption = helpPopoverContent.querySelector(".help-caption");

    if (activeHelp.videos) {
        const videos = helpPopoverContent.querySelectorAll(".help-video");
        videos.forEach((video, index) => {
            const isActive = index === activeHelpMediaIndex;
            video.classList.toggle("is-active", isActive);
            if (isActive) video.play().catch(() => {});
        });
    } else {
        const media = helpPopoverContent.querySelector(".help-media");
        if (media) media.src = source;
    }

    if (caption) {
        caption.textContent = activeHelp.captions?.[activeHelpMediaIndex % activeHelp.captions.length] || "";
        caption.hidden = !caption.textContent;
    }
}

function startHelpMediaRotation() {
    stopHelpMediaRotation();
    const sources = activeHelp?.images || activeHelp?.videos;
    if (!sources || sources.length < 2) return;

    helpMediaTimer = window.setInterval(() => {
        activeHelpMediaIndex = (activeHelpMediaIndex + 1) % sources.length;
        updateHelpMedia();
    }, activeHelp.videos ? animationRotationMs : imageRotationMs);
}

function renderHelpContent(help) {
    helpPopoverContent.replaceChildren();
    helpPopover.classList.toggle("is-compact", Boolean(help.compact));

    const title = document.createElement("h3");
    title.className = "help-title";
    title.textContent = help.title;
    helpPopoverContent.append(title);

    if (help.description) {
        const description = document.createElement("p");
        description.className = "help-description";
        description.textContent = help.description;
        helpPopoverContent.append(description);
    }

    if (help.images) {
        const mediaWrap = document.createElement("figure");
        mediaWrap.className = "help-media-wrap";
        const image = document.createElement("img");
        image.className = "help-media";
        image.alt = `${help.title}: пример`;
        mediaWrap.append(image);

        if (help.captions) {
            const caption = document.createElement("figcaption");
            caption.className = "help-caption";
            mediaWrap.append(caption);
        }

        helpPopoverContent.append(mediaWrap);
    }

    if (help.videos) {
        const videoStack = document.createElement("div");
        videoStack.className = "help-video-stack";

        help.videos.forEach((source, index) => {
            const video = document.createElement("video");
            video.className = "help-media help-video";
            video.muted = true;
            video.autoplay = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = "auto";
            video.setAttribute("aria-label", `${help.title}: пример ${index + 1}`);
            video.src = source;
            videoStack.append(video);
        });

        helpPopoverContent.append(videoStack);
    }

    if (help.images || help.videos) updateHelpMedia();
}

function positionHelpPopover(trigger) {
    const triggerRect = trigger.getBoundingClientRect();
    const popoverRect = helpPopover.getBoundingClientRect();
    const margin = 12;
    const left = Math.min(
        Math.max(margin, triggerRect.left),
        window.innerWidth - popoverRect.width - margin
    );
    const below = triggerRect.bottom + 10;
    const top = below + popoverRect.height <= window.innerHeight - margin
        ? below
        : Math.max(margin, triggerRect.top - popoverRect.height - 10);

    helpPopover.style.left = `${left}px`;
    helpPopover.style.top = `${top}px`;
}

function hideHelpPopover() {
    clearHelpHideTimer();
    stopHelpMediaRotation();

    if (activeHelpTrigger) activeHelpTrigger.setAttribute("aria-expanded", "false");
    activeHelpTrigger = null;
    activeHelp = null;
    helpPopover.classList.remove("is-visible");
    clearHelpCloseTimer();
    helpCloseTimer = window.setTimeout(() => {
        if (!activeHelpTrigger) helpPopover.hidden = true;
    }, 180);
}

function showHelpPopover(trigger) {
    const key = trigger.dataset.help;
    const help = helpContent[currentLanguage][key] || helpContent.ru[key];
    if (!help) return;

    clearHelpHideTimer();
    clearHelpCloseTimer();
    if (activeHelpTrigger && activeHelpTrigger !== trigger) {
        activeHelpTrigger.setAttribute("aria-expanded", "false");
    }

    activeHelpTrigger = trigger;
    activeHelp = help;
    activeHelpMediaIndex = 0;
    trigger.setAttribute("aria-expanded", "true");
    renderHelpContent(help);
    helpPopover.hidden = false;
    positionHelpPopover(trigger);
    window.requestAnimationFrame(() => helpPopover.classList.add("is-visible"));
    startHelpMediaRotation();
}

function scheduleHelpHide() {
    clearHelpHideTimer();
    helpHideTimer = window.setTimeout(hideHelpPopover, 140);
}

helpTriggers.forEach((trigger) => {
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("mouseenter", () => showHelpPopover(trigger));
    trigger.addEventListener("mouseleave", scheduleHelpHide);
    trigger.addEventListener("focus", () => showHelpPopover(trigger));
    trigger.addEventListener("blur", scheduleHelpHide);
    trigger.addEventListener("click", () => showHelpPopover(trigger));
});

helpPopover.addEventListener("mouseenter", clearHelpHideTimer);
helpPopover.addEventListener("mouseleave", scheduleHelpHide);
window.addEventListener("resize", () => {
    if (activeHelpTrigger && !helpPopover.hidden) positionHelpPopover(activeHelpTrigger);
});
window.addEventListener("scroll", () => {
    if (activeHelpTrigger && !helpPopover.hidden) positionHelpPopover(activeHelpTrigger);
}, { passive: true });
document.addEventListener("pointerdown", (event) => {
    if (!helpPopover.contains(event.target) && !event.target.closest(".help-trigger")) hideHelpPopover();
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hideHelpPopover();
});

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
    const heavyDetailsInput = document.getElementById("heavyDetails");
    const heavyDetails = normalizeCount(heavyDetailsInput.value);

    extraCharactersInput.value = extraCharacters;
    heavyDetailsInput.value = heavyDetails;

    let total = base * (1 + extraCharacters);

    const backgroundRate = parseFloat(backgroundSelect.value) || 0;
    total *= 1 + backgroundRate;

    total *= 1 + heavyDetails * 0.2;

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
