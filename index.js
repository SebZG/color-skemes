const modes = ["Monochrome", "Monochrome-dark", "Monochrome-light", "Analogic", "Complement", "Analogic-complement", "Triad", "Quad"]

const form = document.querySelector("#scheme-form");
const seedPicker = document.querySelector("#seed-picker");
const modeSelect = document.querySelector("#mode");
const schemeWrapper = document.querySelector("#scheme-wrapper");
const colorItem = document.querySelectorAll(".color-item");
const hexCodeWrapper = document.querySelector("#hex-code-wrapper");
const hexCode = document.querySelectorAll(".hex-code");
const btnGetScheme = document.querySelector("#btn-get-scheme");

for (let mode of modes) {
    modeSelect.options[modeSelect.options.length] = new Option(mode, mode.toLowerCase());
}

const url = "https://www.thecolorapi.com/scheme"
const format = "json"
let hex = ""
let mode = ""
let count = ""

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const data = {
        seed: formData.get("seed"),
        mode: formData.get("mode"),
        count: formData.get("count")
    }

    hex = data.seed.replace("#", "");
    mode = data.mode;
    count = data.count;

    fetch(`${url}?hex=${hex}&format=${format}&mode=${mode}&count=${count}`)
        .then(res => res.json())
        .then(data => renderColors(data));
});

function renderColors({ colors }) {
    console.log(colors)
    schemeWrapper.innerHTML = colors.map(({ hex }) => `
        <div class="color-item" style="background-color: ${hex.value}"></div>
    `).join("");

    hexCodeWrapper.innerHTML = colors.map(({ hex }) => `
        <div class="hex-code">${hex.value}</div>
    `).join("");

    syncScroll();
}

function syncScroll() {
    let isSyncing = false;

    const syncScroll = (source, target) => {
        if (isSyncing) return;
        isSyncing = true;
        target.scrollLeft = source.scrollLeft;
        requestAnimationFrame(() => {
            isSyncing = false;
        });
    };

    // Remove any existing event listeners first
    const schemeScroll = () => syncScroll(schemeWrapper, hexCodeWrapper);
    const hexScroll = () => syncScroll(hexCodeWrapper, schemeWrapper);
    
    schemeWrapper.removeEventListener('scroll', schemeScroll);
    hexCodeWrapper.removeEventListener('scroll', hexScroll);

    // Add new event listeners
    schemeWrapper.addEventListener('scroll', schemeScroll);
    hexCodeWrapper.addEventListener('scroll', hexScroll);
}