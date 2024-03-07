# [1.1.0-dev.5](https://github.com/Maghwyn/meme-rn-api/compare/v1.1.0-dev.4...v1.1.0-dev.5) (2024-03-07)


### Bug Fixes

* **typos:** Missing property in the projection, renamed variables and fix the type of upload ([8c53189](https://github.com/Maghwyn/meme-rn-api/commit/8c53189879f78ef917b43be987efdd8f4e3b3bdb))

# [1.1.0-dev.4](https://github.com/Maghwyn/meme-rn-api/compare/v1.1.0-dev.3...v1.1.0-dev.4) (2024-03-07)


### Bug Fixes

* **uploads:** Register the uploads module ([e3d780e](https://github.com/Maghwyn/meme-rn-api/commit/e3d780ee84488296216f51b01193a24704a31df7))


### Features

* **constants:** Add the categories constant ([8795479](https://github.com/Maghwyn/meme-rn-api/commit/8795479c153691bcb35eb8b59b4e4490cf6ab0e7))
* **meme-dto:** Define the dto validation ([84b67eb](https://github.com/Maghwyn/meme-rn-api/commit/84b67eb78d554513839f752f9ef52e5ffe942ae9))
* **memes-module:** Define a basic memes module ([9432962](https://github.com/Maghwyn/meme-rn-api/commit/94329620f7f9a8d23ad9ae18b7e2d78fba933e78))
* **utils:** Define a meme pipeline ([c50a333](https://github.com/Maghwyn/meme-rn-api/commit/c50a333287669d526aa1cf00c103bbcd88728b2d))

# [1.1.0-dev.3](https://github.com/Maghwyn/meme-rn-api/compare/v1.1.0-dev.2...v1.1.0-dev.3) (2024-03-07)


### Bug Fixes

* **env:** Prefix with NEST_ and add the app file size mb limit ([506d22d](https://github.com/Maghwyn/meme-rn-api/commit/506d22d10af476601a183ab14266725c1c8f8e84))
* **eslint:** Fix the eslint configuration when it comes to the ignore ([b61bb48](https://github.com/Maghwyn/meme-rn-api/commit/b61bb486cfdd8307a8efa11f240f25d31cb087f9))
* **module:** Move the uploads outside of the meme module ([166207d](https://github.com/Maghwyn/meme-rn-api/commit/166207ddb9c60c43ab4935694147e64ede3428bc))
* **semantic-release:** Bump the version and change the commit message + remove todo ([d3be69e](https://github.com/Maghwyn/meme-rn-api/commit/d3be69ea519075ebea30bde338f480913db62ab9))


### Features

* **meme-module:** Register and setup the meme module ([6e7c102](https://github.com/Maghwyn/meme-rn-api/commit/6e7c10246ba996b5ef18c3a54014d52ca491819f))
* **meme-repo:** Setup the memes repository ([31c6135](https://github.com/Maghwyn/meme-rn-api/commit/31c6135604a5a19af0d2c4c767c25569872efdbb))
* **uploads-repository:** Implement the gridfsbucket upload repo ([a0677fa](https://github.com/Maghwyn/meme-rn-api/commit/a0677faf71afbcebc97418569d683992a67c0cc6))

# [1.1.0-dev.2](https://github.com/Maghwyn/meme-rn-api/compare/v1.1.0-dev.1...v1.1.0-dev.2) (2024-03-06)


### Bug Fixes

* **mailjet:** Remove reset password token ([dbfec1e](https://github.com/Maghwyn/meme-rn-api/commit/dbfec1e416e6c238fde3d609890ced9638f1bbae))


### Features

* **env:** Resolve the mailjet template id and move them to the env ([51a6428](https://github.com/Maghwyn/meme-rn-api/commit/51a6428bc4f565e4c35a89c7115e8337c0ce9f8c))

# [1.1.0-dev.1](https://github.com/Maghwyn/meme-rn-api/compare/v1.0.0...v1.1.0-dev.1) (2024-03-06)


### Bug Fixes

* **linter:** Fix the linter of the api ([6d4b993](https://github.com/Maghwyn/meme-rn-api/commit/6d4b9938c09778ae6a31cb7dea90bedad781d7af))


### Features

* **dto:** Define some dto to validate the payload received by the api before executing the logic ([d5ab1e7](https://github.com/Maghwyn/meme-rn-api/commit/d5ab1e74ca1759f5906be1429f274a7d3ea37354))
* **module:** Create the auth module with signin/signup/activation ([ff7f262](https://github.com/Maghwyn/meme-rn-api/commit/ff7f2621ccdde1e8f9a8544de9a6f437adb2f696))
* **module:** Register the auth module ([ad51b4d](https://github.com/Maghwyn/meme-rn-api/commit/ad51b4dacb86a3ed09cdb49a658d1207c10fdab7))
* **repository:** Define the token repository to activate an account ([273e766](https://github.com/Maghwyn/meme-rn-api/commit/273e766be8bf691a16a815323ecb7c0c6af6b1b5))
* **strategies:** Add the jwt and local strategy for authentification ([27c1bc0](https://github.com/Maghwyn/meme-rn-api/commit/27c1bc02fb9100853d276ab624ad6ec430f04e72))

# 1.0.0 (2024-03-06)


### Bug Fixes

* **yarn:** Prevent yarn install from running script during the ci, which conflict between commitling and semantic-release commit format ([f86c7ff](https://github.com/Maghwyn/meme-rn-api/commit/f86c7ffd912001acdc3c79c614a9711054bf6e77))


### Features

* **husky:** Install commitlint to help with semantic-release ([3a56080](https://github.com/Maghwyn/meme-rn-api/commit/3a560801699667944d673b8b5a49d91f835f8abd))
