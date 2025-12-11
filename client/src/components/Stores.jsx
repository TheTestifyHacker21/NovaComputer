import { useState } from 'react';

const Stores = () => {

  const [location, setLocation] = useState(null);
  const [nearestStore, setNearestStore] = useState(null);

  const stores = [
    {
      id: 1,
      name: "PC Components Downtown",
      address: "123 Main St, Nizwa , CA 94025",
      lat: 23.7100,
      lng: 58.1500
    },
    {
      id: 2,
      name: "PC Components North",
      address: "AL Noor 92, Alseeb, CA 94026",
      lat: 23.7000,
      lng: 58.1600
    },
    {
      id: 3,
      name: "PC Components West",
      address: "789 Nahdha st, Sohar, CA 94027",
      lat: 23.6900,
      lng: 58.1400
    },
    {
      id: 4,
      name: "PC Components East",
      address: "321 Near Roundabout, Salalah, CA 94028",
      lat: 23.7200,
      lng: 58.1700
    }
  ];

  // Simple distance calculation (approximate)
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    // Simple difference calculation - good enough for relative distances
    const latDiff = Math.abs(lat1 - lat2);
    const lngDiff = Math.abs(lng1 - lng2);
    const totalDiff = latDiff + lngDiff;
    
    // Convert to approximate miles (this is a simplified conversion)
    return (totalDiff * 69).toFixed(1); 
  };

  // Find nearest store
  const findNearestStore = (userLat, userLng) => {
    let nearest = stores[0]; // Start with first store
    let shortestDistance = calculateDistance(userLat, userLng, stores[0].lat, stores[0].lng);

    // Check other stores
    for (let i = 1; i < stores.length; i++) {
      const distance = calculateDistance(userLat, userLng, stores[i].lat, stores[i].lng);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearest = stores[i];
      }
    }

    return { ...nearest, distance: shortestDistance };
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);
          
          // Find nearest store
          const nearest = findNearestStore(userLocation.lat, userLocation.lng);
          setNearestStore(nearest);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please ensure location services are enabled.");
        }
      );
    } else {
      alert("Geolocation not supported by this browser.");
    }
  };

  // Get distance for each store
  const getStoreDistance = (store) => {
    if (!location) return null;
    return calculateDistance(location.lat, location.lng, store.lat, store.lng);
  };

  return (
    <div className="min-vh-100 text-white">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold mb-4">Find a Store Near You</h1>
            </div>

            {/* Location Section */}
            <div className="rounded-3 p-4 mb-4" style={{backgroundColor : "#0F172A" }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h2 className="h3 fw-bold mb-2">Your Location</h2>
                  {location ? (
                    <p className="text-light mb-0">
                      Location found! Nearest store calculated.
                    </p>
                  ) : (
                    <p className="text-light mb-0">Click the button to find your location</p>
                  )}
                </div>
                <button 
                  className="btn btn-primary d-flex align-items-center gap-2"
                  onClick={getLocation}
                >
                  <i className="bi bi-geo-alt"></i>
                  <span>Get Location</span>
                </button>
              </div>
              
              {location && (
                <div className="rounded-3 p-3" style={{backgroundColor : "#0F172A" }}>
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-check-circle text-success fs-5 mt-1"></i>
                    <div>
                      <p className="fw-semibold mb-1">Location Found</p>
                      <p className="text-light mb-1">Coordinates detected successfully</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Nearest Store */}
            {nearestStore && (
              <div className="bg-success bg-opacity-25 border border-success rounded-3 p-4 mb-4">
                <h3 className="h4 fw-bold text-success mb-2">📍 Nearest Store</h3>
                <p className="fw-semibold fs-5 mb-1">{nearestStore.name}</p>
                <p className="text-light-emphasis mb-2">{nearestStore.address}</p>
                <p className="text-success mb-0 fw-semibold">
                  Approximately {nearestStore.distance} miles away
                </p>
              </div>
            )}

            {/* All Store Locations */}
            <div className="rounded-3 p-4" style={{backgroundColor : "#0F172A" }}>
              <h2 className="h3 fw-bold mb-4">All Store Locations</h2>
              
              <div className="d-flex flex-column gap-3">
                {stores.map(store => {
                  const distance = getStoreDistance(store);
                  const isNearest = nearestStore && nearestStore.id === store.id;
                  
                  return (
                    <div 
                      key={store.id} 
                      className={`rounded-3 p-3 transition ${
                        isNearest ? 'border border-success' : ''
                      }`}
                      style={{backgroundColor : "#1b2845" }}
                    >
                      <div className="d-flex align-items-start gap-3">
                        <i className={`bi ${isNearest ? 'bi-star-fill text-warning' : 'bi-geo-alt text-primary'} mt-1`}></i>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start">
                            <h3 className="h5 fw-semibold mb-1">
                              {store.name}
                              {isNearest && <span className="badge bg-success ms-2">Nearest</span>}
                            </h3>
                            {distance && (
                              <span className="badge bg-primary">{distance} mi</span>
                            )}
                          </div>
                          <p className="text-light mb-0">{store.address}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Location Service Info */}
            <div className="rounded-3 p-4 mt-4" style={{backgroundColor : "#0F172A" }}>
              <h3 className="h5 fw-semibold mb-3">ℹ️ Location Service Info</h3>
              <p className="text-light-emphasis small mb-0">
                This feature uses your browser's Geolocation API to find stores near you. 
                Your location data is only used to calculate approximate distances and is not stored.
                Distances are approximate for comparison purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stores;