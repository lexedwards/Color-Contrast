import genContrastValues from "../contrast";
import { genColorBlock } from "../genColorBlock";

describe("Generate an Object of contrast values to a given Selected ColorBlock", () => {
  const palette: ShadesObj[] = [
    {
      shadeKey: "rand-om12-3456",
      shadeLabel: "Test",
      Colors: [
        genColorBlock.fromHex("#fff"),
        genColorBlock.fromHex("#ccc"),
        genColorBlock.fromHex("#000"),
      ],
    },
  ];

  const colorBlock = genColorBlock.fromHex("#fff");

  test("Calculates the Contrast Ratio for each `Color` in the palette", () => {
    const values = genContrastValues(palette, colorBlock);
    expect(values).toMatchInlineSnapshot(`
      Object {
        "000000": 21,
        "CCCCCC": 1.61,
        "FFFFFF": 1,
      }
    `);
  });

  test("Returns Empty Object for an Empty Palette", () => {
    const values = genContrastValues([], colorBlock);
    expect(values).toMatchObject({});
  });
});
