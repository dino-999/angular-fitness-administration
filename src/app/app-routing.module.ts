import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ChatRoomComponent } from './chat/chat-room/chat-room.component';
import { ChatComponent } from './chat/chat.component';
import { NewsComponent } from './news/news.component';
import { ProfileComponent } from './profile/profile.component';
import { TrainingDatesComponent } from './training-dates/training-dates.component';

const routes: Routes = [
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  { path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
  { path: 'training-dates', component: TrainingDatesComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'chat/:id', component: ChatRoomComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
