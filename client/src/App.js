import React, { Component } from 'react'
import axios from 'axios';
import Spinner from './Spinner'
import Display from './Display'
import Button from './Button'
import Cookies from 'universal-cookie';
import './App.css'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      uploading: false,
      wordCount: [],
      cache: []
    }
  }

  onChange = e => {
    const cookies = new Cookies();
    var cookie = cookies.get('freqCheckCookie');
    if(cookie != null && cookie.length > 0) {
      this.setState({ cache : cookie });
    } 

    this.setState({ uploading: true })

    const data = new FormData();
    data.append('file', e.target.files[0]);
    axios.post('http://localhost:8080/files', data)
      .then(response => {
        const test = [response.data];
        const newCache = this.state.cache.concat(test);
        const newState = {
          uploading : false,
          wordCount : response.data,
          cache : newCache
        };
        this.setState(newState);
        cookies.set('freqCheckCookie', this.state.cache, 
          { path: '/', expires: new Date(Date.now()+2592000)});
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