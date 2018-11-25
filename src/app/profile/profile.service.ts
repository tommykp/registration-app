import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Profile } from './profile';


@Injectable({
	providedIn: 'root'
})

export class ProfileService {

	private static readonly profileUrl = `${environment.apiUrl}/profiles`;

	constructor(private http: HttpClient) { }

	public createProfile(profile: Profile): Observable<Profile> {
		return this.http.post<Profile>(ProfileService.profileUrl, profile);
	}

}
