#!/bin/sh
for x in {1..30} ; do yarn start-voting ||break; sleep 2; done
