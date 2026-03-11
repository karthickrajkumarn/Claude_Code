/**
 * Weather MCP Server - Demo and Testing
 */

import { weatherService } from './services/weather.js';

async function demo() {
  console.log('🌤️  Weather MCP Server - Operation Demonstrations\n');
  console.log('=' .repeat(60));

  try {
    // 1. Search for locations
    console.log('\n📝 OPERATION 1: Search for Locations\n');
    const locations = await weatherService.searchLocations('London');
    console.log('✅ Found locations matching "London":');
    locations.forEach((loc: any, index: number) => {
      console.log(`   ${index + 1}. ${loc.name}, ${loc.state ? loc.state + ', ' : ''}${loc.country}`);
      console.log('      Coordinates:', `${loc.lat}, ${loc.lon}`);
    });

    // 2. Get current weather
    console.log('\n' + '='.repeat(60));
    console.log('\n📝 OPERATION 2: Get Current Weather\n');
    console.log('Getting weather for Tokyo, Japan...');
    const currentWeather = await weatherService.getCurrentWeather('Tokyo,JP');
    console.log('✅ Current Weather:');
    console.log('   Location:', `${currentWeather.location.name}, ${currentWeather.location.country}`);
    console.log('   Temperature:', `${currentWeather.current.temp}°${getTempUnit(currentWeather.units)}`);
    console.log('   Feels Like:', `${currentWeather.current.feels_like}°${getTempUnit(currentWeather.units)}`);
    console.log('   Min/Max:', `${currentWeather.current.temp_min}° / ${currentWeather.current.temp_max}°`);
    console.log('   Humidity:', `${currentWeather.current.humidity}%`);
    console.log('   Wind:', `${currentWeather.current.wind_speed} m/s`);
    console.log('   Conditions:', `${currentWeather.current.weather.main} - ${currentWeather.current.weather.description}`);
    console.log('   Visibility:', `${(currentWeather.current.visibility / 1000).toFixed(1)} km`);

    // 3. Get weather forecast
    console.log('\n' + '='.repeat(60));
    console.log('\n📝 OPERATION 3: Get Weather Forecast\n');
    console.log('Getting 3-day forecast for Paris, France...');
    const forecast = await weatherService.getForecast('Paris,FR', 3);
    console.log('✅ Weather Forecast:');
    console.log(`   Location: ${forecast.location.name}, ${forecast.location.country}`);
    forecast.forecast.forEach((day: any, index: number) => {
      console.log(`   ${index + 1}. ${day.date}:`);
      console.log('      Min/Max:', `${day.temp_min}° / ${day.temp_max}°`);
      console.log('      Humidity:', `${day.humidity}%`);
      console.log('      Wind:', `${day.wind_speed.toFixed(1)} m/s`);
      console.log('      Conditions:', `${day.weather.main} - ${day.weather.description}`);
    });

    // 4. Multiple locations comparison
    console.log('\n' + '='.repeat(60));
    console.log('\n📝 OPERATION 4: Compare Multiple Locations\n');
    const cities = ['New York,US', 'Singapore', 'Berlin,DE'];
    console.log('Getting current weather for multiple cities...\n');

    for (const city of cities) {
      const weather = await weatherService.getCurrentWeather(city);
      console.log(`📍 ${weather.location.name}, ${weather.location.country}`);
      console.log(`   ${weather.current.temp}°${getTempUnit(weather.units)} - ${weather.current.weather.description}`);
      console.log(`   Humidity: ${weather.current.humidity}% | Wind: ${weather.current.wind_speed} m/s\n`);
    }

    console.log('=' .repeat(60));
    console.log('\n🎉 All operations completed successfully!');
    console.log('\n💡 The Weather MCP Server is fully functional and ready to use.');
    console.log('   You can now use these tools through your MCP client configuration.\n');

  } catch (error: any) {
    console.error('\n❌ Error:', error?.message || 'Unknown error');
    if (error?.message?.includes('404') || error?.message?.includes('not found')) {
      console.error('\n💡 Hint: Make sure you\'re using valid location names.');
      console.error('   Examples: "London", "New York,US", "Tokyo,JP"');
    }
    if (error?.message?.includes('API key')) {
      console.error('\n💡 Hint: Make sure your WEATHER_API_KEY is set in .env file');
      console.error('   Get a free key at: https://openweathermap.org/api');
    }
  }
}

function getTempUnit(units: string): string {
  switch (units) {
    case 'metric': return 'C';
    case 'imperial': return 'F';
    default: return 'K';
  }
}

demo();
