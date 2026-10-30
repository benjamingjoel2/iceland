#!/usr/bin/env bash
# Downloads placeholder photography from Unsplash (Unsplash License) into public/images.
# Replace with commissioned Edge of North photography before launch.
set -euo pipefail
cd "$(dirname "$0")/../public/images"
while read -r name id; do
  [ -z "$name" ] && continue
  [ -f "$name.jpg" ] || curl -sSfL -A "Mozilla/5.0" -o "$name.jpg" "https://images.unsplash.com/photo-$id?w=2400&q=80&fm=jpg&fit=max"
done <<'LIST'
aurora-green 1483347756197-71ef80e95f73
aurora-reflection 1507272931001-fc06c17e4f43
aurora-snow 1531366936337-7c912a4589a7
aurora-tall 1517411032315-54ef2cb783bb
aurora-ice 1529963183134-61a90db47eaf
glacier-lagoon 1494564605686-2e931f77a8e2
black-beach 1500043357865-c6b8827edf10
vestrahorn 1504829857797-ddff29c27927
seljalandsfoss 1476610182048-b716b8518aae
canyon 1531168556467-80aace0d0144
canyon-wide 1504893524553-b855bce32c67
reykjavik 1474690870753-1b92efa1f2d8
misty-peaks 1505765050516-f72dcac9c60e
above-clouds 1506905925346-21bda4d32df4
ice-night 1491466424936-e304919aada7
dark-mountain 1485470733090-0aae1788d5af
hazy-hills 1500534314209-a25ddb2bd429
starry-mountain 1536431311719-398b6704d4cc
green-hills 1470071459604-3b5ec3a7fe05
snow-range 1483921020237-2ff51e8e4b22
jeep-stars 1484950763426-56b5bf172dbb
fog 1487621167305-5d248087c724
aerial-coast 1505142468610-359e7d316be0
aerial-shore 1504681869696-d977211a5f4c
snow-cabin 1517299321609-52687d1bc55a
waterfall-figure 1517760444937-f6397edcbbcd
starry-peaks 1519681393784-d120267933ba
horse-white 1553284965-83fd3e82fa5a
horse-brown 1598974357801-cbca100e65d3
whale 1568430462989-44163eb1752f
room-timber 1582719478250-c89cae4dc85b
room-classic 1590490360182-c33d57733427
room-light 1631049307264-da0ec9d70304
room-dark 1618773928121-c32242e63f39
dinner 1414235077428-338989a2e8c0
dining-room 1517248135467-4c7edcad34c4
calm-reflection 1464278533981-50106e6176b1
coast-twilight 1475924156734-496f6cac6ec1
snow-trees 1491002052546-bf38f186af56
clouds 1513002749550-c59d786b8e6c
LIST
