export enum ExceptionCode {
  SUCCESS,
  SERVER_ERROR,
  PARAMETER_ERROR,
  CAPTCHA_ERROR,
  GET_LOGIN_CODE_TOO_FREQUENT,
  WRONG_LOGIN_CODE,
}

export const EXCEPTION_CODE_MAP: Record<
  ExceptionCode,
  {
    description: string;
  }
> = {
  [ExceptionCode.SUCCESS]: {
    description: '成功',
  },
  [ExceptionCode.SERVER_ERROR]: {
    description: '服务器错误',
  },
  [ExceptionCode.PARAMETER_ERROR]: {
    description: '参数错误',
  },
  [ExceptionCode.CAPTCHA_ERROR]: {
    description: '图形验证码错误',
  },
  [ExceptionCode.GET_LOGIN_CODE_TOO_FREQUENT]: {
    description: '获取登录验证码过于频繁',
  },
  [ExceptionCode.WRONG_LOGIN_CODE]: {
    description: '错误的登录验证码',
  },
};
