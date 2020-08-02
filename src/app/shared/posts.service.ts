import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class PostsService {
    constructor() {}

    get flowers() {
        return [
            {
                id: '1',
                catalogImg: [
                    'assets/images/pics/catalog-1/catalogImg-1-330.jpg'
                ],
                catalogTransitionImg: [
                    'assets/images/pics/catalog-1/catalogTransitionImg-1-1920.jpg'
                ],
                distortionSliderImg: [
                    'assets/images/pics/catalog-1/distortionSliderImg-1-1-996.jpg',
                    'assets/images/pics/catalog-1/distortionSliderImg-1-2-996.jpg',
                    'assets/images/pics/catalog-1/distortionSliderImg-1-3-996.jpg',
                    'assets/images/pics/catalog-1/distortionSliderImg-1-4-996.jpg',
                    'assets/images/pics/catalog-1/distortionSliderImg-1-5-996.jpg',
                    'assets/images/pics/catalog-1/distortionSliderImg-1-6-996.jpg',
                    'assets/images/pics/catalog-1/distortionSliderImg-1-7-996.jpg',
                    'assets/images/pics/catalog-1/distortionSliderImg-1-8-996.jpg',
                    'assets/images/pics/catalog-1/distortionSliderImg-1-9-996.jpg'
                ],
                distortionSliderMinImg: [
                    'assets/images/pics/catalog-1/distortionSliderMinImg-1-1-123.jpg',
                    'assets/images/pics/catalog-1/distortionSliderMinImg-1-2-123.jpg',
                    'assets/images/pics/catalog-1/distortionSliderMinImg-1-3-123.jpg',
                    'assets/images/pics/catalog-1/distortionSliderMinImg-1-4-123.jpg',
                    'assets/images/pics/catalog-1/distortionSliderMinImg-1-5-123.jpg',
                    'assets/images/pics/catalog-1/distortionSliderMinImg-1-6-123.jpg',
                    'assets/images/pics/catalog-1/distortionSliderMinImg-1-7-123.jpg',
                    'assets/images/pics/catalog-1/distortionSliderMinImg-1-8-123.jpg',
                    'assets/images/pics/catalog-1/distortionSliderMinImg-1-9-123.jpg'
                ],
                text: `У нас есть огромное разноообразие букетов на любое событие. Вы сможете приобрести как нежный
                 букет, так и яркий, а также мужские, круглые, вертикалье, веерообразные, букеты-зонтики, букеты в
                  вегетативной технике и много других экзотических видов.`,
                title: 'Букеты на торжества и мероприятия'
            },
            {
                id: '2',
                catalogImg: [
                    'assets/images/pics/catalog-2/catalogImg-2-330.jpg'
                ],
                catalogTransitionImg: [
                    'assets/images/pics/catalog-2/catalogTransitionImg-2-1920.jpg'
                ],
                distortionSliderImg: [
                    'assets/images/pics/catalog-2/distortionSliderImg-2-1-996.jpg',
                    'assets/images/pics/catalog-2/distortionSliderImg-2-2-996.jpg',
                    'assets/images/pics/catalog-2/distortionSliderImg-2-3-996.jpg',
                    'assets/images/pics/catalog-2/distortionSliderImg-2-4-996.jpg',
                    'assets/images/pics/catalog-2/distortionSliderImg-2-5-996.jpg',
                    'assets/images/pics/catalog-2/distortionSliderImg-2-6-996.jpg',
                    'assets/images/pics/catalog-2/distortionSliderImg-2-7-996.jpg',
                    'assets/images/pics/catalog-2/distortionSliderImg-2-8-996.jpg'
                ],
                distortionSliderMinImg: [
                    'assets/images/pics/catalog-2/distortionSliderMinImg-2-1-123.jpg',
                    'assets/images/pics/catalog-2/distortionSliderMinImg-2-2-123.jpg',
                    'assets/images/pics/catalog-2/distortionSliderMinImg-2-3-123.jpg',
                    'assets/images/pics/catalog-2/distortionSliderMinImg-2-4-123.jpg',
                    'assets/images/pics/catalog-2/distortionSliderMinImg-2-5-123.jpg',
                    'assets/images/pics/catalog-2/distortionSliderMinImg-2-6-123.jpg',
                    'assets/images/pics/catalog-2/distortionSliderMinImg-2-7-123.jpg',
                    'assets/images/pics/catalog-2/distortionSliderMinImg-2-8-123.jpg'
                ],
                text: `Свадьба–самое важное событие в жизни молодожен. Поэтому каждый из будущих супругов хочет, чтобы
                 на торжестве все было идеально. Наша компания превзойдет ваши ожидания по красоте, качеству и лояльному
                  ценнику. Обращаясь к нам, вы можете не переживать за оформление вашей свадьбы.`,
                title: 'Букеты невесты и свадебное оформление'
            },
            {
                id: '3',
                catalogImg: [
                    'assets/images/pics/catalog-3/catalogImg-3-330.jpg'
                ],
                catalogTransitionImg: [
                    'assets/images/pics/catalog-3/catalogTransitionImg-3-1920.jpg'
                ],
                distortionSliderImg: [
                    'assets/images/pics/catalog-3/distortionSliderImg-3-1-996.jpg',
                    'assets/images/pics/catalog-3/distortionSliderImg-3-2-996.jpg',
                    'assets/images/pics/catalog-3/distortionSliderImg-3-3-996.jpg',
                    'assets/images/pics/catalog-3/distortionSliderImg-3-4-996.jpg',
                    'assets/images/pics/catalog-3/distortionSliderImg-3-5-996.jpg',
                    'assets/images/pics/catalog-3/distortionSliderImg-3-6-996.jpg',
                    'assets/images/pics/catalog-3/distortionSliderImg-3-7-996.jpg',
                    'assets/images/pics/catalog-3/distortionSliderImg-3-8-996.jpg',
                    'assets/images/pics/catalog-3/distortionSliderImg-3-9-996.jpg'
                ],
                distortionSliderMinImg: [
                    'assets/images/pics/catalog-3/distortionSliderMinImg-3-1-123.jpg',
                    'assets/images/pics/catalog-3/distortionSliderMinImg-3-2-123.jpg',
                    'assets/images/pics/catalog-3/distortionSliderMinImg-3-3-123.jpg',
                    'assets/images/pics/catalog-3/distortionSliderMinImg-3-4-123.jpg',
                    'assets/images/pics/catalog-3/distortionSliderMinImg-3-5-123.jpg',
                    'assets/images/pics/catalog-3/distortionSliderMinImg-3-6-123.jpg',
                    'assets/images/pics/catalog-3/distortionSliderMinImg-3-7-123.jpg',
                    'assets/images/pics/catalog-3/distortionSliderMinImg-3-8-123.jpg',
                    'assets/images/pics/catalog-3/distortionSliderMinImg-3-9-123.jpg'
                ],
                text: `Композиции могут собираться в любой таре: корзинке, шляпной коробке, вазочке или декоративных
                ящиках. Их нет необходимости ставить в вазу, как букеты, потому что цветы питаются при помощи
                специальной флористической губки под названием оазис. Композиции очень удобные для подарка,
                или оформления мероприятия.`,
                title: 'Композиции и шляпные коробки'
            },
            {
                id: '4',
                catalogImg: [
                    'assets/images/pics/catalog-4/catalogImg-4-330.jpg'
                ],
                catalogTransitionImg: [
                    'assets/images/pics/catalog-4/catalogTransitionImg-4-1920.jpg'
                ],
                distortionSliderImg: [
                    'assets/images/pics/catalog-4/distortionSliderImg-4-1-996.jpg',
                    'assets/images/pics/catalog-4/distortionSliderImg-4-2-996.jpg',
                    'assets/images/pics/catalog-4/distortionSliderImg-4-3-996.jpg',
                    'assets/images/pics/catalog-4/distortionSliderImg-4-4-996.jpg',
                    'assets/images/pics/catalog-4/distortionSliderImg-4-5-996.jpg',
                    'assets/images/pics/catalog-4/distortionSliderImg-4-6-996.jpg',
                    'assets/images/pics/catalog-4/distortionSliderImg-4-7-996.jpg',
                    'assets/images/pics/catalog-4/distortionSliderImg-4-8-996.jpg',
                    'assets/images/pics/catalog-4/distortionSliderImg-4-9-996.jpg'
                ],
                distortionSliderMinImg: [
                    'assets/images/pics/catalog-4/distortionSliderMinImg-4-1-123.jpg',
                    'assets/images/pics/catalog-4/distortionSliderMinImg-4-2-123.jpg',
                    'assets/images/pics/catalog-4/distortionSliderMinImg-4-3-123.jpg',
                    'assets/images/pics/catalog-4/distortionSliderMinImg-4-4-123.jpg',
                    'assets/images/pics/catalog-4/distortionSliderMinImg-4-5-123.jpg',
                    'assets/images/pics/catalog-4/distortionSliderMinImg-4-6-123.jpg',
                    'assets/images/pics/catalog-4/distortionSliderMinImg-4-7-123.jpg',
                    'assets/images/pics/catalog-4/distortionSliderMinImg-4-8-123.jpg',
                    'assets/images/pics/catalog-4/distortionSliderMinImg-4-9-123.jpg'
                ],
                text: `Мы оформим любое мероприятие в выбранном вами стиле. Рождественские, хехоуин, день рождение или
                 любое другое мероприятие могут превратиться в настоящую сказку, всего лишь благодаря оформлению.
                  Полную коллекцию оформлений в разнообразных стилях вы можете посмотреть в нашем инстаграмме.`,
                title: 'Оформление мероприятий'
            }
        ];

    }

    getAll() {
        // return this.http.get(`${environment.firebase.databaseURL}/flowers.json`)
        //     .pipe(map((response: {[key: string]: any}) => {
        //         return Object
        //             .keys(response)
        //             .map(key => ({
        //                 ...response[key],
        //                 id: key
        //             }));
        //     }));
    }

    getById(id: string) {
        const post = this.flowers.filter((flower) => {
            return flower.id === id;
        })
        return post[0];
    }

    // remove(id: string): Observable<void> {
    //     return this.http.delete<void>(`${environment.firebase.databaseURL}/flowers/${id}.json`);
    // }
    //
    // update(post: Post): Observable<Post> {
    //     return this.http.patch<Post>(`${environment.firebase.databaseURL}/flowers/${post.id}.json`, post);
    // }
}
