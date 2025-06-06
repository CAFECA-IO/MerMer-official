import Image from 'next/image';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';

const WhatWeOffer = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const oneToFour = Array.from({length: 4}, (_, i) => i + 1);
  const displayOfferContent = oneToFour.map(v => {
    return (
      <div
        key={v}
        className="relative flex h-350px w-full flex-col items-start gap-16px rounded-large bg-glass px-40px py-20px shadow-drop md:h-400px md:w-380px"
      >
        <h1 className="text-2xl font-bold md:text-3xl">
          {t(`HOME_PAGE.WHAT_WE_OFFER_${v}_TITLE`)}
        </h1>
        <ul className="ml-20px list-outside list-disc text-sm leading-loose md:text-base">
          <li>{t(`HOME_PAGE.WHAT_WE_OFFER_${v}_1`)}</li>
          <li>{t(`HOME_PAGE.WHAT_WE_OFFER_${v}_2`)}</li>
          <li>{t(`HOME_PAGE.WHAT_WE_OFFER_${v}_3`)}</li>
          <li>{t(`HOME_PAGE.WHAT_WE_OFFER_${v}_4`)}</li>
        </ul>

        {/* Info: (20250602 - Julian) Border lines */}
        <div className="absolute left-0 top-0 h-full w-px bg-stroke"></div>
        <div className="absolute right-0 top-0 h-full w-px bg-stroke"></div>
      </div>
    );
  });

  return (
    <div className="flex w-full flex-col items-stretch font-Dosis text-lightWhite1">
      <div className="flex flex-col items-center px-80px py-40px text-center">
        <h1 className="text-42px font-bold md:text-54px">{t('HOME_PAGE.WHAT_WE_OFFER_TITLE')}</h1>
        <h2 className="mt-4 text-2xl font-bold drop-shadow-heightLight md:text-42px">
          {t('HOME_PAGE.WHAT_WE_OFFER_SUBTITLE')}
        </h2>
      </div>

      <div className="relative flex flex-col items-center md:flex-row">
        {/* Info: (20250602 - Julian) Picture for desktop */}
        <div className="absolute -left-52 hidden size-full pr-10 md:block">
          <Image src="/elements/web_laptop_desktop.png" alt="laptop" height={1000} width={1000} />
        </div>

        {/* Info: (20250602 - Julian) Picture for mobile */}
        <div className="absolute block h-300px w-full md:hidden">
          <Image
            src="/elements/web_laptop_mobile.png"
            alt="web3.0"
            fill
            style={{objectFit: 'contain'}}
          />
        </div>

        <div className="z-10 ml-auto mt-250px w-full md:mt-0 md:w-2/3">
          <div className="grid grid-cols-1 gap-y-6 px-16px py-60px md:w-max md:grid-cols-2 md:gap-x-24px md:gap-y-40px md:px-80px">
            {displayOfferContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;
