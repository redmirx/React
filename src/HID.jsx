import React from 'react';

const HID = () => {
  const filters = [
    {
      vendorId: 0x067b, // Nintendo Co., Ltd
      productId: 0x2303, // Joy-Con Left
    },
  ];

  // Prompt user to select a Joy-Con device.
  navigator.hid.requestDevice({ filters }).then((devices) => {
    console.log(devices);
  });
  // await navigator.hid.getDevices();

  return <h1>Scale with HID</h1>;
};

export default HID;
