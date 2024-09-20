export type AccessTokenPayload = {
  role: string;
  sub: string;
};

export type RefreshTokenPayload = AccessTokenPayload & {
  email: string;
};
