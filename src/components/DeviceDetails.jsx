import { useState, useEffect } from 'react';
import Button from './UI/Button';

// EditableField component
const EditableField = ({ label, value, onChange, type = 'text' }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-white">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-transparent text-white hover:bg-red-600 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

// InfoField component
const InfoField = ({ label, value }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-white">{label}</label>
    <div className="text-sm text-white">
      {value}
    </div>
  </div>
);

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

    setEditableFields({
      ip: device.ip,
      subnet: device.subnet,
      gateway: device.gateway,
      username: 'admin',
      password: '•••••••'
    });
    setIsLoading(true);
    setError(null);
  }, [device]);

  const handleFieldChange = (field, value) => {
    setEditableFields(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Submit handler for editable fields (Network config)
  const handleSubmit = () => {
    // Yahan pe aap API call ya validation kar sakte ho
    // alert(`Submitted Data: 
    // IP: ${editableFields.ip}
    // Subnet: ${editableFields.subnet}
    // Gateway: ${editableFields.gateway}`);
    // TODO: Add actual update logic here as per your requirements
  };

  if (!device) {
    return (
      <div className="container md:w-1/2 bg-transparent rounded-xl shadow-sm p-4 flex flex-col border border-gray-200 h-fit ">
        <p className="text-white text-lg ">Select a device to view details</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl shadow-sm p-6 flex flex-col border border-black-400 w-[500px] bg-transparent">
      {/* Network Configuration Section */}
      <div className="space-y-5 mb-4">
        <div>
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
        {/* Submit Button below editable fields */}
        <div>
          <Button 
            className="mt-2 bg-transparent hover:bg-red-600 hover:border-red-600 text-white px-4 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Submit Changes
          </Button>
        </div>
      </div>

      {/* Device Info Section */}
      <div className="space-y-4 mb-8 ">
        <h3 className="text-lg font-medium text-white">Device Information</h3>
        <div className="grid grid-cols-2 gap-4 ">
          <InfoField label="MAC Address"  value={device.mac}  />
          <InfoField label="Cloud ID" value={device.cloudId} />
          <InfoField label="Version" value={device.version} />
          <InfoField label="HTTP Port" value={device.httpPort} />
          <InfoField label="TCP Port" value={device.port} />
        </div>
      </div>

      {/* Admin Access Section */}
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-medium text-white">Admin Access</h3>
        <div className="flex gap-3 pt-2">
          <Button className="bg-transparent text-white hover:bg-red-600 hover:border-red-600 px-4 py-2">Web</Button>
          <Button className="bg-transparent text-white hover:bg-red-600 hover:border-red-600 px-4 py-2">Reboot</Button>
          <Button className="bg-transparent text-white hover:bg-red-600 hover:border-red-600 px-4 py-2">Reset Config</Button>
        </div> text-white
      </div>

      {/* Camera Preview Section */}
      <div className="mt-auto space-y-3">
        <h3 className="text-lg  font-medium text-white">Camera Preview</h3>
        <div className="relative h-52    overflow-hidden ">
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

export default DeviceDetails;