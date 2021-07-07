import React from 'react';
import DayCard from './DayCard';
import DegreeToggle from './DegreeToggle';

class WeekContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      degreeType: "fahrenheit",
    }
  }

  updateForecastDegree = event => {
    this.setState({
      degreeType: event.target.value
    }, () => console.log(this.state))
  }

  formatDayCards = () => {
    return this.props.dailyData.map((reading, index) => <DayCard reading={reading} degreeType={this.state.degreeType} key={index} />)
  }

  render() {
    return (
      <div>
        <div className="row flex-fill">
          {this.formatDayCards()}
        </div>
        <DegreeToggle degreeType={this.state.degreeType} updateForecastDegree={this.updateForecastDegree} />
      </div>
    )
  }
}

export default WeekContainer;