export const fetchDevices = async () => {
  // This will be replaced with actual API call
  return [
    {
      id: 1,
      ip: '192.168.0.87',
      // ... other device properties
    }
  ]
}

export const fetchDeviceSnapshot = async (deviceId) => {
  // This will be replaced with camera snapshot API
  return {
    status: "success",
    message: "Snapshot API will be implemented here",
    deviceId
  }
}