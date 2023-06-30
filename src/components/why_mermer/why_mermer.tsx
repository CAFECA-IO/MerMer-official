import Image from 'next/image';
import Link from 'next/link';
import {whyMermerContent, partnersContent} from '../../constants/config';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';

const WhyMermer = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const displayWhyMermerContent = whyMermerContent.map(({title, description, image}) => {
    return (
      <div
        key={title}
        className="flex w-full flex-col items-center space-y-2 rounded-2xl bg-glass p-4"
      >
        <Image
          src={image}
          alt={title}
          width={0}
          height={0}
          sizes="40"
          style={{width: 'auto', height: '100%'}}
        />
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-lightBlue1">{t(description)}</h1>
          <p className="text-base font-normal">{t(title)}</p>
        </div>
      </div>
    );
  });

  const displayPartners = partnersContent.map(({name, image, hover, link}) => {
    return (
      <Link
        href={link}
        target="_blank"
        key={name}
        className="group relative mt-10 block h-200px w-200px p-10 lg:mt-0 lg:h-200px"
      >
        <div className="absolute left-6 top-0 flex w-150px items-center justify-center group-hover:opacity-100">
          <Image
            src={image}
            width={0}
            height={0}
            style={{width: 'auto', height: '150px'}}
            alt={name}
          />
        </div>
        <div className="absolute left-6 top-0 flex w-150px items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
          <Image
            src={hover}
            width={0}
            height={0}
            style={{width: 'auto', height: '150px'}}
            alt={name}
          />
        </div>
      </Link>
    );
  });

  return (
    <div className="flex w-full flex-col items-center px-4 py-16 font-Dosis text-lightWhite1 lg:p-20">
      <h1 className="text-2xl font-bold lg:text-42px">{t('HOME_PAGE.WHY_US_TITLE')}</h1>
      <div className="mt-16 flex w-full flex-col items-center lg:mt-12">
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayWhyMermerContent}
        </div>
        {/* Info: (20230629 - Julian) our partners */}
        <div className="mt-20 flex h-auto w-full flex-wrap items-center justify-center">
          {displayPartners}
        </div>
      </div>
    </div>
  );
};

export default WhyMermer;
