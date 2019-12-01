var noble = require('noble-mac');

const ECHO_SERVICE_UUID = '0000fff0-0000-1000-8000-00805f9b34fb';
const ECHO_CHARACTERISTIC_UUID = ['fff3'];
const random = require('./random')

noble.on('stateChange', state => {
    if (state === 'poweredOn') {
        console.log('Scanning');
        noble.startScanning([ECHO_SERVICE_UUID]);
    } else {
        noble.stopScanning();
    }
});

noble.on('discover', peripheral => {
    console.log(peripheral.address)
    // connect to the first peripheral that is scanned
    noble.stopScanning();
    const name = peripheral.advertisement.localName;
    console.log(`Connecting to '${name}' ${peripheral.id}`);
    connectAndSetUp(peripheral);
});

function connectAndSetUp(peripheral) {

    peripheral.connect(error => {
        console.log('Connected to', peripheral.id);

        // specify the services and characteristics to discover
        const serviceUUIDs = [ECHO_SERVICE_UUID];
        const characteristicUUIDs = []; //ECHO_CHARACTERISTIC_UUID;

        peripheral.discoverSomeServicesAndCharacteristics(
            characteristicUUIDs,
            characteristicUUIDs,
            onServicesAndCharacteristicsDiscovered
        );
    });

    peripheral.on('disconnect', () => console.log('disconnected'));
}

function onServicesAndCharacteristicsDiscovered(error, services, characteristics) {
    console.log('Discovered services and characteristics');
    // console.log(characteristics);
    for (var i = 0; i < characteristics.length; i++) {
        //console.log(echoCharacteristic);
        //console.log(characteristics[i]);
        if (characteristics[i].uuid = 'fff3' && characteristics[i].properties[0] == 'writeWithoutResponse') {

            const echoCharacteristic = characteristics[i];

            setInterval((random) => {
                var data = random.generateHexString()
                const message = new Buffer(data.hex, 'hex');
                //console.log(echoCharacteristic);
                console.log("color set to: " + data.color);
                echoCharacteristic.write(message, true)
            }, 5000, random);


        }
    }

}