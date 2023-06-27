import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';

const NavBar = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');
  const burgerStyle = 'block h-1 w-6 rounded-3xl bg-white transition-all duration-300 ease-in';

  const [showMenu, setShowMenu] = useState(false);
  const showMenuHandler = () => setShowMenu(!showMenu);

  const desktopMenu = (
    <ul className="lg:flex hidden items-center space-x-12 font-Dosis font-medium text-base">
      <li className="px-2 py-3 hover:text-lightBlue1">
        <Link href="/#contact_us" scroll={false}>
          {t('NAV_BAR.CONTACT_US')}
        </Link>
      </li>
      <li className="px-2 py-3 hover:text-lightBlue1">Language</li>
    </ul>
  );

  const mobileMenu = (
    <ul
      className={`flex left-0 lg:hidden absolute top-80px flex-col items-center w-screen -z-10 ${
        showMenu ? 'visible h-140px opacity-100' : 'h-0 opacity-0 invisible'
      } font-Barlow bg-mermerTheme font-medium text-base transition-all duration-300 ease-in shadow-drop`}
    >
      <li className="px-2 py-3 m-2 hover:text-lightBlue1">Language</li>
      <li className="px-2 py-3 m-2 hover:text-lightBlue1">
        <Link href="/#contact_us" scroll={false}>
          {t('NAV_BAR.CONTACT_US')}
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      <div className="fixed inset-0 z-50 flex h-80px w-screen bg-mermerTheme px-4 lg:px-20 shadow-drop lg:shadow-none">
        <div className="flex w-full flex-col lg:flex-row text-lightWhite1">
          <div className="relative flex w-full items-center flex-1 justify-between p-4">
            <Link href="/#">
              <Image
                src="/logos/MerMer.svg"
                alt="MerMer_logo"
                width={0}
                height={0}
                style={{width: '150px', height: 'auto'}}
              />
            </Link>

            <button className="flex lg:hidden space-y-1 flex-col" onClick={showMenuHandler}>
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
