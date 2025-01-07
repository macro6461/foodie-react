import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import "./index.css";
import Restaurant from "./components/Restaurant.js";
import FoodieList from "./components/FoodieList.js";
import Splash from "./components/Splash.js";
import { FaPizzaSlice } from "react-icons/fa6";
const FoodieReact = _ref => {
  let {
    GMapsApiKey,
    radius = 10000,
    devPort = 8080
  } = _ref;
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [showFoodie, setShowFoodie] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  // Ref to store the map
  const distanceMap = useRef({});
  const heightRef = useRef(null);
  useEffect(() => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setError(null); // Clear previous errors if any
      }, err => {
        setError("Failed to fetch location. " + err);
      });
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);
  useEffect(() => {
    handleHeight();
  }, [window.innerHeight]);
  useEffect(() => {
    if (showFoodie) {
      runSplash();
    }
  }, [showFoodie]);
  const handleHeight = () => {
    let height = window.innerHeight - 20;
    let cont = document.getElementsByClassName("container")[0];
    if (cont) {
      cont.style.height = "".concat(height, "px");
      heightRef.current = height;
    }
  };
  const runSplash = () => {
    setShowSplash(true);
    setTimeout(() => {
      setShowSplash(false);
      handleHeight();
    }, 6000);
  };
  const toRadians = degrees => {
    return degrees * (Math.PI / 180);
  };
  const distanceToAndFromHaversine = (start, stop, placeId) => {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = toRadians(stop.latitude - start.latitude);
    const dLon = toRadians(stop.longitude - start.longitude);
    const radLat1 = toRadians(start.latitude);
    const radLat2 = toRadians(stop.longitude);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // Update distanceMap here so we don't have to later.
    // distanceMap is stored in useRef so it doesn't trigger a re-render everytime we add a distance references
    let map = distanceMap.current;
    map[placeId] = (R * c).toFixed(2);
    return parseFloat((R * c).toFixed(2));
  };
  const handleShowFoodie = show => {
    setShowFoodie(show);
    if (show) {
      runSplash();
    }
  };
  const handleSetCurrentRestaurant = restaurant => {
    setCurrentRestaurant(restaurant);
  };
  let containerName = "container ";
  containerName += showFoodie ? "visible" : "hidden";
  return _jsxs("div", {
    className: containerName,
    children: [_jsx(FaPizzaSlice, {
      className: "opener",
      onClick: () => handleShowFoodie(!showFoodie)
    }), showSplash ? _jsx(Splash, {}) : _jsx(_Fragment, {
      children: showFoodie ? _jsxs(_Fragment, {
        children: [currentRestaurant ? _jsx(Restaurant, {
          error: error,
          restaurant: currentRestaurant,
          close: () => setCurrentRestaurant(null),
          distanceMap: distanceMap.current,
          height: heightRef.current
        }) : null, _jsx(FoodieList, {
          error: error,
          GMapsApiKey: GMapsApiKey,
          radius: radius,
          devPort: devPort,
          setCurrentRestaurant: handleSetCurrentRestaurant,
          distanceToAndFromHaversine: distanceToAndFromHaversine,
          setError: setError,
          latitude: latitude,
          longitude: longitude,
          hide: !!currentRestaurant
        })]
      }) : null
    })]
  });
};
export default FoodieReact;