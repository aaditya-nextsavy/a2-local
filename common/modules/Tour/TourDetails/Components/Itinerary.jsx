import config from "@/common/config/config";
import Image from "next/image";
import React, { Component } from "react";
import { Trans } from "react-i18next";

export default class Itinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.TourId,
      dailyData: [],
      mapCordinates: [],
    };
  }
 

  setMapItenary = () => {
    const mapCordinates = [];
    this.state.dailyData.forEach((itenData) => {
      mapCordinates.push({
        lat: parseFloat(itenData.latitude),
        lng: parseFloat(itenData.longitude),
      });
    });
    this.setState({ mapCordinates });
    // console.log(mapCordinates);
  };



  render() {

    return (
      <>
        <div className="itinerary-wrapper">
          <div className="container">
          <div className="SectionTitle d-flex align-items-center">
                <h5><Trans i18nKey="tourPage.itenerary"></Trans></h5>
                <div
                  class="accordion-header hideonmobile"
                  id="panelsStayOpen-headingOne-map"
                >
                 
                </div>
              </div>
            {/* <div class="accordion" id="accordionPanelsStayOpenExample"> */}
              
              {/* <div class="accordion-item hideonmobile">
                <div
                  id="panelsStayOpen-collapseOne-map"
                  class="accordion-collapse collapse show"
                  aria-labelledby="panelsStayOpen-headingOne-map"
                >
                  {/* <div class="accordion-body">
                    {/* <img src='/assets/images/itineraryMap.png' alt="map" /> */}
              {/* <PathMap /> 
                    <GoogleMapsComponent
                      mapCordinates={this.state.mapCordinates}
                    />
                    { }
                  </div> 
                </div>
              </div> */}
            {/* </div> */}
            <div className="day-timetable">
              <div className="accordian-wrapper">
                <div class="accordion" id="accordionExample">
                  {this.props.tourItineraryInfo ? (
                    this.props.tourItineraryInfo.map((dayData, index) => (
                      <div class="accordion-item">
                        <div class="accordion-header">
                          <button
                            class="daybuttons"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#day${index + 1}Bar`}
                          >
                            <Trans i18nKey="common.day"></Trans> {index + 1}
                          </button>
                        </div>
                        <div
                          id={`day${index + 1}Bar`}
                          class="accordion-collapse collapse show"
                        >
                          <div class="accordion-body">
                            <div className="day-one-content">
                              <div className="row flex-column-reverse flex-lg-row">
                                <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12">
                                  <h6>{dayData.title}</h6>
                                  <div dangerouslySetInnerHTML={{ __html: `<p>${dayData.description}</p>` }}></div>
                                </div>
                                <div className={`col-xl-7 col-lg-6 col-md-12 col-sm-12 ${this.props.selectedLanguageCode === 'ar' ? "text-start" : "text-end" }`}>
                                  {dayData.image ?
                                    <Image
                                    width={400}
                                    height={400}
                                    quality={50}
                                      src={config .imageBaseURL + dayData.image}
                                      alt={config .imageBaseURL + dayData.image}
                                      loading="lazy"
                                      className="daysImg"
                                    />
                                    : ''}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p><Trans i18nKey="common.loading"></Trans>...</p>
                  )}

                  <div className="tour-end">
                    <div className="daybuttons"><Trans i18nKey="tourPage.tourEnds"></Trans></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
