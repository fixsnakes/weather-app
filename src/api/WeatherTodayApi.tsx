import axios from "axios";



const fetchWeatherToday: any = async (location: string) => {

    const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=b6d890f82b30484681165707250907&q=${location}&days=7&aqi=yes&alerts=no`)
    return response.data;
}

export default fetchWeatherToday;