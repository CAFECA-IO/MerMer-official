import Image from 'next/image';
import MerMerButton from '../../components/mermer_button/mermer_button';
import {Dispatch, SetStateAction} from 'react';
import {FiChevronDown} from 'react-icons/fi';
import {FaMapMarkerAlt} from 'react-icons/fa';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';

interface IHiringItemProps {
  jobTitle: string;
  details: string[];
  descriptions: string[];
  requirements: string[];
  showJobIndex: string;
  setShowJobIndex: Dispatch<SetStateAction<string>>;
}

const HiringItem = ({
  jobTitle,
  details,
  descriptions,
  requirements,
  showJobIndex,
  setShowJobIndex,
}: IHiringItemProps) => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  // Info: (20230630 - Julian) 如果 showJobIndex === jobTitle ，則 isShow 為 true，反之為 false
  const isShow = showJobIndex === jobTitle;

  /* Info: (20230630 - Julian) 點擊 item 時將 showJobIndex 設為目前的 jobTitle
   * 如果已經是目前的 jobTitle 則收合 */
  const clickHandler = () => {
    if (showJobIndex !== jobTitle) {
      setShowJobIndex(jobTitle);
    } else {
      setShowJobIndex('');
    }
  };

  // Info: (20230630 - Julian) Email 主旨
  const emailSubject = `${t('HIRING_PAGE.EMAIL_SUJECT')}: ${t(jobTitle)}`;

  const displayDescription = descriptions.map(item => {
    return <li key={item}>{t(item)}</li>;
  });

  const displayRequirements = requirements.map(item => {
    return <li key={item}>{t(item)}</li>;
  });

  return (
    <div
      className={`relative flex w-full flex-col items-start space-y-1 rounded-large ${
        isShow ? 'px-5 pb-0 pt-5 lg:px-10 lg:pt-10' : 'p-5 lg:p-10' // Info: (20230630 - Julian) 避免擋到 Apply Button 的光暈
      } bg-mermerTheme`}
    >
      {/* Info: (20230630 - Julian) Title & Detail */}
      <div className="flex-col">
        <h1 className="text-2xl font-bold">{t(jobTitle)}</h1>
        {/* Info: (20230630 - Julian) Details part */}
        <ul className="flex flex-wrap items-center divide-x pr-10 text-sm font-normal">
          <li className="my-2 pr-2">{t(details[0])}</li>
          <li className="my-2 px-2">{t(details[1])}</li>
          <li className="my-2 flex items-center space-x-1 pl-2">
            <FaMapMarkerAlt />
            <p>{t(t(details[2]))}</p>
          </li>
        </ul>
      </div>
      {/* Info: (20230630 - Julian) Toggle Button */}
      <div onClick={clickHandler} className="absolute right-5 lg:right-10 lg:top-12">
        <MerMerButton className="p-10px">
          <span
            className={`${isShow ? 'rotate-180' : 'rotate-0'} transition-all duration-150 ease-in`}
          >
            <FiChevronDown />
          </span>
        </MerMerButton>
      </div>

      <div
        className={`grid w-full grid-cols-1 overflow-hidden ${
          isShow ? 'grid-rows-1' : 'grid-rows-0' // Info: (20230630 - Julian) for collapse animation
        } transition-grid duration-700 ease-in-out`}
      >
        <div className={`flex w-full flex-col pt-5 lg:pt-10`}>
          {/* Info: (20230630 - Julian) Job Descriptions part */}
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">{t('HIRING_PAGE.JOB_DESCRIPTION')}:</h1>
            <ul className="list-disc p-5">{displayDescription}</ul>
          </div>
          {/* Info: (20230630 - Julian) Job Requirements part */}
          <div className="flex w-full flex-col">
            <h1 className="text-lg font-bold">{t('HIRING_PAGE.JOB_REQUIREMENT')}:</h1>
            <ul className="list-disc p-5">{displayRequirements}</ul>
          </div>

          {/* Info: (20230630 - Julian) Apply Button */}
          <div className="mx-auto py-5 lg:py-10">
            <a href={`mailto:julian.hsu@mermer.cc?subject=${emailSubject}`}>
              <MerMerButton className="space-x-2 px-10 py-10px">
                <Image src="/icons/star.svg" alt="" width={24} height={24} />
                <p className="text-lg font-bold">{t('HIRING_PAGE.APPLY_BUTTON')}</p>
              </MerMerButton>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringItem;
