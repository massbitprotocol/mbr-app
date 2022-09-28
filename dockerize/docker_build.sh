#!/bin/bash
export IMAGE_NAME=massbit/massbitroute_web
export BRANCH_NAME=dev
export IMAGE_TAG=${1:-$BRANCH_NAME}
ROOT_DIR=$(dirname $(realpath $0))
sudo docker build -t "$IMAGE_NAME:$IMAGE_TAG" -f $ROOT_DIR/Dockerfile $ROOT_DIR/..
