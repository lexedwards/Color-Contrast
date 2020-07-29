import { genColorBlock } from "../genColorBlock";

describe("Creates a block of equal colors from a singluar value", () => {
  const validResult: ColorBlock = {
    hex: "FFFFFF",
    rgb: [255, 255, 255],
    hsl: [0, 0, 100],
    lab: [100, 0, -0],
  };

  test("Creates from a valid Hex Code", () => {
    const fromHex = genColorBlock.fromHex(validResult.hex);
    expect(fromHex).toMatchObject(validResult);
  });

  test("Creates from a valid Rgb Array", () => {
    const fromRgb = genColorBlock.fromRgb(validResult.rgb);
    expect(fromRgb).toMatchObject(validResult);
  });

  test("Creates from a valid Hsl Array", () => {
    const fromHsl = genColorBlock.fromHsl(validResult.hsl);
    expect(fromHsl).toMatchObject(validResult);
  });

  test("Creates from a valid Lab Array", () => {
    const fromLab = genColorBlock.fromLab(validResult.lab);
    expect(fromLab).toMatchInlineSnapshot(`
      Object {
        "hex": "FFFFFF",
        "hsl": Array [
          60,
          100,
          100,
        ],
        "lab": Array [
          100,
          0,
          -0,
        ],
        "rgb": Array [
          255,
          255,
          255,
        ],
      }
    `);
  });
});
