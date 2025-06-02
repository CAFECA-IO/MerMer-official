import Image from 'next/image';
import {
  whyMermerIconSrcs,
  whyMermerTitleContents,
  whyMermerDescriptionContents,
} from '../../constants/config';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';

const WhyMermer = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const displayIcons = whyMermerIconSrcs.map(src => {
    return (
      <Image
        key={src}
        src={`/elements/${src}.svg`}
        alt={`Icon ${src}`}
        width={0}
        height={0}
        style={{width: 'auto', height: '80px'}}
        className="vertical-center mx-auto"
      />
    );
  });

  const displayTitles = whyMermerTitleContents.map(title => {
    return (
      <h1 key={title} className="mt-40px px-16px pt-24px text-center text-xl font-bold">
        {t(title)}
      </h1>
    );
  });

  const displayDescriptions = whyMermerDescriptionContents.map(description => {
    return (
      <p key={description} className="mt-16px px-16px pb-24px text-base font-normal leading-loose">
        {t(description)}
      </p>
    );
  });

  return (
    <div className="flex w-full flex-col items-center gap-80px bg-mermerTheme p-80px font-Dosis text-lightWhite1">
      <div className="flex flex-col gap-24px">
        <div className="flex flex-col gap-10px text-center text-2xl font-bold lg:text-42px">
          <h2>{t('HOME_PAGE.WHY_CHOOSE_MERMER_TITLE_1')}</h2>
          <p className="drop-shadow-heightLight">{t('HOME_PAGE.WHY_CHOOSE_MERMER_TITLE_2')}</p>
        </div>
        <p className="text-lg">{t('HOME_PAGE.WHY_CHOOSE_MERMER_SUBTITLE')}</p>
      </div>
      <div className="grid w-full grid-cols-4 gap-x-10px">
        {displayIcons}
        {displayTitles}
        {displayDescriptions}
      </div>
    </div>
  );
};

export default WhyMermer;
