import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';
import {partnersContent} from '../../constants/config';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa6';

const OurPartners = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');
  const [scrolledOffset, setScrolledOffset] = useState<number>(0);

  const scrollLeft = () => {
    setScrolledOffset(prev => {
      if (prev <= 0) return 0;
      return prev - 250;
    });
  };

  const scrollRight = () => {
    setScrolledOffset(prev => {
      if (prev >= 4250) return 4250;
      return prev + 250;
    });
  };

  const displayedPartners = partnersContent.map(partner => {
    return (
      <Link href={partner.link}>
        <Image
          key={partner.name}
          src={partner.image}
          alt={partner.name}
          width={0}
          height={0}
          className="vertical-center mx-auto h-auto max-h-100px w-250px md:h-80px md:w-auto"
        />
      </Link>
    );
  });

  const displayedLeftBtn = (
    <button
      type="button"
      onClick={scrollLeft}
      className="sticky left-0 z-20 h-120px bg-gradient-to-r from-darkBlue3 from-60% to-transparent px-20px"
    >
      <FaChevronLeft size={40} />
    </button>
  );

  const displayedRightBtn = (
    <button
      type="button"
      onClick={scrollRight}
      className="sticky right-0 z-20 h-120px bg-gradient-to-l from-darkBlue3 from-60% to-transparent px-20px"
    >
      <FaChevronRight size={40} />
    </button>
  );

  return (
    <div className="flex flex-col items-center gap-64px px-16px py-48px font-Dosis text-lightWhite1 md:px-80px md:py-120px">
      <h2 className="text-4xl font-bold md:text-5xl">{t('HOME_PAGE.OUR_PARTNERS_TITLE')}</h2>
      {/* Info:(20250603 - Julian) Desktop view */}
      <div className="relative hidden w-full items-center overflow-hidden md:flex">
        {displayedLeftBtn}
        <div>
          <div
            style={{transform: `translateX(-${scrolledOffset}px)`}}
            className="flex w-max items-center gap-120px py-20px transition-transform duration-300 ease-in-out"
          >
            {displayedPartners}
          </div>
        </div>
        {displayedRightBtn}
      </div>

      {/* Info:(20250603 - Julian) Mobile view */}
      <div className="flex flex-wrap justify-center gap-20px md:hidden">{displayedPartners}</div>
    </div>
  );
};

export default OurPartners;
