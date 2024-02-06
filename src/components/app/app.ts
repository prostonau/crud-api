// import AppController from '../controller/controller';
// import { AppView } from '../view/appView';

class App {
  version: string;
  constructor() {
    this.version = '1.0.1';
  }

  public async start(): Promise<void> {
    console.log('Start server!...');
  }
}

export default App;
