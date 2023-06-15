import { Component } from "react";

const INITIAL_STATE = {
  searchValue: '',
};

export class Searchbar extends Component{
    state = {
        ...INITIAL_STATE
    }
    onInputChange = (e) => {
        const { value } = e.target;
        this.setState({ searchValue: value });
    }
    onFormSubmit = (e) => {
        const { searchValue } = this.state;
        const { onSubmit } = this.props;
        e.preventDefault();
        onSubmit(searchValue.trim());
        this.resetForm();
    }
    resetForm = ()=> {
        this.setState({ ...INITIAL_STATE });
    }
    render() {
        const { searchValue } = this.state;
        return (
            <header>
            <form onSubmit={this.onFormSubmit}>
                <button type="submit">
                <span >Search</span>
                </button>
                <input
                onChange={this.onInputChange}
                value={searchValue}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                />
            </form>
            </header>
        )
    }
}