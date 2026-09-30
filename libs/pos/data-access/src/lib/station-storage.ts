const STATION_KEY = 'station';

/*
 * The till station number is device configuration, not a credential: it has to
 * survive the sessionStorage.clear() that runs on every login and logout, so it
 * is kept in localStorage. These helpers are the only place that touches it.
 */

/** The station number configured on this till, or null when none is set. */
export function getStationNumber(): string | null {
  return window.localStorage.getItem(STATION_KEY);
}

export function setStationNumber(stationNumber: string | number): void {
  window.localStorage.setItem(STATION_KEY, String(stationNumber));
}
