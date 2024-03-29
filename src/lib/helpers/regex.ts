export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/;
export const OTP_REGEX = /[0-9]{6}$/;
export const PROJECT_ID_REGEX = /^(blog|archive)\/([a-z0-9-]*)$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9.-_]{2,32}$/;
export const USERNAME_MENTION_REGEX = /^@([a-zA-Z0-9.-_]{2,32})\b/;
export const EMOJI_MENTION_REGEX = /^:([a-z0-9-_]+)\b:/;
export const PROJECT_MENTION_REGEX = /^#([a-z0-9-]+)\b/;
