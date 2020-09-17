import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import {Row, Container } from "../../components/Grid";
import Nav2 from "../../components/Nav2";
import {Form, Input, FormBtn} from "../../components/Form"
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
      firstName: "",
      profile: {},
      authorized: isAuthenticated(),
      newPlaythruName: "",
      validName:false,
      playthruData:[]
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

  createNewPlaythru = (id,name) =>{
    console.log('Logic to come')
  }

  // handle form input
  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    // console.log(`name: ${name}, value: ${value}`);
    // this.setState({[name]: value},()=>console.log(this.state[name]));
    this.setState({[name]: value}, ()=>{
      if(this.state.newPlaythruName.length>0 ){this.setState({validName:true})} else {this.setState({validName:false})}
    });
    
  };

  // handle form submission
  newPlayThruSubmit = e => {
    e.preventDefault();
    console.log("Submission heard")
    console.log(`New name: ${this.state.newPlaythruName}`)
    let st=this.state
    let names = st.profile.playthrough_names
    let valid=true;
    console.log(names)
    // // checks if the newPlayThru name already exists in the user's profile
    if(names.length>0){
      names.forEach(el => {if(el===st.newPlaythruName){valid=false}});
      if(valid){this.createNewPlaythru(st.profile._id,st.newPlaythruName)}
        else{alert(`There's a problem with your submission, please try again!`)}
    }

      

  }

  testClick = msg => console.log(msg)

  // This is the function that renders the page in the client's window.
  render() {
    const { isAuthenticated } = this.props.auth;
    const profile = this.state.profile
    // console.log(`Profile at page render: ${JSON.stringify(profile,null,2)}`)
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
                <Row>
                  <Form>
                    <Input 
                      onChange={this.handleInputChange.bind(this)}
                      name='newPlaythruName'
                    /> 
                    <FormBtn onClick={this.newPlayThruSubmit.bind(this)} disabled={!this.state.validName}>
                      <span>Click me!</span>
                    </FormBtn>
                  </Form>
                </Row>
                <Row>
                  <Tracking_Table auth={this.props.auth}/>
                </Row>
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
