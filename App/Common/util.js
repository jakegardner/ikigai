import DeviceInfo from 'react-native-device-info';

const deviceId = DeviceInfo.getDeviceId().replace('iPhone', '').replace(',', '.');

export const isIphoneX = Number(deviceId) > 10.5;
