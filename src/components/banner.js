import React, { Component } from 'react'
//import {movies} from './getMovies'
import axios from "axios"

export default class Banner extends Component {

  constructor(){
    super()
    this.state={
      banner:{}
    }
  }

  async componentDidMount(){
    
    const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=63cab78a8a739a0882903f2963f82adc&language=enUS&page=1`)
    let data=res.data
    this.setState({
        banner:res.data.results[0]
    })
    
    
}

  render() {
        
        
        
    //  let banner=''
    return (
        <>
        
        <div>
        {
            Object.keys(this.state.banner).length==0?
            <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>:
        <div className="card banner-card" >
            
            <img src={`https://image.tmdb.org/t/p/original${this.state.banner.backdrop_path}`} className="card-img-top banner-img" alt="..."/>
            {/* <div className="card-body"> */}
                <h2 className="card-title banner-title">{this.state.banner.original_title}</h2>
                <p className="card-text banner-text">{this.state.banner.overview}</p>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            {/* </div> */}
            </div>
        }
        </div>
        
      </>
    )
  }
}
