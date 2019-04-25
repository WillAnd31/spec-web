#!/bin/bash

echo "VUE_APP_BUILD_HASH=$(git rev-parse --short HEAD)" > .env.local