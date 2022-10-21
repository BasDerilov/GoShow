import { Company } from './company.model';
import { Genre } from './genre.mode';
import { Language } from './language.model';

export interface Movie {
  adult?: boolean;
  backdrop_path?: string | null;
  budget?: number;
  genres?: Genre[];
  id?: number;
  name?: string;
  homepage?: string;
  original_language?: string;
  original_title?: string;
  overview?: string | null;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: Company[];
  production_countries?: Movie[];
  release_date?: string; //Date format
  revenue?: number;
  runtime?: number | null;
  spoken_languages?: Language[];
  status?: string;
  tagline?: string | null;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  rating?: number;
}
