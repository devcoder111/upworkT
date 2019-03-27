#!/bin/sh

scp README.md index.html *.sh package* ta2dev:cbm/
rsync -av  src/ ta2dev:cbm/src/
rsync -av  static/ ta2dev:cbm/static/
