#!/bin/sh

ARIA2C_BUILD_NAME=aria2c.tar.bz2

echo "Downloading Aria2c static build latest release from q3aql/aria2-static-builds"
curl -s https://api.github.com/repos/q3aql/aria2-static-builds/releases/latest | grep "download_url" | grep "32bit-build1" | grep "tar" | cut -d : -f 2,3 | tr -d \" | wget -O $ARIA2C_BUILD_NAME -qi- - 

echo "Extracting aria2c static build extract $ARIA2C_BUILD_NAME"
tar xjf $ARIA2C_BUILD_NAME --strip-components=1
RESULT=$?
if [ $RESULT -ne 0 ]; then
	echo "Error occurred in extracting $ARIA2C_BUILD_NAME"
	exit 22 # terminate and indicate error
fi
echo "Extraction completed successfully"

echo "Removing build extract $ARIA2C_BUILD_NAME"
rm -f $ARIA2C_BUILD_NAME
echo "Removed build extract $ARIA2C_BUILD_NAME"

#converting static binaries to executables
chmod +x aria2c

touch aria_session.txt

nohup ./aria2c --conf-path=aria2c.conf > /dev/null 2>&1 < /dev/null &

ARIA2C_RPC_SERVER_PID=$!

echo "Aria2c RPC server started with pid, $ARIA2C_RPC_SERVER_PID"
