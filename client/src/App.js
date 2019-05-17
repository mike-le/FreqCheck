import React, { Component } from 'react'
import axios from 'axios';
import Spinner from './Spinner'
import Display from './Display'
import Button from './Button'
import './App.css'

export default class App extends Component {
  state = {
    uploading: false,
    wordCount: []
  }

  onChange = e => {
    this.setState({ uploading: true })

    const data = new FormData();
    data.append('file', e.target.files[0]);
    axios.post('http://localhost:8080/files', data)
      .then(response => { 
        const newState = {
          uploading : false,
          wordCount : response.data
        };
        this.setState(newState);
      }) 
      .catch(error => { console.log(error)} );
  }
  
  render() {
    const { uploading, wordCount } = this.state
    
    const content = () => {
      switch(true) {
        case uploading:
          return <Spinner/>
        case wordCount.length > 0:
          return <Display wordCount={wordCount}/>
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