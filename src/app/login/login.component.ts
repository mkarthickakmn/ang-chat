import { Component,ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import {ChatService} from '../chat.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private chat:ChatService) { }
  @ViewChild('f', { static: false }) login: NgForm;
  user="";
  no="";
  ngOnInit(): void {
  }

  onSubmit()
  {
  	console.log(this.login.value);
    this.chat.setUser(this.login.value);
    // this.router.navigate(['chat',this.login.value.username]);
  }

}
