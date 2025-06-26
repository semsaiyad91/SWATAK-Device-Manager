import { useState, useEffect } from 'react';
import Button from './UI/Button';

const DeviceDetails = ({ device }) => {
  const [snapshotUrl, setSnapshotUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editableFields, setEditableFields] = useState({
    ip: device?.ip || '',
    subnet: device?.subnet || '',
    gateway: device?.gateway || '',
    username: 'admin',
    password: '•••••••'
  });

  useEffect(() => {
    if (!device) return;
    const url = `http://${device.ip}/webcapture.jpg?command=snap&channel=0&user=admin&password=`;
    setSnapshotUrl(url);
    
    // Reset editable fields when device changes
    setEditableFields({
      ip: device.ip,
      subnet: device.subnet,
      gateway: device.gateway,
      username: 'admin',
      password: '•••••••'
    });
  }, [device]);

  const handleFieldChange = (field, value) => {
    setEditableFields(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!device) {
    return (
      <div className="container md:w-1/2 bg-[#d1d2d2] rounded-xl shadow-sm p-4 flex flex-col border border-gray-200 h-fit ">
        <p className="text-gray-500 text-lg">Select a device to view details</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl shadow-sm p-6 flex flex-col border border-black-400 w-[500px]   ">
      {/* Network Configuration Section */}
      <div className="space-y-5 mb-8 ">
        <div className="">
          <EditableField 
            label="IP Address" 
            value={editableFields.ip}
            onChange={(val) => handleFieldChange('ip', val)}
            type="text"
          />
          <EditableField 
            label="Subnet Mask" 
            value={editableFields.subnet}
            onChange={(val) => handleFieldChange('subnet', val)}
            type="text"
          />
          <EditableField 
            label="Gateway" 
            value={editableFields.gateway}
            onChange={(val) => handleFieldChange('gateway', val)}
            type="text"
          />
        </div>
      </div>

      {/* Device Info Section - Moved HTTP and TCP Port here */}
      <div className="space-y-4 mb-8 ">
        <h3 className="text-lg font-medium text-gray-700">Device Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <InfoField label="MAC Address" value={device.mac} />
          <InfoField label="Cloud ID" value={device.cloudId} />
          <InfoField label="Version" value={device.version} />
          <InfoField label="HTTP Port" value={device.httpPort} />
          <InfoField label="TCP Port" value={device.port} />
          {/* <InfoField 
            label="Status" 
            value={device.online ? 'Online' : 'Offline'} 
            status={device.online} 
          /> */}
        </div>
      </div>

      {/* Admin Access Section */}
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-medium text-gray-700">Admin Access</h3>
        {/* <div className="grid grid-cols-1 gap-4">
          <EditableField 
            label="Username" 
            value={editableFields.username}
            onChange={(val) => handleFieldChange('username', val)}
            type="text"
          />
          <EditableField 
            label="Password" 
            value={editableFields.password}
            onChange={(val) => handleFieldChange('password', val)}
            type="password"
          />
        </div> */}
        <div className="flex gap-3 pt-2">
          {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            IP-Changes
          </Button> */}
           <Button className="bg-purple-100 hover:bg-purple-200 px-4 py-2">Web</Button>
          <Button className="bg-yellow-100 hover:bg-yellow-200 px-4 py-2">Reboot</Button>
          <Button className="bg-red-100 hover:bg-red-200 px-4 py-2">Reset Config</Button>
          
        </div>
      </div>

      {/* Camera Preview Section with reduced width */}
      <div className="mt-auto space-y-3">
        <h3 className="text-lg  font-medium text-gray-700">Camera Preview</h3>
        <div className="relative h-52  bg-transparent  overflow-hidden ">
          {isLoading && !error && (
            <div className="absolute  inset-0 flex items-center justify-center">
              <div className="text-center ">
                <div className="animate-pulse flex space-x-4 ">
                  <div className="flex-1 space-y-4 py-1 ">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-50">
              <div className="text-center text-red-600 p-4">
                <svg className="w-10 h-10 mx-auto mb-2 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="font-medium">Camera Feed Unavailable</p>
                <p className="text-sm mt-1">Failed to connect to {device.ip}</p>
              </div>
            </div>
          )}
          
          <img
            src={snapshotUrl}
            alt={`Live feed from ${device.ip}`}
            className={`absolute  inset-0  h-full w-full  object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100 '}`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setError(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Reusable editable field component
const EditableField = ({ label, value, onChange, type = 'text' }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

// Reusable info field component
const InfoField = ({ label, value, status }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className={`flex items-center ${status !== undefined ? (status ? 'text-green-600' : 'text-red-600') : 'text-gray-900'}`}>
      {status !== undefined && (
        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${status ? 'bg-green-500' : 'bg-red-500'}`}></span>
      )}
      <span className="text-sm">{value}</span>
    </div>
  </div>
);

export default DeviceDetails;