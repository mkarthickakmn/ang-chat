import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { UsersComponent } from './users/users.component';
import { ChatService } from './chat.service';
import { environment } from 'src/environments/environment';
import { NgxAgoraModule } from 'ngx-agora';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatroomComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxAgoraModule.forRoot({ AppID: environment.agora.appId })  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
