import Image from 'next/image';
import Link from 'next/link';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';
import {partnersContent} from '../../constants/config';

const OurPartners = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const displayedPartners = partnersContent.map(partner => {
    return (
      <Link href={partner.link} className="py-20px">
        <Image
          key={partner.name}
          src={partner.image}
          alt={partner.name}
          width={0}
          height={0}
          style={{width: 'auto', height: '80px'}}
          className="vertical-center mx-auto"
        />
      </Link>
    );
  });

  return (
    <div className="flex flex-col items-center gap-64px px-80px py-120px font-Dosis text-lightWhite1">
      <h2 className="text-42px font-bold">{t('HOME_PAGE.OUR_PARTNERS_TITLE')}</h2>
      <div className="w-full overflow-x-auto">
        <div className="flex w-max items-center gap-120px">{displayedPartners}</div>
      </div>
    </div>
  );
};

export default OurPartners;
