import axios from "axios";


const fetchWeather7Day: any = async (lat:any, lon:any) => {
    
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=ae1285bf8127bc663285997a17e6242e`)

    return response.data

}

export default fetchWeather7Day

