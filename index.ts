import * as faceapi from 'face-api.js';

import { canvas, faceDetectionNet, faceDetectionOptions } from './commons';

async function run() {

  await faceDetectionNet.loadFromDisk('weights')
  await faceapi.nets.faceLandmark68Net.loadFromDisk('weights')
  await faceapi.nets.faceExpressionNet.loadFromDisk('weights')

  const img = await canvas.loadImage('tempCamera/toDetectExpression.jpeg')

  const results = await faceapi.detectAllFaces(img, faceDetectionOptions)
    .withFaceExpressions()
  var personExpression = '';
  Object.keys(results[0].expressions).forEach(expression => {
    if (results[0].expressions[expression] > 0.7 && results[0].expressions[expression] <= 1) {
      personExpression = expression
    }
  });
  return personExpression;
}

run()