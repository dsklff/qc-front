import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { IProfile } from '../models/IProfile';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  isLoggedIn: boolean;               // {1}
  public profile: any;

  constructor(private authService: UserService, private profileService: ProfileService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn; // {2}
    this.getProfile();
  }

  logout() {
    this.authService.logout();
  }

  getProfile() {
    this.profileService.list().subscribe(
      // the first argument is a function which runs on success
      data => {
        this.profile = data;
        console.log(this.profile);
      },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading profile')

    );
  }

  updateProfile(profile: IProfile) {
    this.profileService.updateCategory(profile).then(res => {
      console.log(profile.first_name + ' updated');
    });
  }

}
