import { Component, OnInit } from '@angular/core';
import { GitServiceService } from './providers/git-service.service';
import { GitUser } from './interfaces/git-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public gitUserSearchKey: string;
  public gitUsers: GitUser[];
  public totalCount: string;
  public sortOptions: string[];
  private sortType:string;
  //for pagianation
  public page: number = 1;
  public pageSize: number = 3;
  //loader
  public loader: boolean = false;
  constructor(public gitServiceService: GitServiceService) { }
  ngOnInit() {
    this.sortOptions = ["Name (A - Z)", "Name (Z - A)", "Rank ↑", "Rank ↓"];
  }
  public searchGitUser(key: string): any {
    if (!key) return;
    this.loader = true;
    this.gitServiceService.getUsers(key).subscribe(gitUsers => {
      this.loader = false;
      if (!gitUsers) return;
      //get users array and filter again with search key
      this.gitUsers = gitUsers.items;
      //if sorting select box is already selected an option.
      if (this.sortType) this.sortUsers(this.sortType);
      // get total count to display on the page
      this.totalCount = gitUsers.total_count;
    });
  }
  public sortUsers(sortType: string) {
    //set the sorttype
    this.sortType = sortType;
    //if user tries to sort before searching.
    if (!this.gitUsers || !sortType) return;
    this.gitUsers = this.gitServiceService.sortUsers(this.gitUsers,sortType);
  }
}
