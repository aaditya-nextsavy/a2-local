import React from "react";
import { Link } from "react-router-dom";
import CalenderImg from "../../../assets/images/icons_calender.svg";
import { Trans } from "react-i18next";

class SelectedDate extends React.Component {
  state = {
    count: 1,
  };

  componentDidMount() {
    this.setState({
      dateFix: JSON.parse(localStorage.getItem("selectedDateFixed")),
    });
  }

  incrementCount = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
    this.props.sendInputValue(this.state.count + 1);
  };

  decrementCount = () => {
    if (this.state.count <= 0) {
      this.setState({
        count: 0,
      });
    } else {
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }));
    }
    this.props.sendInputValue(this.state.count - 1);
  };

  closePopup = () => {
    localStorage.setItem("ValueIsSelected", false);
    localStorage.setItem("dateIsSelected", false);
    this.props.updateStates();
  };

  renderDaysCounter = () => {
    return (
    <div className="col-xl-6 col-lg-6 col-md-10 col-sm-12 pb-3">
      <div className="daysSelector">
        <div className="block-title">
          <h6><Trans i18nKey="makeATour.noOfDays"></Trans></h6>    
        </div>
        <div className="counter-input-wrapper d-flex align-items-center ">
          <button className="counter-btn" onClick={this.decrementCount} disabled={this.state.count === 1}>
            <i class="fa-solid fa-minus"></i>
          </button>
          <input
            type="number"
            value={this.state.count}
            min="1"
            className="number-counter-input"
          />
          <button className="counter-btn" onClick={this.incrementCount}>
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
    )
  };

  render() {
    return (
      <>
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-10 col-sm-12 pb-3">
            <div className="dateShowAndDaySelectorWrapper">
              <div className="daatShowSelected">
                <div className="block-title">
                  <h6><Trans i18nKey="makeATour.traveldate"></Trans></h6>
                </div>

                <div className="selectedDataWrapperFlexible">
                  <div className="img-txt d-flex align-items-center">
                    <img src={CalenderImg} alt="" />
                    <p className="selectedDataShowFlexible">
                      {this.props.heyData}
                    </p>
                  </div>

                  <Link to="" onClick={this.closePopup}>
                    {" "}
                    <i class="fa-solid fa-xmark"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {this.renderDaysCounter()}
        </div>
      </>
    );
  }
}
export default SelectedDate;
