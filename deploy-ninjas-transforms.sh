#!/bin/bash


# shellcheck disable=SC2164
cd projects/ninjas-transforms

version-select

# Build project ninjas-transforms
ng build ninjas-transforms

cd ../../dist/ninjas-transforms
npm version patch
npm publish

cd ../..
