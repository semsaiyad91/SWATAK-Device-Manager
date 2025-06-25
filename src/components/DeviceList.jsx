import Button from './UI/Button'
import Input from './UI/Input'

const DeviceList = ({ devices, searchTerm, onSearchChange, onSelectDevice, onlineCount }) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col h-full bg-white w-full "> {/* Increased width */}
      {/* Search and Online Count Section */}
      <div className="mb-4 flex items-center justify-between">
        <div className="w-96"> {/* Wider search input */}
          <Input 
            type="text" 
            placeholder="Search devices..." 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-gray-600 text-white p-2 border rounded "
          />
        </div>
       <div className="flex items-center gap-4">
  <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium text-green-600">
    Online Devices: {onlineCount}
  </div>
  <div className="flex flex-wrap gap-3 justify-start">
    <Button className="bg-sky-100 hover:bg-sky-200 px-4 py-2"><i class="fa-solid fa-rotate"></i></Button>
  </div>
</div>

      </div>

      {/* Device Table Section */}
      <div className="flex-grow overflow-y-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 sticky top-0">
              <th className="border p-3 w-16">NO.</th> {/* Slightly wider columns */}
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
            {devices.map((device, index) => (
              <tr 
                key={device.id} 
                className={`border cursor-pointer hover:bg-gray-50 ${
                  device.online ? 'bg-green-50' : 'bg-red-50'
                }`}
                onClick={() => onSelectDevice(device)}
              >
                <td className="border p-3 text-center">{index + 1}</td>
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons Section */}
      <div className="shrink-0 border-t bg-white p-4 mt-4">
        <div className="flex flex-wrap gap-3 justify-start">
          <Button className="bg-blue-100 hover:bg-blue-200 px-4 py-2">Select All</Button>
         
        
         
        </div>
      </div>

      {/* Firmware Upgrade Section */}
      <div className="border-t border-gray-200 pt-5 pb-3 mt-4">
  <h3 className="font-medium text-lg mb-4">Firmware Upgrade</h3>
  <div className="grid grid-cols-3 gap-4 mb-4">
    <div className="col-span-2">
      {/* <label className="block text-sm font-medium mb-2">File Name:</label> */}
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
      <Button className=" bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg font-medium">
        Upgrade
      </Button>
    </div>
  </div>
</div>
    </div>
  )
}

export default DeviceList