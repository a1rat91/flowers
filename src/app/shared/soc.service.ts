import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class SocService {

    soc;

    getSocialLinks() {
        return this.soc = [
            {
                link: '#',
                icon: 'inst.svg'
            },
            {
                link: '#',
                icon: 'fb.svg'
            },
            {
                link: '#',
                icon: 'whatsapp.svg'
            },
            {
                link: '#',
                icon: 'vk.svg'
            }
        ];
    }
}