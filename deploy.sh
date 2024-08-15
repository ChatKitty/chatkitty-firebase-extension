#!/bin/bash

set -e

log() {
    local message=$1
    echo "$(date +'%Y-%m-%d %H:%M:%S') - $message"
}

if ! command -v firebase &> /dev/null; then
    log "Firebase CLI could not be found. Please install it and retry."
    exit 1
fi

if ! git rev-parse --is-inside-work-tree &> /dev/null; then
    log "Not a git repository. Please run this script inside a valid Git repository."
    exit 1
fi

REPOSITORY_URL=$(git config --get remote.origin.url)
REPOSITORY_URL=${REPOSITORY_URL%.git}

BRANCH=$(git rev-parse --abbrev-ref HEAD)

EXTENSION_NAME="chatkitty/chatkitty"
ROOT="."

read -r -p "Enter the stage (default: stable): " STAGE
STAGE=${STAGE:-stable}

read -r -p "Enter any additional flags (optional): " ADDITIONAL_FLAGS

log "Starting Firebase extension deployment..."
log "Repository URL: $REPOSITORY_URL"
log "Branch: $BRANCH"
log "Stage: $STAGE"
log "Additional Flags: $ADDITIONAL_FLAGS"

if firebase ext:dev:upload "$EXTENSION_NAME" --repo "$REPOSITORY_URL" --ref "$BRANCH" --root "$ROOT" --stage "$STAGE" $ADDITIONAL_FLAGS; then
    log "Firebase extension uploaded successfully."
else
    log "Error occurred during Firebase extension upload."
    exit 1
fi

log "Deployment completed."
exit 0
