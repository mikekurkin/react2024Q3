const passwordEntropy = (password: string) => {
  if (password.length === 0) return 0;
  const pools = [
    {
      regex: /[0-9]/,
      size: 10,
    },
    {
      regex: /[a-z]/,
      size: 26,
    },
    {
      regex: /[A-Z]/,
      size: 26,
    },
    {
      regex: /[а-я]/,
      size: 33,
    },
    {
      regex: /[А-Я]/,
      size: 33,
    },
    {
      regex: /[`~!@#$%^&*()\-=_+[{\]}\\]/,
      size: 32,
    },
  ];

  const poolSize = pools.map((pool) => (password.match(pool.regex) ? pool.size : 0)).reduce((a, b) => a + b);
  const length = password.length;

  return length * Math.log2(poolSize);
};

export default passwordEntropy;
