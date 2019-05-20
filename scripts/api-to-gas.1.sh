echo Making a copy of original Meraki library request files
cp -rf ../node_modules/merakidashboardapilib/lib/Http/Client/request-gas.js ../node_modules/merakidashboardapilib/lib/Http/Client/request-gas.original.js
cp -rf ../node_modules/merakidashboardapilib/lib/Http/Client/RequestClient.js ../node_modules/merakidashboardapilib/lib/Http/Client/RequestClient.original.js
echo --
echo Replacing request files with GAS supported version
cp -rf ../api-to-gas/Client/request-gas.js ../node_modules/merakidashboardapilib/lib/Http/Client
cp -rf ../api-to-gas/Client/RequestClient.js ../node_modules/merakidashboardapilib/lib/Http/Client
echo --
echo ../node_modules/merakidashboardapilib/lib/Http/Client
ls ../node_modules/merakidashboardapilib/lib/Http/Client
