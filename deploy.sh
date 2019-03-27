#!/bin/sh

npm run build
rsync -av --delete dist/ kinetek@cbm.techaround.com:cbm/dist/
scp BitSoft.html kinetek@cbm.techaround.com:cbm/dist/
