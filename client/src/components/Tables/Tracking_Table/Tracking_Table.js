import React, {Component} from 'react';
import Auth from '../../../Auth/Auth';
import Table from "../Table_Components"

class Tracking_Table extends Component {
  constructor(props){
    super(props);
    this.state = {
      profile: {}
    }
  }

  render(){
    const { isAuthenticated } = this.props.auth;

    return(
      <table>
        <div>test test</div>
      </table>
    )
  }

}

export default Tracking_Table;