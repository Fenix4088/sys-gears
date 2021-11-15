export type Measure = "mm" | "cm" | "m" | "km" | "in" | "ft" | "yd";

export type TConfig<T = TConfigItem> = {
      [key in Measure]?: T
}

export type TConfigItem = {
      [key in Measure]?: number 
}

export type TConfigExtendedItem = TConfigItem & {
      config_extend: [Measure, number][]
}


export interface IInputData {
      distance: IDistance;
      convert_to: Measure;
}

interface IDistance {
      unit: Measure;
      value: number;
}