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


//Input config variations types

export type TInputConfig = ISimpleConfig | IComplicateConfig;

export interface ISimpleConfig {
      distance: IDistance,
      convert_to: Measure
}


export interface IComplicateConfig {
      inputData: ISimpleConfig[]
}

interface IDistance {
      unit: Measure,
      value: number
}