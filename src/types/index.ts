import { Category, Color, Location } from '@prisma/client';

export const Locations: Record<Location, string> = {
  CUC: 'Cohon University Center',
  TEP: 'Tepper Quad',
  CC: 'Collaborative Commons',
  OC: 'Off Campus'
};
export const Colors: Record<Color, string> = {
  BLACK: 'Black',
  BLUE: 'Blue',
  BROWN: 'Brown',
  GREEN: 'Green',
  GREY: 'Grey',
  MULTICOLOR: 'Multicolor',
  METALLIC: 'Metallic',
  ORANGE: 'Orange',
  PURPLE: 'Purple',
  RED: 'Red',
  WHITE: 'White',
  YELLOW: 'Yellow',
  OTHER: 'Other'
};
export const Categories: Record<Category, string> = {
  CLOTHING: 'Clothing',
  CHARGER: 'Charger',
  UMBRELLA: 'Umbrellas',
  GLASSES_CASES: 'Glasses/Sunglasses/Cases',
  JEWELRY: 'Jewelry',
  WATCHES: 'Watches',
  EARBUDS_HEADPHONES_CASES: 'Earbuds/Headphones/Case',
  PHONE: 'Phones',
  LAPTOP: 'Laptops',
  TABLET: 'Tablets',
  BEVERAGE_CONTAINER: 'Beverage Container',
  STATIONARY: 'Stationary',
  KEYS: 'Keys',
  OTHER: 'Other'
};
