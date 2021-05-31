import React from 'react';
import apiConfig from './apiKeys';
import DayCard from './DayCard'

class WeekContainer extends React.Component {
  state = {
    city: "",
    fullData: [],
    dailyData: [],
    degreeType: "fahrenheit"
  }

  updateForecastDegree = event => {
    this.setState({
      degreeType: event.target.value
    }, () => console.log(this.state))
  }

  componentDidMount = () => {
    const weatherURL =
    `http://api.openweathermap.org/data/2.5/forecast?zip=75001&units=imperial&APPID=${apiConfig.OWM_KEY}`

    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"));
      this.setState({
        city: data.city.name,
        country: data.city.country,
        fullData: data.list,
        dailyData: dailyData
      }, () => console.log(this.state))
    })
  }

  formatDayCards = () => {
    return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
  }

  render() {
    return (
        <div className="container">
          <h1 className="display-1 jumbotron">5-Day Forecast</h1>
          <h5 className="display-5 text-muted">{this.state.city}, {this.state.country}</h5>
          <div className="row justify-content-center">
            {this.formatDayCards()}
          </div>
        </div>
    )
  }
}

export default WeekContainer;