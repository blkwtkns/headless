#!/bin/sh
for x in {1..30} ; do yarn start ||break; sleep 2; done
