import React from 'react';
import { connect } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
import originalMoment from 'moment';
import { extendMoment } from 'moment-range';
import { MDBInput, MDBContainer, MDBRow, MDBCol, MDBMedia } from "mdbreact";



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
					<MDBContainer>

<MDBRow>
<MDBMedia>
<MDBMedia body>
 <MDBMedia heading>
 	Number of days between
</MDBMedia>
{start.format('MM/DD/YY')} and {end.format('MM/DD/YY')} is{' '} - <strong>{diff}</strong>
</MDBMedia>
</MDBMedia>

</MDBRow>

<MDBRow>
<MDBMedia>
<MDBMedia body>
 <MDBMedia heading>
 Leap Years: <strong>{leap_year}</strong>
</MDBMedia>
</MDBMedia>
</MDBMedia>

</MDBRow>

<MDBRow>
<MDBMedia>
<MDBMedia body>
 <MDBMedia heading>
 Number of Mondays between {start.format('MM/DD/YY')} and {end.format('MM/DD/YY')} is{' '}
	<strong>{this.state.mondays}</strong>
</MDBMedia>
</MDBMedia>
</MDBMedia>

</MDBRow>

<MDBRow>
<MDBMedia>
<MDBMedia body>
 <MDBMedia heading>
 <strong>What happened on this day?</strong>
	<p>{this.props.info.data}</p>
</MDBMedia>
</MDBMedia>			 </MDBMedia>

</MDBRow>
</MDBContainer>
			</div>
		);
	};
	render() {
		this.getInfoBox();
		return (

			<MDBContainer>
			<MDBRow>
			  <MDBCol size="12">Date Range:</MDBCol>
			</MDBRow>
			<MDBRow>
			  <MDBCol size="12">
			  <MDBInput
						style={{ padding: '5px', borderRadius: '5px', border: '1px solid #adadad' }}
						readOnly
						type="text"
						placeholder="Select a date range"
						onClick={this.onToggle}
					/>
			  </MDBCol>
			</MDBRow>
			<MDBRow>
			{this.state.isOpen && (
					<DateRangePicker value={this.state.value} onSelect={this.onSelect} singleDateRange={true} />
				)}
				<br />
				{this.getInfoBox()}
			</MDBRow>
			</MDBContainer>
			   
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
