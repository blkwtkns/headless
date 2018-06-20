#!/bin/sh
for x in {1..30} ; do node index.js ||break;sleep 2; done
