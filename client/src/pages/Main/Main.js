import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import {Row, Container } from "../../components/Grid";
import Nav2 from "../../components/Nav2";
import {Table,Table_Cell,Table_Row} from "../../components/Tables/Table_Components"
import Tracking_Table from "../../components/Tables/Tracking_Table/Tracking_Table";

class MainPage extends Component {
  //==============================================================
  //==============================================================
  // Component Mounting Functions
  //==============================================================

  // This creates the keystroke-logger function which lets the user select letters
  // document.addEventListener(
  //   "keydown",
  //   this._handleKeyDown.bind(this)
  // )
  constructor(props) {

    super(props);

    const { isAuthenticated } = this.props.auth;

    this.state = {
      names: [],
      firstName: "",
      profile: {},
      authorized: isAuthenticated()
    }
  }

  // Initial load of user profile information
  componentDidMount() {
    if (this.state.authorized) {
      console.log(this.props.auth);
      const { userProfile, getProfile } = this.props.auth;
      if (!userProfile) {
        console.log(this.state.profile)
        getProfile((err, profile) => {
          if(err) {console.log(err)}
          this.setState({ profile: profile}, ()=> {
            console.log('Retrieved user profile: ' + JSON.stringify(profile, 2, null));
            this.loadUser(profile.sub,"auth0_id",profile)
           });  

        });
      } else {
        this.setState({ profile: userProfile }, ()=> {
          console.log('Loaded user profile: ' + JSON.stringify(this.state.profile, 2, null));
        });
      }
    }



  };

  // load user data
  loadUser = (id,field,profile) => {
    API.getUser(id,field)
    .then(
      res => {
        console.log("User data: " + JSON.stringify(res.data, null, 2))
        if(res.data){this.setState({profile:res.data},()=>console.log(`User state profile: ${JSON.stringify(this.state.profile,null,2)}`))}
        if(!res.data) {
          API.createUser(profile)
          .then(
            res => {
              console.log("New created user data: " + JSON.stringify(res.data, null, 2))
              this.setState({profile:res.data},()=>console.log(`User state profile: ${JSON.stringify(this.state.profile,null,2)}`))
            }
          )
        }
      }
    ) .catch(err=> console.log(err))
  }

  // handle form input
  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    this.readUserInput(event)
  };

  // This is the function that renders the page in the client's window.
  render() {
    const { isAuthenticated } = this.props.auth;
    const profile = this.state.profile
    console.log(`Profile at page render: ${JSON.stringify(profile,null,2)}`)
    return (
      <Container fluid>
        <Row>
          <Nav2 auth={this.props.auth} />
        </Row>
        <Row>
          <Container>
            {
              !isAuthenticated() && (
                <div>
                  <h1>Hello - Please Log In To Get Started. </h1>
                  {/* <h3>If this the first time opening the app, please createa  new application in Auth0 and make sure that the client id and domain are properly set in the auth0-variables.js file and that the callback URLs are allowed in Auth0</h3> */}
                </div>

              )
            }
            {
              isAuthenticated() && (
                <Container fluid>
                  <Row>
                    {profile.name ? (
                      <h1>Hello {profile.name}: Time to Get Coding!!</h1>
                    ):(
                      <h1>Hello user</h1>
                    )}
                    
                  </Row>                                    
                </Container> 
              )
            }
          </Container>
        </Row>
        <Row>
          {
            isAuthenticated() && (
              <Container fluid>
                <Tracking_Table auth={this.props.auth}/>
              </Container>

            )
          }
          {
            !isAuthenticated() && (
              <Row>
                <Container>
                  <h3>Log in to start tracking</h3>
                </Container>
              </Row>
            )
          }
        </Row>


      </Container >
    );
  }
}

export default MainPage;
