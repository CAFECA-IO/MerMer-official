import Link from 'next/link';
import Image from 'next/image';
import MerMerButton from '../mermer_button/mermer_button';
import {MERURL} from '../../constants/url';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';

const BlueWaves = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const mobileDisplay = (
    /* Info: (20230707 - Julian) Blue Waves background 在這一層 */
    <div className="flex w-full flex-col bg-mobileWaves bg-contain bg-top-12 bg-no-repeat md:hidden">
      {/* Info: (20230707 - Julian) Main text */}
      <div className="flex flex-col items-center space-y-12 px-4 py-60">
        <h1 className="text-2xl font-bold">
          {t('HOME_PAGE.MAIN_TITLE_1')}
          <span className="text-lightBlue1">{t('HOME_PAGE.MAIN_TITLE_HIGHLIGHT')}</span>
          {t('HOME_PAGE.MAIN_TITLE_2')}
        </h1>
        <p className="text-sm">{t('HOME_PAGE.MAIN_DESCRIPTION')}</p>
        <Link href={MERURL.CONTACT_US} scroll={false}>
          <MerMerButton className="space-x-2 px-10 py-10px">
            <Image src="/icons/star.svg" alt="" width={24} height={24} />
            <p>{t('NAV_BAR.CONTACT_US')}</p>
          </MerMerButton>
        </Link>
      </div>

      {/* Info: (20230627 - Julian) Important Notice */}
      <div className="w-full px-4">
        <div className="flex flex-col items-center space-y-12 rounded-large bg-glass p-10 backdrop-blur-xl">
          <h1 className="text-xl text-lightBlue1">{t('HOME_PAGE.NOTICE_TITLE')}</h1>
          <p className="text-lg">{t('HOME_PAGE.NOTICE_DESCRIPTION')}</p>
        </div>
      </div>
    </div>
  );

  const desktopDisplay = (
    <div className="relative hidden w-full flex-col bg-mermerTheme2 md:flex">
      {/* Info: (20230707 - Julian) Blue Waves background */}
      <div className="absolute h-full w-full bg-desktopWaves bg-right bg-no-repeat"></div>

      {/* Info: (20230707 - Julian) Main text */}
      <div className="z-20 flex h-auto w-full">
        <div className="flex w-3/5 flex-col items-start justify-center space-y-16 px-20 py-28">
          <h1 className="text-54px font-bold">
            {t('HOME_PAGE.MAIN_TITLE_1')}
            <span className="text-lightBlue1">{t('HOME_PAGE.MAIN_TITLE_HIGHLIGHT')}</span>
            {t('HOME_PAGE.MAIN_TITLE_2')}
          </h1>
          <p className="text-lg">{t('HOME_PAGE.MAIN_DESCRIPTION')}</p>

          <Link href={MERURL.CONTACT_US} scroll={false}>
            <MerMerButton className="space-x-2 px-10 py-10px">
              <Image src="/icons/star.svg" alt="" width={24} height={24} />
              <p>{t('NAV_BAR.CONTACT_US')}</p>
            </MerMerButton>
          </Link>
        </div>
      </div>

      {/* Info: (20230627 - Julian) Important Notice */}
      <div className="z-20 w-full">
        <div className="mx-auto flex max-w-900px flex-col items-center space-y-12 rounded-large bg-glass p-10 backdrop-blur-xl">
          <h1 className="text-xl text-lightBlue1">{t('HOME_PAGE.NOTICE_TITLE')}</h1>
          <p className="text-lg">{t('HOME_PAGE.NOTICE_DESCRIPTION')}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-1 py-20 font-Dosis text-lightWhite1">
      {desktopDisplay}
      {mobileDisplay}
    </div>
  );
};

export default BlueWaves;
