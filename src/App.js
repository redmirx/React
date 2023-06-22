import React from 'react';

const App = () => {
  navigator.usb.getDevices().then((devices) => {
    console.log('hi');
    console.log(devices);
    devices.forEach((device) => {
      console.log(device.productName); // "Arduino Micro"
      console.log(device.manufacturerName); // "Arduino LLC"
    });
  });
  return <h1>Scale</h1>;
};

export default App;
