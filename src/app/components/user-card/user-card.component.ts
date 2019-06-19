import { Component, OnInit, Input } from '@angular/core';
import { GitServiceService } from '../../providers/git-service.service';
import { GitUser } from '../../interfaces/git-user';
import { GitRepo } from '../../interfaces/git-repo';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input("gitUser")
  public gitUser: GitUser;
  public gitRepos: GitRepo[];
  //toggle details table
  public showGitRepos: boolean = false;
  //loader
  public loader = false;
  constructor(private gitServiceService: GitServiceService) { }

  public showUserRepos(username: string) {
    // if component already fetched the details dont give server call.
    if (this.gitRepos) this.showGitRepos = !this.showGitRepos;
    else { // call the api only on first click
      this.loader = true;
      this.gitServiceService.getUserRepos(username).subscribe(data => {
        this.gitRepos = data;
        this.showGitRepos = true;
        this.loader = false;
      });
    }
  }
}
