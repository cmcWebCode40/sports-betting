export interface SiteSettingModel {
  name: string;
  email: string;
  socialLinks: {
    twitter: string;
    facebook: string;
    instagram: string;
    telegram: string;
  };
  language: string[];
  translations: {
    code: string;
    icon: string;
    name: string;
  }[];
}
