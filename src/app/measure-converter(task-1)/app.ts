import config from './config.json';
import input from './input.json';
import extendConfig from "./extend_config.json";

import {TConfig, IInputData, TConfigExtendedItem, Measure, TConfigItem} from "./types";


class MeasureConverter {
      private config: TConfig;
      private input: IInputData;
      private extendConfig?: TConfig<TConfigExtendedItem>; 

      constructor(config: TConfig, input: IInputData, extendConfig?: TConfig<TConfigExtendedItem>) {
            this.config = config;
            this.input = input;
            this.extendConfig = extendConfig;           
      }

      public init() {
            const {mergeConfigs, config, extendConfig} = this;

            mergeConfigs(config, extendConfig);

      }

      private mergeConfigs = (config: TConfig, extendConfig?: TConfig<TConfigExtendedItem>) => {

            if(!extendConfig) return;
            
            const extendedConfigKeys = Object.keys(extendConfig);
            this.config = extendedConfigKeys.reduce((acc, n) => {  

                  acc[n as Measure] = Object.entries(extendConfig[n as Measure] as TConfig<TConfigExtendedItem>).reduce((innerAcc, [extendConfigKey, extendConfigValue]) => {
                        if(extendConfigKey === 'config_extend') {

                              extendConfig[n as Measure]?.config_extend.forEach(([measureName, measureValue]) => {

                                    this.config[measureName]![n as Measure] = measureValue;

                              });
                              
                             return innerAcc;  
                        }
                        (innerAcc[extendConfigKey as Measure] as TConfigItem) = extendConfigValue; 

                        return innerAcc;   

                  }, {} as TConfigItem);

                  return acc;

            }, config)

      }
}

const converter = new MeasureConverter(config, input as IInputData, extendConfig as TConfig<TConfigExtendedItem>);
converter.init();