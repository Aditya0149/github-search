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

  constructor(public gitServiceService:GitServiceService) { }
  ngOnInit() {
    
  }
  public searchGitUser(key:string):any {
    this.gitServiceService.getUsers(key).subscribe( gitUsers => {
      if(!gitUsers) return;
      this.gitUsers = gitUsers.items;
      this.totalCount = gitUsers.total_count;
    });
  }
}
