export interface MovieRating {
  Source: string
  Value: string
}

export interface Movie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: MovieRating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

export interface MovieSearchResult {
  imdbID: string
  Title: string
  Year: string
  Type: string
  Poster: string
}

export interface MovieSearchResponse {
  Search: MovieSearchResult[]
  totalResults: string
  Response: 'True' | 'False'
  Error?: string
}
