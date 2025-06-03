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
      <div className="flex h-600px flex-col items-center justify-end space-y-64px px-16px py-48px">
        <div className="text-2xl font-bold">
          <p>
            {t('HOME_PAGE.MAIN_TITLE_1_1')}
            <span className="text-lightBlue1">{t('HOME_PAGE.MAIN_TITLE_1_2')}</span>
            {t('HOME_PAGE.MAIN_TITLE_1_3')}
          </p>
          <p>
            {t('HOME_PAGE.MAIN_TITLE_2_1')}
            <span className="text-lightBlue1">{t('HOME_PAGE.MAIN_TITLE_2_2')}</span>
            {t('HOME_PAGE.MAIN_TITLE_2_3')}
          </p>
        </div>
        <p className="text-sm">{t('HOME_PAGE.MAIN_DESCRIPTION')}</p>
        <Link href={MERURL.CONTACT_US} scroll={false}>
          <MerMerButton className="space-x-2 px-10 py-10px">
            <Image src="/icons/star.svg" alt="" width={24} height={24} />
            <p>{t('HOME_PAGE.CTA_BTN')}</p>
          </MerMerButton>
        </Link>
      </div>
    </div>
  );

  const desktopDisplay = (
    <div className="relative hidden w-full flex-col bg-mermerTheme2 md:flex">
      {/* Info: (20230707 - Julian) Blue Waves background */}
      <div className="absolute size-full bg-desktopWaves bg-right bg-no-repeat"></div>

      {/* Info: (20230707 - Julian) Main text */}
      <div className="z-20 flex h-800px w-full">
        <div className="flex w-3/5 min-w-500px flex-col items-start justify-center gap-64px px-20 py-28">
          <div className="flex flex-col gap-48px">
            <div className="text-54px font-bold leading-snug">
              <p>
                {t('HOME_PAGE.MAIN_TITLE_1_1')}
                <span className="text-lightBlue1">{t('HOME_PAGE.MAIN_TITLE_1_2')}</span>
                {t('HOME_PAGE.MAIN_TITLE_1_3')}
              </p>
              <p>
                {t('HOME_PAGE.MAIN_TITLE_2_1')}
                <span className="text-lightBlue1">{t('HOME_PAGE.MAIN_TITLE_2_2')}</span>
                {t('HOME_PAGE.MAIN_TITLE_2_3')}
              </p>
            </div>
            <p className="text-lg">{t('HOME_PAGE.MAIN_DESCRIPTION')}</p>
          </div>

          <Link href={MERURL.CONTACT_US} scroll={false}>
            <MerMerButton className="space-x-2 px-10 py-10px">
              <Image src="/icons/star.svg" alt="" width={24} height={24} />
              <p>{t('HOME_PAGE.CTA_BTN')}</p>
            </MerMerButton>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-1 pt-20 font-Dosis text-lightWhite1">
      {desktopDisplay}
      {mobileDisplay}
    </div>
  );
};

export default BlueWaves;
