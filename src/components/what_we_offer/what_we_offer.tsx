import Image from 'next/image';
import {offerContent} from '../../constants/config';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';

const WhatWeOffer = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const displayOfferContent = offerContent.map(({title, description, image}) => {
    return (
      <div key={title} className="flex flex-col items-center lg:w-1/3">
        <div>
          <Image src={image} alt={title} width={400} height={400} />
        </div>
        <div className="mt-6 flex w-full flex-1 flex-col items-center text-center">
          <h1 className="text-xl font-bold">{t(title)}</h1>
          <p className="py-4 text-base font-normal">{t(description)}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="flex w-full flex-col items-center bg-mermerTheme px-4 py-12 font-Dosis text-lightWhite1 lg:p-20">
      <h1 className="text-2xl font-bold lg:text-42px">{t('HOME_PAGE.WHAT_WE_OFFER_TITLE')}</h1>
      <div className="mt-16 flex flex-col items-start space-y-4 lg:mt-20 lg:flex-row lg:space-x-5 lg:space-y-0">
        {displayOfferContent}
      </div>
    </div>
  );
};

export default WhatWeOffer;
