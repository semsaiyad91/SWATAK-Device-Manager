import { useState, useEffect } from 'react';
import Button from './UI/Button';
import Input from './UI/Input';

const DeviceList = ({ devices, searchTerm, onSearchChange, onSelectDevice, onlineCount }) => {
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [activeRowId, setActiveRowId] = useState(null);
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
      setActiveRowId(null);
      setSelectedDevices([]);
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

  return (
    <div className="border rounded-lg p-4 flex flex-col h-[973px] bg-transparent w-full">

      {/* Search + Login */}
      <div className="mb-4 flex items-center justify-between">
        <div className="w-72">
          <Input
            type="text"
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent text-white p-2 border rounded"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Username"
            className="border rounded-lg mr-2 px-2 py-1 bg-transparent text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoggedIn}
          />
          {usernameError && <p className="text-red-600 text-sm mt-1">{usernameError}</p>}

          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg mr-2 px-2 py-1 bg-transparent text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoggedIn}
          />
          {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}

          <button
            onClick={handleLoginLogout}
            className="bg-transparent text-white px-3 py-1 rounded mr-2 mt-2 hover:bg-red-600 hover:border-red-600 border"
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
          <label htmlFor="remember" className='text-white'>Remember Password</label>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-lg text-sm font-medium text-green-600">
            Online Devices: {onlineCount}
          </div>
          <div className="flex flex-wrap gap-3 justify-start">
            <Button className="bg-transparent hover:bg-gray-800 px-4 py-2 text-white">
              <i className="fa-solid fa-rotate"></i>
            </Button>
          </div>
        </div>
      </div>

      {/* Device Table */}
      <div className="overflow-y-auto h-[700px]">
        <table className="w-full border">
          <thead>
            <tr className="bg-white text-gray-600 sticky top-0">
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
              <th className="border">IP Address</th>
              <th className="border min-w-[70px]">Port</th>
              <th className="border min-w-[165px]">MAC Address</th>
              <th className="border min-w-[150px]">Device-ID</th>
              <th className="border min-w-[180px]">Version info</th>
              <th className="border min-w-[100px]">TCP port</th>
              <th className="border min-w-[50px]">Release Date</th>
              <th className="border min-w-[50px]">HTTP-Port</th>
              <th className="border min-w-[50px]">Location</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => {
              const isChecked = selectedDevices.includes(device.id);
              const isActive = activeRowId === device.id;

              return (
                <tr
                  key={device.id}
                  className={`border cursor-pointer text-center ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : device.online
                      ? 'bg-transparent text-white hover:bg-red-600'
                      : 'bg-red-50'
                  }`}
                  onClick={(e) => {
                    if (!isLoggedIn) return;

                    if (e.target.type === 'checkbox') return;

                    setActiveRowId(device.id);
                    setSelectedDevices([device.id]);
                    onSelectDevice(device);
                  }}
                >
                  <td className="border p-3 text-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        if (!isLoggedIn) return;
                        e.stopPropagation();

                        setSelectedDevices((prev) =>
                          prev.includes(device.id)
                            ? prev.filter((id) => id !== device.id)
                            : [...prev, device.id]
                        );

                        onSelectDevice(device);
                      }}
                    />
                  </td>
                  <td className="border">{device.ip}</td>
                  <td className="border">{device.port}</td>
                  <td className="border">{device.description}</td>
                  <td className="border">{device.mac}</td>
                  <td className="border">{device.cloudId}</td>
                  <td className="border">{device.version}</td>
                  <td className="border">{device.date}</td>
                  <td className="border">{device.httpPort}</td>
                  <td className="border">{device.location}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Firmware Upgrade Section */}
      <div className="border-t border-gray-200 pt-3 pb-2 mt-2 shrink-0 ">
        <h3 className="text-lg font-medium text-white mb-2">Firmware Upgrade</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded-lg bg-transparent text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Select firmware file"
              />
              <Button className="bg-transparent text-white hover:bg-red-600 hover:border-red-600 px-4 py-2 rounded-lg">
                Browse
              </Button>
            </div>
          </div>
          <div className="flex items-end">
            <Button className="bg-transparent text-white hover:bg-red-600 hover:border-red-600 px-4 py-2 rounded-lg font-medium">
              Upgrade
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeviceList;
