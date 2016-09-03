const min = Math.min;
const max = Math.max;

export default {
  processPitchMotion(value) {
    value = max(0, min(90, value)); // clip
    return value / 90; // normalize
  },
};
