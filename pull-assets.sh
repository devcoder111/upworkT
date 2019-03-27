#!/usr/bin/env bash

rsync -av  ta2dev:cbm/src/assets/ src/assets
rsync -av  ta2dev:cbm/static/ static/
