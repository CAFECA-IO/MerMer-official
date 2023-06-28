import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import I18n from '../i18n/i18n';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';

const NavBar = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');
  const burgerStyle = 'block h-1 w-6 rounded-3xl bg-white transition-all duration-300 ease-in';

  const [showMenu, setShowMenu] = useState(false);
  const showMenuHandler = () => setShowMenu(!showMenu);

  const desktopMenu = (
    <ul className="hidden items-center space-x-12 font-Dosis text-base font-medium lg:flex">
      <li className="px-2 py-3 hover:text-lightBlue1">
        <Link href="/#contact_us" scroll={false}>
          {t('NAV_BAR.CONTACT_US')}
        </Link>
      </li>
      <li className="px-2 py-3">
        <I18n />
      </li>
    </ul>
  );

  const mobileMenu = (
    <ul
      className={`absolute left-0 top-80px -z-10 flex w-screen flex-col items-center lg:hidden ${
        showMenu ? 'visible h-140px opacity-100' : 'invisible h-0 opacity-0'
      } bg-mermerTheme font-Barlow text-base font-medium shadow-drop transition-all duration-300 ease-in`}
    >
      <li className="m-2 px-2 py-3">
        <I18n />
      </li>
      <li className="m-2 px-2 py-3 hover:text-lightBlue1">
        <Link href="/#contact_us" scroll={false}>
          {t('NAV_BAR.CONTACT_US')}
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      <div className="fixed inset-0 z-50 flex h-80px w-screen bg-mermerTheme px-4 shadow-drop lg:px-20 lg:shadow-none">
        <div className="flex w-full flex-col text-lightWhite1 lg:flex-row">
          <div className="relative flex w-full flex-1 items-center justify-between p-4">
            <Link href="/#">
              <Image
                src="/logos/MerMer.svg"
                alt="MerMer_logo"
                width={0}
                height={0}
                style={{width: '150px', height: 'auto'}}
              />
            </Link>

            <button className="flex flex-col space-y-1 lg:hidden" onClick={showMenuHandler}>
              <span
                className={`${burgerStyle} ${
                  showMenu ? 'translate-y-8px rotate-45' : 'translate-y-0 rotate-0'
                }`}
              ></span>
              <span className={`${burgerStyle} ${showMenu ? 'opacity-0' : 'opacity-100'}`}></span>
              <span
                className={`${burgerStyle} ${
                  showMenu ? '-translate-y-8px -rotate-45' : 'translate-y-0 rotate-0'
                }`}
              ></span>
            </button>
          </div>

          {desktopMenu}
          {mobileMenu}
        </div>
      </div>
    </>
  );
};

export default NavBar;
