import React, { Component, FormEvent } from "react";
import { Form, Button } from "react-bootstrap";

interface Props {
    search: (input: string) => void;
  }
  
  interface State {
    input: string;
  }
  
  class Search extends Component<Props, State> {
    state = {
      input: "",
    };
  
    handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      this.props.search(this.state.input);
      this.setState({ input: "" });
    };
  
    render() {
      return (
        <Form onSubmit={(e) => this.handleSubmit(e)} className="w-100">
          <Form.Group className="d-flex">
            <Form.Control
              type="text"
              placeholder="( ͡° ͜ʖ ͡°)╭∩╮"
              value={this.state.input}
              onChange={(e) => this.setState({ input: e.currentTarget.value })}
            />
          </Form.Group>
        </Form>
      );
    }
  }
  
  export default Search;