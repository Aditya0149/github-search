import { Component, Input } from '@angular/core';
import { GitRepo } from '../../interfaces/git-repo';

@Component({
  selector: 'app-git-repo-details',
  templateUrl: './git-repo-details.component.html',
  styleUrls: ['./git-repo-details.component.css']
})
export class GitRepoDetailsComponent {
  @Input("gitRepos")
  public gitRepos:GitRepo[];
  //loader
  @Input("loader")
  loader: boolean;
  // for pagination
  public pageSize: number = 5;
  public page: number = 1;
  
  constructor() { }


}
