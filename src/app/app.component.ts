// import { Component } from '@angular/core';
// import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc'; // Add

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'AgoraDemo';
//   localStream: Stream // Add
//   remoteCalls: any = []; // Add
//   // Add
//   constructor(
//     private agoraService: AngularAgoraRtcService
//   ) {
//     this.agoraService.createClient();
//   }

//   // Add
//   startCall() {
//     this.agoraService.client.join(null, '12345', null, (uid) => {
//       this.localStream = this.agoraService.createStream(uid, true, null, null, true, false);
//       this.localStream.setVideoProfile('720p_3');
//       this.subscribeToStreams();
//     });
//   }

//   private subscribeToStreams() {
//     this.localStream.on("accessAllowed", () => {
//       console.log("accessAllowed");
//     });
//     // The user has denied access to the camera and mic.
//     this.localStream.on("accessDenied", () => {
//       console.log("accessDenied");
//     });

//     this.localStream.init(() => {
//       console.log("getUserMedia successfully");
//       this.localStream.play('agora_local');
//       this.agoraService.client.publish(this.localStream, function (err) {
//         console.log("Publish local stream error: " + err);
//       });
//       this.agoraService.client.on('stream-published', function (evt) {
//         console.log("Publish local stream successfully");
//       });
//     }, function (err) {
//       console.log("getUserMedia failed", err);
//     });

//     // Add
//     this.agoraService.client.on('error', (err) => {
//       console.log("Got error msg:", err.reason);
//       if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
//         this.agoraService.client.renewChannelKey("", () => {
//           console.log("Renew channel key successfully");
//         }, (err) => {
//           console.log("Renew channel key failed: ", err);
//         });
//       }
//     });

//     // Add
//     this.agoraService.client.on('stream-added', (evt) => {
//       const stream = evt.stream;
//       this.agoraService.client.subscribe(stream, (err) => {
//         console.log("Subscribe stream failed", err);
//       });
//     });

//     // Add
//     this.agoraService.client.on('stream-subscribed', (evt) => {
//       const stream = evt.stream;
//       if (!this.remoteCalls.includes(`agora_remote${stream.getId()}`)) this.remoteCalls.push(`agora_remote${stream.getId()}`);
//       setTimeout(() => stream.play(`agora_remote${stream.getId()}`), 2000);
//     });

//     // Add
//     this.agoraService.client.on('stream-removed', (evt) => {
//       const stream = evt.stream;
//       stream.stop();
//       this.remoteCalls = this.remoteCalls.filter(call => call !== `#agora_remote${stream.getId()}`);
//       console.log(`Remote stream is removed ${stream.getId()}`);
//     });

//     // Add
//     this.agoraService.client.on('peer-leave', (evt) => {
//       const stream = evt.stream;
//       if (stream) {
//         stream.stop();
//         this.remoteCalls = this.remoteCalls.filter(call => call === `#agora_remote${stream.getId()}`);
//         console.log(`${evt.uid} left from this channel`);
//       }
//     });
//   }
// }
import { Component, ElementRef, OnInit, Renderer2, ViewChild,OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy {
    @ViewChild('video', { static: true }) videoElement: ElementRef;
    @ViewChild('canvas', { static: true }) canvas: ElementRef;

    videoWidth = 0;
    videoHeight = 0;
    constraints = {
        video: {
            facingMode: "environment",
            width: { ideal: 4096 },
            height: { ideal: 2160 }
        }
    };

    constructor(private renderer: Renderer2,private route:Router) {}

    ngOnInit() {
    }

    startCamera() {
        if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);

        } else {
            alert('Sorry, camera not available.');
        }
    }

    attachVideo(stream) {
        // this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
        this.videoElement.nativeElement.srcObject=stream;
        this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
            this.videoHeight = this.videoElement.nativeElement.videoHeight;
            this.videoWidth = this.videoElement.nativeElement.videoWidth;
        });

    }

    capture() {
        this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
        this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
        this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
        this.videoElement.nativeElement.srcObject.getVideoTracks().forEach(track => track.stop());
        this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', null);

    }

    handleError(error) {
        console.log('Error: ', error);
    }

    ngOnDestroy()
    {

    }
}
