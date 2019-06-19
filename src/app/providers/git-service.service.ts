import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GitRepo } from '../interfaces/git-repo';
import { GitUser } from '../interfaces/git-user';

const getUsersUrl = "https://api.github.com/search/users?q=";
const getReposUrl = "https://api.github.com/users/";

@Injectable({
  providedIn: 'root'
})
export class GitServiceService {
  public errorMessage: string;
  constructor(private http: HttpClient) { }
  // get git user by search key
  public getUsers(key: string): Observable<any> {
    return this.http.get<any>(`${getUsersUrl}${key}`).pipe(
      catchError(this.handleError<any>('search user'))
    );
  }
  // get all repositories of selected user
  public getUserRepos(username): Observable<GitRepo[]> {
    return this.http.get<GitRepo[]>(`${getReposUrl}${username}/repos`).pipe(
      catchError(this.handleError<any>('get repos'))
    );
  }
  public sortUsers(gitUsers: GitUser[],sortType: string) {
    let sortFunction: (a:GitUser, b:GitUser) => number;
    let sortedUsers: GitUser[];
    switch (sortType) {
      case "Name (A - Z)":
        sortFunction = (a: any, b: any) => {
          if (a.login < b.login) return -1;
          if (a.login > b.login) return 1;
          return 0;
        }
        break;
      case "Name (Z - A)":
        sortFunction = (a: any, b: any) => {
          if (a.login > b.login) return -1;
          if (a.login < b.login) return 1;
          return 0;
        }
        break;
      case "Rank ↑":
        sortFunction = (a: any, b: any) => b.score - a.score;
        break;
      case "Rank ↓":
        sortFunction = (a: any, b: any) => a.score - b.score;
        break;
    }
    sortedUsers = gitUsers.sort(sortFunction);
    return sortedUsers;
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.errorMessage = `${operation} failed : ${error.message}`;
      return of(result as T);
    };
  }
}
