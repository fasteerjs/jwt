import { Fasteer } from "@fasteerjs/fasteer"
import {
  sign as jwtSign,
  verify as jwtVerify,
  decode as jwtDecode,
} from "jsonwebtoken"

export class Jwt {
  constructor(private secret: Parameters<typeof jwtSign>[1]) {}

  /**
   * Signs a payload and returns a string JWT token
   * @param {TPayload} payload The payload to sign.
   * @returns {}
   */
  sign<
    TPayload extends Parameters<typeof jwtSign>[0] = Parameters<
      typeof jwtSign
    >[0]
  >(payload: TPayload) {
    return jwtSign(payload, this.secret)
  }

  /**
   * Decodes the payload.
   *
   * @param {string} token The token to decode.
   * @param {boolean|undefined|null} verify Should the signature be verified?
   * @returns {TExpectedPayload | null} The payload or null if the token is invalid.
   */
  decode<TExpectedPayload extends string | object = string | object>(
    token: string,
    verify?: boolean | null
  ): TExpectedPayload | null {
    try {
      return (verify
        ? jwtVerify(token, this.secret)
        : jwtDecode(token)) as TExpectedPayload | null
    } catch (_) {
      return null
    }
  }
}

export interface JwtPluginOptions {
  secret: Parameters<typeof jwtSign>[1]
}

export const jwtPlugin = ({ secret }: JwtPluginOptions) => {
  return (fasteer: Fasteer.Fasteer) => fasteer.inject("$jwt", new Jwt(secret))
}

export default jwtPlugin
