// Міста з їхніми координатами
const citiesCoordinates = {
  'Lisbon': { latitude: 38.72, longitude: -9.14 },
  'Paris': { latitude: 48.85, longitude: 2.35 },
  'Belgrade': { latitude: 44.81, longitude: 20.46 },
  'Venice': { latitude: 45.44, longitude: 12.33 },
  'Tel-Aviv': { latitude: 32.08, longitude: 34.78 },
  'Cairo': { latitude: 30.04, longitude: 31.24 },
  'New-York': { latitude: 40.71, longitude: -74.01 },
  'New-Delhi': { latitude: 28.61, longitude: 77.21 },
  'San-Francisco': { latitude: 37.77, longitude: -122.42 },
  'Tokyo': { latitude: 35.68, longitude: 139.69 },
  'Sydney': { latitude: -33.87, longitude: 151.21 }
};

// Функція для отримання погодних даних через Open-Meteo API
async function getWeatherData(latitude, longitude) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.current_weather;
  } catch (error) {
      console.error('Помилка отримання даних:', error);
      return null;
  }
}

// Функція для оновлення погоди на сторінці
async function updateWeatherForCity(cityElement) {
  const cityName = cityElement.getAttribute('data-city');
  const coordinates = citiesCoordinates[cityName];

  if (coordinates) {
      const weatherData = await getWeatherData(coordinates.latitude, coordinates.longitude);

      if (weatherData) {
          const tempElement = cityElement.querySelector('.temp');
          tempElement.innerText = `${weatherData.temperature}°C`;

          // Можна також оновити іконку погоди на основі стану погоди
          // Тут ви можете додати зміну класу іконки в залежності від стану погоди
      } else {
          cityElement.querySelector('.temp').innerText = 'Немає даних';
      }
  }
}

// Функція для оновлення погоди для всіх міст
function updateAllCitiesWeather() {
  const cityElements = document.querySelectorAll('.cities li');
  cityElements.forEach(cityElement => {
      updateWeatherForCity(cityElement);
  });
}

// Оновлюємо погоду при завантаженні сторінки
document.addEventListener('DOMContentLoaded', updateAllCitiesWeather);