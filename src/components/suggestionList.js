import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import '../components/suggestionList.css';
import axios from 'axios';

class SuggestionList extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: ["මම"]
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
    this.onChange = this.onChange.bind(this);

  }
  componentDidUpdate(){
    var element=document.querySelector('[aria-label="Sendbox"]');
    //console.log(element);
   element.addEventListener("keypress", this.onChange,false);
    //document.addEventListener("keydown", this.onChange, false);
    element.addEventListener("keydown", this.onKeyDown, false);
  }

  // Event fired when the input value is changed
  onChange = async (e) => {
     // console.log("Changed");
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    const  filteredSuggestions = "";
    var res = userInput.split(" ");
    //console.log(res[res.length-1]);
    var response = await axios.get("https://inputtools.google.com/request?text="+res[res.length-1]+"&itc=si-t-i0-und&num=5")
    try {
    var val=response.data[1][0][1];
    console.log(val);
   } catch (error) {
       console.log(error);
   }

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions:val,
      showSuggestions: true,
      userInput: document.querySelector('[aria-label="Sendbox"]').innerHTML
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
    var element=document.querySelector('[aria-label="Sendbox"]');
    var res = element.value.split(" ");
    res[res.length-1]=e.currentTarget.innerText
  element.value=res.join(" ");
    //console.log("Clicked");
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 32) {
        console.log(filteredSuggestions[activeSuggestion]);
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
      var element=document.querySelector('[aria-label="Sendbox"]');
      var res = element.value.split(" ");
      res[res.length-1]=filteredSuggestions[activeSuggestion];
    element.value=res.join(" ");
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions  ) {
      if (filteredSuggestions) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        {/* <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        /> */}
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default SuggestionList;