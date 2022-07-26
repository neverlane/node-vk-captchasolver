[npm-version-badge]: https://img.shields.io/npm/v/vk-captchasolver.svg
[npm-license-badge]: https://img.shields.io/npm/l/vk-captchasolver.svg
[npm-downloads-badge]: https://img.shields.io/npm/dm/vk-captchasolver.svg
[npm-link]: https://npmjs.com/package/vk-captchasolver

# VKCaptchaSolver
[![NPM][npm-version-badge]][npm-link] [![NPM][npm-license-badge]][npm-link] [![NPM][npm-downloads-badge]][npm-link]

Models from [Defasium/vkCaptchaBreaker](https://github.com/Defasium/vkCaptchaBreaker)

### Install
```npm i vk-captchasolver```

### Usage
```js
import VKCaptchaSolver from 'vk-captchasolver'

const captcha_url = 'https://api.vk.com/captcha.php?sid=74838345480543&s=1'
const result = await VKCaptchaSolver(captcha_url)

// or
VKCaptchaSolver(captcha_url).then(function (result) {
    
})
```