import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class MovieDetailView extends Component {
  state = {singleMovie: {}, castDetails: []}

  componentDidMount() {
    this.getSingleMovieData()
    this.getcast()
  }

  getMovieData = data => ({
    id: data.id,
    posterPath: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    voteAverage: data.vote_average,
    title: data.title,
    duration: data.runtime,

    releaseDate: data.release_date,
    overView: data.overview,
    genres: data.genres.map(each => ({
      genreId: each.id,
      genreName: each.name,
    })),
  })

  getSingleMovieData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const API_KEY = 'a1933e8e02702c00b19fbe60fd73f8f7'
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-`
    const response = await fetch(apiUrl)
    const data = await response.json()

    const newData = this.getMovieData(data)

    this.setState({singleMovie: newData})
  }

  getcast = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const API_KEY = 'a1933e8e02702c00b19fbe60fd73f8f7'
    const apiUrl1 = `  https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    const response1 = await fetch(apiUrl1)
    const data1 = await response1.json()

    const updatedData1 = data1.cast.map(each => ({
      profieImage: `https://image.tmdb.org/t/p/w500${each.profile_path}`,
      character: each.character,
      name: each.original_name,
    }))

    this.setState({castDetails: updatedData1})
  }

  render() {
    const {singleMovie, castDetails} = this.state
    const {
      posterPath,

      title,
      voteAverage,
      duration,
      releaseDate,
      overView,
    } = singleMovie

    return (
      <div className="detail-view">
        <div className="image-view">
          <img src={posterPath} alt={title} className="img" />
          <div className="card-det">
            <h1 className="movie-name">MovieName : {title}</h1>
            <p className="movie-rating">Rating : {voteAverage}</p>
            <p className="movie-rating">
              Duration : {duration} ReleaseDate : {releaseDate}
            </p>

            <p className="desc">AboutMovie : {overView}</p>
          </div>
          <Link to="/">
            <button type="button" className="view-btn">
              Back
            </button>
          </Link>
        </div>
        <hr />

        <ul className="actor-list">
          {castDetails.map(each => (
            <li className="actor-view">
              <img
                src={each.profieImage}
                alt={each.name}
                className="profieImage"
              />
              <h1 className="actor-name">{each.name}</h1>
              <p className="charcter">{each.character}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default MovieDetailView
