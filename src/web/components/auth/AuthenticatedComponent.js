import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

// NOTE: This class is not used because of nginx configuration
export const requireAuthentication = (Component, role) => {
  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.isAdmin()
    }

    componentWillReceiveProps(nextProps) {
      this.isAdmin()
    }

    isAdmin() {

      if (this.props.userData) {
        if (!this.props.userData.groups.filter(grp =>
          grp.name.includes(role)).length) {
            location.assign('/auth')
            return false
          }
        }
        return true
      }

      render() {
        return (
          <Component />
        )

      }
    }

    const mapStateToProps = (state) => ({
      userData: state.userData,
    });

    return connect(mapStateToProps)(AuthenticatedComponent);

  }
