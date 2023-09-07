const apiUrl = "https://api.shrtco.de/v2/shorten/?url=";

const hamburger = document.querySelector(".hamburger");
const navigation = document.querySelector(".navigator");
const shortenBtn = document.querySelector(".shorten-btn");
const resultDiv = document.querySelector(".results");
const copyBtn = document.querySelector(".copy");

hamburger.addEventListener("click", () => {
  navigation.classList.toggle("d-none");
});

const input = document.getElementById("link-input");

function kopyalaMetniPanoya(metin) {
  var tempInput = document.createElement("textarea");
  tempInput.style = "position: absolute; left: -1000px; top: -1000px";
  tempInput.value = metin;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

shortenBtn.addEventListener("click", () => {
  const fullUrl = apiUrl + input.value;
  const textWarn = document.querySelector(".warn");
  fetch(fullUrl)
    .then((res) => res.json())
    .then((data) => {
      if (!data.ok) {
        input.classList.add("warning");
        textWarn.classList.remove("d-none");
      } else if (data.ok) {
        input.classList.remove("warning");
        textWarn.classList.add("d-none");
      }

      console.log(data.result.full_short_link);
      resultDiv.innerHTML += `  <div class="res"> 
        <span class="link-of-inp">${input.value}</span>
        <div class="right-res">
          <span class="shortend-inp">${data.result.full_short_link}</span>
          <span class="copy">Copy</span>
        </div>
      </div> `;

      const copyButtons = document.querySelectorAll(".copy");
      copyButtons.forEach((copyButton) => {
        copyButton.addEventListener("click", (e) => {
          const shortLink = e.target.previousElementSibling.innerText;
          kopyalaMetniPanoya(shortLink);
          e.target.classList.add("copied");
          copyButton.innerText = `Copied!`;
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
});
input.value = "";
