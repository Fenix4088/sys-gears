import config from './config.json';
import input from './input.json';
import extendConfig from "./extend_config.json";

import {TConfig, TInputConfig, TConfigExtendedItem, Measure, TConfigItem, ISimpleConfig, IComplicateConfig} from "./types";

console.log(input);

class MeasureConverter {
      private config: TConfig;
      private input: TInputConfig;
      private extendConfig?: TConfig<TConfigExtendedItem>; 

      constructor(config: TConfig, input: TInputConfig, extendConfig?: TConfig<TConfigExtendedItem>) {
            this.config = config;
            this.input = input;
            this.extendConfig = extendConfig;           
      }

      public init() {
            const {mergeConfigs, config, extendConfig, configTypeChecker, input} = this;

            mergeConfigs(config, extendConfig);
            const test = configTypeChecker(input);

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


      private isComplicateConfig = (input: TInputConfig): input is IComplicateConfig => {
          return (input as IComplicateConfig).inputData !== undefined;
      }

      //TODO: refactor to converter
      private configTypeChecker = (input: TInputConfig): ISimpleConfig | IComplicateConfig  => {

            if(this.isComplicateConfig(input)) {
                  return input;
            } else {
                  return input;
            }
      } 
}

const converter = new MeasureConverter(config, input as TInputConfig, extendConfig as TConfig<TConfigExtendedItem>);

converter.init();




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