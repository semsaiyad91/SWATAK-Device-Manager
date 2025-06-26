import { useState } from 'react';
import DeviceList from '../components/DeviceList';
import DeviceDetails from '../components/DeviceDetails';

const DeviceManager = () => {
  const [devices] = useState([
    {
      id: 1,
      ip: '192.168.0.87',
      port: '34567',
      description: 'Main Entrance Camera',
      mac: '64:61:37:62:20:8b',
      cloudId: 'c34fb64ff6f112dd1fsnh',
      online: true,
      subnet: '255.255.255.0',
      gateway: '192.168.0.1',
      httpPort: '80',
      version: '02.12174907.00010.140600.0000000',
      date: '2025-06-04',
      location:'India'
    },
    {
      id: 2,
      ip: '192.168.0.134',
      port: '34567',
      description: 'Parking Lot Camera',
      mac: '00:12:31:09:14:13',
      cloudId: '87f93440',
      online: true,
      subnet: '255.255.255.0',
      gateway: '192.168.0.1',
      httpPort: '80',
      version: '02.12174907.00010.140600.0000000',
      date: '2025-06-04',
      location:'India'
    },
    {
      id: 3,
      ip: '192.168.0.173',
      port: '34567',
      description: 'Server Room Camera',
      mac: '00:1E:2F:3A:4B:5C',
      cloudId: 'e56fg78h90ij',
      online: false,
      subnet: '255.255.255.0',
      gateway: '192.168.0.1',
      httpPort: '80',
      version: '02.12174907.00007.140600.0000000',
      date: '2025-06-01',
      location:'India'
    },
    {
      id: 4,
      ip: '192.168.0.86',
      port: '34567',
      description: 'Reception Camera',
      mac: '00:1F:2A:3B:4C:5D',
      cloudId: 'f67gh89i01jk',
      online: true,
      subnet: '255.255.255.0',
      gateway: '192.168.0.1',
      httpPort: '80',
      version: '02.12174907.00013.140600.0000000',
      date: '2025-06-07',
      location:'India'
    },
    {
      id: 5,
      ip: '192.168.0.123',
      port: '34567',
      description: 'Elevator Camera',
      mac: '00:1A:2B:3C:4D:5E',
      cloudId: 'g78hi90j12kl',
      online: true,
      subnet: '255.255.255.0',
      gateway: '192.168.0.1',
      httpPort: '80',
      version: '02.12174907.00014.140600.0000000',
      date: '2025-06-08',
      location:'India'
    },
    {
      id: 6,
      ip: '192.168.0.173',
      port: '34567',
      description: 'Elevator Camera',
      mac: '00:1A:2B:3C:4D:5E',
      cloudId: 'g78hi90j12kl',
      online: true,
      subnet: '255.255.255.0',
      gateway: '192.168.0.1',
      httpPort: '80',
      version: '02.12174907.00014.140600.0000000',
      date: '2025-06-08',
      location:'India'
    }
    
  ]);

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDevices = devices.filter(d => d.online).filter(d =>
    d.ip.includes(searchTerm) ||
    d.mac.includes(searchTerm) ||
    d.cloudId.includes(searchTerm)
  );

  const onlineCount = devices.filter(d => d.online).length;

  return (
    <div className="flex flex-col h-screen p-4 overflow-hidden">
      {/* 70% - 30% Left/Right Layout */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        <div className="w-[70%] overflow-auto">
          <DeviceList
            devices={filteredDevices}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSelectDevice={setSelectedDevice}
            onlineCount={onlineCount}
          />
        </div>

        <div className="w-[30%] h-screen overflow-hidden  ">
          <DeviceDetails device={selectedDevice} />
        </div>
      </div>
    </div>
  );
};

export default DeviceManager;
