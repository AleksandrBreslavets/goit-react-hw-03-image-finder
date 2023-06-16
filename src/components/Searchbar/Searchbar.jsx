import { Component } from "react";
import { Searchform, Searchinput, Button } from "./Searchbar.styled";
import { BsSearch } from 'react-icons/bs';
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
            <Searchform onSubmit={this.onFormSubmit}>
                <Button type="submit">
                <BsSearch/>
                </Button>
                <Searchinput
                onChange={this.onInputChange}
                value={searchValue}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                />
            </Searchform>
            </header>
        )
    }
}