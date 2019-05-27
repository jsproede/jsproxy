import Http from 'http';
import HttpProxy from 'http-proxy';

import Store from '@/store';

export default class Proxy {
  private readonly port: number;
  private proxyRunning: boolean = false;
  private proxyInstance: HttpProxy;

  private requestedUrls: string[] = [];

  constructor(port: number) {
    this.port = port;
    this.proxyInstance = HttpProxy.createProxyServer({
      target: `http://127.0.0.1:${port}`,
    });

    this.proxyInstance.listen(8000);

    Http.createServer((req, res) => {
      console.log('Requested', req.url);
      this.requestedUrls.push(String(req.url));

      Store.commit('addUrl', { url: req.url });

      this.proxyInstance.web(req, res, { target: req.url });
    }).listen(port);

    this.proxyRunning = true;
  }

  public start(): void {
    if (this.proxyRunning) {
      return;
    }

    this.proxyInstance.listen(this.port);
    this.proxyRunning = true;
    console.log('Proxy now listening at port', this.port);
  }

  public close(): void {
    this.proxyRunning && this.proxyInstance.close();
    this.proxyRunning = false;
  }

  public getPort(): number {
    return this.port;
  }

  public getUrls(): string[] {
    return this.requestedUrls;
  }
}
