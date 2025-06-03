import {useState} from 'react';
import useInputNumber from '../../lib/hooks/use_input_number';
import Image from 'next/image';
import MerMerButton from '../mermer_button/mermer_button';
import {useTranslation} from 'next-i18next';
import {TranslateFunction} from '../../interfaces/locale';
import {visitTimeOptions} from '../../constants/config';
import {checkboxStyle, inputStyle, radioStyle} from '../../constants/display';

enum MeetingLocation {
  OUR_ADDRESS = 'our_address',
  CUSTOMER_ADDRESS = 'customer_address',
}

const ContactUsForm = () => {
  const {t}: {t: TranslateFunction} = useTranslation('common');

  // Info: (20230629 - Julian) 信件送出的時間
  const now = new Date().toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'});

  // Info: (20230629 - Julian) 是否顯示動畫 & 顯示哪個動畫
  const [showAnim, setShowAnim] = useState<boolean>(false);
  const [animation, setAnimation] = useState<string>('');

  const [inputCompanyName, setInputCompanyName] = useState<string>('');
  const [inputName, setInputName] = useState<string>('');
  const [inputPhone, setInputPhone] = useInputNumber('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputBrief, setInputBrief] = useState<string>('');
  const [selectedVisitTime, setSelectedVisitTime] = useState<string[]>([]);
  const [selectedMeetingLocation, setSelectedMeetingLocation] = useState<MeetingLocation>(
    MeetingLocation.OUR_ADDRESS
  );
  const [customerAddress, setCustomerAddress] = useState<string>('');

  // Info: (20230628 - Julian) input change handler
  const companyNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputCompanyName(event.target.value);
  };
  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };
  const phoneChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPhone(event.target.value);
  };
  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };
  const briefChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputBrief(event.target.value);
  };
  const customerAddressChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerAddress(event.target.value);
    if (event.target.value !== '') {
      setSelectedMeetingLocation(MeetingLocation.CUSTOMER_ADDRESS);
    }
  };

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
    setInputBrief('');
    setSelectedVisitTime([]);
    setSelectedMeetingLocation(MeetingLocation.OUR_ADDRESS);
    setCustomerAddress('');
    setShowAnim(false);
  };

  // Info: (20230629 - Julian) 按下送出按鈕後做的事
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    // Info: (20230629 - Julian) 顯示送出中(火箭)動畫
    setAnimation('sending');
    setShowAnim(true);

    try {
      event.preventDefault();

      const emailData = {
        comment: `<h3>企業名稱：${inputCompanyName}</h3>
        <h3>聯絡人：${inputName}</h3>
        <h3>聯絡電話：${inputPhone}</h3>
        <h3>電子郵件：${inputEmail}</h3>
        <h3>產業概述：${inputBrief}</h3>
        <h3>訪談時段：${selectedVisitTime.map(v => `${v}, `)}</h3>
        <h3>訪談地點：${
          selectedMeetingLocation === MeetingLocation.OUR_ADDRESS
            ? t('FOOTER.ADDRESS')
            : customerAddress
        }</h3>
        <p>${now}<p>`,
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

  // Info: (20250602 - Julian) 訪談時段(勾選)
  const displayedVisitOptions = visitTimeOptions.map(option => {
    const isSelected = selectedVisitTime.includes(option);
    const changeHandler = () => {
      if (isSelected) {
        // Info: (20250602 - Julian) 如果已經選擇了，就從 selectedVisitTime 中移除
        setSelectedVisitTime(selectedVisitTime.filter(time => time !== option));
      } else {
        // Info: (20250602 - Julian) 如果沒有選擇，就加入 selectedVisitTime
        setSelectedVisitTime([...selectedVisitTime, option]);
      }
    };

    return (
      <div className="flex items-center gap-12px text-sm hover:cursor-pointer">
        <input
          id={option}
          type="checkbox"
          checked={isSelected}
          onChange={changeHandler}
          className={checkboxStyle}
          required={selectedVisitTime.length === 0}
        />
        <label htmlFor={option}>{option}</label>
      </div>
    );
  });

  const animText =
    animation === 'sending' ? null : (
      <p className="text-xl font-bold">
        {animation === 'success'
          ? t('CONTACT_US_FORM.CONTACT_US_SUCCESS')
          : animation === 'failed'
          ? t('CONTACT_US_FORM.CONTACT_US_ERROR')
          : ''}
      </p>
    );

  const animPart = showAnim ? (
    <div className="absolute flex size-full flex-col items-center justify-center space-y-4">
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
    <form
      onSubmit={submitHandler}
      className={`flex w-full flex-col items-center gap-48px px-5 py-12 lg:px-12 lg:py-8 ${
        showAnim ? 'opacity-0' : 'opacity-100'
      } transition-opacity duration-300 ease-in-out`}
    >
      {/* Info: (20250602 - Julian) 標題 */}
      <div className="flex flex-col items-stretch space-y-2">
        <h1 className="text-2xl font-bold sm:text-42px">{t('CONTACT_US_FORM.TITLE')}</h1>
        <p className="text-sm sm:text-lg">{t('CONTACT_US_FORM.SUBTITLE')}</p>
      </div>

      <div className="grid w-full grid-cols-2 gap-16px">
        {/* Info: (20250602 - Julian) 企業名稱 */}
        <div className="flex flex-col items-start">
          <label htmlFor="company_name" className="text-sm sm:text-base">
            {t('CONTACT_US_FORM.COMPANY_NAME')}
          </label>
          <input
            className={`mt-2 ${inputStyle}`}
            id="company_name"
            type="text"
            onChange={companyNameChangeHandler}
            value={inputCompanyName || ''}
            placeholder="ASDF Inc."
          />
        </div>

        {/* Info: (20250602 - Julian) 聯絡人 */}
        <div className="flex flex-col items-start">
          <label htmlFor="name" className="text-sm sm:text-base">
            {t('CONTACT_US_FORM.NAME')}
          </label>
          <input
            className={`mt-2 ${inputStyle}`}
            id="name"
            type="text"
            onChange={nameChangeHandler}
            value={inputName || ''}
            placeholder="John"
          />
        </div>

        {/* Info: (20250602 - Julian) 聯絡電話 */}
        <div className="flex flex-col items-start">
          <label htmlFor="phone" className="text-sm sm:text-base">
            {t('CONTACT_US_FORM.PHONE_NUMBER')}
          </label>
          <input
            className={`mt-2 ${inputStyle}`}
            id="phone"
            type="text"
            onChange={phoneChangeHandler}
            value={inputPhone || ''}
            placeholder="0912345678"
          />
        </div>

        {/* Info: (20250602 - Julian) 電子郵件 */}
        <div className="flex flex-col items-start">
          <label htmlFor="email" className="text-sm sm:text-base">
            {t('CONTACT_US_FORM.EMAIL')}
          </label>
          <input
            className={`mt-2 ${inputStyle}`}
            id="email"
            type="email"
            onChange={emailChangeHandler}
            value={inputEmail || ''}
            placeholder="john@abc.def"
            required
          />
        </div>

        {/* Info: (20250602 - Julian) 產業概述 */}
        <div className="col-span-2 flex flex-col items-start">
          <label htmlFor="brief" className="text-sm sm:text-base">
            {t('CONTACT_US_FORM.WHAT_DOES')}
          </label>
          <input
            className={`mt-2 ${inputStyle}`}
            id="brief"
            type="text"
            onChange={briefChangeHandler}
            value={inputBrief || ''}
            placeholder={t('CONTACT_US_FORM.WHAT_DOES_PLACEHOLDER')}
          />
        </div>

        {/* Info: (20250602 - Julian) 訪談時段 */}
        <div className="col-span-2 flex flex-col items-start gap-16px">
          <p>{t('CONTACT_US_FORM.VISIT_TIME')}:</p>
          <div className="flex flex-wrap items-center gap-24px">{displayedVisitOptions}</div>
        </div>

        {/* Info: (20250602 - Julian) 訪談地點 */}
        <div className="col-span-2 flex flex-col items-start gap-16px">
          <p>{t('CONTACT_US_FORM.MEETING_LOCATION')}:</p>
          {/* Info: (20250602 - Julian) 墨沫地址 */}
          <div className="flex items-center gap-12px text-sm sm:text-base">
            <input
              id={MeetingLocation.OUR_ADDRESS}
              type="radio"
              name="meeting_location"
              checked={selectedMeetingLocation === MeetingLocation.OUR_ADDRESS}
              onChange={() => setSelectedMeetingLocation(MeetingLocation.OUR_ADDRESS)}
              className={radioStyle}
            />
            <label htmlFor={MeetingLocation.OUR_ADDRESS}>{t('FOOTER.ADDRESS')}</label>
          </div>
          {/* Info: (20250602 - Julian) 客戶地址輸入框 */}
          <div className="flex w-full items-center gap-12px">
            <input
              id={MeetingLocation.CUSTOMER_ADDRESS}
              type="radio"
              name="meeting_location"
              checked={selectedMeetingLocation === MeetingLocation.CUSTOMER_ADDRESS}
              onChange={() => setSelectedMeetingLocation(MeetingLocation.CUSTOMER_ADDRESS)}
              className={radioStyle}
            />
            <input
              id="custom_address"
              type="text"
              value={customerAddress}
              onChange={customerAddressChangeHandler}
              placeholder={t('CONTACT_US_FORM.OTHER_LOCATION')}
              className={inputStyle}
              required={selectedMeetingLocation === MeetingLocation.CUSTOMER_ADDRESS}
            />
          </div>
        </div>
      </div>

      <MerMerButton className="gap-8px px-10 py-10px" id="submit" type="submit">
        <Image src="/icons/sent.svg" alt="" width={24} height={24} />
        <p className="text-lg font-bold">{t('CONTACT_US_FORM.CONTACT_US_SUBMIT')}</p>
      </MerMerButton>
    </form>
  );

  const displayContactUsForm = (
    <div className="relative flex h-auto w-max flex-col items-center overflow-hidden rounded-3xl bg-mermerTheme text-center shadow-drop">
      {formPart}
      {animPart}
    </div>
  );

  return (
    <div id="contact-us" className="relative flex w-full py-20 font-Dosis text-lightWhite1">
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
      <div className="absolute top-0 block h-200px w-full lg:hidden">
        <Image
          src="/elements/jodie_Friendly_female_AI_2.png"
          alt=""
          fill
          style={{objectFit: 'cover'}}
        />
      </div>

      <div className="z-20 flex w-full justify-center px-4 py-24 lg:ml-auto lg:w-auto lg:px-160px lg:py-10">
        {displayContactUsForm}
      </div>
    </div>
  );
};

export default ContactUsForm;
