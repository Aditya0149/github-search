import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const getUsersUrl = "https://api.github.com/search/users?q=";
@Injectable({
  providedIn: 'root'
})
export class GitServiceService {

  constructor(private http:HttpClient) { }
  public getUsers(key:string):Observable<any> {
    return this.http.get<any>(`${getUsersUrl}${key}`).pipe(
      catchError(this.handleError<any>('search user'))
    );;
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      window.alert(`${operation} failed : ${error.message}`);
      return of(result as T);
    };
  }
}
