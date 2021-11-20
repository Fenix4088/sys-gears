enum Rules {
  include = 'include',
  sort = 'sort_by',
}

export interface IConfig {
  condition: TCondition;
}

type TCondition = {
  [key in Rules]: TSimpleObject;
};

type TSimpleObject = {
  [key: string]: TSimpleObjectValues | Omit<TSimpleObjectValues, 'boolean'>;
};

type TSimpleObjectValues = string | number | boolean;
