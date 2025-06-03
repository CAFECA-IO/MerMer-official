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

  const displayBlocks = Array.from({length: 4}, (_, i) => i).map(index => {
    const src = whyMermerIconSrcs[index];
    const title = whyMermerTitleContents[index];
    const description = whyMermerDescriptionContents[index];

    return (
      <div key={index} className="flex flex-col items-center">
        <Image
          key={src}
          src={`/elements/${src}.svg`}
          alt={`Icon ${src}`}
          width={0}
          height={0}
          style={{width: 'auto', height: '60px'}}
          className="mx-auto align-middle"
        />
        <div className="flex flex-col items-center gap-16px px-16px py-24px">
          <h2 className="text-xl font-bold">{t(title)}</h2>
          <p className="text-sm font-normal leading-loose">{t(description)}</p>
        </div>
      </div>
    );
  });

  const displayIcons = whyMermerIconSrcs.map(src => {
    return (
      <Image
        key={src}
        src={`/elements/${src}.svg`}
        alt={`Icon ${src}`}
        width={0}
        height={0}
        style={{width: 'auto', height: '80px'}}
        className="mx-auto align-middle"
      />
    );
  });

  const displayTitles = whyMermerTitleContents.map(title => {
    return (
      <h2 key={title} className="mt-40px px-16px pt-24px text-center text-xl font-bold">
        {t(title)}
      </h2>
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
    <div className="flex w-full flex-col items-center gap-40px bg-mermerTheme px-16px py-48px font-Dosis text-lightWhite1 md:gap-80px md:p-80px">
      <div className="flex flex-col gap-24px">
        <div className="flex flex-col gap-10px text-center text-2xl font-bold">
          <h2 className="text-42px md:text-54px">{t('HOME_PAGE.WHY_CHOOSE_MERMER_TITLE_1')}</h2>
          <p className="text-2xl drop-shadow-heightLight md:text-42px">
            {t('HOME_PAGE.WHY_CHOOSE_MERMER_TITLE_2')}
          </p>
        </div>
        <p className="text-sm md:text-lg">{t('HOME_PAGE.WHY_CHOOSE_MERMER_SUBTITLE')}</p>
      </div>
      {/* Info:(20250603 - Julian) Desktop view */}
      <div className="hidden w-full grid-cols-4 gap-x-10px md:grid">
        {displayIcons}
        {displayTitles}
        {displayDescriptions}
      </div>

      {/* Info:(20250603 - Julian) Mobile view */}
      <div className="flex w-full flex-wrap gap-40px md:hidden">{displayBlocks}</div>
    </div>
  );
};

export default WhyMermer;
