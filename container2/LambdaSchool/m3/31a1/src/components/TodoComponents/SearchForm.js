import React from "react";
import Todo from './Todo.js';
import styled from 'styled-components';

const Form = styled.form`
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: 5%;
`
const Center = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    margin: 0;
    padding: 0;
    border-top: 2px solid #383651;
    border-bottom: 2px solid #383651;
    padding-bottom: 10%;
    background-color: #27474E;
    color: #C45BAA;
`
const Div1 = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const fieldLength = {
    "color": "#383651",
    "fontSize": "1.5rem",
    "width": "100%",
    "margin": "0",
    "padding": "0",
    "backgroundColor": "#C45BAA",
    "color": "#27474E"
}
const SearchDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    padding: 0;
    margin: 0;
    align-items: top;
`

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {                
        };
  }

    render() {
      return (
    <Center>  
        <Div1>
          <Form id="searchForm">
            <SearchDiv>
                    <input
                      id="name"
                      type="text"
                      name="textfield"
                      placeholder="Search"
                      value={this.props.searchTerm}
                      onChange={this.props.changeSearchTerm}
                      style={fieldLength}
              />
              </SearchDiv>
              <ul>
                    {
                      this.props.searchResults.map(
                        todoItem => (
                          <Todo key={todoItem.id} todoItem={todoItem} toggleComplete={this.props.toggleComplete} />
                        )
                      )
            }</ul>
          </Form>
        </Div1>
    </Center>
    
      );
    }

}


export default SearchForm;