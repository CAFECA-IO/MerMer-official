import {FaMapMarkerAlt} from 'react-icons/fa';
import {ImPhone} from 'react-icons/im';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';
import {mermerAddressInMap, mermerPhone, mermerCopyright} from '../../constants/config';

const Footer = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  return (
    <footer className="flex flex-col h-auto w-screen px-4 py-12 space-y-16 items-center bg-mermerTheme font-Dosis text-sm lg:py-6 lg:px-20 lg:flex-row lg:space-y-0 lg:h-80px">
      <div className="flex flex-1 flex-col space-y-6 px-6 lg:px-0 lg:flex-row lg:space-x-6 lg:space-y-0 lg:py-0">
        <div className="flex flex-col items-center space-y-2 text-center lg:flex-row lg:space-x-3 lg:space-y-0 lg:text-left">
          <FaMapMarkerAlt className="h-20px w-20px text-lightWhite1" />
          <a href={mermerAddressInMap} target="_blank">
            {t('FOOTER.ADDRESS')}
          </a>
        </div>

        <div className="flex flex-col items-center space-y-2 text-center lg:flex-row lg:space-x-3 lg:space-y-0 lg:text-left">
          <ImPhone className="h-20px w-20px text-lightWhite1" />
          <a href={`tel:${mermerPhone}`}>{mermerPhone}</a>
        </div>
      </div>
      <div>{mermerCopyright}</div>
    </footer>
  );
};

export default Footer;
