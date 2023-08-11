export type ISocialMedia = 'REDDIT' | 'FACEBOOK' | 'TWITTER' | 'LINKEDIN';

export interface ISocialMediaConstant {
  REDDIT: ISocialMedia;
  FACEBOOK: ISocialMedia;
  TWITTER: ISocialMedia;
  LINKEDIN: ISocialMedia;
}

export const SocialMediaConstant: ISocialMediaConstant = {
  REDDIT: 'REDDIT',
  FACEBOOK: 'FACEBOOK',
  TWITTER: 'TWITTER',
  LINKEDIN: 'LINKEDIN',
};

interface ISocialMediaSetting {
  url: string;
  text?: string;
  type: string;
  size: string;
}

export const ShareSettings: Record<ISocialMedia, ISocialMediaSetting> = {
  FACEBOOK: {
    url: 'https://www.facebook.com/sharer/sharer.php?u=',
    type: 'facebook-share-dialog',
    size: 'width=800,height=600',
  },
  TWITTER: {
    url: 'https://twitter.com/intent/tweet?url=',
    text: '&text=Check%20this%20out!',
    type: 'twitter-share-dialog',
    size: 'width=800,height=600',
  },
  REDDIT: {
    url: 'https://www.reddit.com/submit?url=',
    text: '&title=Check%20this%20out!',
    type: 'reddit-share-dialog',
    size: 'width=800,height=600',
  },
  LINKEDIN: {
    url: 'https://www.linkedin.com/sharing/share-offsite/?url=',
    type: 'linkedin-share-dialog',
    size: 'width=1200,height=627',
  },
};
