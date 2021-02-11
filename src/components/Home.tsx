/** @format */

import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Result, SearchResponse } from "../types/interface";
import Search from "./Search";

interface HomeState {
  query: string;
  results: Result[];
}

export default class Home extends Component<{}, HomeState> {
  state: HomeState = {
    query: "",
    results: [],
  };

  getInput = (query: string) => {
    this.setState({ query: query });
    this.fetchData(query);
  };

  fetchData = async (query: string) => {
    try {
      let response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`,
        {
          headers: {
            "x-rapidapi-key":
              "f6abc76e86msh0c55a0862923be9p160c62jsnbd2eafb35dfd",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      );
      let parsedResp = (await response.json()) as SearchResponse;
      console.log(parsedResp);

      this.setState({ results: parsedResp.data });
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
                      <Card  style={{ width: "18rem", border: "none", display: "flex", justifyContent: "center", textAlign:"center", backgroundColor: "transparent", color: "white" }}>
                    <Card.Img variant="top" style={{borderRadius: "10%"}} src={result.album.cover_medium} />
                    <Card.Body>
                      <Card.Title>{result.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Rank: {" "} {result.rank}</Card.Subtitle>
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
