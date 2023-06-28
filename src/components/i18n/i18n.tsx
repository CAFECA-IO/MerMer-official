import Link from 'next/link';
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

  const [showMenu, setShowMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('Language');

  const showMenuHandler = () => setShowMenu(!showMenu);
  const changeLanguageHandler = (value: string) => {
    const language = internationalizationList.find(({value: v}) => v === value);
    if (language) {
      setCurrentLanguage(language.label);
    }
    setShowMenu(false);
  };

  const showText = showMenu ? t('NAV_BAR.LANGUAGE') : currentLanguage;

  const desktopMenu = (
    <ul
      className={`absolute hidden mt-3 flex-col items-center bg-mermerTheme px-2 ${
        showMenu ? 'opacity-100 visible' : 'opacity-0 invisible'
      } divide-y divide-lightWhite1 shadow-drop transition-all duration-150 ease-in lg:flex`}
    >
      {internationalizationList.map(({label, value}) => (
        <li
          key={value}
          className="py-3 w-full text-center hover:cursor-pointer hover:bg-dropDownHover hover:text-lightWhite1"
        >
          <Link
            href={asPath}
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
      className={`flex left-0 top-0 z-10 lg:hidden absolute flex-col items-center w-screen ${
        showMenu ? 'visible h-240px' : 'h-140px invisible' // Info: (20230628 - Julian) 隱藏時的高度要跟 Navbar 的 mobileMenu 高度一樣，才會有延伸的效果
      } font-Barlow bg-mermerTheme font-medium text-base space-y-2 py-3 transition-all duration-300 ease-in shadow-drop`}
    >
      {internationalizationList.map(({label, value}) => (
        <li key={value} className="flex w-full justify-center py-3 hover:cursor-pointer">
          <Link href={asPath} onClick={() => changeLanguageHandler(value)} locale={value}>
            {label}
          </Link>
        </li>
      ))}
      <li
        onClick={showMenuHandler}
        className="flex w-full items-center justify-center space-x-2 py-3 text-darkBlue hover:cursor-pointer hover:text-brandOrange"
      >
        <ImArrowLeft2 />
        <p>{t('NAV_BAR.BACK_BUTTON')}</p>
      </li>
    </ul>
  );

  return (
    <>
      <button
        className="relative w-130px flex items-center space-x-2 hover:text-lightBlue1 hover:cursor-pointer"
        onClick={showMenuHandler}
      >
        <PiGlobe className="text-2xl" />
        <h1>{showText}</h1>
        <FiChevronDown className="hidden text-2xl lg:block" />
        <FiChevronRight className="block text-2xl lg:hidden" />
      </button>

      {desktopMenu}
      {mobileMenu}
    </>
  );
};

export default I18n;
