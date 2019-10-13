import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {FbCreateResponse, Post} from '../admin/shared/interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
    constructor(private http: HttpClient) {}

    create(post: Post): Observable<Post> {
        return this.http.post(`${environment.firebase.databaseURL}/flowers.json`, post)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...post,
                    id: response.name
                };
            }));
    }

    getAll(): Observable<Post[]> {
        return this.http.get(`${environment.firebase.databaseURL}/flowers.json`)
            .pipe(map((response: {[key: string]: any}) => {
                return Object
                    .keys(response)
                    .map(key => ({
                        ...response[key],
                        id: key
                    }));
            }));
    }

    getById(id: string): Observable<Post> {
        return this.http.get<Post>(`${environment.firebase.databaseURL}/flowers/${id}.json`)
            .pipe(map((post: Post) => {
                return {
                    ...post, id
                };
            }));
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.firebase.databaseURL}/flowers/${id}.json`);
    }

    update(post: Post): Observable<Post> {
        return this.http.patch<Post>(`${environment.firebase.databaseURL}/flowers/${post.id}.json`, post);
    }
}
