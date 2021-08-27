export type CategoryType = {
  catId: string,
  category: string
}

export type SubcategoryType = {
  subId: string,
  category: string,
  subcategory: string
};

export type CategoryPayload = {
  category: string;
  subcategory: string;
  subId: string;
};