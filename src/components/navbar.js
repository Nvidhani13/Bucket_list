import React, { Component } from 'react'
import {Link} from "react-router-dom"

export default class navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <Link to="/" style={{textDecoration:"none"}}><h1 className="Name">Bucket-List</h1></Link>
       <Link to="/favourites" style={{textDecoration:"none"}}> <h4 className="fav-cont">Favorites</h4></Link>
      </div>
    )
  }
}
