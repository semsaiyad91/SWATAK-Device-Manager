import { useState, useEffect } from 'react';
import Button from './UI/Button';
import Input from './UI/Input';

const DeviceList = ({ devices, searchTerm, onSearchChange, onSelectDevice, onlineCount }) => {
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [remember, setRemember] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const savedUsername = localStorage.getItem('remember_username');
    const savedPassword = localStorage.getItem('remember_password');
    const savedRemember = localStorage.getItem('remember_me') === 'true';

    if (savedRemember) {
      setUsername(savedUsername || '');
      setPassword(savedPassword || '');
      setRemember(true);
    }
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      onSelectDevice(null);
      if (!remember) {
        localStorage.removeItem('remember_username');
        localStorage.removeItem('remember_password');
        localStorage.removeItem('remember_me');
        setUsername('');
        setPassword('');
      }
      setUsernameError('');
      setPasswordError('');
    } else {
      if (username !== 'admin') {
        setUsernameError('Incorrect username');
        setPasswordError('');
        return;
      }
      if (password !== '1234') {
        setUsernameError('');
        setPasswordError('Wrong password');
        return;
      }
      setIsLoggedIn(true);
      setUsernameError('');
      setPasswordError('');
      if (remember) {
        localStorage.setItem('remember_username', username);
        localStorage.setItem('remember_password', password);
        localStorage.setItem('remember_me', 'true');
      }
    }
  };

  const toggleDeviceSelection = (deviceId) => {
    setSelectedDevices((prevSelected) => {
      if (prevSelected.includes(deviceId)) {
        return prevSelected.filter((id) => id !== deviceId);
      } else {
        return [...prevSelected, deviceId];
      }
    });
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col h-full bg-white w-full">
      {/* Login + Search + Count */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <input
            type="text"
            placeholder="Username"
            className="border rounded-lg mr-2 px-2 py-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoggedIn}
          />
          {usernameError && <p className="text-red-600 text-sm mt-1">{usernameError}</p>}

          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg mr-2 px-2 py-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoggedIn}
          />
          {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}

          <button
            onClick={handleLoginLogout}
            className="bg-blue-500 text-white px-3 py-1 rounded mr-2 mt-2"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>

          <input
            type="checkbox"
            id="remember"
            className="mr-1"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            disabled={isLoggedIn}
          />
          <label htmlFor="remember">Remember Password</label>
        </div>

        <div className="w-72">
          <Input
            type="text"
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-gray-600 text-white p-2 border rounded"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium text-green-600">
            Online Devices: {onlineCount}
          </div>
          <div className="flex flex-wrap gap-3 justify-start">
            <Button className="bg-sky-100 hover:bg-sky-200 px-4 py-2">
              <i className="fa-solid fa-rotate"></i>
            </Button>
          </div>
        </div>
      </div>

      {/* Device Table */}
      <div className="overflow-y-auto max-h-[400px]">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 sticky top-0">
              <th className="border p-3 w-16 text-center">
                <input
                  type="checkbox"
                  onChange={() => {
                    if (!isLoggedIn) return;
                    const allIds = devices.map((d) => d.id);
                    if (selectedDevices.length === devices.length) {
                      setSelectedDevices([]);
                    } else {
                      setSelectedDevices(allIds);
                    }
                  }}
                  checked={selectedDevices.length === devices.length && devices.length > 0}
                />
              </th>
              <th className="border p-3 min-w-[150px]">IP Address</th>
              <th className="border p-3 min-w-[200px]">Channel-Name</th>
              <th className="border p-3 min-w-[160px]">MAC Address</th>
              <th className="border p-3 min-w-[120px]">Device-ID</th>
              <th className="border p-3 min-w-[180px]">Version info</th>
              <th className="border p-3 w-32">TCP port</th>
              <th className="border p-3 w-24">Release Date</th>
              <th className="border p-3 w-32">HTTP-Port</th>
              <th className="border p-3 w-32">Location</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => {
              const isSelected = selectedDevices.includes(device.id);

              return (
                <tr
                  key={device.id}
                  className={`border cursor-pointer hover:bg-gray-50 ${
                    device.online ? 'bg-green-50' : 'bg-red-50'
                  }`}
                  onClick={() => {
                    if (!isLoggedIn) return;
                    toggleDeviceSelection(device.id);
                    onSelectDevice(device);
                  }}
                >
                  <td className="border p-3 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        if (!isLoggedIn) return;
                        e.stopPropagation();
                        toggleDeviceSelection(device.id);
                        onSelectDevice(device);
                      }}
                    />
                  </td>
                  <td className="border p-3">{device.ip}</td>
                  <td className="border p-3 text-center">{device.port}</td>
                  <td className="border p-3">{device.description}</td>
                  <td className="border p-3">{device.mac}</td>
                  <td className="border p-3">{device.cloudId}</td>
                  <td className="border p-3">{device.version}</td>
                  <td className="border p-3">{device.date}</td>
                  <td className="border p-3">{device.httpPort}</td>
                  <td className="border p-3">{device.location}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Firmware Upgrade Section */}
      <div className="border-t border-gray-200 pt-3 pb-2 mt-2 shrink-0">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Firmware Upgrade</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Select firmware file"
              />
              <Button className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg">
                Browse
              </Button>
            </div>
          </div>
          <div className="flex items-end">
            <Button className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg font-medium">
              Upgrade
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceList;
