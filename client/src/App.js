import React, { Component } from 'react'
import axios from 'axios';
import Spinner from './Spinner'
import Display from './Display'
import Button from './Button'
import Switch from './Switch';
import Cookies from 'universal-cookie/cjs';
import './App.css'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      uploading: false,
      stopWord: props.checked || false,
      firstcache: [],
      secondcache: []
    }
  }

  onChange = e => {
    const cookies = new Cookies();
    const cookie1 = cookies.get('freqCheckCookie1');
    const cookie2 = cookies.get('freqCheckCookie2');
    var ck1len = 0, ck2len = 0;
    if(cookie1 != null && cookie1.length > 0 && cookie1.length <=5) {
      this.setState({ firstcache : cookie1 });
      ck1len = cookie1.length;
    } 
    if(cookie2 != null && cookie2.length > 0 && cookie2.length <=5) {
      this.setState({ secondcache : cookie2 });
      ck2len = cookie2.length;
    } 

    this.setState({ uploading: true })

    const data = new FormData();
    const file = e.target.files[0];
    data.append('file', file);
    data.append('stopword', this.state.stopWord)
    axios.post('https://freqcheckserver.herokuapp.com/files', data)
      .then(response => {
        const output = {'name': file.name, 'date': Date.now(), 'data': response.data};
        const resArr = [output];

        var firstcachecopy = this.state.firstcache.concat([]);
        var secondcachecopy = this.state.secondcache.concat([]);
        if(ck1len < 5) {
          firstcachecopy = this.state.firstcache.concat(resArr);
        } else if (ck2len < 5) {
          secondcachecopy =  this.state.secondcache.concat(resArr);
        } else {
          firstcachecopy.shift();
          firstcachecopy.push(secondcachecopy.shift());
          secondcachecopy = secondcachecopy.concat(resArr);
        }

        const newState = {
          uploading : false,
          firstcache : firstcachecopy,
          secondcache : secondcachecopy
        };
        
        cookies.set('freqCheckCookie1', firstcachecopy, 
          { path: '/', expires: new Date(Date.now()+2592000)});
        cookies.set('freqCheckCookie2', secondcachecopy, 
          { path: '/', expires: new Date(Date.now()+2592000)});
        this.setState(newState);
      }) 
      .catch(error => {console.log(error)} );
  }

  handleChange = name => event => {
      this.setState({ [name]: event.target.checked });
  };
  
  render() {
    const { uploading, stopWord } = this.state
    const cookies = new Cookies();
    var cookie1 = cookies.get('freqCheckCookie1');
    var cookie2 = cookies.get('freqCheckCookie2');
    
    const content = () => {
      switch(true) {
        case uploading:
          return <Spinner/>
        case cookie1 != null && cookie1.length > 0:
          return <Display cookie1={cookie1} cookie2={cookie2}/>
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
          <Switch stopWord={stopWord} handleChange={this.handleChange}></Switch> 
          <Button onChange={this.onChange} containerElement='label'></Button>
        </div>
        <div className='display'>
          {content()}
        </div>
      </div>
    )
  }
}