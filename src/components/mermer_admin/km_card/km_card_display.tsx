import React, { Dispatch } from 'react'
import KmCard from './km_card'
import { IAllKmMeta, IKmMeta } from '../../../interfaces/km'

type Props = {
  kmCards: IKmMeta[] | undefined,
  cardsRenderPerPage: number,
  activePage: number,
  kmAllMeta: IAllKmMeta,
  setKmAllMeta: Dispatch<React.SetStateAction<IAllKmMeta>>,
}

const isCardNeedToBeRender = (cardsRenderPerPage: number, activePage: number, cardIndex: number): boolean => {
  // Info Murky (20240212) activePage start from 1, cardIndex start from 0
  return cardIndex < activePage * cardsRenderPerPage && cardIndex >= (activePage - 1) * cardsRenderPerPage
}

export default function KmCardDisplay({ kmCards, cardsRenderPerPage, activePage, kmAllMeta, setKmAllMeta }: Props) {
  kmCards = kmCards?.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
  const cards = kmCards && kmCards.map((card, index) => {
    if (!isCardNeedToBeRender(cardsRenderPerPage, activePage, index)) return null

    return <KmCard
      key={card.id}
      kmId={card.id}
      title={card.title}
      date={card.createdAt as unknown as string}
      view={0}
      share={0}
      cover={card.picture}
      published={card.isPublished}
      kmAllMeta={kmAllMeta}
      setKmAllMeta={setKmAllMeta}
    />
  })
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      {cards}
    </div>
  )
}