import React, { Component } from 'react';
import Modal from 'react-modal';
import FilterTour from './FilterTour';
import FilterTourContent from './FilterTourContent';

import axiosConfig from '../../../../axios'
import { Link } from 'react-router-dom';

class TestFilterMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            filters: {},
            locationFilter: [],
            selectedLocationId: [],
            categoriesFilter: [],
            categoriesFilterInfo: [],
            locationFilterInfo: [],
        };
    }

    handleClose = () => {
        this.setState({ isOpen: false });
    }

    handleApply = () => {
        this.setState({ isOpen: false });
        // this.preventDefault()
        // update data based on selected filters
    }

    render() {
        return (
            <div>
                <button className="ButtonSmall" onClick={() => this.setState({ isOpen: true })}>Filters</button>
                <Modal
                    isOpen={this.state.isOpen}
                    onRequestClose={this.handleClose}
                    style={{
                        content: {
                            bottom: 0,
                            left: 0,
                            right: 0,
                            top: 'auto',
                        }
                    }}
                >
                    {/* Add form for selecting filters */}
                    <div className='setfilter'>
                        {/* <FilterTour/> */}
                        <FilterTourContent />
                    </div>
                    <div className="mobileFilterBtn d-flex align-items-center">
                        {/* <button className='TertiaryButton' onClick={this.handleClose}>Close</button> */}
                        <button className='SecondaryButton' onClick={this.handleApply}>Apply Filter</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default TestFilterMobile;
