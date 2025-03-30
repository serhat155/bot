
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
                kart.setAttribute("data-tur", film.tur || "");
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
            
            // Kategorileri select'e ekle
            const select = document.getElementById("kategori-sec");
            if (film.tur) {
                const turler = film.tur.split(",").map(t => t.trim());
                turler.forEach(tur => {
                    if (![...select.options].some(opt => opt.value === tur)) {
                        const opt = document.createElement("option");
                        opt.value = tur;
                        opt.textContent = tur;
                        select.appendChild(opt);
                    }
                });
            }
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


function kategoriFiltrele(kategori) {
    document.querySelectorAll('.film-kart').forEach(kart => {
        const kartTur = kart.getAttribute('data-tur') || "";
        if (kategori === "hepsi" || kartTur.includes(kategori)) {
            kart.style.display = "block";
        } else {
            kart.style.display = "none";
        }
    });
}
document.getElementById("kategori-sec").addEventListener("change", function () {
    kategoriFiltrele(this.value);
});


document.getElementById("film-ara").addEventListener("input", function () {
    const kelime = this.value.toLowerCase();
    document.querySelectorAll('.film-kart').forEach(kart => {
        const metin = kart.textContent.toLowerCase();
        kart.style.display = metin.includes(kelime) ? "block" : "none";
    });
});
