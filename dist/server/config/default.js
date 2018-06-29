'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cwd = process.cwd();

// Configuration of the application.
// Other entries can be added (as long as their name doesn't conflict with
// existing ones) to define global parameters of the application (e.g. BPM,
// synth parameters) that can then be shared easily among all clients using
// the `shared-config` service.
exports.default = {
  // name of the application, used in the `.ejs` template and by default in
  // the `platform` service to populate its view
  appName: 'Pteroptyx Malaccae',

  // name of the environnement ('production' enable cache in express application)
  env: 'development',

  // version of application, can be used to force reload css and js files
  // from server (cf. `html/default.ejs`)
  version: '0.0.1',

  // name of the default client type, i.e. the client that can access the
  // application at its root URL
  defaultClient: 'player',

  // define from where the assets (static files) should be loaded, these value
  // could also refer to a separate server for scalability reasons. This value
  // should also be used client-side to configure the `loader` service.
  assetsDomain: '/',

  // port used to open the http server, in production this value is typically 80
  port: 8000,

  // describe the location where the experience takes places, theses values are
  // used by the `placer`, `checkin` and `locator` services.
  // if one of these service is required, this entry shouldn't be removed.
  setup: {
    area: {
      width: 1,
      height: 1,
      // path to an image to be used in the area representation
      background: null
    },
    // list of predefined labels
    labels: null,
    // list of predefined coordinates given as an array of `[x:Number, y:Number]`
    coordinates: null,
    // maximum number of clients allowed in a position
    maxClientsPerPosition: 1,
    // maximum number of positions (may limit or be limited by the number of
    // labels and/or coordinates)
    capacity: Infinity
  },

  // socket.io configuration
  websockets: {
    url: '',
    transports: ['websocket']
    // @note: EngineIO defaults
    // pingTimeout: 3000,
    // pingInterval: 1000,
    // upgradeTimeout: 10000,
    // maxHttpBufferSize: 10E7,
  },

  // define if the HTTP server should be launched using secure connections.
  // For development purposes when set to `true` and no certificates are given
  // (cf. `httpsInfos`), a self-signed certificate is created.
  useHttps: false,

  // paths to the key and certificate to be used in order to launch the https
  // server. Both entries are required otherwise a self-signed certificate
  // is generated.
  httpsInfos: {
    key: null,
    cert: null
  },

  // password to be used by the `auth` service
  password: 'test',

  // configuration of the `osc` service
  osc: {
    // IP of the currently running node server
    receiveAddress: '127.0.0.1',
    // port listening for incomming messages
    receivePort: 57121,
    // IP of the remote application
    sendAddress: '127.0.0.1',
    // port where the remote application is listening for messages
    sendPort: 57120
  },

  // define if the server should use gzip compression for static files
  enableGZipCompression: true,

  // location of the public directory (accessible through http(s) requests)
  publicDirectory: _path2.default.join(cwd, 'public'),

  // directory where the server templating system looks for the `ejs` templates
  templateDirectory: _path2.default.join(cwd, 'html'),

  // bunyan configuration
  logger: {
    name: 'soundworks',
    level: 'info',
    streams: [{
      level: 'info',
      stream: process.stdout
    }]
  },

  // directory where error reported from the clients are written
  errorReporterDirectory: _path2.default.join(cwd, 'logs', 'clients')
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlZmF1bHQuanMiXSwibmFtZXMiOlsiY3dkIiwicHJvY2VzcyIsImFwcE5hbWUiLCJlbnYiLCJ2ZXJzaW9uIiwiZGVmYXVsdENsaWVudCIsImFzc2V0c0RvbWFpbiIsInBvcnQiLCJzZXR1cCIsImFyZWEiLCJ3aWR0aCIsImhlaWdodCIsImJhY2tncm91bmQiLCJsYWJlbHMiLCJjb29yZGluYXRlcyIsIm1heENsaWVudHNQZXJQb3NpdGlvbiIsImNhcGFjaXR5IiwiSW5maW5pdHkiLCJ3ZWJzb2NrZXRzIiwidXJsIiwidHJhbnNwb3J0cyIsInVzZUh0dHBzIiwiaHR0cHNJbmZvcyIsImtleSIsImNlcnQiLCJwYXNzd29yZCIsIm9zYyIsInJlY2VpdmVBZGRyZXNzIiwicmVjZWl2ZVBvcnQiLCJzZW5kQWRkcmVzcyIsInNlbmRQb3J0IiwiZW5hYmxlR1ppcENvbXByZXNzaW9uIiwicHVibGljRGlyZWN0b3J5Iiwiam9pbiIsInRlbXBsYXRlRGlyZWN0b3J5IiwibG9nZ2VyIiwibmFtZSIsImxldmVsIiwic3RyZWFtcyIsInN0cmVhbSIsInN0ZG91dCIsImVycm9yUmVwb3J0ZXJEaXJlY3RvcnkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFDQSxJQUFNQSxNQUFNQyxRQUFRRCxHQUFSLEVBQVo7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtrQkFDZTtBQUNiO0FBQ0E7QUFDQUUsV0FBUyxvQkFISTs7QUFLYjtBQUNBQyxPQUFLLGFBTlE7O0FBUWI7QUFDQTtBQUNBQyxXQUFTLE9BVkk7O0FBWWI7QUFDQTtBQUNBQyxpQkFBZSxRQWRGOztBQWdCYjtBQUNBO0FBQ0E7QUFDQUMsZ0JBQWMsR0FuQkQ7O0FBcUJiO0FBQ0FDLFFBQU0sSUF0Qk87O0FBd0JiO0FBQ0E7QUFDQTtBQUNBQyxTQUFPO0FBQ0xDLFVBQU07QUFDSkMsYUFBTyxDQURIO0FBRUpDLGNBQVEsQ0FGSjtBQUdKO0FBQ0FDLGtCQUFZO0FBSlIsS0FERDtBQU9MO0FBQ0FDLFlBQVEsSUFSSDtBQVNMO0FBQ0FDLGlCQUFhLElBVlI7QUFXTDtBQUNBQywyQkFBdUIsQ0FabEI7QUFhTDtBQUNBO0FBQ0FDLGNBQVVDO0FBZkwsR0EzQk07O0FBNkNiO0FBQ0FDLGNBQVk7QUFDVkMsU0FBSyxFQURLO0FBRVZDLGdCQUFZLENBQUMsV0FBRDtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQVSxHQTlDQzs7QUF3RGI7QUFDQTtBQUNBO0FBQ0FDLFlBQVUsS0EzREc7O0FBNkRiO0FBQ0E7QUFDQTtBQUNBQyxjQUFZO0FBQ1ZDLFNBQUssSUFESztBQUVWQyxVQUFNO0FBRkksR0FoRUM7O0FBcUViO0FBQ0FDLFlBQVUsTUF0RUc7O0FBd0ViO0FBQ0FDLE9BQUs7QUFDSDtBQUNBQyxvQkFBZ0IsV0FGYjtBQUdIO0FBQ0FDLGlCQUFhLEtBSlY7QUFLSDtBQUNBQyxpQkFBYSxXQU5WO0FBT0g7QUFDQUMsY0FBVTtBQVJQLEdBekVROztBQW9GYjtBQUNBQyx5QkFBdUIsSUFyRlY7O0FBdUZiO0FBQ0FDLG1CQUFpQixlQUFLQyxJQUFMLENBQVVqQyxHQUFWLEVBQWUsUUFBZixDQXhGSjs7QUEwRmI7QUFDQWtDLHFCQUFtQixlQUFLRCxJQUFMLENBQVVqQyxHQUFWLEVBQWUsTUFBZixDQTNGTjs7QUE2RmI7QUFDQW1DLFVBQVE7QUFDTkMsVUFBTSxZQURBO0FBRU5DLFdBQU8sTUFGRDtBQUdOQyxhQUFTLENBQUM7QUFDUkQsYUFBTyxNQURDO0FBRVJFLGNBQVF0QyxRQUFRdUM7QUFGUixLQUFEO0FBSEgsR0E5Rks7O0FBMEdiO0FBQ0FDLDBCQUF3QixlQUFLUixJQUFMLENBQVVqQyxHQUFWLEVBQWUsTUFBZixFQUF1QixTQUF2QjtBQTNHWCxDIiwiZmlsZSI6ImRlZmF1bHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmNvbnN0IGN3ZCA9IHByb2Nlc3MuY3dkKCk7XG5cblxuLy8gQ29uZmlndXJhdGlvbiBvZiB0aGUgYXBwbGljYXRpb24uXG4vLyBPdGhlciBlbnRyaWVzIGNhbiBiZSBhZGRlZCAoYXMgbG9uZyBhcyB0aGVpciBuYW1lIGRvZXNuJ3QgY29uZmxpY3Qgd2l0aFxuLy8gZXhpc3Rpbmcgb25lcykgdG8gZGVmaW5lIGdsb2JhbCBwYXJhbWV0ZXJzIG9mIHRoZSBhcHBsaWNhdGlvbiAoZS5nLiBCUE0sXG4vLyBzeW50aCBwYXJhbWV0ZXJzKSB0aGF0IGNhbiB0aGVuIGJlIHNoYXJlZCBlYXNpbHkgYW1vbmcgYWxsIGNsaWVudHMgdXNpbmdcbi8vIHRoZSBgc2hhcmVkLWNvbmZpZ2Agc2VydmljZS5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gbmFtZSBvZiB0aGUgYXBwbGljYXRpb24sIHVzZWQgaW4gdGhlIGAuZWpzYCB0ZW1wbGF0ZSBhbmQgYnkgZGVmYXVsdCBpblxuICAvLyB0aGUgYHBsYXRmb3JtYCBzZXJ2aWNlIHRvIHBvcHVsYXRlIGl0cyB2aWV3XG4gIGFwcE5hbWU6ICdQdGVyb3B0eXggTWFsYWNjYWUnLFxuXG4gIC8vIG5hbWUgb2YgdGhlIGVudmlyb25uZW1lbnQgKCdwcm9kdWN0aW9uJyBlbmFibGUgY2FjaGUgaW4gZXhwcmVzcyBhcHBsaWNhdGlvbilcbiAgZW52OiAnZGV2ZWxvcG1lbnQnLFxuXG4gIC8vIHZlcnNpb24gb2YgYXBwbGljYXRpb24sIGNhbiBiZSB1c2VkIHRvIGZvcmNlIHJlbG9hZCBjc3MgYW5kIGpzIGZpbGVzXG4gIC8vIGZyb20gc2VydmVyIChjZi4gYGh0bWwvZGVmYXVsdC5lanNgKVxuICB2ZXJzaW9uOiAnMC4wLjEnLFxuXG4gIC8vIG5hbWUgb2YgdGhlIGRlZmF1bHQgY2xpZW50IHR5cGUsIGkuZS4gdGhlIGNsaWVudCB0aGF0IGNhbiBhY2Nlc3MgdGhlXG4gIC8vIGFwcGxpY2F0aW9uIGF0IGl0cyByb290IFVSTFxuICBkZWZhdWx0Q2xpZW50OiAncGxheWVyJyxcblxuICAvLyBkZWZpbmUgZnJvbSB3aGVyZSB0aGUgYXNzZXRzIChzdGF0aWMgZmlsZXMpIHNob3VsZCBiZSBsb2FkZWQsIHRoZXNlIHZhbHVlXG4gIC8vIGNvdWxkIGFsc28gcmVmZXIgdG8gYSBzZXBhcmF0ZSBzZXJ2ZXIgZm9yIHNjYWxhYmlsaXR5IHJlYXNvbnMuIFRoaXMgdmFsdWVcbiAgLy8gc2hvdWxkIGFsc28gYmUgdXNlZCBjbGllbnQtc2lkZSB0byBjb25maWd1cmUgdGhlIGBsb2FkZXJgIHNlcnZpY2UuXG4gIGFzc2V0c0RvbWFpbjogJy8nLFxuXG4gIC8vIHBvcnQgdXNlZCB0byBvcGVuIHRoZSBodHRwIHNlcnZlciwgaW4gcHJvZHVjdGlvbiB0aGlzIHZhbHVlIGlzIHR5cGljYWxseSA4MFxuICBwb3J0OiA4MDAwLFxuXG4gIC8vIGRlc2NyaWJlIHRoZSBsb2NhdGlvbiB3aGVyZSB0aGUgZXhwZXJpZW5jZSB0YWtlcyBwbGFjZXMsIHRoZXNlcyB2YWx1ZXMgYXJlXG4gIC8vIHVzZWQgYnkgdGhlIGBwbGFjZXJgLCBgY2hlY2tpbmAgYW5kIGBsb2NhdG9yYCBzZXJ2aWNlcy5cbiAgLy8gaWYgb25lIG9mIHRoZXNlIHNlcnZpY2UgaXMgcmVxdWlyZWQsIHRoaXMgZW50cnkgc2hvdWxkbid0IGJlIHJlbW92ZWQuXG4gIHNldHVwOiB7XG4gICAgYXJlYToge1xuICAgICAgd2lkdGg6IDEsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICAvLyBwYXRoIHRvIGFuIGltYWdlIHRvIGJlIHVzZWQgaW4gdGhlIGFyZWEgcmVwcmVzZW50YXRpb25cbiAgICAgIGJhY2tncm91bmQ6IG51bGwsXG4gICAgfSxcbiAgICAvLyBsaXN0IG9mIHByZWRlZmluZWQgbGFiZWxzXG4gICAgbGFiZWxzOiBudWxsLFxuICAgIC8vIGxpc3Qgb2YgcHJlZGVmaW5lZCBjb29yZGluYXRlcyBnaXZlbiBhcyBhbiBhcnJheSBvZiBgW3g6TnVtYmVyLCB5Ok51bWJlcl1gXG4gICAgY29vcmRpbmF0ZXM6IG51bGwsXG4gICAgLy8gbWF4aW11bSBudW1iZXIgb2YgY2xpZW50cyBhbGxvd2VkIGluIGEgcG9zaXRpb25cbiAgICBtYXhDbGllbnRzUGVyUG9zaXRpb246IDEsXG4gICAgLy8gbWF4aW11bSBudW1iZXIgb2YgcG9zaXRpb25zIChtYXkgbGltaXQgb3IgYmUgbGltaXRlZCBieSB0aGUgbnVtYmVyIG9mXG4gICAgLy8gbGFiZWxzIGFuZC9vciBjb29yZGluYXRlcylcbiAgICBjYXBhY2l0eTogSW5maW5pdHksXG4gIH0sXG5cbiAgLy8gc29ja2V0LmlvIGNvbmZpZ3VyYXRpb25cbiAgd2Vic29ja2V0czoge1xuICAgIHVybDogJycsXG4gICAgdHJhbnNwb3J0czogWyd3ZWJzb2NrZXQnXSxcbiAgICAvLyBAbm90ZTogRW5naW5lSU8gZGVmYXVsdHNcbiAgICAvLyBwaW5nVGltZW91dDogMzAwMCxcbiAgICAvLyBwaW5nSW50ZXJ2YWw6IDEwMDAsXG4gICAgLy8gdXBncmFkZVRpbWVvdXQ6IDEwMDAwLFxuICAgIC8vIG1heEh0dHBCdWZmZXJTaXplOiAxMEU3LFxuICB9LFxuXG4gIC8vIGRlZmluZSBpZiB0aGUgSFRUUCBzZXJ2ZXIgc2hvdWxkIGJlIGxhdW5jaGVkIHVzaW5nIHNlY3VyZSBjb25uZWN0aW9ucy5cbiAgLy8gRm9yIGRldmVsb3BtZW50IHB1cnBvc2VzIHdoZW4gc2V0IHRvIGB0cnVlYCBhbmQgbm8gY2VydGlmaWNhdGVzIGFyZSBnaXZlblxuICAvLyAoY2YuIGBodHRwc0luZm9zYCksIGEgc2VsZi1zaWduZWQgY2VydGlmaWNhdGUgaXMgY3JlYXRlZC5cbiAgdXNlSHR0cHM6IGZhbHNlLFxuXG4gIC8vIHBhdGhzIHRvIHRoZSBrZXkgYW5kIGNlcnRpZmljYXRlIHRvIGJlIHVzZWQgaW4gb3JkZXIgdG8gbGF1bmNoIHRoZSBodHRwc1xuICAvLyBzZXJ2ZXIuIEJvdGggZW50cmllcyBhcmUgcmVxdWlyZWQgb3RoZXJ3aXNlIGEgc2VsZi1zaWduZWQgY2VydGlmaWNhdGVcbiAgLy8gaXMgZ2VuZXJhdGVkLlxuICBodHRwc0luZm9zOiB7XG4gICAga2V5OiBudWxsLFxuICAgIGNlcnQ6IG51bGwsXG4gIH0sXG5cbiAgLy8gcGFzc3dvcmQgdG8gYmUgdXNlZCBieSB0aGUgYGF1dGhgIHNlcnZpY2VcbiAgcGFzc3dvcmQ6ICd0ZXN0JyxcblxuICAvLyBjb25maWd1cmF0aW9uIG9mIHRoZSBgb3NjYCBzZXJ2aWNlXG4gIG9zYzoge1xuICAgIC8vIElQIG9mIHRoZSBjdXJyZW50bHkgcnVubmluZyBub2RlIHNlcnZlclxuICAgIHJlY2VpdmVBZGRyZXNzOiAnMTI3LjAuMC4xJyxcbiAgICAvLyBwb3J0IGxpc3RlbmluZyBmb3IgaW5jb21taW5nIG1lc3NhZ2VzXG4gICAgcmVjZWl2ZVBvcnQ6IDU3MTIxLFxuICAgIC8vIElQIG9mIHRoZSByZW1vdGUgYXBwbGljYXRpb25cbiAgICBzZW5kQWRkcmVzczogJzEyNy4wLjAuMScsXG4gICAgLy8gcG9ydCB3aGVyZSB0aGUgcmVtb3RlIGFwcGxpY2F0aW9uIGlzIGxpc3RlbmluZyBmb3IgbWVzc2FnZXNcbiAgICBzZW5kUG9ydDogNTcxMjAsXG4gIH0sXG5cbiAgLy8gZGVmaW5lIGlmIHRoZSBzZXJ2ZXIgc2hvdWxkIHVzZSBnemlwIGNvbXByZXNzaW9uIGZvciBzdGF0aWMgZmlsZXNcbiAgZW5hYmxlR1ppcENvbXByZXNzaW9uOiB0cnVlLFxuXG4gIC8vIGxvY2F0aW9uIG9mIHRoZSBwdWJsaWMgZGlyZWN0b3J5IChhY2Nlc3NpYmxlIHRocm91Z2ggaHR0cChzKSByZXF1ZXN0cylcbiAgcHVibGljRGlyZWN0b3J5OiBwYXRoLmpvaW4oY3dkLCAncHVibGljJyksXG5cbiAgLy8gZGlyZWN0b3J5IHdoZXJlIHRoZSBzZXJ2ZXIgdGVtcGxhdGluZyBzeXN0ZW0gbG9va3MgZm9yIHRoZSBgZWpzYCB0ZW1wbGF0ZXNcbiAgdGVtcGxhdGVEaXJlY3Rvcnk6IHBhdGguam9pbihjd2QsICdodG1sJyksXG5cbiAgLy8gYnVueWFuIGNvbmZpZ3VyYXRpb25cbiAgbG9nZ2VyOiB7XG4gICAgbmFtZTogJ3NvdW5kd29ya3MnLFxuICAgIGxldmVsOiAnaW5mbycsXG4gICAgc3RyZWFtczogW3tcbiAgICAgIGxldmVsOiAnaW5mbycsXG4gICAgICBzdHJlYW06IHByb2Nlc3Muc3Rkb3V0LFxuICAgIH0sIC8qIHtcbiAgICAgIGxldmVsOiAnaW5mbycsXG4gICAgICBwYXRoOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2xvZ3MnLCAnc291bmR3b3Jrcy5sb2cnKSxcbiAgICB9ICovXVxuICB9LFxuXG4gIC8vIGRpcmVjdG9yeSB3aGVyZSBlcnJvciByZXBvcnRlZCBmcm9tIHRoZSBjbGllbnRzIGFyZSB3cml0dGVuXG4gIGVycm9yUmVwb3J0ZXJEaXJlY3Rvcnk6IHBhdGguam9pbihjd2QsICdsb2dzJywgJ2NsaWVudHMnKSxcbn1cbiJdfQ==