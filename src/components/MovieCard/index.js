import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <li className="movie-card-container col-12 col-sm-6 col-lg-2 mb-3 d-flex flex-column">
      <img className="movie-card-image" alt={title} src={posterPath} />
      <div className="data">
        <h1 className="movie-title m-0">{title}</h1>
        <p className="movie-rating mb-0 ms-1">Rating: {voteAverage}</p>

        <Link to={`/movie/${id}`} className="mt-auto align-self-center">
          <button className="view-btn" type="button">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default MovieCard
