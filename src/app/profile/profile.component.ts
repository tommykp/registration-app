import { Component, OnInit } from '@angular/core';
import { MessageService } from '../messages/message.service';
import { Profile } from './profile';
import { ProfileService } from './profile.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

	private static readonly USERNAME_PATTERN = "^[a-zA-Z0-9]{5,}$";
	private static readonly PASSWORD_PATTERN = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$";

	isSuccess: boolean;
	createdProfile: Profile;
	private username: string = "";
	private password: string = "";

	constructor(public messageService: MessageService, private profileService: ProfileService) { }

	onClick(): void {

		if (!this.checkUsername(this.username) && !this.checkPassword(this.password)) {
			this.messageService.add('Username shall contain at least 5 alpha-numeric characters. Password shall be at least 8 characters long and contain 1 number, 1 uppercase, 1 lowercase.');
			this.isSuccess = false;
		}
		else if (!this.checkUsername(this.username)) {
			this.messageService.add('Username shall contain at least 5 alpha-numeric characters.');
			this.isSuccess = false;
		}
		else if (!this.checkPassword(this.password)) {
			this.messageService.add('Password shall be at least 8 characters long and contain 1 number, 1 uppercase, 1 lowercase.');
			this.isSuccess = false;
		}
		else {
			this.createProfile({ username: this.username, password: this.password });
			this.username = "";
			this.password = "";
		}

	}

	public createProfile(profile: Profile): void {
		this.profileService.createProfile(profile).subscribe(
			data => {
				this.createdProfile = data;
				this.messageService.add('User profile created');
				this.isSuccess = true;
			},
			err => {
				if (err.status === 409) {
					this.messageService.add('Username already exists');
				} else {
					this.messageService.add('Unexpected server error');
				}
				this.isSuccess = false;
			});
	}

	private checkUsername(username: string) {
		return username.match(ProfileComponent.USERNAME_PATTERN);
	}

	private checkPassword(password: string) {
		return password.match(ProfileComponent.PASSWORD_PATTERN);
	}

}
