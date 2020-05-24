import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfiles } from '../../Store/actions/profile'
import Spinner from '../Layout/Spinner'
import ProfileItem from './ProfileItem'

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles()
  }, [getProfiles])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop">
              Browes and connect with developers
            </i>
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              //   profiles.map((profile) =>
              //   (
              //       <ProfileItem key={profile.id} profile={profile} />
              //   ))
              profiles.map((profile) => {
                return <ProfileItem key={profile._id} profile={profile} />
              })
            ) : (
              <h4>Profiles Not Found</h4>
            )}
          </div>
        </>
      )}
    </>
  )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
