import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class FilterDropdown extends React.Component {
  state = {
    anchorEl: null,
    filterMethod: "Filter By"
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
        return {filterMethod: "Filter By: Date"};
        }
      );
    } else if (name === "Price-H") {
      this.setState(
        (prevState,props)=>{
        return {filterMethod: "Sort By: Price"};
        }
      );
    } else if(name === "Price-L") {
      this.setState(
        (prevState,props)=>{
        return {filterMethod: "Sort By: Price"};
        }
      );
    } else {
      this.setState(
        (prevState,props)=>{
        return {filterMethod: "Sort By: Title A-Z"};
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

    let icon
    switch(this.state.filterMethod) {
      case "Price-H":
        icon = (<p>blah</p>)
      case "Price-L":
        icon = (<p>Down</p>)
    }

    console.log(icon);

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {this.state.filterMethod} {icon}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => this.onClickAction("Date")}>Date (Most Recent)</MenuItem>
          <MenuItem onClick={() => this.onClickAction("Price-H")}>Price (High to Low)</MenuItem>
          <MenuItem onClick={() => this.onClickAction("Price-L")}>Price (Low to High)</MenuItem>
          <MenuItem onClick={() => this.onClickAction("Title")}>Title (Alphabetical)</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default FilterDropdown;
