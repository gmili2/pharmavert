#!/bin/sh
# Met en ligne le site sur l'hébergement Namecheap (https://pharmavert.mygympro.club).
set -e
cd "$(dirname "$0")"
VITE_BASE=/ npm run build
rsync -az --delete --exclude cgi-bin -e "ssh -i ~/.ssh/gmbijoux_deploy -p 21098" \
  dist/ gmbimeor@server71-1.web-hosting.com:pharmavert.mygympro.club/
echo "En ligne : https://pharmavert.mygympro.club"
