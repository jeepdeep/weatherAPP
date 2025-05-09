const API_KEY = "f212549e3bbacdae1ab288c80c0ae318"; // Replace with your OpenWeatherMap key

const quotes = [
  "Dance in the rain, shine in the sun ☔🌞",
  "Every storm passes, embrace the calm ⛅",
  "Let the breeze guide your spirit 🍃",
  "Find warmth in every snowy day ❄️",
  "Chase the clouds, catch the sun 🌤️",
  "Every drop of rain is a blessing 🌧️",
  "The sun will shine again, just wait 🌈",
  "Nature's beauty is a gift to cherish 🌼",
  "Embrace the chill, it's a winter wonderland ❄️",
  "Let the wind carry your worries away 🌬️",
  "Every sunset brings a new dawn 🌅",
  "The sky is a canvas, paint it with dreams 🎨",
  "Find joy in the little things 🌸",
  "Every season has its own magic ✨",
  "The world is your playground, explore it 🌍",
  "Breathe in the fresh air, feel alive 🌬️",
  "Let the sun warm your soul ☀️",
  "Every raindrop is a reminder to dance 💃",
  "The stars are waiting for you to shine 🌟",
  "Embrace the unknown, it's where magic happens 🌌",
  "The universe is full of possibilities 🌌",
  "Every moment is a chance to create memories 📸",
  "The sky is the limit, reach for the stars 🌠",
  "Find beauty in the chaos 🌪️",
  "Every cloud has a silver lining 🌥️",
  "The sun will rise again, just wait 🌅",

];

const tips = [
    "Carry a reusable water bottle today 💧",
    "Protect your skin with SPF 50+ 🧴",
    "Enjoy a cozy book by the window 📚",
    "Take a refreshing evening stroll 🌄",
    "Try a new recipe with seasonal ingredients 🍽️",
    "Plan a movie night with friends 🎬",
    "Start a gratitude journal today ✍️",
    "Try a new hobby or craft 🎨",
    "Spend time in nature, even if it's a park 🌳",
    "Practice mindfulness or meditation today 🧘‍♀️",
    "Cook a warm meal to share with loved ones 🍲",
    "Try a new workout or yoga class 🏋️‍♂️",
    "Volunteer for a local charity or cause 🤝",
    "Write a letter to a friend or family member 💌",
    "Explore a new part of your city or town 🏙️",
    "Create a vision board for your goals 🎯",
    "Take a moment to appreciate the little things 🌼",
    "Plan a weekend getaway or day trip 🚗",
    "Try a new restaurant or cafe in your area 🍽️",
    "Spend time with a pet or animal 🐾",
    "Start a new book or podcast 📖",
    "Take a break from screens and enjoy nature 🌳",
    "Try a new type of tea or coffee ☕",
    "Write down your goals for the week or month 📝",
    "Create a playlist of your favorite songs 🎶",
    "Spend time with family or friends, even virtually 💻",
    "Try a new type of exercise or sport 🏃‍♀️",
    "Take a moment to reflect on your day 🌅",
    "Practice gratitude by writing down three things you're thankful for 🙏",
    "Try a new recipe or cooking technique 🍳",
    "Spend time in nature, even if it's just a walk in the park 🌳",
    "Take a moment to appreciate the beauty around you 🌼",
    "Try a new hobby or craft 🎨",
    "Spend time with a friend or loved one, even virtually 💻",
];

let lastQuery = null;
let particles = [];

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city!");
  lastQuery = `q=${city}`;
  fetchWeather(lastQuery);
}

function getWeatherByGPS() {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      lastQuery = `lat=${latitude}&lon=${longitude}`;
      fetchWeather(lastQuery);
    },
    () => alert("Location access denied.")
  );
}

async function fetchWeather(query) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    updateUI(data);
  } catch (err) {
    alert("Failed to fetch weather.");
  }
}

function updateUI(data) {
  const { main, wind, visibility, sys, weather, clouds, name } = data;
  const moonPhase = ["New Moon", "First Quarter", "Full Moon", "Last Quarter"][Math.floor(Math.random() * 4)];
  const precip = Math.floor(Math.random() * 10);
  const aqi = Math.floor(Math.random() * 150);
  const uv = Math.floor(Math.random() * 12);

  document.getElementById("location").innerText = name;
  document.getElementById("temp").innerText = main.temp;
  document.getElementById("feels").innerText = main.feels_like;
  document.getElementById("wind").innerText = wind.speed;
  document.getElementById("humidity").innerText = main.humidity;
  document.getElementById("pressure").innerText = main.pressure;
  document.getElementById("visibility").innerText = (visibility / 1000).toFixed(1);
  document.getElementById("sunrise").innerText = new Date(sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById("sunset").innerText = new Date(sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById("clouds").innerText = clouds.all;
  document.getElementById("moon").innerText = moonPhase;
  document.getElementById("precip").innerText = precip;
  document.getElementById("aqi").innerText = aqi;
  document.getElementById("uv").innerText = uv;

  document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("tip").innerText = tips[Math.floor(Math.random() * tips.length)];
  document.getElementById("aiComment").innerText = generateAICommentary(main.temp, weather[0].main, wind.speed);
  document.getElementById("uvTip").innerText = getUvAdvice(uv);

  setupWeatherAnimation(weather[0].main.toLowerCase());
}

function generateAICommentary(temp, condition, wind) {
    if (condition.includes("Rain")) return "Rainy days are perfect for reflection and tea ☕";
    if (condition.includes("Drizzle")) return "Drizzle brings a refreshing touch to the day 🌧️";
    if (condition.includes("Clouds")) return "Cloudy days bring a calm vibe. ☁️";
    if (condition.includes("Thunderstorm")) return "Thunderstorms bring a symphony of nature 🎶";
    if (condition.includes("Thunder")) return "Thunderstorms bring a symphony of nature 🎶";
    if (condition.includes("Fog")) return "Foggy days are perfect for cozy vibes 🌫️";
    if (condition.includes("Mist")) return "Misty mornings are perfect for reflection 🌫️";
    if (condition.includes("Clear") && temp < 20) return "Clear skies, perfect for a cozy day indoors! 🌤️";
    if (condition.includes("Clear") && temp < 10) return "Chilly clear skies, bundle up and enjoy the view! 🥶";
    if (condition.includes("Clear") && temp < 15) return "Clear skies, a perfect day for a warm drink! ☕";
    if (condition.includes("Clear") && temp < 25) return "Clear skies, a lovely day for a walk! 🌞";
    if (condition.includes("Clear") && temp > 28) return "Sunny and hot, stay cool and hydrated! 😎";
    if (condition.includes("Clear") && temp > 30) return "Hot and sunny, perfect for a beach day! 🏖️";
    if (condition.includes("Clear") && temp > 32) return "Hot and sunny, perfect for a pool day! 🏊‍♂️";
    if (condition.includes("Clear") && temp > 35) return "Scorching heat, stay indoors and cool! 🔥";
    if (condition.includes("Snow")) return "Snowy days are perfect for cozy vibes ❄️";
    if (condition.includes("Cloudy")) return "Cloudy days are perfect for a cozy read 📖";
    if (condition.includes("Overcast")) return "Overcast skies, a perfect time for reflection 🌥️";
    if (condition.includes("Drizzle")) return "Light drizzle, a perfect excuse to stay in! 🌧️";
    if (condition.includes("Snow")) return "Snowflakes falling, time for cozy vibes ❄️";
    if (condition.includes("Mist")) return "Misty mornings, a perfect time for reflection 🌫️";
    if (condition.includes("Fog")) return "Foggy days are perfect for a cozy read 📖";
    if (condition.includes("Haze")) return "Hazy days, a reminder to breathe deeply 🌫️";
    if (condition.includes("Dust")) return "Dusty days, a reminder to clear your mind 🌪️";
    if (condition.includes("Smoke")) return "Smoky skies, a reminder to breathe fresh air 🌬️";
    if (condition.includes("Ash")) return "Ashy skies, a reminder to appreciate the calm 🌋";
    if (condition.includes("Sand")) return "Sandy days, a reminder to enjoy the outdoors 🏖️";
    if (condition.includes("Wind")) return "Windy days, a reminder to embrace change 🌪️";
    if (condition.includes("Tornado")) return "Tornado warnings, stay safe and indoors! 🌪️";
    if (condition.includes("Hurricane")) return "Hurricane warnings, stay safe and indoors! 🌀";
    if (condition.includes("Tropical")) return "Tropical storms, stay safe and indoors! 🌴";
    if (condition.includes("Tsunami")) return "Tsunami warnings, stay safe and indoors! 🌊";
    if (condition.includes("Blizzard")) return "Blizzard warnings, stay safe and indoors! ❄️";
    if (condition.includes("Dust")) return "Dust storms, stay safe and indoors! 🌪️";
    if (condition.includes("Sand")) return "Sand storms, stay safe and indoors! 🏜️";
    if (wind > 15) return "Windy out there, hold tight and enjoy the breeze! 🌬️";
  return "A beautiful day to seize the moment! 🌈";
}

function getUvAdvice(uv) {
  if (uv < 3) return "Low UV, enjoy the sunshine safely!";
  if (uv < 5) return "Moderate UV, wear sunglasses and sunscreen.";
  if (uv < 7) return "High UV, wear sunglasses and apply SPF 30+.";
  if (uv < 8) return "Very High UV, wear protective clothing and SPF 50+.";
  if (uv < 10) return "Very High UV, avoid direct sun exposure.";
  if (uv < 11) return "Extreme UV, stay indoors during peak hours.";
  if (uv < 4) return "Low UV, enjoy the sunshine safely!";
  if (uv < 5) return "Moderate UV, wear sunglasses and sunscreen.";
  if (uv < 6) return "Moderate UV, apply SPF 30+ for protection.";

  return "High UV, use SPF 50+ and avoid direct sun.";
}

function setupWeatherAnimation(condition) {
  const canvas = document.getElementById("weatherCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  particles = [];

  function createParticle(type) {
    const particle = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5 + 2,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 + 1
    };
    if (type === "rain") {
      particle.size = Math.random() * 2 + 1;
      particle.speedY = Math.random() * 10 + 5;
    } else if (type === "snow") {
      particle.size = Math.random() * 4 + 2;
      particle.speedY = Math.random() * 2 + 1;
    } else if (type === "cloud") {
      particle.size = Math.random() * 20 + 10;
      particle.speedY = Math.random() * 0.5;
    }
    return particle;
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (condition.includes("rain")) {
      ctx.fillStyle = "rgba(0, 191, 255, 0.8)";
      particles.forEach(p => {
        p.y += p.speedY;
        if (p.y > canvas.height) p.y = 0;
        ctx.fillRect(p.x, p.y, p.size, p.size * 5);
      });
    } else if (condition.includes("snow")) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      particles.forEach(p => {
        p.x += Math.sin(p.y * 0.02) * 0.5;
        p.y += p.speedY;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (condition.includes("cloud")) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      particles.forEach(p => {
        p.x += p.speedX * 0.5;
        if (p.x > canvas.width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (condition.includes("thunder")) {
      ctx.fillStyle = "rgba(255, 215, 0, 0.7)";
      particles.forEach(p => {
        p.y += p.speedY * 3;
        if (p.y > canvas.height) p.y = 0;
        ctx.fillRect(p.x, p.y, p.size, p.size * 3);
      });
      if (Math.random() < 0.02) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 100);
      }
    } else {
      ctx.fillStyle = "rgba(255, 223, 0, 0.6)";
      particles.forEach(p => {
        p.x += p.speedX * 0.3;
        p.y += p.speedY * 0.3;
        if (p.x > canvas.width || p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    requestAnimationFrame(animate);
  }

  const particleCount = condition.includes("cloud") ? 20 : 100;
  for (let i = 0; i < particleCount; i++) {
    particles.push(createParticle(condition));
  }

  animate();
}

function startAutoRefresh() {
  setInterval(() => {
    if (lastQuery) {
      fetchWeather(lastQuery);
    }
  }, 300000); // Refresh every 5 minutes
}

window.onload = startAutoRefresh;

window.addEventListener("resize", () => {
  const canvas = document.getElementById("weatherCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
