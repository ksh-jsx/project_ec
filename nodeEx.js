const changeAnt = (val) => {
  const regExp = /(.)\1*/g;
  let result = val
    .match(regExp)
    .reduce((a, b) => a + `${b.length}${b.slice(0, 1)}`, "");
  return result;
};

const antSeq = (val, cnt) => {
  if (cnt - 1 === 0) {
    console.log(val);
    return;
  } else antSeq(changeAnt(val), cnt - 1);
};

antSeq("1", 5);
