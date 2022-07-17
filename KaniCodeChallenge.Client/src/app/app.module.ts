import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { UploadComponent } from './Components/upload/upload.component';
import { RecentComponent } from './Components/recent/recent.component';
import { LeaderboardComponent } from './Components/leaderboard/leaderboard.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageDialogComponent } from './Components/image-dialog/image-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageComponent } from './Components/image/image.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadComponent,
    RecentComponent,
    LeaderboardComponent,
    ImageDialogComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule, MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
