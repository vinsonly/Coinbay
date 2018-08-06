import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './dropdown.css';

class FilterDropdown extends React.Component {
  state = {
    anchorEl: null,
    filterMethod: "Filter By: Date ( Most Recent )"
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  buttonName(name) {
    if (name === "Date") {
      this.setState(
        (prevState,props)=>{
        return {filterMethod: "Filter By: Date ( Most Recent )"};
        }
      );
    } else if (name === "Price-H") {
      this.setState(
        (prevState,props)=>{
        return {filterMethod: "Sort By: Price ( High to Low )"};
        }
      );
    } else if(name === "Price-L") {
      this.setState(
        (prevState,props)=>{
        return {filterMethod: "Sort By: Price ( Low to High )"};
        }
      );
    } else {
      this.setState(
        (prevState,props)=>{
        return {filterMethod: "Sort By: Title ( A-Z )"};
        }
      );
    }
  }
  fitlerMethodState(selector) {
    this.setState(
      (prevState,props)=>{
      return {filterMethod: "price"};
      }
    );
  }
  onClickAction(filter) {
    this.handleClose();
    this.buttonName(filter);
    this.props.changeFilterState(filter);
  }
  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          className="dropdown-button"
        >
          {this.state.filterMethod}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => this.onClickAction("Date")}>Date ( Most Recent )</MenuItem>
          <MenuItem onClick={() => this.onClickAction("Price-L")}>Price ( Low to High )</MenuItem>
          <MenuItem onClick={() => this.onClickAction("Price-H")}>Price ( High to Low )</MenuItem>
          <MenuItem onClick={() => this.onClickAction("Title-A")}>Title ( Alphabetical A-Z )</MenuItem>
          <MenuItem onClick={() => this.onClickAction("Title-Z")}>Title ( Alphabetical Z-A )</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default FilterDropdown;
