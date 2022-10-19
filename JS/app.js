// variáveis de API
const apiKey = 'eb5c567ff58b53e19ddd444e39a872d2'
const URLCountryApi = 'https://countryflagsapi.com/png/'

//elementos da página/DOM
const cityInput = document.querySelector('#city-input')
const searcButton = document.querySelector('#search')
const cityElement = document.querySelector('#city')
const countryFlagElement = document.querySelector('#country')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const humidithElement = document.querySelector('#humidity span')
const windElement = document.querySelector('#wind span')
const weatherContainer = document.querySelector('#weather-data')


//funções


//função de captura dos dados da API
const getWeatherData = async (city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherUrl)
    const data = await res.json()
    return data
}


//função que imprimi os dados na tela
const showWeatherData = async (city) => {

    const data = await getWeatherData(city)

    cityElement.innerText = data.name
    tempElement.innerText = parseInt(data.main.temp)
    descElement.innerText = data.weather[0].description
    weatherIconElement.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    countryFlagElement.setAttribute('src', URLCountryApi + data.sys.country)
    humidithElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.wind.speed}km/h`
    weatherContainer.classList.remove('hide')

}

//eventos

//evento de click no botão search
searcButton.addEventListener('click', (e) => {
    e.preventDefault()
    const city = cityInput.value
    if (city == '') {
        alert('Preencha o campo abaixo com o nome de uma cidade')
    } else {
        showWeatherData(city)
    }
})

//evento de tecla no enter para realizar a pesquisa
cityInput.addEventListener('keyup', (e) => {

    if (e.code === 'Enter' && cityInput.value === '') {
        alert('Preencha o campo abaixo com o nome de uma cidade')
    } else if (e.code === 'Enter') {
        const city = e.target.value
        showWeatherData(city)
    }
})