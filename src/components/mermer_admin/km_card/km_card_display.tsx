import React from 'react'
import KmCard from './km_card'
import { IKmMeta } from '../../../interfaces/km'

type Props = {
  kmCards: IKmMeta[] | undefined,
  cardsRenderPerPage: number,
  activePage: number
}

// const fakeCard = [
//   {
//     kmId: '20220101001',
//     title: 'The SAS interface is down, input the cross-platform capacitor so we can quantify the CSS panel!',
//     date: new Date(),
//     view: 3253,
//     share: 12,
//     cover: '/km/aaa_fix.png',
//     published: true
//   },
//   {
//     kmId: '20220101002',
//     title: 'This is short Title',
//     date: new Date(),
//     view: 0,
//     share: 0,
//     cover: '/km/AI-ETH.jpg',
//     published: false
//   }
// ]

const isCardNeedToBeRender = (cardsRenderPerPage: number, activePage: number, cardIndex: number): boolean => {
  // Info Murky (20240212) activePage start from 1, cardIndex start from 0
  return cardIndex < activePage * cardsRenderPerPage && cardIndex >= (activePage - 1) * cardsRenderPerPage
}

export default function KmCardDisplay({ kmCards, cardsRenderPerPage, activePage }: Props) {
  const cards = kmCards && kmCards.map((card, index) => {
    if (!isCardNeedToBeRender(cardsRenderPerPage, activePage, index)) return null

    return <KmCard key={card.id} kmId={card.id} title={card.title} date={card.createdAt as unknown as string} view={0} share={0} cover={card.picture} published={card.isPublished} />
  })
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      {cards}
    </div>
  )
}