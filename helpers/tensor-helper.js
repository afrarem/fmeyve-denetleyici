import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native';

import {Base64Binary} from '../utils/utils';
const BITMAP_DIMENSION = 224;

const modelJson = require('../model/model.json');
//const modelWeights = require('../model/weights.bin');

const TENSORFLOW_CHANNEL = 3;

export const getModel = async () => {
  try {
    
    await tf.ready();
    
    return await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
  } catch (error) {
    console.log('Could not load model', error);
  }
};

export const convertBase64ToTensor = async (base64) => {
  try {
    const uIntArray = Base64Binary.decode(base64);

    const decodedImage = decodeJpeg(uIntArray, 3);
    
    return decodedImage.reshape([
      1,
      BITMAP_DIMENSION,
      BITMAP_DIMENSION,
      TENSORFLOW_CHANNEL,
    ]);
  } catch (error) {
    console.log('Could not convert base64 string to tesor', error);
  }
};

export const startPrediction = async (model, tensor) => {
  
  try {
    
    const output = await model.predict(tensor);
    
    return output.dataSync();
  } catch (error) {
    console.log('Error predicting from tesor image', error);
  }
};


