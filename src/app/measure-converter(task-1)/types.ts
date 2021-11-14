type Measure = "mm" | "cm" | "m" | "km" | "in" | "ft" | "yd";

export type TConfig = {
      [key in Measure]?: TConfigItem
}

type TConfigItem = {
      [key in Measure]?: number 
}

export interface IInputData {
      distance: IDistance;
      convert_to: Measure;
}

interface IDistance {
      unit: Measure;
      value: number;
}