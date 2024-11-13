import { ClubService } from './../../../services/club.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements OnInit {

  @Input() clubCod: string | null = null;

  users: any[] = [];

  constructor(private modalController: ModalController,
    private eventService: EventService,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (this.clubCod) {
      console.log(this.clubCod);
      this.userService.getAllUserByClube(this.clubCod).subscribe(
        (response) => {
          console.log(response);
          this.users = response;
        });
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
