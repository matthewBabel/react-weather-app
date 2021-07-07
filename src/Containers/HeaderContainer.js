import React from 'react'

const HeaderContainer = ({location}) => {
    return (
      <div>
      <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
      <h5 className="display-5 text-muted">{location}</h5>
      </div>
    )
}

export default HeaderContainer;