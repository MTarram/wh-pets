import { environment } from "../../../environments/environment";

export const END_POINTS = {
  LOGIN: environment.apiUrl + '/login',
  USERS: environment.apiUrl + '/users',
  ATTRACTIONS: environment.apiUrl + '/attractions',
  ATTRACTIONS_AUTH: environment.apiUrl + '/auth/attractions',
  PET_SALES: environment.apiUrl + '/pets',
};
