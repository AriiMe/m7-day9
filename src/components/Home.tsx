/** @format */

import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Result, SearchResponse } from "../types/interface";
import Search from "./Search";
import Detail from './Detail'
import { withRouter, RouteComponentProps } from "react-router-dom";

interface HomeState {
  input: string;
  results: Result[];
}


export default class Home extends Component< RouteComponentProps, HomeState> {
  state: HomeState = {
    input: "",
    results: [],
  };

  getInput = (input: string) => {
    this.setState({ input: input });
    this.fetchData(input);
  };

  fetchData = async (input: string) => {
    try {
      let response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/search?q=${input}`,
        {
          headers: {
            "x-rapidapi-key":
              "f6abc76e86msh0c55a0862923be9p160c62jsnbd2eafb35dfd",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      );
      let Resp = (await response.json()) as SearchResponse;
      console.log(Resp);

      this.setState({ results: Resp.data });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log(this.state);
    return (
      <Container>
        <Row className="mt-5">
          <Col className="d-flex justify-content-center" xs={12}>
            <Search search={this.getInput} />
          </Col>
        </Row>
        <Row className="mb-2 mt-5">
          {this.state.results.length > 0 &&
            this.state.results.map((result, i) => {
              return (
                <Col xs={12} md={5} lg={3} className="mx-4">
                  <Card
                  onClick={() => this.props.history.push("/song/" + result.id)}
                    style={{
                      width: "18rem",
                      border: "none",
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      backgroundColor: "transparent",
                      color: "white",
                    }}
                  >
                    <Card.Img
                      id="image"
                      variant="top"
                      //   style={{borderRadius: "10%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 20px 20px 0 rgba(0, 0, 0, 0.19)" }}
                      src={result.album.cover_medium}
                    />
                    <Card.Body>
                      <Card.Title id="title">{result.title}</Card.Title>
                      <Card.Subtitle id="subTitle" className="mb-2 text-muted">
                        Rank: {result.rank}
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    );
  }
}
