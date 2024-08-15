#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <NEXT_RELEASE_VERSION>"
  exit 1
fi

NEXT_RELEASE_VERSION=$1

EXTENSION_FILE="extension.yaml"
CHANGELOG_FILE="CHANGELOG.md"

echo "Preparing extension for version $NEXT_RELEASE_VERSION"
sed -i.bak "s/^version:.*/version: $NEXT_RELEASE_VERSION/" $EXTENSION_FILE
echo "Updated version in $EXTENSION_FILE to $NEXT_RELEASE_VERSION"

echo "Preparing changelog for version $NEXT_RELEASE_VERSION"
sed -i.bak 's/^# /## Version /' $CHANGELOG_FILE
echo "Updated headings in $CHANGELOG_FILE"
