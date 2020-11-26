#!/bin/bash
set -e
BASE_DIR=`dirname "$0"`

VERSION=${npm_package_version}
if [ -z "$VERSION" ]; then
  VERSION="1.1.0"
fi

echo Image version: $VERSION