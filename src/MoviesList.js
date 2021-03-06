// Component is just a part of the react object
import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";

import Movie from "./Movie";

/*
	Map takes an array modifies the data then outputs a new array first praramter of map is going to be a arrow function
 */
class MoviesList extends Component {
  // Set default state of movies to a blank array
  // If the data doesnt come in its just a blank array
  state = {
    movies: []
  };

  // Fetch data from the API
  async componentDidMount() {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=82256ccb86ef4724263776404ecfb09c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
      );
      const movies = await res.json();

      this.setState({
        movies: movies.results
      });
    } catch (e) {
      console.log("error", e);
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <MovieGrid>
        {movies.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    );
  }
}

export default MoviesList;

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 1rem;
`;
