import React, { Component } from 'react';
import axiosConfig from '../../../axios'
import config from '../../../config'

class CityDestinations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            makeTourLocation: [],
            selectedCity: [],
        };

    }

    componentDidMount() {
        this.getMakeTourLocation();
    }

    getMakeTourLocation = () => {
        var selectedLanguageCode = localStorage.getItem('language_code')
        var deviceId = "kjkd"
        var userAgent = "kjkj"
        try {
            axiosConfig.get(`/tour/locations?language_code=${selectedLanguageCode}&user_agent=${userAgent}&device_id=${deviceId}`).then((response) => {
                // console.log(response)
                const locData = response.data.data
                this.setState({ makeTourLocation: locData })
                // console.log(locData)

            });
        } catch (e) {
            this.setState({ error: true });
        }
    };

    handleCheckboxClick = (e) => {
        const { value } = e.target;
        let selectedCity = [...this.state.selectedCity];

        if (selectedCity.includes(value)) {
            selectedCity = selectedCity.filter(city => city !== value);
        } else {
            selectedCity.push(value);
        }
        this.setState({ selectedCity });
        this.props.onselectCity(selectedCity);
        // this.props.onDataChange(this.state.selectedData);


    }

    render() {
        return (
            <>
                <div className="select-destination-options">
                    <ul>
                        {this.state.makeTourLocation.map(locationData =>

                            <li id={locationData.id} key={locationData.id}>
                                <input type="checkbox"
                                    id={"destinationimg" + locationData.id}
                                    className='destination-checkbox'
                                    value={locationData.id}
                                    onClick={this.handleCheckboxClick}
                                />
                                <label className='destination-label' for={"destinationimg" + locationData.id}>
                                    <img src={config.imageBaseURL + locationData.image} className="destination-image" />
                                    <div className="overlay"></div>
                                    <div className="destination-name">
                                        <p>{locationData.location}</p>
                                    </div>
                                </label>
                            </li>

                        )}
                    </ul>
                </div>
            </>
        );
    }
}

export default CityDestinations;
