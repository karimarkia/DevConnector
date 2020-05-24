import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserRepos } from '../../Store/actions/profile'

const ProfileGithub = ({ gitname, getUserRepos, repos }) => {
  console.log(gitname);
  
    useEffect(() => {
        getUserRepos(gitname)
  }, [])

  return (
    <div className="profile-github">
      {/* <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      <div className="repo bg-white p-1 my-1">
        <div>
          <h4>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Repo One
            </a>
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            laborum!
          </p>
        </div>
        <div>
          <ul>
            <li className="badge badge-primary">Stars: 44</li>
            <li className="badge badge-dark">Watchers: 21</li>
            <li className="badge badge-light">Forks: 25</li>
          </ul>
        </div>
      </div> */}
    </div>
  )
}

ProfileGithub.propTypes = {}

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
})

export default connect(mapStateToProps, { getUserRepos })(ProfileGithub)
