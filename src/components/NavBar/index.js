import {Link, withRouter} from 'react-router-dom'

import SearchMoviesContext from '../../context/SearchMoviesContext'

import './index.css'

const NavBar = props => {
  const renderSearchBar = () => (
    <SearchMoviesContext.Consumer>
      {value => {
        const {
          onTriggerSearchingQuery,

          onChangeSearchInput,
          searchInput,
        } = value

        const onChangeHandler = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push(`/search`)
        }

        return (
          <div className='nav-bar'>
            <input
              type='text'
              className='me-2 search-input'
              onChange={onChangeHandler}
              value={searchInput}
              placeholder='Search'
            />
            <button
              className='search-btn'
              type='button'
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )

  return (
    <nav className='navbar-container '>
      <div className='logo-container'>
        <h1 className='page-logo'>movieDB</h1>
      </div>

      <ul className='order-1 d-flex align-items-center p-0 mb-0 ms-3 nav-items-list'>
        <li className='nav-item'>
          <Link className='nav-link' to='/'>
            Popular
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/top-rated'>
            Top Rated
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/upcoming'>
            Upcoming
          </Link>
        </li>
      </ul>
      {renderSearchBar()}
    </nav>
  )
}

export default withRouter(NavBar)
