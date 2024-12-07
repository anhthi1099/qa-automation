export const trimExcessWhiteSpace = (s: string) => {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/[\n\r]+|[\s]{2,}/g, ' ')
    .replace(/([^\w ]|_)/g, '')
    .trim();
};

export function convertWordToNumber(orderInText: string): number {
  const mapObject = {
    '1st': 0,
    '2nd': 1,
    '3rd': 2,
    '4th': 3,
    '5th': 4,
    '6th': 5,
    '7th': 6,
    '8th': 7,
    '9th': 8,
    '10th': 9,
  };

  return mapObject[orderInText as keyof typeof mapObject] || 0;
}
