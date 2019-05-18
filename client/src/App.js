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
    const file = e.target.files[0];
    data.append('file', file);
    axios.post('https://freqcheckserver.herokuapp.com/files', data)
      .then(response => {
        const output = {'name': file.name, 'date': Date.now(), 'data': response.data};
        const resArr = [output];
        const newCache = this.state.cache.concat(resArr);
        const newState = {
          uploading : false,
          cache : newCache
        };
        this.setState(newState);
        console.log(this.state.cache)
        cookies.set('freqCheckCookie', this.state.cache, 
          { path: '/', expires: new Date(Date.now()+2592000)});
      }) 
      .catch(error => {console.log(error)} );
  }
  
  render() {
    const { uploading } = this.state
    
    const cookies = new Cookies();
    var cookie = cookies.get('freqCheckCookie');
    
    const content = () => {
      switch(true) {
        case uploading:
          return <Spinner/>
        case cookie != null && cookie.length > 0:
          return <Display cookie={cookie}/>
        default:
          return
      }
    }

    return (
      <div>
        <header className = 'header'>
          <div className="container">          
            FreqCheck
          </div>
        </header>
        <div className='title'>
          Word Frequency Counter
        </div>
        <div className='subtitle'>
          Upload text document and find the most frequently used words
        </div>
        <div className='button'>
          <Button onChange={this.onChange}></Button>
        </div>
        <div className='display'>
          {content()}
        </div>
      </div>
    )
  }
}