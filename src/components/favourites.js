import React, { Component } from 'react'
import {movies} from "./getMovies"
const genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'}

export default class Favourites extends Component {
      constructor(){
        super()
        this.state={
          genres:[],
          currPage:"All genres",
          movies:[]

        }
      }
      componentDidMount=()=>{
        let data=JSON.parse(localStorage.getItem("movies-app")||"[]")
        let temp=[]
        data.forEach((obj)=>{
            if(!temp.includes(genreids[obj.genre_ids[0]]))
            temp.push(genreids[obj.genre_ids[0]])
        })
        temp.unshift('All genres')
        this.setState({
          genres:[...temp],
          movies:[...data]
        })
      }
      handleGenres=(genres)=>{
      
        
        this.setState({
          currPage:genres
        })

      }
    
  render() {
      
      
      
    return (
        <>
        <div className="main">
  <div className="row ">
    <div className="col-3">
    <ul class="list-group genres">
        {
          this.state.genres.map((genres)=>(
            genres===this.state.currPage?
        <li className="list-group-item" style={{background:"#3f51b5",color:"white",fontWeight:"bold"}} onMouseEnter={()=>this.handleGenres(genres)}>{genres}</li>:
        <li className="list-group-item" style={{background:"white",color:"#3f51b5",fontWeight:"bold"}} onMouseEnter={()=>this.handleGenres(genres)}>{genres}</li>


          ))
        }
</ul>
    </div>
    <div className="col-9">
    <div className="row ">
            <input type="text" className="input-group-text col" placeholder="Search"/>
            <input type="number" className="input-group-text col" placeholder='Rows'/>
    </div>
    <table class="table">
  <thead>
    <tr>
      
      <th scope="col">Title</th>
      <th scope="col">Genre</th>
      <th scope="col">Popularity</th>
      <th scope="col">Rating</th>
      <th scope="col"> </th>

      


    </tr>
  </thead>
  <tbody>
      
      {
          this.state.movies.map((obj)=>(
        
        <>
        
    <tr>
      
      <td><img src={`https://image.tmdb.org/t/p/original${obj.backdrop_path}`} className="fav-img" alt="..."/>{obj.original_title}</td>
      <td>{genreids[obj.genre_ids[0]]}</td>
      <td>{obj.popularity}</td>
      <td>{obj.vote_average}</td>
      <td><button type="button" class="btn btn-danger">Delete</button></td>

    </tr>
    
    
    </>
          ))
    }
    
  </tbody>
</table>
<nav aria-label="Page navigation example"/>
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
    </div>
    
    
  </div>
</div>
      </>
    )
  }
}
