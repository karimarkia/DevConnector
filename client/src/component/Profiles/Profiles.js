import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfiles } from '../../Store/actions/profile'


const Profiles = ({getProfiles}) => {
    
    useEffect(() => {
        getProfiles()
    }, [])

    return (
        <div>
            
        </div>
    )
}

Profiles.propTypes = {
getProfiles :PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    
}

export default connect(mapStateToProps,{getProfiles})(Profiles)
