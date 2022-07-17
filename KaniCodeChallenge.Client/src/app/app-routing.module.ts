import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LeaderboardComponent } from './Components/leaderboard/leaderboard.component';
import { RecentComponent } from './Components/recent/recent.component';
import { UploadComponent } from './Components/upload/upload.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'recent', component: RecentComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
