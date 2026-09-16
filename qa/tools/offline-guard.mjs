// Defense in depth for reviewed test bindings, NOT an adversarial security sandbox.
import http from 'node:http';
import https from 'node:https';
import net from 'node:net';
import tls from 'node:tls';
import dgram from 'node:dgram';
import childProcess from 'node:child_process';
import { syncBuiltinESMExports } from 'node:module';

export function installOfflineGuard() {
  const deny = () => { const error = new Error('Offline contract tests forbid network and subprocess side effects.');
    error.code = 'OFFLINE_SIDE_EFFECT'; throw error; };
  globalThis.fetch = deny;
  globalThis.WebSocket = deny;
  for (const module of [http, https]) for (const key of ['request', 'get']) module[key] = deny;
  for (const key of ['connect', 'createConnection', 'createServer']) net[key] = deny;
  net.Socket.prototype.connect = deny;
  tls.connect = deny;
  dgram.createSocket = deny;
  for (const key of ['exec','execFile','spawn','fork','execSync','execFileSync','spawnSync']) childProcess[key] = deny;
  syncBuiltinESMExports();
}
