
document.addEventListener("DOMContentLoaded", function () {
    const hedefJSON = "https://serhat155.github.io/bot/film_ornekleri.json";
    fetch(hedefJSON)
        .then(res => res.json())
        .then(veri => {
            const filmAlani = document.getElementById("film-listesi");
            filmAlani.innerHTML = "";
            veri.forEach(film => {
                const kart = document.createElement("div");
                kart.classList.add("film-kart");
                kart.innerHTML = `
                    <img src="${film.poster}" alt="${film.baslik}">
                    <h3>${film.baslik}</h3>
                    <div class="imdb">⭐ IMDb: ${film.imdb}</div>
                    <div class="yil">📅 Yıl: ${film.yil}</div>
                    <div class="tur">🎭 Tür: ${film.tur}</div>
                    <a class="izle-btn" href="${film.video}" target="_blank">İzle</a>
                `;
                filmAlani.appendChild(kart);
            });
        })
        .catch(err => {
            document.getElementById("film-listesi").innerHTML = "❌ Film verileri yüklenemedi.";
        });
});
