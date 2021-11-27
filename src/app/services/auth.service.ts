import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const AUTH_API = 'http://sinfori.com:3080/login';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API, { username: "admin", password: "mini" }, httpOptions).pipe(
      catchError(this.handleError<any>('Unable to create new room')));;;
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      //this.snackBar.open(error.statusText, '', { duration: 2000 });
      return of(result as T);
    };
  }
}
