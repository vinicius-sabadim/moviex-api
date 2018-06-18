## MovieX Api

This is a project for me to learn more and practice my skills using `Node.js`.

### Endpoints

At the moment the project has two ways to interact: `Rest` and `GraphQL`.

#### Rest

We will use a tool called [HTTPie](https://httpie.org/) to help us to run the api calls.

- `/api/movies`
  
  GET
  ```bash
  http localhost:3000/api/movies
  ```

  POST
  ```bash
  http post localhost:3000/api/movies <<< '{ "title": "It", "genre": "Horror" }'
  ```

- `/api/movies/:id`

  GET
  ```bash
  http localhost:3000/api/movies/1
  ```

  PUT
  ```bash
  http put localhost:3000/api/movies/1 <<< '{ "title": "Friday 13th" }' 
  ```

  DELETE
  ```bash
  http delete localhost:3000/api/movies/1
  ```

#### GraphQL

- Query
  
  Get a single movie.
  ```bash
  query getSingleMovie($id: Int!) {
    movie(id: $id) {
      title
      genre
    }
  }

  { 
    "id": 1
  }
  ```

  Get all movies.
  ```bash
  query getAllMovies {
    movies {
      title
      genre
    }
  }
  ```

  Get all movies using filter.
  ```bash
  query getAllMovies($genre: String) {
    movies(genre: $genre) {
      title
      genre
    }
  }

  {
    "genre": "Horror" 
  }
  ```

- Mutation

  Soon...