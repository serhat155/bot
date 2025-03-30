
document.addEventListener("DOMContentLoaded", function () {
    const hedefJSON = "https://serhat155.github.io/bot/hdfilm_json_guncel.json";
    fetch(hedefJSON)
        .then(res => res.json())
        .then(veri => {
            const filmAlani = document.getElementById("film-listesi");
            const sliderAlani = document.getElementById("slider-alani");
            filmAlani.innerHTML = "";

            veri.forEach(film => {
                // IMDb puanı yüksek olanları slider'a da ekle
                if (parseFloat(film.imdb) >= 7.5) {
                    const slide = document.createElement("div");
                    slide.classList.add("swiper-slide");
                    slide.innerHTML = `
                        <img src="${film.poster}" alt="${film.baslik}">
                        <h3>${film.baslik}</h3>
                    `;
                    sliderAlani.appendChild(slide);
                }

                // Tüm filmleri listeye ekle
                const kart = document.createElement("div");
                kart.classList.add("film-kart");
                kart.innerHTML = `
                    <img src="${film.poster}" alt="${film.baslik}">
                    <h3>${film.baslik}</h3>
                    <div class="imdb">⭐ IMDb: ${film.imdb}</div>
                    <div class="yil">📅 Yıl: ${film.yil}</div>
                    <div class="tur">🎭 Tür: ${film.tur ? film.tur : "Bilinmiyor"}</div>
                    <a class="izle-btn" href="${film.video}" target="_blank">İzle</a>
                `;
                filmAlani.appendChild(kart);
            });

            new Swiper(".mySwiper", {
                slidesPerView: "auto",
                spaceBetween: 10,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });
        })
        .catch(err => {
            console.error(err);
            document.getElementById("film-listesi").innerHTML = "❌ Film verileri yüklenemedi.";
        });
});
