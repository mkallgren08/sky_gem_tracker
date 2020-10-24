import React, {Component} from 'react';
// import Auth from '../../../Auth/Auth';
// import Table from "../Table_Components"
import ImageModal from '../../ImageModal'
import './Tracking_Table.css'
import gemdata from "../../../resources/static_info/gems/gems.js"


class TrackingTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      profile: {},
      showImage: false,
      imageNum: 0,
      imageDescription: '',
      imageLocation: '',
      active: 'gems',
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
  handleModalShow(num, info){
    console.log('Modal should be triggering', num)
    console.log(info)
    this.setState({showImage: true, imageNum: num})
  }
  handleModalClose(){
    console.log('Modal closing')
    this.setState({showImage: false, imageNum: 0})
  }
  toggleModal(num, info){
    console.log('toggling', num)
    console.log(info)
    this.setState({
      imageLocation: this.state[this.state.active][this.state.active][num-1].location,
      imageDescription: this.state[this.state.active][this.state.active][num-1].description,
      imageNum: num,
      showImage: this.state.showImage?false:true
    })
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
                  onClick={this.toggleModal.bind(this, item.number, this.state[this.state.active][this.state.active][item.number-1])}
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
            activeTable={this.state.active}
            imageLocation={this.state.imageLocation}
            imageDescription={this.state.imageDescription}         
          />
        </div>
      </div>
      </div>
      
      
    )
  }

}

export default TrackingTable;