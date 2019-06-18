import { Component, OnInit } from '@angular/core';
import { GitServiceService } from './providers/git-service.service';
import { GitUser } from './interfaces/git-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public gitUserSearchKey:string;
  public gitUsers:GitUser[];
  public totalCount:string;
  public sortOptions:string[];
  //for pagianation
  public page:number = 1;
  public pageSize:number = 3;
  
  constructor(public gitServiceService:GitServiceService) { }
  ngOnInit() {
    this.sortOptions = ["Name (A - Z)","Name (Z - A)","Rank ↑","Rank ↓"]
  }
  public searchGitUser(key:string):any {
    this.gitServiceService.getUsers(key).subscribe( gitUsers => {
      if(!gitUsers) return;
      //get users array
      this.gitUsers = gitUsers.items;
      this.totalCount = gitUsers.total_count;
    });
  }
  public sortUsers(sortType:string) {
    //if user tries to search before searching.
    if (!this.gitUsers) return;
    let sortFunction;
    switch (sortType) {
      case "Name (A - Z)":
          sortFunction = (a:any,b:any) => {
            if (a.login > b.login) return -1;
            if (a.login < b.login) return 1;
            return 0;
          }
          break;
      case "Name (Z - A)":
          sortFunction = (a:any,b:any) => {
            if (a.login < b.login) return -1;
            if (a.login > b.login) return 1;
            return 0;
          }
          break;
      case "Rank ↑":
          sortFunction = (a:any,b:any) => b.score - a.score;
          break;    
      case "Rank ↓":
          sortFunction = (a:any,b:any) => a.score - b.score;
          break;
       default:   
         sortFunction = (a:any,b:any) => a.score - b.score;
    } 
    // get new referance for getUsers array - to detect the change.
    this.gitUsers = Object.assign(this.gitUsers.sort( sortFunction ));
  }
}
