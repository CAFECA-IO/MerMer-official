import React from 'react'
import KmCard from './km_card'

// type Props = {}

const fakeCard = [
  {
    kmId: '20220101001',
    title: 'The SAS interface is down, input the cross-platform capacitor so we can quantify the CSS panel!',
    date: new Date(),
    view: 3253,
    share: 12,
    cover: '/km/aaa_fix.png',
    published:true
  },
  {
    kmId: '20220101002',
    title: 'This is short Title',
    date: new Date(),
    view: 0,
    share: 0,
    cover: '/km/AI-ETH.jpg',
    published:false
  }
]
export default function KmCardDisplay() {
  const cards = fakeCard.map(card => {
    return <KmCard kmId={card.kmId} title={card.title} date={card.date} view={card.view} share={card.share} cover={card.cover} published={card.published}/>
  })
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      {cards}
    </div>
  )
}