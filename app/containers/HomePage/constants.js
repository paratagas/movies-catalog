export const FETCH_CRITERIA_POPULAR = 'popular';
export const FETCH_CRITERIA_TOP_RATED = 'top_rated';
export const FETCH_CRITERIA_UPCOMING = 'upcoming';
export const FETCH_CRITERIA_NOW_PLAYING = 'now_playing';

export const FETCH_CRITERIA_DEFAULT = FETCH_CRITERIA_POPULAR;

export const PAGE_BUTTONS = [
  { text: 'Popular', criteria: FETCH_CRITERIA_POPULAR },
  { text: 'Top rated', criteria: FETCH_CRITERIA_TOP_RATED },
  { text: 'Upcoming', criteria: FETCH_CRITERIA_UPCOMING },
  { text: 'Now playing', criteria: FETCH_CRITERIA_NOW_PLAYING },
];
