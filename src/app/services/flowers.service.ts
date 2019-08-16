import {Injectable} from '@angular/core';

@Injectable()
export class FlowersService {
  flowers = [
    {
      id: 1,
      title: 'Букеты на мероприятия',
      text: 'У нас есть огромное разноообразие букетов на любое событие. Вы сможете приобрести как нежный букет, так и яркий, а также мужские, круглые, вертикалье, веерообразные, букеты-зонтики, букеты в вегетативной технике и много  других экзотических видов.',
      active: true
    },
    {
      id: 2,
      name: 'букеты невесты и свадебное оформление',
      text: 'Свадьба–самое важное событие в жизни молодожен.  Поэтому каждый из будущих супругов хочет, чтобы на торжестве все было идеально. Наша компания превзойдет ваши ожидания по красоте, качеству и лояльному ценнику. Обращаясь к нам, вы можете не переживать за оформление вашей свадьбы.'
    },
    {
      id: 3,
      name: 'композиции и шляпные коробки',
      text: 'Композиции могут собираться в любой таре: корзинке, шляпной коробке, вазочке или декоративных ящиках. Их нет необходимости ставить в вазу, как букеты, потому что цветы питаются при помощи специальной флористической губки под названием оазис. Композиции очень удобные для подарка, или оформления мероприятия.'
    },
    {
      id: 4,
      name: 'оформление мероприятий',
      text: 'Мы оформим любое мероприятие в выбранном вами стиле. Рождественские, хехоуин, день рождение или любое другое мероприятие могут превратиться в настоящую сказку, всего лишь благодаря оформлению. Полную коллекцию оформлений в разнообразных стилях вы можете посмотреть в нашем инстаграмме.'
    }
  ];
}
