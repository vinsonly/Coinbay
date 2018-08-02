import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Posts from '../posts/Posts';
import './search.css';
import Autosuggest from 'react-autosuggest';


function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
  return suggestion.postingTitle;
}

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.postingTitle}`;

  console.log(suggestion.images);

  return (
    <span>
        <ListSpan text={suggestion.postingTitle} postingId={suggestion.id} postingImage={suggestion.images}/>
    </span>
  );
}

class ListSpanInner extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    // this.testArray = [];

    console.log(props);
  }

  handleClick() {
    console.log("redirecting...");
    console.log(this.props.postingId);

    this.props.history.push("/posts/" + this.props.postingId);

  }

  //if array contains == 1, then open straight to page

  render() {
    // testArray.push(this.props.postingId);

    // console.log(testArray);
    return(
      <div className="searchElement" onClick={this.handleClick}>
        <img className='imgStyling' src={this.props.postingImage}></img>
        <span className="searchText">{this.props.text}</span>
      </div>
    )
  }
}

const ListSpan = withRouter(ListSpanInner);


class SearchInner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            postings: [],
            toRedirect: false
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
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('\\b' + escapedValue, 'i');

    return this.state.postings.filter(posting => regex.test(posting.postingTitle));
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

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) =>{
      //Here you do whatever you want with the values

      if (method == 'enter'){
        // this.props.history.push(`/posts/ + ${suggestion.id}`);
        window.location.replace("/posts/" + suggestion.id);
      }

      // this.props.history.push(`/posts/ + ${suggestion.id}`);
      // can be refactored with react router but need to also refactor handleSubmit
  };

  handleSubmit(event) {
    event.preventDefault();

    let target = event.target;

    let value = target.childNodes[0].childNodes[0].value;

    console.log(this.state);

    // sessionStorage.setItem('itemDisplay', JSON.stringify(this.state.suggestions));

    console.log(this.props);
      this.props.handleRouteCallback("/posts", this.state.suggestions);

  }

    render() {
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: "Search",
        value,
        onChange: this.onChange
      };

      if(this.state.toRedirect) {

        console.log('redirecting');

        console.log(this.state);
        return(
          // <Redirect to="/posts" />
          <Route path="/posts/" render={(props) => ( <Posts searchResults={this.state.suggestions}/> )} />
        )
      }

      if(this.state.postings[0] == null) {
        return(<div>Loading</div>)
      }
      else{
        return (
          <div>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              onSuggestionSelected={this.onSuggestionSelected}
              inputProps={inputProps} />
            </form>
          </div>
        )
      }
    }
}

const Search = withRouter(SearchInner);

export default Search;
