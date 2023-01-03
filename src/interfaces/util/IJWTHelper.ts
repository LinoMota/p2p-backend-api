export type Algorithm =
  | 'HS256'
  | 'HS384'
  | 'HS512'
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'ES256'
  | 'ES384'
  | 'ES512'
  | 'PS256'
  | 'PS384'
  | 'PS512'
  | 'none'

export interface jwtToken {
  token: string
}

export interface JwtSettings {
  expiresIn: string
  algorithm?: Algorithm | undefined
}

export default interface IJWTHelper {
  sign(data: any, settings: JwtSettings): string
  verify(token: string): any
  decode(token: string): any
}
