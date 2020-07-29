import { genEvenShades } from "../genEvenShades";

describe("Creates evenly distributed numbers based off array length", () => {
  test("Returns empty Array with an empty Input", () => {
    const res = genEvenShades([]);
    expect(res).toEqual([]);
  });

  test("Returns [50] with a single unit input", () => {
    const res = genEvenShades(["test"]);
    expect(res).toEqual([50]);
  });

  test("Returns evenly distrubuted numbers (+-1) in an Array", () => {
    const res = genEvenShades(["one", "two", "three"]);
    expect(res.length).toEqual(3);
    expect(res[0] - res[1]).toBeCloseTo(res[1] - res[2], -1)
  });
});
