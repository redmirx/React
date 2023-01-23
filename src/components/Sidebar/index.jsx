import { AlignLeftOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { Container } from './style';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Category 1', 'sub1', <AlignLeftOutlined />, [
    getItem(
      'Item 1',
      null,
      null,
      [getItem('Option 1', '1'), getItem('Option 2', '2')],
      'group'
    ),
    getItem(
      'Item 2',
      null,
      null,
      [getItem('Option 3', '3'), getItem('Option 4', '4')],
      'group'
    ),
  ]),
  getItem('Category 2', 'sub2', <AlignLeftOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
  ]),
  getItem('Category 3', 'sub4', <AlignLeftOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
  getItem('Category 4', 'sub5', <AlignLeftOutlined />, [
    getItem('Option 13', '13'),
    getItem('Option 14', '14'),
    getItem('Option 15', '15'),
    getItem('Option 16', '16'),
  ]),
  getItem('Category 5', 'sub6', <AlignLeftOutlined />, [
    getItem('Option 17', '17'),
    getItem('Option 18', '18'),
    getItem('Option 19', '19'),
    getItem('Option 20', '20'),
  ]),
  getItem('Category 6', 'sub7', <AlignLeftOutlined />, [
    getItem('Option 21', '21'),
    getItem('Option 22', '22'),
    getItem('Option 23', '23'),
    getItem('Option 24', '24'),
  ]),
];
const onClick = (e) => {
  console.log('click', e);
};
const Sidebar = () => (
  <Container>
    <Menu
      onClick={onClick}
      style={{
        width: 220,
      }}
      mode="vertical"
      items={items}
    />
  </Container>
);
export default Sidebar;
