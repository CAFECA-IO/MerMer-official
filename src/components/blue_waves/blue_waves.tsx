import Link from 'next/link';
import Image from 'next/image';
import MerMerButton from '../mermer_button/mermer_button';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';

const BlueWaves = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const mobileDisplay = (
    <div className="flex flex-col w-full bg-mobileWaves bg-no-repeat bg-contain bg-top-12 md:hidden">
      <div className="flex flex-col items-center py-60 space-y-12 px-4">
        <h1 className="text-2xl font-bold">
          {t('HOME_PAGE.MAIN_TITLE_1')}
          <span className="text-lightBlue1">{t('HOME_PAGE.MAIN_TITLE_HIGHLIGHT')}</span>
          {t('HOME_PAGE.MAIN_TITLE_2')}
        </h1>
        <p className="text-sm">{t('HOME_PAGE.MAIN_DESCRIPTION')}</p>
        <Link href="/#contact_us" scroll={false}>
          <MerMerButton className="space-x-2 px-10 py-10px">
            <Image src="/icons/star.svg" alt="" width={24} height={24} />
            <p>{t('NAV_BAR.CONTACT_US')}</p>
          </MerMerButton>
        </Link>
      </div>
      {/* Info: (20230627 - Julian) Important Notice */}
      <div className="w-full px-4">
        <div className="flex flex-col p-10 items-center space-y-12 rounded-large bg-glass backdrop-blur-xl">
          <h1 className="text-xl text-lightBlue1">{t('HOME_PAGE.NOTICE_TITLE')}</h1>
          <p className="text-lg">{t('HOME_PAGE.NOTICE_DESCRIPTION')}</p>
        </div>
      </div>
    </div>
  );

  const desktopDisplay = (
    <div className="hidden flex-col w-full bg-desktopWaves bg-no-repeat bg-right bg-auto md:flex">
      <div className="my-40 flex flex-1 flex-col items-start justify-center w-3/5 px-20 space-y-16">
        <h1 className="text-54px font-bold">
          {t('HOME_PAGE.MAIN_TITLE_1')}
          <span className="text-lightBlue1">{t('HOME_PAGE.MAIN_TITLE_HIGHLIGHT')}</span>
          {t('HOME_PAGE.MAIN_TITLE_2')}
        </h1>
        <p className="text-lg">{t('HOME_PAGE.MAIN_DESCRIPTION')}</p>

        <Link href="/#contact_us" scroll={false}>
          <MerMerButton className="space-x-2 px-10 py-10px">
            <Image src="/icons/star.svg" alt="" width={24} height={24} />
            <p>{t('NAV_BAR.CONTACT_US')}</p>
          </MerMerButton>
        </Link>
      </div>
      {/* Info: (20230627 - Julian) Important Notice */}
      <div className="w-full">
        <div className="mx-auto flex flex-col p-10 items-center space-y-12 rounded-large bg-glass backdrop-blur-xl max-w-900px">
          <h1 className="text-xl text-lightBlue1">{t('HOME_PAGE.NOTICE_TITLE')}</h1>
          <p className="text-lg">{t('HOME_PAGE.NOTICE_DESCRIPTION')}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-1 w-full py-20 font-Dosis text-lightWhite1">
      {desktopDisplay}
      {mobileDisplay}
    </div>
  );
};

export default BlueWaves;
