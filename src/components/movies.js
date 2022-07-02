import React, { Component } from 'react'
//import {movies} from './getMovies'
import axios from "axios"

export default class Movies extends Component {
   constructor(){
        super()
        this.state={
            hover:'', //contains where mouse was entering 
            parr:[1],
            currPage:1,
            movies:[],
            banner:{},
            movieKey:1,
            favouritesMovies:JSON.parse(localStorage.getItem("movies-app")||"[]")
        }

   }
   
    async componentDidMount(){
        
        const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=63cab78a8a739a0882903f2963f82adc&language=enUS&page=${this.state.currPage}`)
        let data=res.data
        this.setState({
            movies:[...data.results],
            favouritesMovies:JSON.parse(localStorage.getItem("movies-app")||"[]")
        })
        
    }
    changeMovies=async ()=>{
        
        const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=63cab78a8a739a0882903f2963f82adc&language=enUS&page=${this.state.currPage}`)
        let data=res.data
        this.setState({
            movies:[...data.results]
        })
    }

    handleNext=async ()=>{
        let temparr=[]
        for(let i=1;i<=this.state.parr.length+1;i++){
            temparr.push(i)
        }
        

        await this.setState({
            parr:[...temparr],
            currPage:temparr.pop()
        })
        
         this.changeMovies()
    }
    handlePrevious=()=>{
        
        if(this.state.currPage!==1){this.setState({
            currPage:this.state.currPage-1
            
        },this.changeMovies)}

    }
    handlePage=(value)=>{
       if(value!==this.state.currPage){this.setState({
            currPage:value
        },this.changeMovies)}
    }
        handleFavourites= (obj)=>{
        let oldData=this.state.favouritesMovies
        
        oldData.push(obj)
        this.setState({
            favouritesMovies:[...oldData]
        },console.log("this is fav now after fav",this.state.favouritesMovies))
        localStorage.setItem("movies-app",JSON.stringify(this))
    }
    deleteFavourites= async (obj)=>{
        let temp=this.state.favouritesMovies
        temp=temp.filter((m)=>m.id!==obj.id)
        console.log("this is temp",temp)
        await this.setState({
            favouritesMovies:[...temp]
        })
        console.log("this is fav now after delete",this.state.favouritesMovies)
        localStorage.setItem("movies-app",JSON.stringify(this.state.favouritesMovies))

    }
  render() {
    console.log("fav movies inside render",this.state.favouritesMovies)
    
    return (
        <>
        
        
        
        {this.state.movies.length==0?
            <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>:
            <div>
                <div className="heading">
                <h3 > Trending</h3>
                </div>
                <div className="movie-list">
                    {
                        this.state.movies.map((obj)=>(
                            
                            <div className="card movie-card"  onMouseEnter={()=>this.setState({hover:obj.id})} onMouseLeave={()=>this.setState({hover:''})}>
            
                            <img src={`https://image.tmdb.org/t/p/original${obj.backdrop_path}`} className="card-img-top movie-img" alt="..."/>
                            {/* <div className="card-body"> */}
                                <h2 className="card-title movie-title">{obj.original_title}</h2>
                                {/* <p className="card-text movie-text">{obj.overview}</p> */}
                                <div className="button-wrapper">
                                    {
                                        this.state.hover===obj.id &&this.state.favouritesMovies.includes(obj)?
                                <a className="btn btn-primary movies-button" onClick={()=>this.deleteFavourites(obj)}>Remove From Favorites</a>
                                
                                      :  this.state.hover===obj.id &&
                                <a  className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(obj)}>Add to Favorites</a>}
                            </div>
                        </div>

                                    ))
                    }
                </div>
            </div>
            }
            <div className='pagination-cont'>
            <nav aria-label="Page navigation example " className='paginationCont'>
        <ul className="pagination">
            <li className="page-item" ><a className="page-link" onClick={this.handlePrevious}>Previous</a></li>
            { 
                
                this.state.parr.map((value)=>(
                    
                    <li className="page-item " ><a className="page-link" onClick={()=>this.handlePage(value)}  >{value}</a></li>
                
                ))
                
            }
            
            <li className="page-item" ><a className="page-link" onClick={this.handleNext}>Next</a></li>
        </ul>
      </nav>
      </div>
        </>
    )
  }
}
