export const Colors = [
  'White',
  'Beige',
  'Orange',
  'Grey',
  'Black',
  'Purple',
  'Red',
  'Green',
  'Blue',
  'Yellow',
  'Patterned',
  'Metallic'
] as const;
export type Color = typeof Colors[number];
export const Locations = [
  'Alumni House (AH)',
  'ANSYS Hall (AN)',
  'Baker Hall (BA)',
  'Bakery Square (BK)'
];
export type Location = typeof Locations[number];
export const Categories = [
  'Electronics',
  'Clothing',
  'Umbrella',
  'Eyeware',
  'Jewelry',
  'Watches',
  'Identifiable',
  'Other'
];
