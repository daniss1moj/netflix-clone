export interface Genre {
	id: number;
	name: string;
}

export interface Movie {
	title: string;
	backdrop_path: string;
	meadia_type?: string;
	release_date?: string;
	first_air_date: string;
	genre_ids: number[];
	id: number;
	name: string;
	origin_country: string[];
	origin_language: string;
	origin_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	vote_average: number;
	vote_count: number;
}

export interface Element {
	type: 'Bloopers' | 'Featurette' | 'Behind the Scenes' | 'Clip' | 'Trailer' | 'Teaser';
}
