import React, { Component } from 'react';
import './Scale.css';

// if ("hid" in navigator) {
//   // The WebHID API is supported.

// }
console.log(navigator.hid, 'navigator');
class Demo extends Component {
  constructor(props) {
    super(props);

    this.USB_FILTERS = [
      { vendorId: 0x0922, productId: 0x8003 }, // mini scale
      // { vendorId: 0x067b, productId: 0x2303 }, // mertech scale
    ];

    this.UNIT_MODES = { 2: 'g', 11: 'oz' };
    this.SCALE_STATES = { 2: '±', 4: '+', 5: '-' };

    this.state = {
      connected: false,
      device: null,
      shouldRead: null,
      weight: '?',
      unit: '',
      scaleState: '',
      errorMsg: null,
    };

    // navigator.serial.getPorts().then((ports) => {
    //   console.log(ports, 'ports');
    // });
    // navigator.usb.getDevices().then((devices) => {
    //   console.log(devices, 'devices');
    // });
    if (navigator.usb) {
      navigator.usb
        .getDevices({ filters: this.USB_FILTERS })
        .then((devices) => {
          // console.log(devices, 'devices');
          devices.forEach((device) => {
            // console.log(device, 'device');
            // console.log(device.productName);
            // console.log(device.manufacturerName);
            this.bindDevice(device);
          });
        });

      navigator.usb.addEventListener('connect', (e) => {
        console.log('device connected', e);
        this.bindDevice(e.device);
      });

      navigator.usb.addEventListener('disconnect', (e) => {
        console.log('device lost', e);
        this.disconnect();
      });

      this.connect = () => {
        navigator.usb
          .requestDevice({ filters: this.USB_FILTERS })
          .then((device) => {
            console.log(device, 'info');
            this.bindDevice(device);
          })
          .catch((error) => {
            console.error(error);
            this.disconnect();
          });
      };
    }

    this.getWeight = this.getWeight.bind(this);
    this.stopWeight = this.stopWeight.bind(this);
    this.bindDevice = this.bindDevice.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  getWeight() {
    this.setState({ shouldRead: true });
    const { device } = this.state;
    const { endpointNumber, packetSize } =
      device.configuration.interfaces[0].alternate.endpoints[0];
    let readLoop = () => {
      device
        // .transferIn(endpointNumber, packetSize)
        .transferIn(endpointNumber, packetSize)
        .then((result) => {
          // setInterval(() => {
          //   // console.log(result, 'result');
          // }, 1000);
          let data = new Uint8Array(result.data.buffer);
          console.log(data, 'data');
          let weight = data[4] + 256 * data[5];

          // console.log(weight, 'weight');
          // setInterval(() => {
          //   console.log(weight, 'weight');
          //   weight = data[4] + 256 * data[5];
          // }, 5000);

          const unit = this.UNIT_MODES[data[2]];

          if (unit === 'oz') {
            // Use Math.pow to avoid floating point math.
            weight /= Math.pow(10, 1);
          }

          const scaleState = this.SCALE_STATES[data[1]];

          this.setState({
            weight: weight,
            unit: unit,
            scaleState: scaleState,
          });

          if (this.state.shouldRead) {
            readLoop();
          }
        })
        .catch((err) => {
          console.error('USB Read Error', err);
        });
    };
    readLoop();
  }

  stopWeight() {
    this.setState({ shouldRead: false });
  }

  bindDevice(device) {
    device
      .open()
      .then(() => {
        console.log(
          `Connected ${device.productName} ${device.manufacturerName}`,
          device
        );
        this.setState({ connected: true, device: device });

        if (device.configuration === null) {
          return device.selectConfiguration(1);
        }
      })
      .then(() => device.claimInterface(0))
      .then((res) => {
        this.getWeight();
      })
      .catch((err) => {
        console.error('USB Error', err);
        this.setState({ errorMsg: err.message });
      });
  }

  disconnect() {
    this.setState({
      connected: false,
      device: null,
      shouldRead: null,
      weight: '?',
      unit: '',
      scaleState: '',
      errorMsg: '',
    });
  }

  render() {
    const {
      device,
      connected,
      shouldRead,
      weight,
      unit,
      scaleState,
      errorMsg,
    } = this.state;

    return (
      <main>
        <h1>Scale {connected ? 'Online' : 'Offline'}</h1>

        {!navigator.usb && (
          <p>
            Please enable
            chrome://flags/#enable-experimental-web-platform-features
          </p>
        )}

        {errorMsg && <p>{errorMsg}</p>}

        {connected && !shouldRead && (
          <button onClick={this.getWeight}>▶</button>
        )}

        {shouldRead && <button onClick={this.stopWeight}>⏸</button>}

        {!device && <button onClick={this.connect}>Register Device</button>}

        {connected && (
          <span className="scale">
            <small>{scaleState}</small>
            {weight}
            <small>{unit}</small>
          </span>
        )}
      </main>
    );
  }
}

export default Demo;
