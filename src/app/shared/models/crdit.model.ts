export interface Credit {
  adult?: boolean;
  gender?: number;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string;
  cast_id?: number;
  character?: string;
  credit_id?: string;
  order?: number;
}

export interface CreditCrew {
  id?: number;
  department?: string;
  original_language?: string;
  original_title?: string;
  job?: string;
  overview?: string;
  genre_ids?: number[];
  video?: boolean;
  media_type?: string;
  credit_id?: string;
  poster_path?: string;
  popularity?: number;
  backdrop_path?: string;
  vote_count?: number;
  title?: string;
  adult?: boolean;
  vote_average?: number;
  release_date?: string;
}

export interface CreditCast {
  id?: number;
  original_language?: string;
  episode_count?: number;
  overview?: string;
  origin_country?: string[];
  original_name?: string;
  genre_ids?: number[];
  name?: string;
  media_type?: string;
  poster_path?: string;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  character?: string;
  backdrop_path?: string;
  popularity?: number;
  credit_id?: string;
  title?: string;
  original_title?: string;
}
