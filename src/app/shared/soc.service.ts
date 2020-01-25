import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class SocService {

    soc;

    getSocialLinks() {
        return this.soc = [
            {
                link: 'https://instagram.com/guzel_akmaeva?igshid=8lr8riubfq9r',
                icon: 'inst.svg'
            },
            {
                link: 'https://www.facebook.com/profile.php?id=100046001351260',
                icon: 'fb.svg'
            },
            {
                link: 'whatsapp://+79178847912',
                icon: 'whatsapp.svg'
            },
            {
                link: 'https://vk.com/fleurdelyse',
                icon: 'vk.svg'
            }
        ];
    }
}
