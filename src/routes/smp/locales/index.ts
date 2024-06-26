import en from './en';
import fr from './fr';
import ru from './ru';

export type LanguageSchema = typeof en & { credits?: string };

export const languages: { [K: string]: LanguageSchema } = { en, fr, ru };
