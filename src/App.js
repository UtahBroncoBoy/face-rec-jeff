import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';

const initialState = {
  input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component {
  constructor() {
    super() 
    this.state = initialState;
  }

  // set state to retrieved user
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined

    }})
  }

  //calculate the placement of the box over a face
  calculateFaceLocation = (data) => {
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    // const image = document.getElementById('inputImage');
    // const imageWidth = Number(image.width);
    // const imageHeight = Number(image.height);
    // return {
    //   leftCol: clarifaiFace.left_col * imageWidth,
    //   topRow: clarifaiFace.top_row * imageHeight,
    //   rightCol: imageWidth - (clarifaiFace.right_col * imageWidth),
    //   bottomRow: imageHeight - (clarifaiFace.bottom_row * imageHeight),
    // }
    const faceArray = [];
    const clarifaiFacesData = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);

    faceArray = clarifaiFacesData.forEach((face) => {
      const faceBoundingBox = face.region_info.bounding_box;
      faceArray.push({
        leftCol: faceBoundingBox.left_col * imageWidth,
        topRow: faceBoundingBox.top_row,
        rightCol: imageWidth - (faceBoundingBox.rightCol * imageWidth),
        bottomRow: imageHeight - (faceBoundingBox.bottom_row * imageHeight)
      })
    })
    console.log(faceArray);
  }

  
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageURL: this.state.input});
      fetch('https://floating-dusk-47131.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input  
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response) {
          fetch('https://floating-dusk-47131.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id  
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
        
      })
      .catch(err => console.log(`You have encountered an error!`, err));
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route:route});
  }

  render() {
    const{ isSignedIn, imageURL, route, box } = this.state;
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home' 
        ?<div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onSubmit}
          />
          <FaceRecognition 
            box={box}
            imageURL={imageURL}
          />
        </div>
        : (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
        }
    </div>
    );
  }
}

export default App;