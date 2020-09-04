import * as io from 'socket.io-client';
import{Injectable} from '@angular/core';
import{Observable,Subject} from 'rxjs';
import{tap,take} from 'rxjs/operators';
import {Router} from '@angular/router'
@Injectable({providedIn:'root'})
export class ChatService {
    private url = 'https://localhost:3000';
    private socket;
    constructor(private router:Router) {

        this.socket = io(this.url);
    }

    public setUser(user:any)
    {
        this.socket.emit("set_user",user,(data)=>{
            console.log(data);
            if(data)
            {
                alert(user.username+" already exists,try another name");
            }
            else
            {
                this.router.navigate(['chat',user.username]);
            }
        });
    }

    public welcomeUser()
    {
         return Observable.create(observe=>{
            this.socket.on('welcomeUser',user=>{
            observe.next(user);
            })
        })
    }

    public usersjoined()
    {
         return Observable.create(observe=>{
            this.socket.on('Userjoined',user=>{
            observe.next(user);
            })
        })
    }

    public sendMsg(message:string)
    {
        this.socket.emit("sendmessage",message);
    }

    public getMessage()
    {
         return Observable.create(observe=>{
            this.socket.on('getmessage',message=>{
            observe.next(message);
            })
        })
    }       
}
