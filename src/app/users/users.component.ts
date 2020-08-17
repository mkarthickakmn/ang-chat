import { Component, OnInit,Input } from '@angular/core';
import {ChatService} from '../chat.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private chat:ChatService) { }
  users:any=[]
  room:string;
  @Input() self:string;
  ngOnInit(): void {
    this.chat.usersjoined().subscribe(data=>{
      console.log(data);
      this.room=data.roomno;
      this.users=data.users;
    });
        console.log(this.self);
  }


 openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

 closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

}
