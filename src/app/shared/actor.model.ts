export interface Actor {
  birthday?: null | string;
  known_for_department?: string;
  deathday?: null | string;
  id?: number;
  name?: string;
  also_known_as?: String[];
  gender?: number;
  biography?: string;
  popularity?: number;
  place_of_birth?: string | null;
  profile_path?: string | null;
  adult?: boolean;
  imdb_id?: string;
  homepage?: null | string;
}
