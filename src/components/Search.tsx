import React, { Component, FormEvent } from "react";
import { Form, Button } from "react-bootstrap";

interface Props {
    search: (query: string) => void;
  }
  
  interface State {
    query: string;
  }
  
  class Search extends Component<Props, State> {
    state = {
      query: "",
    };
  
    handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      this.props.search(this.state.query);
      this.setState({ query: "" });
    };
  
    render() {
      return (
        <Form onSubmit={(e) => this.handleSubmit(e)} className="w-100">
          <Form.Group className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={this.state.query}
              onChange={(e) => this.setState({ query: e.currentTarget.value })}
            />
          </Form.Group>
        </Form>
      );
    }
  }
  
  export default Search;