#!/usr/bin/env bash
# Builds a placeholder brand film from still photography (slow push-ins + crossfades).
# Replace public/film/edge-of-north.mp4 with the commissioned film before launch.
set -euo pipefail
cd "$(dirname "$0")/.."
I=public/images
O=public/film
W=1280; H=720; D=6; FPS=25
args=(); filters=""; n=0
for img in aurora-green glacier-lagoon vestrahorn above-clouds black-beach aurora-ice; do
  args+=(-i "$I/$img.jpg")
  filters+="[$n:v]scale=2560:-2,zoompan=z='min(zoom+0.0007,1.12)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=$((D*FPS)):s=${W}x${H}:fps=$FPS,setsar=1,format=yuv420p[v$n];"
  n=$((n+1))
done
# chain crossfades
prev="v0"; offset=$((D-1))
for ((i=1;i<n;i++)); do
  filters+="[$prev][v$i]xfade=transition=fade:duration=1:offset=$offset[x$i];"
  prev="x$i"; offset=$((offset+D-1))
done
ffmpeg -y -loglevel error "${args[@]}" -filter_complex "${filters%;}" -map "[$prev]" -c:v libx264 -preset veryfast -crf 31 -t 31 -movflags +faststart -an "$O/edge-of-north.mp4"
ffmpeg -y -loglevel error -i "$O/edge-of-north.mp4" -vf "scale=854:-2" -c:v libx264 -preset veryfast -crf 32 -movflags +faststart -an "$O/edge-of-north-sm.mp4"
ffmpeg -y -loglevel error -ss 1 -i "$O/edge-of-north.mp4" -frames:v 1 -q:v 3 "$O/poster.jpg"
ls -la "$O"
