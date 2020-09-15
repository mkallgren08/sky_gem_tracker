import React, {Component} from 'react';
import Auth from '../../../Auth/Auth';
import {Table, Table_Row, Table_Cell} from "../../Tables/Table_Components"

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
      <div id="tracking_table_test">
        TEST TEST
      </div>
    )
  }

}

export default Tracking_Table;