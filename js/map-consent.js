// Datenschutzfreundliche Karte: das Google-Maps-iframe wird erst nach Klick geladen.
// Vor dem produktiven Einsatz "YOUR_GOOGLE_MAPS_API_KEY" durch einen echten Schlüssel ersetzen.
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

const loadMapBtn = document.getElementById("load-map-btn");
const mapEmbed = document.getElementById("map-embed");

if (loadMapBtn && mapEmbed) {
  loadMapBtn.addEventListener("click", () => {
    const query = encodeURIComponent("Atelier Hendricks, Lohnerhofstraße 9, 78467 Konstanz");
    const iframe = document.createElement("iframe");
    iframe.title = "Karte: Atelier Hendricks, Lohnerhofstraße 9, 78467 Konstanz";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.src = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${query}`;
    mapEmbed.innerHTML = "";
    mapEmbed.appendChild(iframe);
  });
}
