import {useState} from 'react';
import useInputNumber from '../../lib/hooks/use_input_number';
import Image from 'next/image';
import MerMerButton from '../mermer_button/mermer_button';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';

const ContactUsForm = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  // Info: (20230629 - Julian) 信件送出的時間
  const now = new Date().toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'});

  // Info: (20230629 - Julian) 是否顯示動畫 & 顯示哪個動畫
  const [showAnim, setShowAnim] = useState(false);
  const [animation, setAnimation] = useState<string>('');

  const [inputName, setInputName] = useState('');
  const [inputPhone, setInputPhone] = useInputNumber('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  // Info: (20230628 - Julian) input change handler
  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };
  const phoneChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPhone(event.target.value);
  };
  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };
  const messageChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(event.target.value);
  };

  // Info: (20230628 - Julian) 驗證信箱格式
  const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
  const emailIsValid = emailRule.test(inputEmail);

  // Info: (20230629 - Julian) 信件送出失敗的處理
  const failedProcess = async () => {
    setAnimation('failed');
    setShowAnim(true);

    // Info: (20230629 - Julian) 3 秒顯示動畫
    await new Promise(resolve => setTimeout(resolve, 3000));
    setShowAnim(false);
    setAnimation('');
  };

  // Info: (20230629 - Julian) 信件送出成功的處理
  const successProcess = async () => {
    setAnimation('success');
    setShowAnim(true);

    // Info: (20230629 - Julian) 3 秒顯示動畫
    await new Promise(resolve => setTimeout(resolve, 3000));
    // Info: (20230629 - Julian) 清空表單
    setInputName('');
    setInputPhone('');
    setInputEmail('');
    setInputMessage('');
    setShowAnim(false);
  };

  // Info: (20230629 - Julian) 按下送出按鈕後做的事
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    // Info: (20230629 - Julian) 先驗證信箱格式，不符合就直接 return
    if (!emailIsValid) {
      return;
    }

    // Info: (20230629 - Julian) 顯示送出中(火箭)動畫
    setAnimation('sending');
    setShowAnim(true);

    try {
      event.preventDefault();

      const emailData = {
        comment: `<h3>姓名：${inputName}</h3><h3>手機：${inputPhone}</h3><h3>Email：${inputEmail}</h3><h3>意見：${inputMessage}</h3><p>${now}<p>`,
      };

      // Info: (20230629 - Julian) 3 秒顯示動畫
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Info: (20230629 - Julian) call API
      const res = await fetch('/api/email', {
        method: 'POST',
        body: JSON.stringify(emailData),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      const result = await res.json();

      const success = result.success;
      if (success) {
        await successProcess();
      } else {
        await failedProcess();
      }
    } catch (error) {
      await failedProcess();
    }
  };

  const animText =
    animation === 'sending' ? null : (
      <p className="text-xl font-bold">
        {animation === 'success'
          ? t('HOME_PAGE.CONTACT_US_SUCCESS')
          : animation === 'failed'
          ? t('HOME_PAGE.CONTACT_US_ERROR')
          : ''}
      </p>
    );

  const animPart = showAnim ? (
    <div className="absolute flex h-full w-full flex-col items-center justify-center space-y-4">
      {animation === 'sending' ? (
        /* Info: (20230629 - Julian) sending animation */
        <Image
          src="/animations/rocket.gif"
          alt="feedback_is_sending"
          fill
          style={{objectFit: 'cover'}}
        />
      ) : animation === 'success' ? (
        /* Info: (20230629 - Julian) success animation */
        <Image src="/animations/success.gif" alt="sent_successfully" width={150} height={150} />
      ) : (
        /* Info: (20230629 - Julian) failed animation */
        <Image src="/animations/error.gif" alt="something_wrong" width={100} height={100} />
      )}
      {animText}
    </div>
  ) : null;

  const formPart = (
    <div
      className={`flex w-full flex-col items-center space-y-12 ${
        showAnim ? 'opacity-0' : 'opacity-100'
      } px-5 py-12 transition-all duration-300 ease-in-out lg:p-12`}
    >
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-2xl font-bold sm:text-42px">{t('HOME_PAGE.CONTACT_US_TITLE')}</h1>
        <p className="text-sm sm:text-lg">{t('HOME_PAGE.CONTACT_US_DESCRIPTION')}</p>
      </div>

      <form onSubmit={submitHandler} className="flex w-full flex-col items-center space-y-4">
        <div className="flex w-full flex-col items-start">
          <label htmlFor="name" className="text-sm sm:text-base">
            {t('HOME_PAGE.CONTACT_US_NAME')}
          </label>
          <input
            className="mt-2 h-50px w-full bg-darkBlue3 px-4 py-2 text-sm text-lightGray1 sm:text-base"
            id="name"
            type="text"
            onChange={nameChangeHandler}
            value={inputName || ''}
          />
        </div>

        <div className="flex w-full flex-col items-start">
          <label htmlFor="phone" className="text-sm sm:text-base">
            {t('HOME_PAGE.CONTACT_US_PHONE')}
          </label>
          <input
            className="mt-2 h-50px w-full bg-darkBlue3 px-4 py-2 text-sm text-lightGray1 sm:text-base"
            id="phone"
            type="text"
            onChange={phoneChangeHandler}
            value={inputPhone || ''}
          />
        </div>

        <div className="flex w-full flex-col items-start">
          <label htmlFor="email" className="text-sm sm:text-base">
            *{t('HOME_PAGE.CONTACT_US_EMAIL')}
          </label>
          <input
            className="mt-2 h-50px w-full bg-darkBlue3 px-4 py-2 text-sm text-lightGray1 sm:text-base"
            id="email"
            type="text"
            onChange={emailChangeHandler}
            value={inputEmail || ''}
            required
          />
        </div>

        <div className="flex w-full flex-col items-start">
          <label htmlFor="message" className="text-sm sm:text-base">
            {t('HOME_PAGE.CONTACT_US_MESSAGE')}
          </label>
          <textarea
            className="mt-2 w-full bg-darkBlue3 px-4 py-2 text-sm text-lightGray1 sm:text-base"
            id="message"
            rows={7}
            wrap="soft"
            placeholder={t('HOME_PAGE.CONTACT_US_MESSAGE_PLACEHOLDER')}
            onChange={messageChangeHandler}
            value={inputMessage || ''}
            required
          />
        </div>

        <div className="flex flex-col items-center space-y-4 pt-5">
          <p className={emailIsValid ? 'opacity-0' : 'opacity-50'}>
            {t('HOME_PAGE.CONTACT_US_EMAIL_VERIFY')}
          </p>
          <MerMerButton
            className=" space-x-2 px-10 py-10px"
            id="submit"
            type="submit"
            disabled={emailIsValid ? false : true}
          >
            <Image src="/icons/sent.svg" alt="" width={24} height={24} />
            <p className="text-lg font-bold">{t('HOME_PAGE.CONTACT_US_SUBMIT')}</p>
          </MerMerButton>
        </div>
      </form>
    </div>
  );

  const displayContactUsForm = (
    <div className="relative flex h-auto w-full flex-col items-center overflow-hidden rounded-3xl bg-mermerTheme text-center shadow-drop lg:w-540px">
      {formPart}
      {animPart}
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

      <div className="z-20 mx-auto flex w-full px-4 py-24 lg:mx-0 lg:ml-auto lg:w-auto lg:px-160px lg:py-10">
        {displayContactUsForm}
      </div>
    </div>
  );
};

export default ContactUsForm;
