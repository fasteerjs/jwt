# Fasteer.js JWT

Small wrapper class around `jsonwebtoken` for JWT tokens.

## Getting Started

This library is a Fasteer plugin. All you need to do is install it and register it.

### Installation

```bash
$ npm i @fasteerjs/jwt
# or if you are using Yarn
$ yarn add @fasteerjs/jwt
```

### Registering

```ts
import { hookFastify } from "@fasteerjs/fasteer"
// -- or -- const { hookFastify } = require("@fasteerjs/fasteer")

import fasteerJwt from "@fasteerjs/jwt"
// -- or -- const { fasteerJwt } = require("@fasteerjs/jwt")

const fasteer = hookFastify({}) // the Fasteer instance

fasteer.plugin(fasteerJwt({ secret: "theJwtSecret" }))
```

## Usage

### Creating JWT tokens

You can use the `sign(payload: string | object)` function to create JWT tokens.

```ts
const HelloController = async (fastify, { $jwt }) => {
  fastify.get("/new-token", async (req, res) => {
    // .. your route logic
    const token = $jwt.sign({ the: "payload" }) // your new JWT token
  })
}

export default HelloController
```

### Decoding JWT tokens

You can use the `decode(token: string, verify: boolean = true)` function to decode JWT tokens.
When `verify` is set to true (by default it is), the token signature is verified (using `jsonwebtoken`'s `verify` function).

```ts
const HelloController = async (fastify, { $jwt }) => {
  // warning: having the token in the URL is insecure!
  fastify.get("/check-token/:token", async (req, res) => {
    // .. your route logic
    const payload = $jwt.decode(req.params.token)
  })
}

export default HelloController
```

<hr>
<br>

#### 2021 &copy; Froneb s.r.o. and Filip Vottus &ndash; Licensed under MIT (see the LICENSE file).
