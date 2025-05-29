const getMockData = () => {
  return Array.from({ length: 30 }, (_, rowIdx) =>
    Array.from({ length: 36 }, (_, colIdx) => {
      const rand = Math.random();
      if (rand < 0.1) return "-";
      if (rand < 0.2) return "H";
      if (rand < 0.3) return "S";
      if (rand < 0.4) return `${Math.floor(Math.random() * 3) + 1}x2`;
      return `${Math.floor(Math.random() * 9) + 1}`;
    })
  );
};

const getMockBeyond = () => {
  return Array.from({ length: 30 }, () => {
    const nums = Array.from(
      { length: Math.floor(Math.random() * 4) + 1 },
      () => Math.floor(Math.random() * 70) + 1
    );
    return nums.join(", ");
  });
};

const getAvgData = () => {
  return Array.from(
    { length: 36 },
    () => `${Math.floor(Math.random() * 5) + 1}`
  );
};
