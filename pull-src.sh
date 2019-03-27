#!/bin/sh

scp ta2dev:cbm/README.md ./
scp ta2dev:cbm/index.html  ./
scp ta2dev:cbm/*.sh  ./
scp ta2dev:cbm/package* ./
rsync -av ta2dev:cbm/src/ src/
rsync -av ta2dev:cbm/static/ static/
