import Link from 'next/link';
import useOuterClick from '../../lib/hooks/use_outer_click';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';
import {PiGlobe} from 'react-icons/pi';
import {FiChevronDown, FiChevronRight} from 'react-icons/fi';
import {ImArrowLeft2} from 'react-icons/im';

const I18n = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');
  const {asPath} = useRouter();

  const internationalizationList = [
    {label: '繁體中文', value: 'tw'},
    {label: 'English', value: 'en'},
    {label: '简体中文', value: 'cn'},
  ];

  const {
    targetRef: languageRef,
    componentVisible: languageVisible,
    setComponentVisible: setLanguageVisible,
  } = useOuterClick<HTMLDivElement>(false);

  const [currentLanguage, setCurrentLanguage] = useState('Language');

  const showMenuHandler = () => setLanguageVisible(!languageVisible);
  const changeLanguageHandler = (value: string) => {
    const language = internationalizationList.find(({value: v}) => v === value);
    if (language) {
      setCurrentLanguage(language.label);
    }
    setLanguageVisible(false);
  };

  const showText = languageVisible ? t('NAV_BAR.LANGUAGE') : currentLanguage;

  const desktopMenu = (
    <ul
      className={`absolute mt-3 hidden flex-col items-center bg-mermerTheme px-2 ${
        languageVisible ? 'visible opacity-100' : 'invisible opacity-0'
      } divide-y divide-lightWhite1 shadow-drop transition-all duration-150 ease-in lg:flex`}
    >
      {internationalizationList.map(({label, value}) => (
        <li
          key={value}
          className="w-full py-3 text-center hover:cursor-pointer hover:bg-dropDownHover hover:text-lightWhite1"
        >
          <Link
            href={asPath}
            scroll={false}
            className="px-6 py-3"
            onClick={() => changeLanguageHandler(value)}
            locale={value}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );

  const mobileMenu = (
    <ul
      className={`absolute left-0 top-0 z-10 flex h-260px w-full flex-col items-center lg:hidden ${
        languageVisible ? 'visible opacity-100' : 'invisible opacity-0'
      } space-y-2 bg-mermerTheme py-3 font-Barlow text-base font-medium shadow-drop transition-all duration-300 ease-in`}
    >
      {internationalizationList.map(({label, value}) => (
        <li key={value} className="flex w-full justify-center py-3 hover:cursor-pointer">
          <Link
            href={asPath}
            scroll={false}
            onClick={() => changeLanguageHandler(value)}
            locale={value}
          >
            {label}
          </Link>
        </li>
      ))}
      <li
        onClick={showMenuHandler}
        className="flex w-full items-center justify-center space-x-2 py-3 hover:cursor-pointer"
      >
        <ImArrowLeft2 />
        <p>{t('NAV_BAR.BACK_BUTTON')}</p>
      </li>
    </ul>
  );

  return (
    <div ref={languageRef}>
      <button
        className="relative flex w-130px items-center space-x-2 hover:cursor-pointer hover:text-lightBlue1"
        onClick={showMenuHandler}
      >
        <PiGlobe className="text-2xl" />
        <h1>{showText}</h1>
        <FiChevronDown className="hidden text-2xl lg:block" />
        <FiChevronRight className="block text-2xl lg:hidden" />
      </button>

      {desktopMenu}
      {mobileMenu}
    </div>
  );
};

export default I18n;
