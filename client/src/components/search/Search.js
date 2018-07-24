import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './search.css';
import Autosuggest from 'react-autosuggest';

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.postingTitle}</span>
  );
}


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            postings: []
        };

  let postingStatus;

  fetch(`/api/postings`)
    .then(res => {
      postingStatus = res.status;
      return res.json();
    })
    .then(body => {
      if(postingStatus == 200) {
        this.setState({
					postings: body
				});
      }
      return body;
		})
		.catch(err => {
			console.log("ERROR!!");
			console.log(err);
		})

    this.getSuggestions = this.getSuggestions.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
  }

 getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return this.state.postings.filter(postings => regex.test(postings.postingTitle));
  }

    onChange = (event, { newValue, method }) => {
      this.setState({
        value: newValue
      });
    };

    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: this.getSuggestions(value)
      });
    };

    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };



    render() {
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: "Type 'c'",
        value,
        onChange: this.onChange
      };

      if(this.state.postings[0] == null) {
        return(<div>Loading</div>)
      }
      else{
        return (
          <div>
            <br/>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps} />

              {this.state.postings.map(posting => {
                return (
                  <p>{posting.postingTitle}</p>
                )
              })}
          </div>
        )
      }
    }
}


export default Search;
