document.addEventListener('DOMContentLoaded', () => {
  // --- Language toggle ---
  let currentLang = localStorage.getItem('lang') || 'en';
  const langToggle = document.getElementById('lang-toggle');
  const placeSearch = document.getElementById('place-search');
  const guideBtn = document.getElementById('guide-btn');
  const gameBtn = document.getElementById('game-btn');
  const helplineBtn = document.getElementById('helpline-btn');

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    langToggle.textContent = TRANSLATIONS[lang].langToggleTo;
    placeSearch.placeholder = TRANSLATIONS[lang].searchPlaceholder;
    if (guideBtn) guideBtn.textContent = TRANSLATIONS[lang].guideBtn;
    if (gameBtn) gameBtn.textContent = TRANSLATIONS[lang].gameBtn;
    if (helplineBtn) helplineBtn.textContent = TRANSLATIONS[lang].helplineBtn;
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
    markers.forEach((marker, i) => marker.setPopupContent(buildPopupHtml(markersData[i])));
  });

  const map = L.map('map', {
    minZoom: 13,
    maxZoom: 16,
    center: [27.7172, 85.3240],
    zoom: 13
  });

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

  const markersData = [
    { name: { en: 'Sainik Tudikhel', np: 'सैनिक तुँडिखेल' }, lat: 27.703377, lng: 85.315001, role: { en: 'Safe and Open area', np: 'सुरक्षित र खुला क्षेत्र' }, number: '', type: 'park' },
    { name: { en: 'Sifal Playground', np: 'सिफल खेलमैदान' }, lat: 27.711297, lng: 85.340927, role: { en: 'Safe and Open area', np: 'सुरक्षित र खुला क्षेत्र' }, number: '', type: 'park' },
    { name: { en: 'Balaju Park', np: 'बालाजु पार्क' }, lat: 27.733867, lng: 85.301179, role: { en: 'Safe and Open area', np: 'सुरक्षित र खुला क्षेत्र' }, number: '', type: 'park' },

    { name: { en: 'Red Cross Society (Dillibazar)', np: 'रेडक्रस सोसाइटी (दिल्लिबजार)' }, lat: 27.706118, lng: 85.316942, role: { en: 'Emergency shelter, food, water, and medical care', np: 'आश्रय, भोजन, पानी, र स्वास्थ्य सेवा' }, number: '', type: 'redcross' },
    { name: { en: 'Nepal Red Cross Society, Central Blood Transfusion Service (Putalisadak)', np: 'नेपाल रेडक्रस सोसाइटी, केन्द्रीय रक्तसञ्चार सेवा (पुतलीसडक)' }, lat: 27.702153, lng: 85.319866, role: { en: 'Emergency shelter, food, water, and medical care', np: 'आश्रय, भोजन, पानी, र स्वास्थ्य सेवा' }, number: '01-5388485', type: 'redcross' },
    { name: { en: 'Nepal Red Cross Society (Redcross Rd, Kathmandu 44600)', np: 'नेपाल रेडक्रस सोसाइटी (रेडकक्रस रोड, काठमाडौं ४४६००)' }, lat: 27.699281, lng: 85.290253, role: { en: 'Emergency shelter, food, water, and medical care', np: 'आश्रय, भोजन, पानी, र स्वास्थ्य सेवा' }, number: '+977-1-5370650, +977-1-5372761', type: 'redcross' },
    { name: { en: 'Red Cross (Bhrikuti Mandap)', np: 'रेडक्रस (भृकुटी मण्डप)' }, lat: 27.702305, lng: 85.320089, role: { en: 'Emergency shelter, food, water, and medical care', np: 'आश्रय, भोजन, पानी, र स्वास्थ्य सेवा' }, number: '', type: 'redcross' },

    { name: { en: 'Bir Hospital', np: 'वीर अस्पताल' }, lat: 27.705597, lng: 85.313766, role: { en: 'Government hospital', np: 'सरकारी अस्पताल' }, number: '01-4221119', type: 'hospital' },
    { name: { en: 'BP Smriti Hospital', np: 'बीपी स्मृति अस्पताल' }, lat: 27.737364, lng: 85.326062, role: { en: 'Government hospital', np: 'सरकारी अस्पताल' }, number: '01-4987094', type: 'hospital' },
    { name: { en: 'TU Teaching Hospital - Emergency Ward (Maharajgunj)', np: 'टु शिक्षण अस्पताल - आपतकालीन कक्ष (महाराजगञ्ज)' }, lat: 27.735334, lng: 85.330970, role: { en: 'Emergency ward', np: 'आपतकालीन कक्ष' }, number: '01-4412303', type: 'hospital' },

    { name: { en: 'Hami Nepal', np: 'हामी नेपाल' }, lat: 27.730877, lng: 85.329404, role: { en: 'Non profit organization — helps victims', np: 'गैर-नाफामुखी संस्था — पीडितलाई सहायता' }, number: '9802260012 | 9818370435', type: 'ngo' },
    { name: { en: 'Help Nepal Network (Boudhanath Sadak)', np: 'हेल्प नेपाल नेटवर्क (बौद्धनाथ सडक)' }, lat: 27.719070, lng: 85.352689, role: { en: 'Delivered relief materials', np: 'राहत सामग्री वितरण' }, number: '01-4498328', type: 'ngo' },
    { name: { en: 'Global Peace Foundation Nepal', np: 'ग्लोबल पिस फाउन्डेशन नेपाल' }, lat: 27.718692, lng: 85.329266, role: { en: 'Non profit organization — provides aid', np: 'गैर-नाफामुखी संस्था — सहायता प्रदान गर्छ' }, number: '01-4530042', type: 'ngo' },
    { name: { en: 'IOM Nepal (International Organization for Migration)', np: 'आइओएम नेपाल (अन्तर्राष्ट्रिय आप्रवासन संगठन)' }, lat: 27.727797, lng: 85.323959, role: { en: 'Focuses on providing emergency shelter', np: 'आकस्मिक आश्रय प्रदानमा केन्द्रित' }, number: '01-4526250', type: 'ngo' }
  ];

  function svgPin(colorFill, glyphSvg = '') {
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36">
        <defs><filter id="shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="rgba(0,0,0,0.35)"/></filter></defs>
        <g filter="url(#shadow)">
          <path d="M12 1C6.477 1 2 5.477 2 11c0 7.5 8.5 16.5 9.2 17.2a1.2 1.2 0 0 0 1.6 0C13.5 27.5 22 18.5 22 11 22 5.477 17.523 1 12 1z" fill="${colorFill}"/>
          <circle cx="12" cy="11" r="5.5" fill="white"/>${glyphSvg}
        </g>
      </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  function iconPin({ fill, glyph = 'none' }) {
    let glyphSvg = '';
    if (glyph === 'H') {
      glyphSvg = '<text x="12" y="13.8" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="9" fill="#ef4444">H</text>';
    } else if (glyph === 'cross') {
      glyphSvg = '<rect x="9.5" y="8.2" width="5" height="2.2" fill="#dc2626"/><rect x="11.15" y="6.5" width="2.2" height="5" fill="#dc2626"/>';
    }
    return L.icon({ iconUrl: svgPin(fill, glyphSvg), iconSize: [24, 36], iconAnchor: [12, 34], popupAnchor: [0, -30] });
  }

  function hospitalIcon() { return iconPin({ fill: '#ef4444', glyph: 'H' }); }
  function parkIcon()     { return iconPin({ fill: '#16a34a' }); }
  function redCrossIcon() { return iconPin({ fill: '#ef4444', glyph: 'cross' }); }
  function ngoIcon()      { return iconPin({ fill: '#3b82f6' }); }

  function getIconFor(d) {
    if (d.type === 'hospital') return hospitalIcon();
    if (d.type === 'redcross') return redCrossIcon();
    if (d.type === 'ngo') return ngoIcon();
    return parkIcon();
  }

  const markers = [];
  function buildPopupHtml(d) {
    const name = d.name[currentLang] ?? d.name.en;
    const role = d.role[currentLang] ?? d.role.en;
    const contactLine = d.number ? `<br>Contact: ${d.number}` : '';
    return `<b>${name}</b><br>Role: ${role}${contactLine}`;
  }
  markersData.forEach(d => {
    const m = L.marker([d.lat, d.lng], { icon: getIconFor(d) }).addTo(map);
    m.bindPopup(buildPopupHtml(d));
    markers.push(m);
  });

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

  const sosBtn = document.getElementById('sos-btn');
  const sosCard = document.getElementById('sos-card');
  function openSos() { sosCard.classList.remove('hidden'); sosCard.focus(); }
  function closeSos() { sosCard.classList.add('hidden'); }
  sosBtn.addEventListener('click', (e) => { e.stopPropagation(); openSos(); });
  document.addEventListener('click', (e) => {
    if (sosCard.classList.contains('hidden')) return;
    const withinCard = sosCard.contains(e.target);
    const onButton = sosBtn.contains(e.target);
    if (!withinCard && !onButton) closeSos();
  });
  sosCard.addEventListener('click', (e) => e.stopPropagation());

  const locateBtn = document.getElementById('locate-btn');
  let isLocating = false, firstFixDone = false, userMarker = null, userAccuracyCircle = null, watchId = null, lastLatLng = null;

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
    } else { userMarker.setLatLng(latlng); }

    if (!userAccuracyCircle) {
      userAccuracyCircle = L.circle(latlng, { radius: accuracy, color: '#60a5fa', weight: 1, fillColor: '#93c5fd', fillOpacity: 0.2 }).addTo(map);
    } else {
      userAccuracyCircle.setLatLng(latlng);
      userAccuracyCircle.setRadius(accuracy);
    }
  }

  function startLocationWatch() {
    if (!navigator.geolocation) { alert(TRANSLATIONS[currentLang].geoUnsupported); return; }
    if (watchId !== null) { navigator.geolocation.clearWatch(watchId); watchId = null; }
    isLocating = true; firstFixDone = false; lastLatLng = null; locateBtn.textContent = '⏸️';
    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        if (!isLocating) return;
        const { latitude, longitude, accuracy } = pos.coords;
        const latlng = L.latLng(latitude, longitude);
        lastLatLng = latlng; renderUserLocation(latlng, accuracy);
        if (!firstFixDone) { firstFixDone = true; map.fitBounds(userAccuracyCircle.getBounds(), { maxZoom: 16, padding: [20, 20] }); }
      },
      (err) => { stopLocationWatch(); alert(TRANSLATIONS[currentLang].geoDenied); console.warn('Geolocation error:', err); },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );
  }

  function stopLocationWatch() {
    isLocating = false; locateBtn.textContent = '📍';
    if (watchId !== null) { navigator.geolocation.clearWatch(watchId); watchId = null; }
    if (userMarker) { map.removeLayer(userMarker); userMarker = null; }
    if (userAccuracyCircle) { map.removeLayer(userAccuracyCircle); userAccuracyCircle = null; }
  }

  locateBtn.addEventListener('click', () => { if (isLocating) stopLocationWatch(); else startLocationWatch(); });
  locateBtn.addEventListener('dblclick', (e) => { if (isLocating && lastLatLng) { e.preventDefault(); map.setView(lastLatLng, Math.max(map.getZoom(), 15)); } });
});