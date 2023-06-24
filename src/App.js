import React, { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  // console.log(navigator.usb);
  // navigator.usb.getDevices().then((devices) => {
  //   console.log('hi');
  //   console.log(devices);
  //   devices.forEach((device) => {
  //     console.log(device.productName); // "Arduino Micro"
  //     console.log(device.manufacturerName); // "Arduino LLC"
  //   });
  // });

  // Get devices
  navigator.usb.getDevices().then((devices) => {
    console.log(`Total devices: ${devices.length}`);
    setCount(devices.count);
    devices.forEach((device) => {
      console.log(
        `Product name: ${device.productName}, serial number ${device.serialNumber}`
      );
    });
  });
  console.log('-----------------------------');

  // Request to Device
  const filters = [{ vendorId: 0x8087, productId: 0x0a2a }];
  navigator.usb
    .requestDevice({ filters })
    .then((usbDevice) => {
      console.log(`Product name: ${usbDevice.productName}`);
    })
    .catch((err) => {
      console.error(`There is no device. ${err}`);
    });
  return <h1>Devices found: {count || 0}</h1>;
};

export default App;
