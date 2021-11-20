import config from './config.json';
import input from './input.json';
import extendConfig from './extend_config.json';

import { TConfig, TInputConfig, TConfigExtendedItem, Measure, TConfigItem, ISimpleConfig, IComplicateConfig, IDistance } from './types';

class MeasureConverter {
  private config: TConfig;
  private input: TInputConfig;
  private conversionResult: IDistance[] | IDistance = [];
  private extendConfig?: TConfig<TConfigExtendedItem>;

  constructor(config: TConfig, input: TInputConfig, extendConfig?: TConfig<TConfigExtendedItem>) {
    this.config = config;
    this.input = input;
    this.extendConfig = extendConfig;
  }

  public init() {
    const { mergeConfigs, config, extendConfig, input, simpleConfigProcessing, compicateConfigProcessing } = this;

    mergeConfigs(config, extendConfig);

    if (this.isComplicateConfig(input)) {
      this.conversionResult = compicateConfigProcessing(input);
    } else {
      this.conversionResult = simpleConfigProcessing(input);
    }

    return this;
  }

  private mergeConfigs = (config: TConfig, extendConfig?: TConfig<TConfigExtendedItem>) => {
    if (!extendConfig) return;

    const extendedConfigKeys = Object.keys(extendConfig);
    this.config = extendedConfigKeys.reduce((acc, n) => {
      acc[n as Measure] = Object.entries(extendConfig[n as Measure] as TConfig<TConfigExtendedItem>).reduce(
        (innerAcc, [extendConfigKey, extendConfigValue]) => {
          if (extendConfigKey === 'config_extend') {
            extendConfig[n as Measure]?.config_extend.forEach(([measureName, measureValue]) => {
              this.config[measureName]![n as Measure] = measureValue;
            });

            return innerAcc;
          }
          (innerAcc[extendConfigKey as Measure] as TConfigItem) = extendConfigValue;

          return innerAcc;
        },
        {} as TConfigItem
      );

      return acc;
    }, config);
  };

  private isComplicateConfig = (input: TInputConfig): input is IComplicateConfig => {
    return (input as IComplicateConfig).inputData !== undefined;
  };

  private simpleConfigProcessing = (input: ISimpleConfig): IDistance => {
    const { distance, convert_to } = input;
    const { unit, value } = distance;

    if (!this.config[unit]) {
      throw new Error(`Missed ${unit} in your config ${this.config}`);
    }

    if (!this.config[unit]?.[convert_to]) {
      throw new Error(`Missed ${convert_to} in your config ${this.config}`);
    }

    const convertedResult = (this.config[unit]?.[convert_to] as number) * value;

    return { unit: convert_to, value: convertedResult };
  };

  private compicateConfigProcessing = (input: IComplicateConfig): IDistance[] => {
    return input.inputData.map((configItem) => this.simpleConfigProcessing(configItem));
  };

  get result(): string {
    return JSON.stringify(this.conversionResult);
  }
}

const converter = new MeasureConverter(config, input as TInputConfig, extendConfig as TConfig<TConfigExtendedItem>);

console.group('Task-1, Length converter');
console.table([['convertation result', converter.init().result]]);
console.groupEnd();

/**
 * @description Config posiible types
 */

// {
//       "distance": {
//                   "unit": "m",
//                   "value": 0.5
//             },
//       "convert_to": "ft"
// }

// {
//       "inputData": [
//       {
//             "distance": {
//                   "unit": "m",
//                   "value": 0.5
//             },
//             "convert_to": "ft"
//       },
//       {
//             "distance": {
//                   "unit": "m",
//                   "value": 0.5
//             },
//             "convert_to": "ft"
//       }
// ]
// }
