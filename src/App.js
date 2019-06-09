import React from 'react';
import { connect } from 'react-redux';

import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
import originalMoment from 'moment';
import { extendMoment } from 'moment-range';

import { getFact } from './actions/index';
const moment = extendMoment(originalMoment);

class App extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			isOpen: false,
			value: null,
			mondays: '-',
		};
	}

	onSelect = (value, states) => {
		let start = value.start.clone();
		let end = value.end.clone();
		let mondays = 0;
		while (start < end) {
			if (start.day() == 1) {
				mondays++;
			}
			start.add(1, 'day');
		}
		this.setState({ mondays: mondays, value, isOpen: false });
		let month = value.start.format('M');
		let date = value.start.format('D');

		this.props.getFact({ month, date });
	};

	onToggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	getDateRangeTxt = () =>
		this.state.value
			? this.state.value.start.format('MM/DD/YYYY') + ' - ' + this.state.value.end.format('MM/DD/YYYY')
			: '';

	getInfoBox = () => {
		if (this.state.value == null) return null;

		let start = this.state.value.start;
		let end = this.state.value.end;
		let diff = end.diff(start, 'days');
		let start_year = start.year();
		let end_year = end.year();
		let leap_year = [];
		if (start_year % 4 == 0) {
			leap_year.push(start_year);
		}
		if (end_year % 4 == 0) {
			leap_year.push(end_year);
		}
		leap_year = leap_year.length == 0 ? '-' : leap_year.join(', ');
		return (
			<div className="info-box">
				<div>
					Number of days between {start.format('MM/DD/YY')} and {end.format('MM/DD/YY')} is{' '}
					<strong>{diff}</strong>
				</div>
				<div>
					Leap Years: <strong>{leap_year}</strong>
				</div>
				<div>
					Number of Mondays between {start.format('MM/DD/YY')} and {end.format('MM/DD/YY')} is{' '}
					<strong>{this.state.mondays}</strong>
				</div>
				<div>
					<br />
					<strong>What happened on this day?</strong>
					<p>{this.props.info.data}</p>
				</div>
			</div>
		);
	};
	render() {
		this.getInfoBox();
		return (
			<div>
				<div>
					<label>Date Range: </label>
					<input
						style={{ padding: '5px', borderRadius: '5px', border: '1px solid #adadad' }}
						readOnly
						type="text"
						placeholder="Select a date range"
						onClick={this.onToggle}
					/>
				</div>

				{this.state.isOpen && (
					<DateRangePicker value={this.state.value} onSelect={this.onSelect} singleDateRange={true} />
				)}
				<br />
				{this.getInfoBox()}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		info: state.info,
	};
};

export default connect(
	mapStateToProps,
	{ getFact }
)(App);
