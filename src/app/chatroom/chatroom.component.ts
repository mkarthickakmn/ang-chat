import { Component, OnInit,AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import {ChatService} from '../chat.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  constructor(private chat:ChatService,private route:ActivatedRoute) { }
  message:string="";
  messages:any=[];
  user:string;
   @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  ngOnInit(): void {
 this.scrollToBottom();
    this.route.params.
    subscribe((params:Params)=>{
      this.user=params['id'];
      console.log(this.user);
    });

    this.chat.usersjoined().subscribe(data=>{
      console.log(data);
    });

  	this.chat.welcomeUser().subscribe(data=>{
  		console.log(data);
      this.messages.push({info:data});
  	});

    this.chat.getMessage().subscribe(data=>{
      console.log(data);
      this.messages.push(data);
    });

  }

  send()
  {
    this.chat.sendMsg(this.message);
    this.message="";
  }

  ngAfterViewChecked() {        
        this.scrollToBottom();        
    } 

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    }

}
