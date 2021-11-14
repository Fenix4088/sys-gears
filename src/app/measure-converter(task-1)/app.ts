import config from './config.json';
import input from './input.json';
import extendConfig from "./extend_config.json";

import {TConfig, IInputData} from "./types";



class MeasureConverter {
      private config: TConfig;
      private input: IInputData;
      private extendConfig?: TConfig; 

      constructor(config: TConfig, input: IInputData, extendConfig?: TConfig) {
            this.config = config;
            this.input = input;
            this.extendConfig = extendConfig;           
      }

      public init() {
            const {extendConfiguration, config, extendConfig} = this;
            extendConfiguration(config, extendConfig);

      }

      private extendConfiguration = (config: TConfig, extendConfig?: TConfig) => {
            if(!extendConfig) return;
            
      }
}

const converter = new MeasureConverter(config, input as IInputData, extendConfig);
converter.init();