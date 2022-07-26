import VKCaptchaSolver from 'vk-captchasolver'

const captcha_url = 'https://api.vk.com/captcha.php?sid=74838345480543&s=1'
console.log('Captcha key is', await VKCaptchaSolver(captcha_url))

VKCaptchaSolver(captcha_url).then(key => {
    console.log('Captcha key is', key)
})