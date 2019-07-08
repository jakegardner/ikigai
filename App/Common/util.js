import DeviceInfo from 'react-native-device-info';

const deviceId = Number(DeviceInfo.getDeviceId().replace('iPhone', '').replace(',', '.'));

export const isIphoneX = deviceId > 10.5;
