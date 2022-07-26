import onnx from 'onnxjs'
import pkg from 'canvas'
const { createCanvas, loadImage } = pkg
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function VKCaptchaSolver (captcha_url) {
    return new Promise(async function (resolve, reject) {
        try {
            const codemap = ' 24578acdehkmnpqsuvxyz'

            const session = new onnx.InferenceSession({backendHint: 'cpu'})
            const session2 = new onnx.InferenceSession({backendHint: 'cpu'})

            await session.loadModel(__dirname + '/models/captcha_model.onnx')
            await session2.loadModel(__dirname + '/models/ctc_model.onnx')

            const width = 128
            const height = 64

            const canvas = createCanvas(width, height)
            const octx = canvas.getContext('2d')

            const img = await loadImage(captcha_url)
            octx.drawImage(img, 0, 0, width, height)

            const data = octx.getImageData(0, 0, width, height).data
            const input = Float32Array.from(data)

            const inputTensor = new onnx.Tensor(input, 'float32', [1, 4 * width * height])
            const outputTensor = (await session.run([inputTensor])).get('argmax')
            outputTensor.type = 'float32'
            outputTensor.internalTensor.type = 'float32'

            const outputMap2 = await session2.run([outputTensor])
            const outputData2 = outputMap2.values().next().value.data

            resolve(
                Array.from(outputTensor.data)
                    .filter(function (e, i) {
                        return Array.from(outputData2.values())[i] > 0
                    }).map((x, i) => codemap[x]).join('')
            )
        } catch (e) {
            reject(e)
        }
    })
}

export default VKCaptchaSolver