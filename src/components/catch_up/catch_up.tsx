import Image from 'next/image';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';
import {web3Content} from '../../constants/config';

const CatchUp = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const displayWeb3Content = web3Content.map(({title, description}) => {
    return (
      <div
        key={title}
        className="flex flex-col items-start rounded-large bg-glass px-10 py-5 shadow-drop"
      >
        <h1 className="text-3xl">{t(title)}</h1>
        <p className="mt-4 text-lg">{t(description)}</p>
      </div>
    );
  });

  return (
    <div className="flex w-full flex-col items-center py-20 font-Dosis text-lightWhite1">
      <div className="flex flex-col items-center px-4 text-center">
        <h1 className="text-42px font-bold lg:text-54px">{t('HOME_PAGE.CATCH_UP_TITLE')}</h1>
        <h2 className="mt-4 text-2xl font-bold drop-shadow-heightLight lg:text-42px">
          {t('HOME_PAGE.CATCH_UP_SUBTITLE')}
        </h2>
        <p className="mt-12 text-lg">{t('HOME_PAGE.CATCH_UP_DESCRIPTION')}</p>
      </div>

      <div className="relative flex flex-col items-center lg:flex-row">
        {/* Info: (20230628 - Julian) Picture for desktop */}
        <div className="hidden h-full w-full pr-10 lg:block">
          <Image
            src="/elements/web3.0_laptop_1.png"
            alt="web3.0"
            height={500}
            width={800}
            //className="drop-shadow-heightLight2"
          />
        </div>

        {/* Info: (20230628 - Julian) Picture for mobile */}
        <div className="relative my-20 block h-200px w-full lg:hidden">
          <Image
            src="/elements/web3.0_laptop_2.png"
            alt="web3.0"
            fill
            style={{objectFit: 'contain'}}
            //className="drop-shadow-heightLight2"
          />
        </div>

        <div className="grid grid-cols-1 gap-y-6 px-4 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-10 lg:px-0 lg:py-40 lg:pr-10">
          {displayWeb3Content}
        </div>
      </div>
    </div>
  );
};

export default CatchUp;
