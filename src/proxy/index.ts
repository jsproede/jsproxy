import Http from 'http';
import HttpProxy from 'http-proxy';

import Store from '@/store';

export default class Proxy {
  private readonly port: number;
  private proxyRunning: boolean = false;
  private proxyInstance: HttpProxy;
  private httpInstance: any;

  constructor(port: number) {
    this.port = port;
    this.proxyInstance = HttpProxy.createProxyServer({
      target: `http://127.0.0.1:${port}`,
    });

    this.proxyInstance.listen(8000);

    this.httpInstance = Http.createServer(async (req, res) => {
      console.log('Requested', req.url);

      const body = await new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          resolve(body);
          res.end('ok');
        });
      });

      (req as any).body = body;

      Store.commit('addRequest', { req: { ...req, date: new Date() } });

      this.proxyInstance.web(req, res, {
        target: req.url,
      });
    });

    this.httpInstance.listen(port);
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
    if (this.proxyRunning) {
      this.proxyInstance.close();
      this.httpInstance.close();
    }
    this.proxyRunning = false;
  }

  public getPort(): number {
    return this.port;
  }

  public isRunning(): boolean {
    return this.proxyRunning;
  }
}
