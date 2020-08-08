import React, { Component } from 'react';
import ReactWebChat, { createDirectLine, createStore } from 'botframework-webchat';
import STYLE_OPTIONS from './styleOptions';
import * as CONFIG from '../config';
import axios from 'axios';
import SuggestionList from './suggestionList';



export class WebChat extends Component {
  
    constructor(props) {
        super(props);
        this.store = createStore({}, ({ dispatch }) => next => action => {
            if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
                dispatch({
                    type: 'WEB_CHAT/SEND_EVENT',
                    payload: {
                        name: 'webchat/join',
                        value: { language: window.navigator.language, userName: this.state.uname }
                    }
                });
            }

            const { type } = action;
            if (type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
                return next(action);
            } else {
                return next(action);
            }
        });
        this.state = { dtoken: null, uid: null, uname: null, isSet: false };
    }
    
    async componentInit() {
        try {
            var res = await fetch(`${CONFIG.API_URL}/api/init`);
            if (!res.ok) {

            } else {
                var result = await res.json();
                var uid = localStorage.getItem("fd_Bot_UserId");
                var uname = localStorage.getItem('fd_Bot_UserName');
                if (typeof (uid) == 'undefined' || uid == null || uid.length !== 32) {
                    localStorage.setItem("fd_Bot_UserId", result.i);
                    uid = result.i;
                }

                //let directLine = new DirectLine({ token: result.dtoken });s
                this.setState({
                    dtoken: result.d,
                    uid: uid,
                    uname: uname,
                    isSet: true
                });
            }
        } catch (error) {
            console.log(error);
        }
        
    }

     escFunction(){
        var element=document.querySelector('[aria-label="Sendbox"]');
      
    //     axios.get("https://inputtools.google.com/request?text="+element.value+"&itc=si-t-i0-und&num=5")
    //   .then(function(response) {
    //     //console.log(response.data[1][0][1]);
    //   }).catch(function(error) {
    //     //console.log(error);
    //   })
    //      ;
        
    }
    
    async componentDidMount() {
        await this.componentInit();
        console.log(window.innerWidth);
       
        
        document.addEventListener("keyup", this.escFunction, false);
        
    }

   
    render() {
        if(window.innerWidth>1200){
            document.getElementById("userOutput").style.display="none";
            return (
                <div id="bot" className="col">
                    
                    {this.state.isSet && <ReactWebChat directLine={createDirectLine({ token: this.state.dtoken, webSocket: true })} userID={this.state.uid} username={this.state.uname} styleOptions={STYLE_OPTIONS} store={this.store} />}
                    <SuggestionList/>               
                </div>
               
            );
        }else if(window.innerWidth>700){
            
            return (
               
                <div id="bot" className="col">
                    
                    {this.state.isSet && <ReactWebChat directLine={createDirectLine({ token: this.state.dtoken, webSocket: true })} userID={this.state.uid} username={this.state.uname} styleOptions={STYLE_OPTIONS} store={this.store} />}
                   
                   
                </div>
               
            );
        }else{
     
            return (
                <div id="bot" className="col">
                    
                    {this.state.isSet && <ReactWebChat directLine={createDirectLine({ token: this.state.dtoken, webSocket: true })} userID={this.state.uid} username={this.state.uname} styleOptions={STYLE_OPTIONS} store={this.store} />}
                           
                </div>
               
            );
        }
       
    }
}