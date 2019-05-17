import React, { Component } from 'react'
import Spinner from './Spinner'
import Display from './Display'
import Button from './Button'
import './App.css'

export default class App extends Component {
  state = {
    uploading: false,
    images: []
  }

  onChange = e => {
    const files = Array.from(e.target.files)
    this.setState({ uploading: true })
    
    var temp = []
    files.forEach((file, i) => {
      var form = {}
      form[i] = file;
      temp.push(form);
    })

    const newState = {
      uploading : false,
      images : temp
    };

    this.setState(newState);
  }
  
  render() {
    const { uploading, images } = this.state

    const content = () => {
      switch(true) {
        case uploading:
          return <Spinner/>
        case images.length > 0:
          return <Display images={images}/>
        default:
          return <Button onChange={this.onChange} />
      }
    }

    return (
      <div>
        <div className='buttons'>
          {content()}
        </div>
      </div>
    )
  }
}