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
/// ... imports
import fasteerJwt from "@fasteerjs/jwt"

const fasteer = hookFastify({}) // the Fasteer instance

fasteer.plugin(fasteerJwt({ secret: "theJwtSecret" }))
```

## Usage

### Creating JWT tokens
```ts
const HelloController = async (fastify, { $jwt }) => {
  fastify.get("/new-token", async (req, res) => {
    // .. your route logic
    const token = $jwt.sign({ the: "payload" }) // your new JWT token
  })
}

export default HelloController
```

<hr>
<br>

#### 2021 &copy; Froneb s.r.o. and Filip Vottus &ndash; Licensed under MIT (see the LICENSE file).