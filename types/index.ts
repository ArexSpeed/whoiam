export type CategoryType = {
  catId: string;
  category: string;
};

export type SubcategoryType = {
  subId: string;
  category: string;
  subcategory: string;
};

export type CategoryPayload = {
  category: string;
  subcategory: string;
  subId: string;
};

export type WordsApiType = {
  _id: string;
  subId: string;
  value: string;
  addBy: string;
  createdAt: number;
};
