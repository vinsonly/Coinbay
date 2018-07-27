import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Link} from 'react-router-dom';
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

  return (
    <span>
        <ListSpan text={suggestion.postingTitle} postingId={suggestion.id} postingImage={suggestion.images[0]}/>
    </span>
  );
}

class ListSpan extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("redirecting...");
    console.log(this.props.postingId);

    window.location.replace("/posts/" + this.props.postingId);
    // <Link to={"/posts/" + this.props.post}><Button>More Details</Button></Link>;
  }

  render() {
    return(
      <div className="searchElement" onClick={this.handleClick}>
        <img className='imgStyling' src={this.props.postingImage}></img>
        <span className="searchText">{this.props.text}</span>
      </div>
    )
  }
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



    render() {
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: "Search",
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

          </div>
        )
      }
    }
}


export default Search;
