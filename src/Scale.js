import React from 'react';

const Scale = () => {
  // Scale
  // const vendorId = 0x067b;
  // const productId = 0x2303;

  // Read devide
  navigator.usb.getDevices().then((devices) => {
    devices.forEach((device) => {
      console.log(device.productName); // "Arduino Micro"
      console.log(device.manufacturerName); // "Arduino LLC"
    });
  });

  async function requestDevice() {
    let device;

    navigator.usb
      .requestDevice({ filters: [{ vendorId: 0x067b }] })
      .then((selectedDevice) => {
        device = selectedDevice;
        return device.open(); // Begin a session.
      })
      .then(() => device.selectConfiguration(1)) // Select configuration #1 for the device.
      .then(() => device.claimInterface(0)) // Request exclusive control over interface #0.
      .then(() => {
        console.log(device, 'device');
        device.controlTransferOut({
          requestType: 'standard',
          recipient: 'endpoint',
          request: 1,
          value: 5,
          index: 129,
        });
      }) // Ready to receive data
      .then(() => device.transferIn(1, 64)) // Waiting for 64 bytes of data from endpoint #5.
      .then((result) => {
        console.log(result, 'result');
        let data = new Uint8Array(result.data.buffer);
        console.log(data, 'data');
        let weight = data[4] + 256 * data[5];

        console.log(weight, 'weight');
        // const decoder = new TextDecoder();
        // console.log('Received: ' + decoder.decode(result.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <h1>Scale</h1>
      <button onClick={requestDevice}>Request device</button>
    </div>
  );
};

export default Scale;
