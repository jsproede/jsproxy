import Proxy from './index';
import { remote } from 'electron';

const PROXY_STARTING_PORT = 3748;

const ProxyPool = class {
  private pool: Proxy[] = [];

  constructor() {
    remote.getCurrentWindow().on('close', () => {
      console.log('Closing all proxies');
      this.closeAllProxies();
    });
  }

  public acquireProxy(port?: number): Proxy {
    port = port || PROXY_STARTING_PORT;
    while (this.isPortInUse(port)) {
      port = port + 1;
    }

    const proxy = new Proxy(port);
    this.pool.push(proxy);

    return proxy;
  }

  public closeAllProxies(): void {
    console.log(`Closing ${this.pool.length} proxies`);
    this.pool.forEach(proxy => {
      proxy.close();
    });

    this.pool.length = 0;
  }

  public isPortInUse(port: number): boolean {
    return this.pool.some(proxy => proxy.getPort() === port);
  }
};

export default new ProxyPool();
