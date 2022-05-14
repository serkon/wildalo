export const getRandomID = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

export const Random = () => {
  const array = new Uint16Array(4);
  const t = self.crypto.getRandomValues(array).join('-');
  return t;
};
