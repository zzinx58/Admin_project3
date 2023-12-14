export default defineEventHandler(
  async (
    event
  ): Promise<{ code: any; data: any[] | undefined; error: any }> => {
    const data = Array.from({ length: 30 }, (item, index) => {
      return {
        id: (Math.random() * 100).toFixed(0),
        age: myFuncs.random(0, 300),
      };
    });
    const code = 200;
    const error = null;
    // return data;
    return { code, data, error };
  }
);
