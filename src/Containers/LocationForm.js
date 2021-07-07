import React from 'react';

class LocationForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: null
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        this.props.updateZip(this.state.value)
        event.preventDefault()
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Search by ZIP code:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default LocationForm;
