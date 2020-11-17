/** @format */

import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import nextId from 'react-id-generator';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			lat: 40.72683,
			lng: -73.943512,
			locations: [{ lat: 40, lng: -73, id: 'hi' }],
		};
		this.findMe = this.findMe.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		console.log('clicked');
		console.log(event);
		let coords = event.latlng;
		console.log(coords);
		let obj = {};
		obj.lat = coords.lat;
		obj.lng = coords.lng;
		obj.id = nextId();
		let locations = this.state.locations;
		locations.push(obj);
		this.setState({ ...locations, lat: coords.lat, lng: coords.lng });
		console.log(this.state);
	}

	findMe() {
		navigator.geolocation.getCurrentPosition((position) => {
			console.log(position);
			this.setState({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		});
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<Map
					center={[this.state.lat, this.state.lng]}
					zoom={13}
					onClick={this.handleClick}
				>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					{this.state.locations.length > 0 &&
						this.state.locations.map((location) => (
							<Marker
								key={`marker-${location.id}`}
								position={[location.lat, location.lng]}
							>
								<Popup>
									<p>{location.id} </p>
								</Popup>
							</Marker>
						))}
				</Map>

				<button onClick={this.findMe}>Find me!</button>
			</div>
		);
	}
}

export default App;
