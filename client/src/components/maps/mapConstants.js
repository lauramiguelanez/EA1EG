require('dotenv').config();

const mapConstants = {
  COORDINATES: {
    lat: 41.404682,
    lng: 2.123773
  },

  API_CONFIG: {
    key: process.env.REACT_APP_API_KEY_MAP,
    language: 'es'
  },

  resetMarkerAnimation: function(marker) {
    window.setTimeout(() => {
      marker.setAnimation(null);
    }, 30000);
  },

  STYLES: [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [
        {
          color: '#a7e1c8'
        }
      ]
    },
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [
        {
          gamma: 0.01
        },
        {
          lightness: 20
        }
      ]
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          saturation: -31
        },
        {
          lightness: -33
        },
        {
          weight: 2
        },
        {
          gamma: 0.8
        }
      ]
    },
    {
      featureType: 'all',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        {
          lightness: 30
        },
        {
          saturation: 30
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          saturation: 20
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          lightness: 20
        },
        {
          saturation: -20
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          lightness: 10
        },
        {
          saturation: -30
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        {
          saturation: 25
        },
        {
          lightness: 25
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          lightness: -20
        }
      ]
    }
  ]
};

export default mapConstants;
