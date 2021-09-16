import {Pokemon} from './types';

const POKEMON_URL =
  'https://tdsx0etnl0.execute-api.us-east-1.amazonaws.com/true/api/pokemon';

export const fetchPokemon: () => Promise<Pokemon[]> = async () => {
  const response = await fetch(POKEMON_URL);
  const pokemon = await response.json();
  return pokemon;
};

/* COLORS */
const findHexBrightness = (color: string) => {
  let workingColor = color;

  if (
    workingColor === '#fff' ||
    workingColor === '#ffff' ||
    workingColor === 'transparent'
  ) {
    workingColor = '#ffffff';
  }

  const colorVal = parseInt(workingColor.replace('#', ''), 16);
  //tone-indifferent extractions to determine shade
  const extractR = (colorVal >> 16) & 0xff;
  const extractG = (colorVal >> 8) & 0xff;
  const extractB = (colorVal >> 0) & 0xff;
  const brightness = 0.2126 * extractR + 0.7152 * extractG + 0.0722 * extractB;

  return brightness;
};

const hexAccessibilityContrast = (
  colorA: string,
  colorB: string,
  large?: boolean
) => {
  const bestWCAGRatio = large ? 3 / 1 : 4.5 / 1;

  const aBrightness = findHexBrightness(colorA);
  const bBrightness = findHexBrightness(colorB);
  const ratio =
    aBrightness > bBrightness
      ? aBrightness / bBrightness
      : bBrightness / aBrightness;

  return ratio >= bestWCAGRatio;
};

const changeHexColor = (color: string, percent: number) => {
  let workingColor = color;
  let workingPercent = percent;
  const colorVal = parseInt(workingColor.replace('#', ''), 16);
  const brightness = findHexBrightness(workingColor);

  //if the color is too dark to be darkened, or too light to be lightened, reverse the goal shade
  if ((brightness < 60 && percent < 0) || (brightness > 225 && percent > 0)) {
    workingPercent = -percent;
  }

  //tone-preserving color conversion
  const changeAmount = Math.round(2.55 * workingPercent); //account for 0-255 instead of 0-100 color scale
  const R = (colorVal >> 16) + changeAmount;
  const G = (colorVal & 0x0000ff) + changeAmount;
  const B = ((colorVal >> 8) & 0x00ff) + changeAmount;

  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + //if R/G/B are too dark or too light, set to limit
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16) //convert back to hex string
      .slice(1) //remove inevitable leading 1
  );
};

export const darkenSlightly = (color: string) => changeHexColor(color, -15);

export const createContrastingColor = (color: string, large?: boolean) => {
  let workingPercent = -15;
  let contrastingColor = changeHexColor(color, workingPercent);
  while (!hexAccessibilityContrast(color, contrastingColor, large)) {
    workingPercent-=10;
    contrastingColor = changeHexColor(color, workingPercent);
  }
  return contrastingColor;
};