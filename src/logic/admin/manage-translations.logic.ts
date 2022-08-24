import { LanguageSchema } from '../../pages/admin/manage-languages/schemas/language.schema';

export const onSelectPage = (title: string): any => {
  return LanguageSchema.find((item) => item.title === title);
};
