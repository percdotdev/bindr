import { defineErrorCodes } from 'better-auth';

export const STEAM_ERROR_CODES = defineErrorCodes({
  STEAM_ACCOUNT_IN_USE: 'This Steam account is linked to another user.',
  STEAM_ALREADY_LINKED: 'This user already has a Steam account linked.',
  STEAM_LINK_FAILED: 'The Steam account could not be linked.',
  STEAM_SIGN_IN_FAILED: 'Signing in with Steam failed.',
  STEAM_UNTRUSTED_REDIRECT: 'The redirect URL is not a trusted origin.',
  STEAM_VERIFICATION_FAILED: 'Steam could not verify the sign-in.',
});

export type SteamErrorCode = keyof typeof STEAM_ERROR_CODES;
