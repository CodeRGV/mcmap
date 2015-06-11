var React   = window.React = require('react'),
    mapbox  = require('mapbox.js'),
    config  = require('./config'),
         _  = require('lodash');

var STOPS = [
    {route: 5, location: [26.204, -98.236101], time:0},
    {route: 5, location: [26.20550679, -98.2407541], time:1},
    {route: 5, location: [26.20580024, -98.24278395], time:2},
    {route: 5, location: [26.20580024, -98.24278395], time:3},
    {route: 5, location: [26.20690897, -98.25345636], time:4},
    {route: 5, location: [26.20221865, -98.254262], time:5},
    {route: 5, location: [26.1979067, -98.25934157], time:6},
    {route: 5, location: [26.20854444, -98.2639724], time:8},
    {route: 5, location: [26.20971814, -98.27432309], time:9},
    {route: 5, location: [26.20877284, -98.26833677], time:10},
    {route: 5, location: [26.20877284, -98.26833677], time:11},
    {route: 5, location: [26.20851106, -98.26534323], time:12},
    {route: 5, location: [26.21380029, -98.26051547], time:13},
    {route: 5, location: [26.21380029, -98.26051547], time:14},
    {route: 5, location: [26.21617189, -98.2600907], time:15},
    {route: 5, location: [26.21936948, -98.2583852], time:16},
    {route: 5, location: [26.21885621, -98.25478794], time:17},
    {route: 5, location: [26.21885621, -98.25478794], time:18},
    {route: 5, location: [26.2183065, -98.250631], time:19},
    {route: 5, location: [26.21835818, -98.24857541], time:20},
    {route: 5, location: [26.21919456, -98.24660041], time:21},
    {route: 5, location: [26.21919456, -98.24660041], time:22},
    {route: 5, location: [26.22371371, -98.24495167], time:23},
    {route: 5, location: [26.22461175, -98.24720155], time:24},
    {route: 5, location: [26.22500057, -98.25002565], time:25},
    {route: 5, location: [26.22500057, -98.25002565], time:26},
    {route: 5, location: [26.23376996, -98.24889026], time:27},
    {route: 5, location: [26.2379769, -98.24818233], time:28},
    {route: 5, location: [26.2379769, -98.24818233], time:29},
    {route: 5, location: [26.24105468, -98.24637146], time:30},
    {route: 5, location: [26.24064652, -98.24080033], time:31},
    {route: 5, location: [26.24069759, -98.23783544], time:32},
    {route: 5, location: [26.24069759, -98.23783544], time:33},
    {route: 5, location: [26.24031556, -98.23106114], time:34},
    {route: 5, location: [26.23977121, -98.22750726], time:35},
    {route: 5, location: [26.23898559, -98.22160341], time:36},
    {route: 5, location: [26.23898559, -98.22160341], time:37},
    {route: 5, location: [26.23856824, -98.21870054], time:38},
    {route: 5, location: [26.2378792, -98.21135178], time:39},
    {route: 5, location: [26.23736995, -98.20801716], time:40},
    {route: 5, location: [26.23736995, -98.20801716], time:41},
    {route: 5, location: [26.23355037, -98.20738712], time:42},
    {route: 5, location: [26.23104513, -98.20781532], time:43},
    {route: 5, location: [26.23104513, -98.20781532], time:44},
    {route: 5, location: [26.22579846, -98.2087137], time:45},
    {route: 5, location: [26.2210222, -98.20951466], time:46},
    {route: 5, location: [26.21585664, -98.21100562], time:47},
    {route: 5, location: [26.21585664, -98.21100562], time:48},
    {route: 5, location: [26.21669591, -98.2170194], time:49},
    {route: 5, location: [26.21723676, -98.22269762], time:50},
    {route: 5, location: [26.21780658, -98.22679744], time:51},
    {route: 5, location: [26.21780658, -98.22679744], time:52},
    {route: 5, location: [26.2180994, -98.22890058], time:53},
    {route: 5, location: [26.21598646, -98.23241291], time:54},
    {route: 5, location: [26.2132234, -98.23288882], time:55},
    {route: 5, location: [26.2132234, -98.23288882], time:56},
    {route: 5, location: [26.20946259, -98.23352323], time:57},
    {route: 5, location: [26.204, -98.236101], time:58},
    {route: 5, location: [26.204, -98.236101], time:59}
];

var RoutesMap = React.createClass({
    getCurrentLocation: function(map) {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var ll = [position.coords.latitude, position.coords.longitude];
                map.panTo(ll);
                var myMark = new L.marker(ll, {
                        icon: L.mapbox.marker.icon({
                            'marker-symbol': 'star',
                            'marker-color': 'ff0000',
                            'marker-size': 'large'
                        }),
                        title: 'You!'
                    }).addTo(map);
            });
        }
    },

    getBusLocation: function(map) {
        // get current time
        var currentTime = new Date();
        var currentMinute = currentTime.getMinutes();

        // compare time to stop lists
        var near = _.find(STOPS, function(stop) {
            return stop.time === currentMinute;
        });

        var ll = near.location;
        var busMarker = new L.marker(ll, {
                icon: L.mapbox.marker.icon({
                    'marker-symbol': 'bus',
                    'marker-color': '0ba149',
                    'marker-size': 'large'
                }),
                title: 'Bus'}).addTo(map);

        // map bus
    },

    componentDidMount: function() {
        // Setup Map
        L.mapbox.accessToken = config.MAPBOX_KEY;
        var map = L.mapbox.map('routesMap', config.MAPBOX_MAP_ID)
                    .setView([26.225982, -98.2566404], 14);

        // Get Current location
        this.getCurrentLocation(map);

        // Add Stop Points
        _.forEach(this.props.stops, function(stop) {
            var latLng = new L.LatLng(stop.location[0], stop.location[1]);
            var marker = new L.marker(latLng, {
                    icon: L.mapbox.marker.icon({
                        'marker-symbol': 'bus',
                        'marker-color': '7e3f96',
                        'marker-size': 'small'})
                    }).addTo(map);
        });

        // Find and Plot bus
        this.getBusLocation(map);
    },

    render: function() {
        return(
            <div id="routesMap" />
        )
    }
});

var BusRoutesApp = React.createClass({

    render: function() {
        return(
            <main>
                <RoutesMap stops={this.props.stops} />
            </main>
        )
    }
});

React.render(
    <BusRoutesApp stops={STOPS} />,
    document.getElementById('app')
);
