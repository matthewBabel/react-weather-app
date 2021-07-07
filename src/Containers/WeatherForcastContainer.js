import React from 'react';
import WeekContainer from './WeekContainer';
import HeaderContainer from './HeaderContainer';
import LocationForm from './LocationForm';
import apiConfig from '../apiKeys';
import states from '../states.json';

class WeatherForcastContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            zip: null,
            location: null,
            fullData: [],
            dailyData: []

        }

        this.updateZip = this.updateZip.bind(this)
        this.fetchLocationFromCordinates = this.fetchLocationFromCordinates.bind(this)
    }

    updateZip(newZip) {
        if (newZip !== this.state.zip) {
            this.setState({ zip: newZip }, () => {
                this.fetchWeather()
                this.fetchLocation()
            })
        }
    }


    componentDidMount = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const cords = pos.coords
                    this.fetchLocationFromCordinates(cords.latitude, cords.longitude)
                },
                (err) => {
                    console.log("Error getting geolocation")
                })
        } else if (this.state.zip) {
            this.fetchWeather()
        }     
    }

    fetchWeather = () => {
        const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?zip=${this.state.zip},us&units=imperial&appid=${apiConfig.weatherApiKey}`

        fetch(weatherURL)
            .then(res => res.json())
            .then(data => {
                const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
                this.setState({
                    fullData: data.list,
                    dailyData: dailyData,
                }, () => console.log(this.state))
            }).catch((error) => {
                console.log("Error reading weather API")
            })
    }

    fetchLocation = () => {
        const locationURL = `http://api.zippopotam.us/us/${this.state.zip}`

        fetch(locationURL)
            .then(res => res.json())
            .then(data => {
                const location = data['places'][0]['place name']
                const stateAbv = data['places'][0]['state abbreviation']
                this.setState({
                    location: `${location}, ${stateAbv}`
                }, () => console.log(this.state))
            }).catch((error) => {
                console.log("Error reading zip location API")
            })
    }

    fetchLocationFromCordinates = (lat, lon) => {
        const geoLocationURL = `https://us1.locationiq.com/v1/reverse.php?key=${apiConfig.geolocationApiKey}&lat=${lat}&lon=${lon}&format=json`

        fetch(geoLocationURL)
            .then(res => res.json())
            .then(data => {
                const zip = data['address']['postcode']
                const location = data['address']['city']
                const stateAbv = this.findAbvFromState(data['address']['state'])
                console.log("abv: " + stateAbv)
                this.setState({
                    zip: zip,
                    location: (stateAbv) ? `${location}, ${stateAbv}` : location
                }, () => this.fetchWeather())
            }).catch((error) => {
                console.log("Error reading geolocation API")
            })
    }

    findAbvFromState(state) {
        for(let item of states) {
            if (item.name === state) {
                return item.abbreviation
            }
        }

        return null
    }

    render() {
        return (
            <div className="container">
                <LocationForm updateZip={this.updateZip} />
                {this.state.zip && <HeaderContainer location={this.state.location} /> }
                {this.state.zip && <WeekContainer dailyData={this.state.dailyData} /> }
            </div>
        )
    }
}

export default WeatherForcastContainer;