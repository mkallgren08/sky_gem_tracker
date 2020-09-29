import React, {Component} from 'react';
// import Auth from '../../../Auth/Auth';
// import Table from "../Table_Components"
import ImageModal from '../../ImageModal'
import './Tracking_Table.css'
import gemdata from "../../../resources/static_info/gems/gems.js"


class Tracking_Table extends Component {
  constructor(props){
    super(props);
    this.state = {
      profile: {},
      showImage: false,
      imageNum: 0,
      active: 'gems',
      geminfo:[],
      gems: gemdata,
      playthruinfo:{
        // for each gem, include their number in this table if it has been checked off, otherwise exclude it
        gems:[]
      }
    }
  }

  componentDidMount(){
    console.log(this.state[this.state.active])
  }

  handleModalShow(num){
    console.log('Modal should be triggering', num)
    this.setState({showImage: true, imageNum: num})
  }

  handleModalClose(){
    console.log('Modal closing')
    this.setState({showImage: false, imageNum: 0})
  }

  toggleModal(){
    console.log('toggling')
    this.setState({showImage: this.state.showImage?false:true})
  }

  render(){
    const { isAuthenticated } = this.props.auth;

    return(
      <div>
        <div className="trackingTable-wrapper">
        <div className="trackingTable">
          <div className="trackingTable-row">
            <div className="trackingTable-cell--header flex1">Found?</div>
            <div className="trackingTable-cell--header flex2">Hold</div>
            <div className="trackingTable-cell--header flex2">Location</div>
            <div className="trackingTable-cell--header flex7">Description</div>
            <div className="trackingTable-cell--header flex3">Visual</div>
          </div>
          {this.state[this.state.active][this.state.active].map(item=>(
            <div className="trackingTable-row">
              <div className="trackingTable-cell flex1">Checkbox</div>
              <div className="trackingTable-cell flex2">{item.hold}</div>
              <div className="trackingTable-cell flex2">{item.location}</div>
              <div className="trackingTable-cell flex7">{item.description} </div>
              <div className="trackingTable-cell flex3">
                <div 
                  className="trackingTable-picture" 
                  style={{backgroundImage: `url(${window.location.origin}/images/${this.state.active}/${item.number}.png)`}}
                  // onClick={this.handleModalShow.bind(this,item.number)} 
                  onClick={this.toggleModal.bind(this)}
                >
                </div>  
              </div>
            </div> 
          ))}

        </div>
        <div>
          <ImageModal 
            showThis={this.state.showImage}
            hideThis={this.handleModalClose.bind(this)}
            imageNumber={this.state.imageNum}         
          />
        </div>
      </div>
      </div>
      
      
    )
  }

}

export default Tracking_Table;