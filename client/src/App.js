import React, { Component } from 'react'
import axios from 'axios'
import Spinner from './components/Spinner'
import Display from './components/Display'
import Button from './components/Button'
import Switch from './components/Switch'
import Header from './components/Header'
import Cookies from 'universal-cookie/cjs'
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
    var cklen = 0, ck2len = 0;
    if(cookie1 != null && cookie1.length > 0) {
      this.setState({ firstcache : cookie1 });
      cklen = cookie1.length;
    } 
    if(cookie2 != null && cookie2.length > 0) {
      this.setState({ secondcache : cookie2 });
      ck2len = cookie2.length;
    } 

    this.setState({ uploading: true })
    const { stopWord, firstcache, secondcache } = this.state

    const data = new FormData();
    const file = e.target.files[0];
      e.target.value = '';
      data.append('file', file);
      data.append('stopword', stopWord);
      axios.post('https://freqcheck.herokuapp.com/files', data)
        .then(response => {
          if(Object.keys(response.data).length > 0){
            const output = {
              'name': file.name, 
              'date': Date.now(),
              'stopword': stopWord, 
              'data': response.data
            };
            const resArr = [output];
    
            var firstcachecopy = firstcache.concat([]);
            var secondcachecopy = secondcache.concat([]);
            if(cklen < 5) {
              firstcachecopy = firstcache.concat(resArr);
            } else if (ck2len < 5) {
              secondcachecopy =  secondcache.concat(resArr);
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
          } else {
            alert("File empty or contains no words");
          } 
        }) 
        .catch( error => {
          this.setState({ uploading: false });
          alert(error.message);
        });
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
        <Header></Header>
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