import { Fasteer } from "@fasteerjs/fasteer"
import { sign, verify } from "jsonwebtoken"

export class Jwt {
  constructor(private secret: Parameters<typeof sign>[1]) {}

  sign<
    TPayload extends Parameters<typeof sign>[0] = Parameters<typeof sign>[0]
  >(payload: TPayload) {
    return sign(payload, this.secret)
  }

  verify<TExpectedPayload extends string | object = string | object>(
    token: string
  ): TExpectedPayload {
    return verify(token, this.secret) as TExpectedPayload
  }
}

export interface JwtOptions {
  secret: Parameters<typeof sign>[1]
}

export const jwtPlugin = ({ secret }: JwtOptions) => {
  return (fasteer: Fasteer.Fasteer) => fasteer.inject("$jwt", new Jwt(secret))
}

export default jwtPlugin
