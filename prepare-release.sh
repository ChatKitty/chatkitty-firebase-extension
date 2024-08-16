#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <NEXT_RELEASE_VERSION>"
  exit 1
fi

NEXT_RELEASE_VERSION=$1

EXTENSION_FILE="extension.yaml"
CHANGELOG_FILE="CHANGELOG.md"

echo "Preparing extension for version $NEXT_RELEASE_VERSION"
sed -i "s/^version:.*/version: $NEXT_RELEASE_VERSION/" $EXTENSION_FILE

echo "Preparing changelog for version $NEXT_RELEASE_VERSION"
sed -i -E "
/^# \[?[0-9]+\.[0-9]+\.[0-9]+\]?/s/^# \[?([0-9]+\.[0-9]+\.[0-9]+)\]?(\(.*\))?(.*)/## Version \1\3/;
/^## \[[0-9]+\.[0-9]+\.[0-9]+\]\(https:\/\/github\.com\/.*\/compare\/[0-9]+\.[0-9]+\.[0-9]+.../s/## \[([0-9]+\.[0-9]+\.[0-9]+)\]\(.*\)/## Version \1/
" $CHANGELOG_FILE
