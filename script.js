
const JSON_URL = "https://serhat155.github.io/bot/hdfilm_json_guncel.json";

fetch(JSON_URL)
  .then(res => res.json())
  .then(data => {
    const filmListesi = document.getElementById("film-listesi");
    const slaytAlani = document.getElementById("slayt-alani");

    data.forEach(film => {
      const kart = document.createElement("div");
      kart.className = "film-kart";
      kart.innerHTML = `
        <img src="${film.poster}" alt="${film.baslik}">
        <h3>${film.baslik}</h3>
        <div class="orjinal">🌍 ${film.orjinal || ""}</div>
        <div class="imdb">⭐ IMDb: ${film.imdb}</div>
        <div class="yil">📅 Yıl: ${film.yil || "Bilinmiyor"}</div>
        <div class="tur">🎭 Tür: ${film.kategori || "Bilinmiyor"}</div>
        <button class="watch-btn" data-video="${film.link}">İzle</button>
      `;
      filmListesi.appendChild(kart);

      if (parseFloat(film.imdb) >= 5.0) {
        const img = document.createElement("img");
        img.src = film.poster;
        img.alt = film.baslik;
        slaytAlani.appendChild(img);
      }
    });
  });

// Lightbox Aç
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("watch-btn")) {
    const videoURL = e.target.getAttribute("data-video");
    document.getElementById("lightbox-iframe").src = videoURL;
    document.getElementById("lightbox-player").style.display = "block";
  }
});

// Lightbox Kapat
document.getElementById("lightbox-close").addEventListener("click", function () {
  document.getElementById("lightbox-iframe").src = "";
  document.getElementById("lightbox-player").style.display = "none";
});
