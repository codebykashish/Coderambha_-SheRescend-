document.addEventListener('DOMContentLoaded', () => {
  // --- Language toggle ---
  let currentLang = localStorage.getItem('lang') || 'en';
  const langToggle = document.getElementById('lang-toggle');
  const placeSearch = document.getElementById('place-search');
  const guideBtn = document.getElementById('guide-btn');
  const helplineBtn = document.getElementById('helpline-btn');

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    langToggle.textContent = TRANSLATIONS[lang].langToggleTo;
    placeSearch.placeholder = TRANSLATIONS[lang].searchPlaceholder;
    guideBtn.textContent = TRANSLATIONS[lang].guideBtn;
    helplineBtn.textContent = TRANSLATIONS[lang].helplineBtn;
    document.querySelectorAll('[data-i18n="policeLabel"]').forEach(el => el.textContent = TRANSLATIONS[lang].policeLabel);
    document.querySelectorAll('[data-i18n="ambulanceLabel"]').forEach(el => el.textContent = TRANSLATIONS[lang].ambulanceLabel);
    document.querySelectorAll('[data-i18n="fireLabel"]').forEach(el => el.textContent = TRANSLATIONS[lang].fireLabel);
    document.querySelectorAll('[data-i18n="womenLabel"]').forEach(el => el.textContent = TRANSLATIONS[lang].womenLabel);
    document.querySelectorAll('[data-i18n="childLabel"]').forEach(el => el.textContent = TRANSLATIONS[lang].childLabel);
  }

  applyLang(currentLang);
  langToggle.addEventListener('click', () => {
    const nextLang = currentLang === 'en' ? 'np' : 'en';
    applyLang(nextLang);
    // Refresh marker popups to the current language
    markers.forEach((marker, i) => marker.setPopupContent(buildPopupHtml(markersData[i])));
  });

  // --- Initialize Leaflet map ---
  const map = L.map('map', {
    minZoom: 13,
    maxZoom: 16,
    center: [27.7172, 85.3240],
    zoom: 13
  });

  // Offline tiles constrained to your ranges
  const TRANSPARENT_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';
  const ALLOWED_RANGES = {
    13: { xMin: 6036,  xMax: 6038,  yMin: 3438,  yMax: 3439 },
    14: { xMin: 12073, xMax: 12076, yMin: 6876,  yMax: 6879 },
    15: { xMin: 24146, xMax: 24153, yMin: 13753, yMax: 13759 },
    16: { xMin: 48292, xMax: 48306, yMin: 27507, yMax: 27519 }
  };

  const OfflineRangedTileLayer = L.TileLayer.extend({
    getTileUrl: function(coords) {
      const z = coords.z;
      const r = ALLOWED_RANGES[z];
      if (!r) return TRANSPARENT_PNG;
      if (coords.x < r.xMin || coords.x > r.xMax || coords.y < r.yMin || coords.y > r.yMax) {
        return TRANSPARENT_PNG;
      }
      return L.TileLayer.prototype.getTileUrl.call(this, coords);
    }
  });

  new OfflineRangedTileLayer('./OSMPublicTransport/{z}/{x}/{y}.png', {
    minZoom: 13,
    maxZoom: 16,
    attribution: 'Offline Map - Kathmandu',
    noWrap: true,
    tileSize: 256,
    errorTileUrl: TRANSPARENT_PNG
  }).addTo(map);

  // Fit to coverage (use z=15 range for a reasonable bound)
  function tileXToLon(x, z) { return (x / Math.pow(2, z)) * 360 - 180; }
  function tileYToLat(y, z) {
    const n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
    return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  }
  (function fitToTiles() {
    const z = 15, r = ALLOWED_RANGES[z];
    const west = tileXToLon(r.xMin, z);
    const east = tileXToLon(r.xMax + 1, z);
    const north = tileYToLat(r.yMin, z);
    const south = tileYToLat(r.yMax + 1, z);
    map.fitBounds([[south, west],[north, east]]);
  })();

  // --- Marker data ---
  const markersData = [
    { name: { en: 'Hospital', np: 'अस्पताल' }, lat: 27.712, lng: 85.324, role: { en: 'Medical help', np: 'स्वास्थ्य सहायता' }, number: '01-1234567' },
    { name: { en: 'Rescue Center', np: 'उद्धार केन्द्र' }, lat: 27.715, lng: 85.322, role: { en: 'Rescue', np: 'उद्धार' }, number: '01-9876543' },
    { name: { en: 'Safe Zone', np: 'सुरक्षित स्थान' }, lat: 27.718, lng: 85.327, role: { en: 'Temporary shelter', np: 'अस्थायी आश्रय' }, number: '01-5555555' }
  ];

  const markers = [];
  function buildPopupHtml(d) {
    const name = d.name[currentLang] ?? d.name.en;
    const role = d.role[currentLang] ?? d.role.en;
    return `<b>${name}</b><br>Role: ${role}<br>Contact: ${d.number}`;
  }
  markersData.forEach(d => {
    const m = L.marker([d.lat, d.lng]).addTo(map);
    m.bindPopup(buildPopupHtml(d));
    markers.push(m);
  });

  // --- Search feature ---
  const searchIcon = document.getElementById('search-icon');
  searchIcon.addEventListener('click', () => {
    const q = (placeSearch.value || '').trim().toLowerCase();
    if (!q) return;
    const found = markersData.find(d =>
      (d.name.en || '').toLowerCase().includes(q) ||
      (d.name.np || '').toLowerCase().includes(q)
    );
    if (found) {
      map.setView([found.lat, found.lng], Math.min(Math.max(map.getZoom(), 14), 16));
      const marker = markers.find(m => m.getLatLng().lat === found.lat && m.getLatLng().lng === found.lng);
      if (marker) marker.openPopup();
    } else {
      alert(TRANSLATIONS[currentLang].placeNotFound);
    }
  });

  // --- SOS open/close (click outside to close) ---
  const sosBtn = document.getElementById('sos-btn');
  const sosCard = document.getElementById('sos-card');

  function openSos() {
    sosCard.classList.remove('hidden');
    sosCard.focus();
  }
  function closeSos() {
    sosCard.classList.add('hidden');
  }
  sosBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openSos();
  });
  document.addEventListener('click', (e) => {
    if (sosCard.classList.contains('hidden')) return;
    const withinCard = sosCard.contains(e.target);
    const onButton = sosBtn.contains(e.target);
    if (!withinCard && !onButton) {
      closeSos();
    }
  });
  sosCard.addEventListener('click', (e) => e.stopPropagation());

  // --- Live location (GPS) toggle (robust) ---
  const locateBtn = document.getElementById('locate-btn');
  let isLocating = false;
  let firstFixDone = false;
  let userMarker = null;
  let userAccuracyCircle = null;
  let watchId = null;
  let lastLatLng = null;

  function renderUserLocation(latlng, accuracy) {
    if (!userMarker) {
      userMarker = L.marker(latlng, {
        icon: L.divIcon({
          className: 'user-location-icon',
          html: '<div style="width:12px;height:12px;background:#2563eb;border:2px solid #93c5fd;border-radius:50%;box-shadow:0 0 0 4px rgba(37,99,235,0.2)"></div>',
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        })
      }).addTo(map);
    } else {
      userMarker.setLatLng(latlng);
    }

    if (!userAccuracyCircle) {
      userAccuracyCircle = L.circle(latlng, {
        radius: accuracy,
        color: '#60a5fa',
        weight: 1,
        fillColor: '#93c5fd',
        fillOpacity: 0.2
      }).addTo(map);
    } else {
      userAccuracyCircle.setLatLng(latlng);
      userAccuracyCircle.setRadius(accuracy);
    }
  }

  function startLocationWatch() {
    if (!navigator.geolocation) {
      alert(TRANSLATIONS[currentLang].geoUnsupported);
      return;
    }
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }

    isLocating = true;
    firstFixDone = false;
    lastLatLng = null;
    locateBtn.textContent = '⏸️';

    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        if (!isLocating) return;
        const { latitude, longitude, accuracy } = pos.coords;
        const latlng = L.latLng(latitude, longitude);
        lastLatLng = latlng;
        renderUserLocation(latlng, accuracy);

        if (!firstFixDone) {
          firstFixDone = true;
          map.fitBounds(userAccuracyCircle.getBounds(), { maxZoom: 16, padding: [20, 20] });
        }
      },
      (err) => {
        stopLocationWatch();
        alert(TRANSLATIONS[currentLang].geoDenied);
        console.warn('Geolocation error:', err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 15000
      }
    );
  }

  function stopLocationWatch() {
    isLocating = false;
    locateBtn.textContent = '📍';
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }
    if (userMarker) { map.removeLayer(userMarker); userMarker = null; }
    if (userAccuracyCircle) { map.removeLayer(userAccuracyCircle); userAccuracyCircle = null; }
  }

  locateBtn.addEventListener('click', () => {
    if (isLocating) {
      stopLocationWatch();
    } else {
      startLocationWatch();
    }
  });

  // Optional: recenter to the latest fix on double-click
  locateBtn.addEventListener('dblclick', (e) => {
    if (isLocating && lastLatLng) {
      e.preventDefault();
      map.setView(lastLatLng, Math.max(map.getZoom(), 15));
    }
  });
});