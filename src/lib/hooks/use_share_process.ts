import {ISocialMedia, ShareSettings, SocialMediaConstant} from '../../constants/social_media';
import {DOMAIN} from '../../constants/config';
import {MERURL} from '../../constants/url';

interface IShare {
  socialMedia: ISocialMedia;
  text?: string;
  size?: string;
}

interface IShareToSocialMedia {
  url: string;
  text?: string;
  type: string;
  size: string;
}

interface IUseShareProcess {
  shareId: string;
}

const useShareProcess = ({shareId}: IUseShareProcess) => {
  const share = async ({socialMedia, text, size}: IShare) => {
    switch (socialMedia) {
      case SocialMediaConstant.FACEBOOK:
        await shareOn({
          url: ShareSettings.FACEBOOK.url,
          type: ShareSettings.FACEBOOK.type,
          text,
          size: size ? size : ShareSettings.FACEBOOK.size,
        });
        break;

      case SocialMediaConstant.TWITTER:
        await shareOn({
          url: ShareSettings.TWITTER.url,
          type: ShareSettings.TWITTER.type,
          text,
          size: size ? size : ShareSettings.TWITTER.size,
        });
        break;

      case SocialMediaConstant.REDDIT:
        await shareOn({
          url: ShareSettings.REDDIT.url,
          type: ShareSettings.REDDIT.type,
          text,
          size: size ? size : ShareSettings.REDDIT.size,
        });
        break;

      case SocialMediaConstant.LINKEDIN:
        await shareOn({
          url: ShareSettings.LINKEDIN.url,
          type: ShareSettings.LINKEDIN.type,
          text,
          size: size ? size : ShareSettings.LINKEDIN.size,
        });
        break;
    }
    increaseShareCount();
  };

  const shareOn = ({url, text, type, size}: IShareToSocialMedia) => {
    const shareUrl = `${DOMAIN}${MERURL.KM}/${shareId}`;
    if (shareUrl === '') throw new Error('Share url is empty');

    window.open(
      `${url}${encodeURIComponent(shareUrl)}${text ? `${text}` : ''}`,
      `${type}`,
      `${size}`
    );
  };

  const increaseShareCount = async () => {
    const response = await fetch(`/api/kms/${shareId}/increaseShareCount`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to increase share count');
    }
  };
  return {share};
};

export default useShareProcess;
