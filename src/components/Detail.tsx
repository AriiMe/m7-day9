import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

interface State {
  info: object;
  topTracks: object[];
  albumTracks: object[];
}

class Detail extends Component<RouteComponentProps, State> {
  state = {
    info: {
      title: "string",
      release_date: "string",
      rank: 0,
      explicit_lyrics: false,
      duration: 0,
      artist: {
        name: "string",
        picture_xl: "string",
        id: 0,
      },
      album: {
        cover_xl: "string",
        title: "string",
        release_date: "string",
        id: 0,
      },
    },
    topTracks: [],
    albumTracks: [
      {
        title: "",
        duration: 0,
        id: 0,
      },
    ],
  };

  componentDidMount = async () => {
    await this.fetchSong();
    this.fetchTopSongs();
    this.fetchAlbum();
  };

  fetchSong = async () => {
    try {
      let params: { id?: number } = this.props.match.params;
      let response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/track/${params.id}`,
        {
          headers: {
            "x-rapidapi-key":
              "f6abc76e86msh0c55a0862923be9p160c62jsnbd2eafb35dfd",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      );
      let parsedResp = await response.json();

      this.setState({ info: parsedResp });
      console.log(parsedResp);
    } catch (error) {
      console.log(error);
    }
  };

  fetchTopSongs = async () => {
    try {
      let response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/artist/${this.state.info.artist.id}/top?limit=10`,
        {
          headers: {
            "x-rapidapi-key":
              "f6abc76e86msh0c55a0862923be9p160c62jsnbd2eafb35dfd",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      );
      let parsedResp = await response.json();

      this.setState({ topTracks: parsedResp.data });
      console.log(parsedResp);
    } catch (error) {
      console.log(error);
    }
  };

  fetchAlbum = async () => {
    try {
      let response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/album/${this.state.info.album.id}/tracks`,
        {
          headers: {
            "x-rapidapi-key":
              "f6abc76e86msh0c55a0862923be9p160c62jsnbd2eafb35dfd",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      );
      let parsedResp = await response.json();

      this.setState({ albumTracks: parsedResp.data });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container id="detail-page" className="mt-5" >
         
        <Row>
            
        <Col xs={12} id="artistCol">
            <Row>
              <Col xs={12} className="d-flex flex-column align-items-center">
                <img
                  alt="artist"
                  style={{borderRadius: "10%"}}
                  className="img-fluid albumImg"
                  src={this.state.info.album.cover_xl}
                />
                 <Col xs={12} id="mainCol" className="d-flex justify-content-center">
            <Row>
              <Col xs={12}>
                <h2 style={{color: "white"}}>{this.state.info.title}</h2>
                <h4 style={{color: "white"}}>{this.state.info.album.title} By {this.state.info.artist.name}</h4>
                <h5 style={{color: "white"}}>
                  Ranked: {this.state.info.rank} • Released:{" "}
                  {this.state.info.release_date}{" "}
                  {this.state.info.explicit_lyrics && "• EXPLICIT"}
                </h5>
              </Col>
            </Row>
          </Col>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h6 style={{color: "white"}}>Tracklist:</h6>
                <ListGroup variant="flush" id="tracklistRight">
                  {this.state.albumTracks.length > 0 &&
                    this.state.albumTracks.map((track, index) => (
                      <ListGroup.Item
                      action variant="dark"
                        key={index}
                        className="trackListing d-flex justify-content-between"
                      >
                        <span className="trackName">{track.title}</span>
                        <span className="trackLength">{Math.floor(track.duration / 60)}</span>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;