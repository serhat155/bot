
const jsonURL = "https://raw.githubusercontent.com/Serhat155/bot/main/hdfilm_json_guncel.json";

fetch(jsonURL)
  .then(res => res.json())
  .then(data => {
    const filmAlani = document.getElementById("film-listesi");
    const sliderAlani = document.getElementById("slider-filmler");

    const sirali = data.sort((a, b) => parseFloat(b.imdb) - parseFloat(a.imdb));

    sirali.forEach(film => {
      const kart = document.createElement("div");
      kart.className = "film-kart";
      kart.setAttribute("data-tur", film.tur || "");
      kart.setAttribute("data-dil", film.dil || "");

      kart.innerHTML = `
        <img src="${film.poster}" alt="${film.title}" />
        <h3>${film.title}</h3>
        <div class="imdb">⭐ IMDb: ${film.imdb}</div>
      `;
      filmAlani.appendChild(kart);

      if (parseFloat(film.imdb) >= 7.0) {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `<img src="${film.poster}" alt="${film.title}" style="width:100%">`;
        sliderAlani.appendChild(slide);
      }
    });

    new Swiper(".mySwiper", {
      slidesPerView: 5,
      spaceBetween: 10,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
    });

    document.getElementById("kategori-sec").addEventListener("change", uygulaFiltreler);
    document.getElementById("dil-sec").addEventListener("change", uygulaFiltreler);
  });

function uygulaFiltreler() {
  const kategori = document.getElementById("kategori-sec").value.toLowerCase();
  const secilenDil = document.getElementById("dil-sec").value.toLowerCase();
  const filmler = document.querySelectorAll(".film-kart");
  const filmAlani = document.getElementById("film-listesi");

  const sirali = Array.from(filmler).sort((a, b) => {
    const imdbA = parseFloat(a.querySelector(".imdb").textContent.replace("⭐ IMDb: ", "")) || 0;
    const imdbB = parseFloat(b.querySelector(".imdb").textContent.replace("⭐ IMDb: ", "")) || 0;
    return imdbB - imdbA;
  });

  filmAlani.innerHTML = "";
  sirali.forEach(kart => {
    const kartTur = kart.getAttribute("data-tur").toLowerCase();
    const kartDil = kart.getAttribute("data-dil").toLowerCase();
    const kategoriUyar = kategori === "hepsi" || kartTur.includes(kategori);
    const dilUyar =
      secilenDil === "hepsi" ||
      (secilenDil === "dublaj" && kartDil.includes("dublaj")) ||
      (secilenDil === "altyazi" && kartDil.includes("altyazı"));

    if (kategoriUyar && dilUyar) {
      kart.style.display = "block";
    } else {
      kart.style.display = "none";
    }
    filmAlani.appendChild(kart);
  });
}
