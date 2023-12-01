export default defineEventHandler(async (event) => {
  const data = Array.from({ length: 30 }, (item, index) => {
    return {
      id: (Math.random() * 100).toFixed(0),
      age: _.random(0, 300),
    };
  });
  return data;
});
