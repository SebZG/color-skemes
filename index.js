const modes = ["Monochrome", "Monochrome-dark", "Monochrome-light", "Analogic", "Complement", "Analogic-complement", "Triad", "Quad"]

// GET https://www.thecolorapi.com/scheme?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=html&mode=analogic&count=6

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

colorItem[0].style.backgroundColor = "black";
colorItem[1].style.backgroundColor = "yellow";
colorItem[2].style.backgroundColor = "red";
colorItem[3].style.backgroundColor = "blue";
colorItem[4].style.backgroundColor = "green";

hexCode[0].textContent = "#ffffff"
hexCode[1].textContent = "#ffffff"
hexCode[2].textContent = "#ffffff"
hexCode[3].textContent = "#ffffff"
hexCode[4].textContent = "#ffffff"