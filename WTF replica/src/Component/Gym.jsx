import React, { useState, useEffect } from "react"
import "./Gym.css";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Banner from "./Banner"

export default function Gym() {
  const [state, setState] = useState([]);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [gym, setGym] = useState();
  const [location, setLocation] = useState();
  const [locat, setLocat] = useState();
  function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);

    });
  }
  console.log(location)
  const url = `https://devapi.wtfup.me/gym/nearestgym?lat=${lat}&long=${long}=${location}`;

  useEffect(function() {

    fetch(url)
      .then(response => response.json())
      .then(data => setState(data.data))

  }, [])
  console.log(state)
  const selectloc = (ele, locat) => {
    if (locat) {
      return ele.city.toLowerCase().includes(locat.toLowerCase());
    } else return ele;
  };
  const forlocation = (ele, location) => {
    if (location) {
      return ele.city.toLowerCase().includes(location.toLowerCase());
    } else return ele;
  };
  const forgym = (ele, gym) => {
    if (gym) {
      return ele.gym_name.toLowerCase().includes(gym.toLowerCase());
    } else return ele;
  };
  const filterdata = (state, gym, location, locat) => {
    return state
      .filter(ele => selectloc(ele, locat))
      .filter(ele => forlocation(ele, location))
      .filter(ele => forgym(ele, gym));
  };
  const Showadd = () => {
    document.getElementById("show").style.display = "block"
  }
   const showset = () => {
    document.getElementById("shoset").style.display = "block"
  }
  const confirm = () => {
    alert("successfully Book")

  }
  return (
    <>
      <Banner />
      <br/>
      <br/>
      <div>
        <input className="mainin" placeholder="Search Gym Name Here..." type="search"
          value={gym} onChange={(ele) => { 
            Showadd(),setGym(ele.target.value);}} />
        <button className="button" onClick={getLocation()}><b>loc</b></button>
        <button className="button" onClick={()=>setGym('')}><b>Clear</b></button>
        <br/>
        <br/>
        <br/>
        <div>
          <Row>
            <Col className="col-md-4 mt-md-0 mt-3">
              <lable> <b> Location </b> </lable>
              <form>
              <button className="button" id="shoset" style={{ display: "none" , marginLeft:"200px" }} ><b>Reset</b></button></form>
              <br />
              <input type="search" style={{ width: "195px" }} placeholder="Location" onChange={(ele) => {     Showadd(),
      setLocation(ele.target.value); }} />
              <br/>
              <br/>
              <lable> <b>Price  </b> </lable>
              <br/>
              <input placeholder="Min" style={{ width: "80px", marginRight: "1rem" }} />

              <input placeholder="Max" style={{ width: "80px" }} />
              <br/>
              <br/>
              <lable> <b> Cities </b> </lable>
              <br/>
              <div>
              </div>
              <select style={{ width: "195px" }} onChange={(ele) => {     Showadd(), showset() ,
      setLocat(ele.target.value); }} type="search">
                <option style={{ backgroundColor: "rgba(255,255,255,0.4)" }} disabled selected >Select Cities</option>
                <option value="Ghaziabad">Ghaziabad</option>
                <option value="new delhi">new delhi</option>
                <option value="delhi">delhi</option>
                <option value="noida">noida</option>
              </select>
              <br/>
              <div style={{ display: "none" }} id="show">
                <h2>Location</h2>
                <div>
                  {filterdata(state, gym, location, locat).map(ele => (
                    <div key={ele.id} >
                      {ele.address1},{ele.address2}
                    </div>
                  ))}
                </div>

              </div>
            </Col>
            <Col>
              <div>
                {
                  filterdata(state, gym, location, locat).map((item, i) => {
                    return <div key={i} className="maincar">
                      <h1>{item.category_name
                      }</h1>
                      <p>{item.description
                      }</p>
                      <p>{item.rating}</p>
                      <p>{item.distance_text}</p>
                      <p>{item.duration_text}</p>
                      <button onClick={confirm}>Book Now</button>
                      <br/>
                      <br/>
                      <br/>
                    </div>
                  })
                }
              </div>

            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}
