import rules from './rules.json';
import { IConfig } from './types';

class Configuration {
  private config: IConfig;

  constructor(config: IConfig) {
    this.config = config;
  }
}

const config = new Configuration(rules);
