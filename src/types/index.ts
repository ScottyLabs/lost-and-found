import { Category, Color, Location, RetrieveLocation } from '@prisma/client';

export const Locations: Record<Location, string> = {
  AN: 'Ansys Hall',
  BH: 'Baker Hall',
  BK: 'Bakery Square',
  CUC: 'Cohon University Center',
  CIC: 'Collaborative Innovation Center',
  CFA: 'College of Fine Arts',
  DH: 'Donner House',
  GHC: 'Gates and Hillman Centers',
  HOA: 'Hall of Arts',
  HBH: 'Hamburg Hall',
  HH: 'Hamerschlag Hall',
  HL: 'Hunt Library',
  III: 'Integrative Innovation Institute',
  MM: 'Margaret Morrison Carnegie Hall',
  MI: 'Mellon Institute',
  NSH: 'Newell-Simon Hall',
  PH: 'Porter Hall',
  POS: 'Posner Hall',
  PCA: 'Purnell Center for the Arts',
  TEP: 'Tepper Quad',
  OTHER: 'Other'
};

export const RetrieveLocations: Record<RetrieveLocation, string> = {
  CUC: 'Cohon University Center',
  GHC: 'Gates and Hillman Centers'
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
  BEVERAGE_CONTAINER: 'Beverage Containers',
  CORDS_CHARGER: 'Cords/Chargers',
  CLOTHING_ACCESSORIES: 'Clothing/Accessories',
  EARBUDS_HEADPHONES_CASES: 'Earbuds/Headphones/Cases',
  GLASSES_CASES: 'Glasses/Sunglasses/Cases',
  JEWELRY_WATCHES: 'Jewelry/Watches',
  KEYS: 'Keys',
  ELECTRONICS: 'Electronic Devices',
  BAGS_BACKPACKS: 'Bags/Backpacks',
  CARDS_WALLETS: 'Cards/Wallets',
  UMBRELLA: 'Umbrellas',
  OTHER: 'Other'
};
