// --- generate random uid for new
const Uid = len => {
  let IDX = 36,
    HEX = '';
  while (IDX--) HEX += IDX.toString(36);
  let str = '',
    num = len || 11;
  while (num--) str += HEX[(Math.random() * 36) | 0];
  return str;
};

export default Uid;
