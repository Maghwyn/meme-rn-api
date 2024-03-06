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
