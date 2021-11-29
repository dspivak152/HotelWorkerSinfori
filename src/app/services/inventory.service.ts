import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';

const API_BASE_URL = 'http://sinfori.com:3080/api';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  token: string = '';
  scopeId: number = 0

  constructor(private http: HttpClient,
    private tokenStorage: TokenStorageService) { }

  getRoomsOverviewData(): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenStorage.getToken()
    });
    return this.http.get<any>(API_BASE_URL + '/hotels/' + this.tokenStorage.getUser().scope + '/rooms/overview', { headers: reqHeader }).pipe(
      catchError(this.handleError<any>('Error getting the room data')));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
