import Image from 'next/image';
import MerMerButton from '../mermer_button/mermer_button';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';

const ContactUsForm = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  const displayContactUsForm = (
    <div className="flex h-auto flex-col items-center space-y-12 rounded-3xl bg-mermerTheme px-5 py-12 text-center shadow-drop lg:w-540px lg:p-12">
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-42px font-bold">{t('HOME_PAGE.CONTACT_US_TITLE')}</h1>
        <p className="text-lg">{t('HOME_PAGE.CONTACT_US_DESCRIPTION')}</p>
      </div>

      <form
        // ToDo: (20230628 - Julian) Add onSubmit function
        //onSubmit={() => console.log('submit')}
        className="flex w-full flex-col items-center space-y-4"
      >
        <div className="flex w-full flex-col items-start">
          <label htmlFor="name" className="text-base">
            {t('HOME_PAGE.CONTACT_US_NAME')}
          </label>
          <input
            className="mt-2 h-50px w-full bg-darkBlue3 px-4 py-2 text-base text-lightGray1"
            id="name"
            type="text"
          />
        </div>

        <div className="flex w-full flex-col items-start">
          <label htmlFor="phone" className="text-base">
            {t('HOME_PAGE.CONTACT_US_PHONE')}
          </label>
          <input
            className="mt-2 h-50px w-full bg-darkBlue3 px-4 py-2 text-base text-lightGray1"
            id="phone"
            type="text"
          />
        </div>

        <div className="flex w-full flex-col items-start">
          <label htmlFor="email" className="text-base">
            *{t('HOME_PAGE.CONTACT_US_EMAIL')}
          </label>
          <input
            className="mt-2 h-50px w-full bg-darkBlue3 px-4 py-2 text-base text-lightGray1"
            id="email"
            type="text"
            required
          />
        </div>

        <div className="flex w-full flex-col items-start">
          <label htmlFor="message" className="text-base">
            {t('HOME_PAGE.CONTACT_US_MESSAGE')}
          </label>
          <textarea
            className="mt-2 w-full bg-darkBlue3 px-4 py-2 text-base text-lightGray1"
            id="message"
            rows={7}
            wrap="soft"
            placeholder={t('HOME_PAGE.CONTACT_US_MESSAGE_PLACEHOLDER')}
            required
          />
        </div>

        <div className="pt-9">
          <MerMerButton className=" space-x-2 px-10 py-10px" id="submit" type="submit">
            <Image src="/icons/sent.svg" alt="" width={24} height={24} />
            <p className="text-lg font-bold">{t('HOME_PAGE.CONTACT_US_SUBMIT')}</p>
          </MerMerButton>
        </div>
      </form>
    </div>
  );

  return (
    <div id="contact_us" className="relative flex w-full py-20 font-Dosis text-lightWhite1">
      {/* Info: (20230628 - Julian) Picture for desktop */}
      <div className="absolute top-0 hidden h-600px w-3/5 lg:block">
        <Image
          src="/elements/jodie_Friendly_female_AI_1.png"
          alt=""
          fill
          style={{objectFit: 'contain'}}
        />
      </div>

      {/* Info: (20230628 - Julian) Picture for mobile */}
      <div className="absolute top-0 block h-200px w-screen lg:hidden">
        <Image
          src="/elements/jodie_Friendly_female_AI_2.png"
          alt=""
          fill
          style={{objectFit: 'cover'}}
        />
      </div>

      <div className="z-20 mx-auto flex px-4 py-24 lg:mx-0 lg:ml-auto lg:px-160px lg:py-10">
        {displayContactUsForm}
      </div>
    </div>
  );
};

export default ContactUsForm;
