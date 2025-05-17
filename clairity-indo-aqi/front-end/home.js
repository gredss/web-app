const csvData = `location,latitude,longitude,aqi,aqi_category,temperature,humidity,pressure,o2,n2,co2,pm25,pm10,last_updated
Jakarta,-6.200000,106.816666,72,Moderate,32.5,78,1008,20.8,78.1,415,28.5,45.7,2025-05-14T08:30:00
Surabaya,-7.250000,112.750000,63,Moderate,31.8,75,1009,20.9,78.0,410,25.3,40.2,2025-05-14T08:15:00
Bandung,-6.917464,107.619125,85,Moderate,28.2,82,1010,20.7,78.2,420,32.7,50.1,2025-05-14T08:45:00
Medan,3.589444,98.673889,95,Unhealthy,30.5,85,1007,20.5,78.3,425,38.6,58.9,2025-05-14T08:20:00
Semarang,-6.990280,110.421790,53,Moderate,31.0,79,1009,20.9,78.0,405,20.1,35.8,2025-05-14T08:10:00
Makassar,-5.131880,119.417730,45,Good,30.8,76,1010,21.0,77.9,395,18.2,31.5,2025-05-14T08:25:00
Palembang,-2.976074,104.773720,88,Moderate,32.2,83,1008,20.6,78.2,430,34.5,52.3,2025-05-14T08:40:00
Denpasar,-8.650000,115.216667,37,Good,29.5,74,1011,21.1,77.8,390,15.8,27.6,2025-05-14T08:35:00
Balikpapan,-1.252728,116.828505,42,Good,30.2,75,1010,21.0,77.9,388,17.5,30.2,2025-05-14T08:15:00
Yogyakarta,-7.797690,110.368490,58,Moderate,29.3,80,1009,20.8,78.1,408,22.4,37.9,2025-05-14T08:05:00
Manado,1.474830,124.842079,40,Good,30.0,73,1011,21.1,77.8,385,16.9,29.0,2025-05-14T08:50:00
Bekasi,-6.238270,107.002911,102,Unhealthy,32.7,79,1007,20.4,78.4,445,40.2,61.5,2025-05-14T08:30:00
Depok,-6.400550,106.818920,82,Moderate,32.0,77,1008,20.7,78.2,425,32.0,48.9,2025-05-14T08:20:00
Tangerang,-6.178360,106.631889,80,Moderate,32.3,78,1008,20.7,78.2,420,31.5,48.2,2025-05-14T08:25:00
Bogor,-6.600000,106.800003,65,Moderate,29.0,85,1009,20.8,78.1,415,26.0,41.8,2025-05-14T08:15:00`;

const notificationsData = [
    {
        icon: "fas fa-exclamation-triangle",
        title: "Air Quality Alert: Bekasi",
        message: "Air quality has reached unhealthy levels (102) in Bekasi. Consider reducing outdoor activities.",
        time: "45 minutes ago"
    },
    {
        icon: "fas fa-info-circle",
        title: "Weather Update: Jakarta",
        message: "Temperature has increased by 2°C in the last hour in Jakarta.",
        time: "1 hour ago"
    },
    {
        icon: "fas fa-cloud-sun",
        title: "Air Quality Improvement: Denpasar",
        message: "Air quality has improved from Moderate to Good (37) in Denpasar.",
        time: "2 hours ago"
    },
    {
        icon: "fas fa-thermometer-half",
        title: "Heat Warning: Multiple Cities",
        message: "High temperatures expected throughout the day in Jakarta, Surabaya, and Bekasi.",
        time: "3 hours ago"
    },
    {
        icon: "fas fa-lungs",
        title: "PM2.5 Level Increase: Medan",
        message: "PM2.5 levels have increased to 38.6 μg/m³ in Medan, reaching unhealthy levels.",
        time: "4 hours ago"
    }
];

// Parse CSV data
let airQualityData = [];

Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
        airQualityData = results.data;
        initializeApp();
    }
});

// Initialize the application
function initializeApp() {
    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        updateThemeIcon();
        updateMapTheme();
    });

    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
    
    function updateMapTheme() {
        if (document.body.classList.contains('dark-mode')) {
            map.removeLayer(lightTileLayer);
            darkTileLayer.addTo(map);
        } else {
            map.removeLayer(darkTileLayer);
            lightTileLayer.addTo(map);
        }
    }

    // Set current date and time
    function updateDateTime() {
        const now = new Date();
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        
        document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', dateOptions);
        document.getElementById('current-time').textContent = now.toLocaleTimeString('en-US', timeOptions);
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Populate location dropdown
    const locationDropdown = document.getElementById('location-dropdown');
    airQualityData.forEach(item => {
        const option = document.createElement('option');
        option.value = item.location;
        option.textContent = item.location;
        locationDropdown.appendChild(option);
    });

    // Initialize map (Indonesia)
    const map = L.map('map').setView([-2.5, 118], 5);

    // Create tile layers
    const lightTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    });
    
    const darkTileLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        subdomains: 'abcd'
    });
    
    // Set initial tile layer based on current mode
    if (document.body.classList.contains('dark-mode')) {
        darkTileLayer.addTo(map);
    } else {
        lightTileLayer.addTo(map);
    }

    const markers = {};

    // Add markers to map
    airQualityData.forEach(item => {
        const markerColor = getAqiColor(item.aqi);
        const markerIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
            iconSize: [20, 20]
        });

        const marker = L.marker([item.latitude, item.longitude], { icon: markerIcon })
            .addTo(map)
            .bindPopup(`
                <b>${item.location}</b><br>
                AQI: ${item.aqi} (${item.aqi_category})<br>
                Temperature: ${item.temperature}°C<br>
                Updated: ${formatDateTime(item.last_updated)}
            `);

        markers[item.location] = marker;
    });

    // Handle location selection
    locationDropdown.addEventListener('change', function() {
        const selectedLocation = this.value;
        if (!selectedLocation) return;
        
        const locationData = airQualityData.find(item => item.location === selectedLocation);
        if (locationData) {
            updateAirQualityCard(locationData);
            updateTemperatureCard(locationData);
            updateAirCompositionCard(locationData);
            updateDailyTip(locationData);
            
            // Center map on selected location
            map.setView([locationData.latitude, locationData.longitude], 10);
            markers[selectedLocation].openPopup();
        }
    });

    // Update UI with data for selected location
    function updateAirQualityCard(data) {
        const qualityBadge = document.getElementById('quality-badge');
        const qualityValue = document.getElementById('quality-value');
        const qualityDescription = document.getElementById('quality-description');
        
        qualityValue.textContent = data.aqi;
        
        // Update badge class and text
        qualityBadge.className = 'quality-badge';
        qualityBadge.classList.add(getAqiClass(data.aqi));
        qualityBadge.textContent = data.aqi_category;
        
        // Update description
        qualityDescription.textContent = getAqiDescription(data.aqi);
    }

    function updateTemperatureCard(data) {
        document.getElementById('temperature-value').textContent = `${data.temperature}°C`;
        document.getElementById('humidity-value').textContent = `${data.humidity}%`;
        document.getElementById('pressure-value').textContent = `${data.pressure} hPa`;
    }

    function updateAirCompositionCard(data) {
        document.getElementById('o2-value').textContent = `${data.o2}%`;
        document.getElementById('n2-value').textContent = `${data.n2}%`;
        document.getElementById('co2-value').textContent = `${data.co2} ppm`;
        document.getElementById('pm25-value').textContent = `${data.pm25} μg/m³`;
        document.getElementById('pm10-value').textContent = `${data.pm10} μg/m³`;
    }

    function updateDailyTip(data) {
        const tipElement = document.getElementById('daily-tip');
        const aqi = parseInt(data.aqi);
        const temp = parseFloat(data.temperature);
        const humidity = parseFloat(data.humidity);
        
        let tip = "";
        
        if (aqi > 100) {
            tip = "It's advisable to wear a mask when going outside today and limit outdoor activities.";
        } else if (aqi > 50) {
            tip = "The air quality is moderate. Sensitive individuals may want to limit prolonged outdoor exertion.";
        } else {
            tip = "Great air quality today! Enjoy outdoor activities.";
        }
        
        if (temp > 32) {
            tip += " Stay hydrated and seek shade during peak hours due to high temperatures.";
        } else if (temp < 25) {
            tip += " It's a bit cool today, consider bringing a light jacket.";
        }
        
        if (humidity > 80) {
            tip += " High humidity may make it feel warmer. Bring an umbrella as rain is possible.";
        }
        
        tipElement.textContent = tip;
    }

    // Helper functions
    function getAqiClass(aqi) {
        aqi = parseInt(aqi);
        if (aqi <= 50) return 'quality-good';
        if (aqi <= 100) return 'quality-moderate';
        if (aqi <= 150) return 'quality-unhealthy';
        return 'quality-dangerous';
    }

    function getAqiColor(aqi) {
        aqi = parseInt(aqi);
        if (aqi <= 50) return '#4CAF50'; // Good
        if (aqi <= 100) return '#FFC107'; // Moderate
        if (aqi <= 150) return '#FF5722'; // Unhealthy
        return '#D32F2F'; // Dangerous
    }

    function getAqiDescription(aqi) {
        aqi = parseInt(aqi);
        if (aqi <= 50) {
            return "Air quality is good. It's a great day for outdoor activities!";
        } else if (aqi <= 100) {
            return "Air quality is acceptable. However, sensitive individuals may experience minor effects.";
        } else if (aqi <= 150) {
            return "Members of sensitive groups may experience health effects. The general public is less likely to be affected.";
        } else {
            return "Health warning: everyone may begin to experience health effects. Members of sensitive groups may experience more serious effects.";
        }
    }

    function formatDateTime(dateTimeStr) {
        const date = new Date(dateTimeStr);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Populate notifications
    const notificationList = document.querySelector('.notification-list');
    notificationsData.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.className = 'notification-item';
        notificationItem.innerHTML = `
            <div class="notification-icon">
                <i class="${notification.icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${notification.time}</div>
            </div>
        `;
        notificationList.appendChild(notificationItem);
    });
}