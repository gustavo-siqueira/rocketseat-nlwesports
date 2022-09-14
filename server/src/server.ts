import express from "express";
import cors from 'cors';
import { PrismaClient } from "@prisma/client";

import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minute";
import { convertMinuteToHourString } from "./utils/conver-minute-to-hour-string";

const app = express();

app.use(express.json());
app.use(cors({
  // origin: 'http://localhost:', Definir acesso para o frontend
}));

const prisma = new PrismaClient();

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  });

  return res.json(games);
});

app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      hourStart: true,
      hourEnd: true,
      useVoiceChannel: true,
      yearsPlaying: true,
    },
    where: {
      gameId
    },
    orderBy: {
      createAt: 'desc',
    }
  });

  return res.json(ads.map(ad => {
    return({
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinuteToHourString(ad.hourStart),
      hourEnd: convertMinuteToHourString(ad.hourEnd)
    })
  }));
});

app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;

  const ad = await prisma.ad.create({    
    // @ts-expect-error
    data: {
      id: body.id,
      name: body.name,
      weekDays: body.weekDays,
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
      yearsPlaying: body.yearsPlaying,
    }
  })

  return res.status(201).json()
});

app.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  })

  return res.json({
    discord: ad.discord,
  });
});

app.get('/ads', (req, res) => {
  return res.json([]);
});

app.listen(3333);