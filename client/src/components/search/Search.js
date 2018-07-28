import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './search.css';
import Autosuggest from 'react-autosuggest';
import Posts from '../posts/Posts'

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
    // this.testArray = [];
  }

  handleClick() {
    console.log("redirecting...");
    console.log(this.props.postingId);

    window.location.replace("/posts/" + this.props.postingId);
    // <Link to={"/posts/" + this.props.post}><Button>More Details</Button></Link>;
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


class Search extends Component {
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
         // console.log(suggestion);
         window.location.replace("/posts/" + suggestion.id);
       }
   };

    handleSubmit(event) {
      event.preventDefault();

      let target = event.target;

      let value = target.childNodes[0].childNodes[0].value;

      // console.log(value)

      // console.log(this.state.suggestions[0].id);
      sessionStorage.setItem('itemDisplay', JSON.stringify(this.state.suggestions));
      console.log(JSON.parse(sessionStorage.getItem('itemDisplay')));

      this.setState({ 
        toRedirect: true
      })

    }

    render() {
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: "Search",
        value,
        onChange: this.onChange
      };

      if(this.state.toRedirect) {
        return(
          <BrowserRouter>
            <div>
              <Switch>
                <Route exact path="/" render={(props) => ( <Posts searchResults={this.state.suggestions}/> )} />
              </Switch>
            </div>
          </BrowserRouter>
          // <Router>
          //   <Redirect to="/posts/" />
          // <Router>
          // <Route path='/posts' />
          // <Route path="/posts" render={() => <Posts someProp={100}/>}/>
        )
      }

      if(this.state.postings[0] == null) {
        return(<div>Loading</div>)
      }
      else{
        return (
          <div>
            <br/>
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

export default Search;
