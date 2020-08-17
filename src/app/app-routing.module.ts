import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ChatroomComponent} from './chatroom/chatroom.component';
const appRoutes:Routes=[{path:'',redirectTo:'login',pathMatch:'full'},
						{path:'login',component:LoginComponent},
						{path:'chat/:id',component:ChatroomComponent}
						// {path:'**',component:PagenotfoundComponent}
						]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
