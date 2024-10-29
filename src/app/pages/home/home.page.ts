import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { User } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  email: any = '';
  funcao: any = '';

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.email = localStorage.getItem("email");
    this.funcao = localStorage.getItem("role");
  }

  updateClub() {
    // if (this.clubCode) {
    //   this.clubService.getClubByCode(this.clubCode).subscribe(
    //     (clubInfo) => {
    //       if (clubInfo) {
    //         const updatedUserData = {
    //           name: this.userInfo.nome,
    //           email: this.userInfo.email,
    //           password: this.userInfo.senha,
    //           role: this.userInfo.role,
    //         };

    //         this.authService.updateUser(updatedUserData).subscribe(
    //           (updatedUser) => {
    //             this.userInfo.club = clubInfo.name;
    //             this.userInfo.clubId = clubInfo.id;
    //             localStorage.setItem('clubId', clubInfo.id);
    //             this.clubCode = '';
    //             console.log('User updated successfully', updatedUser);
    //             this.router.navigate(['/home']);
    //           },
    //           (error) => {
    //             localStorage.setItem('clubId', '0');
    //             console.error('Error updating user', error);
    //           }
    //         );
    //       } else {
    //         console.error('Club not found');
    //       }
    //     },
    //     (error) => {
    //       console.error('Error finding club', error);
    //     }
    //   );
    // } else {
    //   console.error('Club code is required.');
    // }
  }
}
