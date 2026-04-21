// Bot de Haxball con sistema de minijuegos automático
require('dotenv').config();
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const db = require('./db');

// Token de Haxball (puede venir de variable de entorno o hardcoded)
const HAXBALL_TOKEN = process.env.HAXBALL_TOKEN || "thr1.AAAAAGl_okIBMBkfgD5Nuw._Rjq_nJJiH4";

// ============================================
// CONFIGURACIÓN DE OWNER (DUEÑO DE LA SALA)
// ============================================
const OWNER_AUTH = "JHcYct4vfesGbi6tGaauh08AxSwWnZq3QCm4rnzn2GE";

// ============================================
// WEBHOOKS DE DISCORD
// ============================================
const DISCORD_WEBHOOKS = {
    calladmin: "https://discord.com/api/webhooks/1474239767452582111/4yh70-ixJH5MxtRc5r0oCVSFqL8IyMQw1BnNd94_VlnC_2OKFiPLSn7ttI0nwR8lMrO_",
    reportes: "https://discord.com/api/webhooks/1474240910459011143/MYAaiXpGD-S9yjPe_JEF7VcZxa_7SAlLHDTukt0aB6kOvdaHh9LxvWww0DoYd0RSke97",
    tokens: "https://discord.com/api/webhooks/1474240022461943862/-ETrQZuogk-52LRh_f6j1TvstlPqnt-Uf4NfVH4GUoNrz7XpfdyUM0lAjSF97PZHLa2m",
    chatlog: "https://discord.com/api/webhooks/1475216935850475560/tzzFhOdHCgUwBZoy0vE_Vde9BErDbCB0OmX_jbEvj24_dmeEtdemz16TtoGWYwx2taKu",
    replays: "https://discord.com/api/webhooks/1475321739591549091/OdpkhWdvgD-psJISt5r0YjE51W2wuwV7uAo_ab6RigjmwNAeStN09eii3_fKNat-qdmn",
    stats: "https://discord.com/api/webhooks/1477693022148886540/ojM5ATpO2A6F_sny-AknN-KKuJTLaDwmQ1H_e0l-R9ocb48zzuZC38ryiDlDa68FKwR8",
    bugs: "https://discord.com/api/webhooks/1474240910459011143/MYAaiXpGD-S9yjPe_JEF7VcZxa_7SAlLHDTukt0aB6kOvdaHh9LxvWww0DoYd0RSke97"
};

const TEST_MODE = process.env.TEST_MODE === 'true';

async function sendDiscordWebhook(type, content) {
    if (TEST_MODE) {
        console.log("🧪 [TEST] Webhook '" + type + "' (no enviado): " + content.substring(0, 100) + "...");
        return true;
    }
    const url = DISCORD_WEBHOOKS[type];
    if (!url || url.startsWith("PEGAR_")) {
        console.log("⚠️ Webhook '" + type + "' no configurado. Mensaje: " + content);
        return false;
    }
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: content })
        });
        if (resp.ok) {
            console.log("✅ Webhook '" + type + "' enviado");
            return true;
        } else {
            console.error("❌ Webhook '" + type + "' error:", resp.status);
            return false;
        }
    } catch(e) {
        console.error("❌ Webhook '" + type + "' error:", e.message);
        return false;
    }
}

async function sendDiscordReplay(replayArray, gameName) {
    const url = DISCORD_WEBHOOKS.replays;
    if (!url) { console.log("⚠️ Webhook replays no configurado"); return false; }
    try {
        const buffer = Buffer.from(replayArray);
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        const formData = new FormData();
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const safeName = gameName.replace(/[^a-zA-Z0-9_ ]/g, '').replace(/ /g, '_');
        const fileName = safeName + '_' + timestamp + '.hbr';
        formData.append('file', blob, fileName);
        formData.append('payload_json', JSON.stringify({
            content: '🎮 **' + gameName + '** - ' + now.toLocaleString('es-ES')
        }));
        const resp = await fetch(url, { method: 'POST', body: formData });
        if (resp.ok) {
            console.log("✅ Replay '" + gameName + "' enviado a Discord");
            return true;
        } else {
            console.error("❌ Replay error:", resp.status);
            return false;
        }
    } catch(e) {
        console.error("❌ Replay error:", e.message);
        return false;
    }
}

// Cargar mapas de minijuegos
const mapLALALAPath = path.join(__dirname, 'Mapas', 'LALALA from HaxMaps.hbs');
const mapLALALAData = fs.readFileSync(mapLALALAPath, 'utf8');

const mapSurvivalPath = path.join(__dirname, 'Mapas', 'Survival Room _ Leo.hbs');
const mapSurvivalData = fs.readFileSync(mapSurvivalPath, 'utf8');

const mapMeteorsPath = path.join(__dirname, 'Mapas', 'Meteors Survival v3 from HaxMaps.hbs');
const mapMeteorsData = fs.readFileSync(mapMeteorsPath, 'utf8');

const mapJumpingPath = path.join(__dirname, 'Mapas', 'Jumping Arena by MC [20 players].hbs');
const mapJumpingData = fs.readFileSync(mapJumpingPath, 'utf8');

const mapWebSurvivalPath = path.join(__dirname, 'Mapas', 'Web Survival Version 2 by Namajunas [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapWebSurvivalData = fs.readFileSync(mapWebSurvivalPath, 'utf8');

const mapGalacticPath = path.join(__dirname, 'Mapas', 'Galactic Fit by Vhagar & Jordan [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapGalacticData = fs.readFileSync(mapGalacticPath, 'utf8');

const mapSupermanPath = path.join(__dirname, 'Mapas', 'Superman Chair v2 by Namajunas [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapSupermanData = fs.readFileSync(mapSupermanPath, 'utf8');

const mapSurvivalSquarePath = path.join(__dirname, 'Mapas', 'Survival Square Deluxe by _R [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapSurvivalSquareData = fs.readFileSync(mapSurvivalSquarePath, 'utf8');

const mapGymPath = path.join(__dirname, 'Mapas', 'GYM from HaxMaps.hbs');
const mapGymData = fs.readFileSync(mapGymPath, 'utf8');

const mapMultiBallsPath = path.join(__dirname, 'Mapas', 'MultiBalls Survival by Galactic Boy from HaxMaps.hbs');
const mapMultiBallsData = fs.readFileSync(mapMultiBallsPath, 'utf8');

const mapUltraBallPath = path.join(__dirname, 'Mapas', 'ULTRABALL.hbs');
const mapUltraBallData = fs.readFileSync(mapUltraBallPath, 'utf8');

const mapDodgeballPath = path.join(__dirname, 'Mapas', 'Dodgeball by MC.hbs');
const mapDodgeballData = fs.readFileSync(mapDodgeballPath, 'utf8');
const mapDodgeballV2Path = path.join(__dirname, 'Mapas', 'Dodgeball v2 _ Leo.hbs');
const mapDodgeballV2Data = fs.readFileSync(mapDodgeballV2Path, 'utf8');
const mapNumberChairsPath = path.join(__dirname, 'Numberchair', 'NumberChairs v2 by Şerefli Şeref [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapNumberChairsData = fs.readFileSync(mapNumberChairsPath, 'utf8');

// Cargar todos los mapas NumberChairs v2-v21
const numberChairMaps = {};
numberChairMaps[2] = mapNumberChairsData;
const numberChairDir = path.join(__dirname, 'Numberchair');
for (let v = 3; v <= 21; v++) {
    const files = fs.readdirSync(numberChairDir).filter(f => f.includes('-v' + v + '-'));
    if (files.length > 0) {
        numberChairMaps[v] = fs.readFileSync(path.join(numberChairDir, files[0]), 'utf8');
    }
}

const mapChairMixPath = path.join(__dirname, 'Mapas', 'ChairMix by Vhagar.hbs');
const mapChairMixData = fs.readFileSync(mapChairMixPath, 'utf8');

const mapCollisionPath = path.join(__dirname, 'Mapas', 'Collision team racing 9 by MC  from HaxMaps.hbs');
const mapCollisionData = fs.readFileSync(mapCollisionPath, 'utf8');

// Map: Space Melee
const mapSpaceMeleePath = path.join(__dirname, 'Mapas', 'Space Melee by Namajunas [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapSpaceMeleeData = fs.readFileSync(mapSpaceMeleePath, 'utf8');

// Map: Spot Bonk
const mapSpotBonkPath = path.join(__dirname, 'Mapas', 'Spot Bonk by MC from HaxMaps.hbs');
const mapSpotBonkData = fs.readFileSync(mapSpotBonkPath, 'utf8');

// Map: COVID-19 Survival (Teams)
const mapCovid19Path = path.join(__dirname, 'Mapas', 'Covid-19 Survival [Teams] by Galactic Boy.hbs');
const mapCovid19Data = fs.readFileSync(mapCovid19Path, 'utf8');

// Map: Gymmix 6
const mapGymmixPath = path.join(__dirname, 'Mapas', 'Gymmix 6 by MC.hbs');
const mapGymmixData = fs.readFileSync(mapGymmixPath, 'utf8');

// Map: TRIVIA
const mapTriviaPath = path.join(__dirname, 'Mapas', 'TRIVIA Wolfgang fixed by_ _R [\u029C\u1D00x\u1D0D\u1D0F\u1D05s.\u1D04\u1D0F\u1D0D].hbs');
const mapTriviaData = fs.readFileSync(mapTriviaPath, 'utf8');

// Map: Game Of Thrones
const mapGOTPath = path.join(__dirname, 'Mapas', 'Game Of Thrones from HaxMaps.hbs');
const mapGOTData = fs.readFileSync(mapGOTPath, 'utf8');

// Map: Space Case
const mapSpaceCasePath = path.join(__dirname, 'Mapas', '_Space Case by MC.hbs');
const mapSpaceCaseData = fs.readFileSync(mapSpaceCasePath, 'utf8');

// Map: American Space Carryball
const mapCarryballPath = path.join(__dirname, 'Mapas', 'American Space Carryball by Alf.hbs');
const mapCarryballData = fs.readFileSync(mapCarryballPath, 'utf8');

// Map: Big Multiballs Ring Survival
const mapRingSurvivalPath = path.join(__dirname, 'Mapas', 'Big Multiballs Ring Survival from HaxMaps.hbs');
const mapRingSurvivalData = fs.readFileSync(mapRingSurvivalPath, 'utf8');

// Map: BONK Arena by MC
const mapBonkArenaPath = path.join(__dirname, 'Mapas', 'BONK Arena by MC from HaxMaps.hbs');
const mapBonkArenaData = fs.readFileSync(mapBonkArenaPath, 'utf8');

// Map: Bonk Game By Beru [16 players]
const mapBonkBeruPath = path.join(__dirname, 'Mapas', 'Bonk Game By Beru [16 players] from HaxMaps.hbs');
const mapBonkBeruData = fs.readFileSync(mapBonkBeruPath, 'utf8');

// Map: AnimalChairs v2 Whale
const mapAnimalChairsPath = path.join(__dirname, 'Mapas', 'AnimalChairs v2 Whale by Şerefli Şeref [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapAnimalChairsData = fs.readFileSync(mapAnimalChairsPath, 'utf8');

// Map: Bonk Game By Beru (HaxMaps version)
const mapBonkBeruHaxPath = path.join(__dirname, 'Mapas', 'Bonk Game By Beru from HaxMaps.hbs');
const mapBonkBeruHaxData = fs.readFileSync(mapBonkBeruHaxPath, 'utf8');

// Map: Covid2 by Namajunas
const mapCovid2Path = path.join(__dirname, 'Mapas', 'Covid2byNamajunasfromHaxMaps.hbs');
const mapCovid2Data = fs.readFileSync(mapCovid2Path, 'utf8');

// Map: DOMINIC SURVIVOR 15
const mapDominicPath = path.join(__dirname, 'Mapas', 'DOMINIC SURVIVOR 15 from HaxMaps.hbs');
const mapDominicData = fs.readFileSync(mapDominicPath, 'utf8');

// Map: Air Hockey
const mapAirHockeyPath = path.join(__dirname, 'Mapas', 'Air Hockey v1 v2 By Lioss [\u029C\u1D00x\u1D0D\u1D0F\u1D05s.\u1D04\u1D0F\u1D0D].hbs');
const mapAirHockeyData = fs.readFileSync(mapAirHockeyPath, 'utf8');

// Map: FIT IN TREN
const mapFitTrenPath = path.join(__dirname, 'Mapas', 'FIT IN TREN by NAMAJUNAS (5 red - 5 blue) from HaxMaps.hbs');
const mapFitTrenData = fs.readFileSync(mapFitTrenPath, 'utf8');

// Map: Fitanic
const mapFitanicPath = path.join(__dirname, 'Mapas', 'Fitanic by Şerefli Şeref [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapFitanicData = fs.readFileSync(mapFitanicPath, 'utf8');

// Map: Fortunate Race
const mapFortunateRacePath = path.join(__dirname, 'Mapas', 'Fortunate or unfortunate Race HD Cech from HaxMaps.hbs');
const mapFortunateRaceData = fs.readFileSync(mapFortunateRacePath, 'utf8');

// Map: Kafa Topu
const mapKafaTopuPath = path.join(__dirname, 'Mapas', 'Kafa Topu by Vhagar.hbs');
const mapKafaTopuData = fs.readFileSync(mapKafaTopuPath, 'utf8');

// Map: Kafa Topu Shadow
const mapKafaShadowPath = path.join(__dirname, 'Mapas', 'Kafa Topu Shadow by Tudor [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapKafaShadowData = fs.readFileSync(mapKafaShadowPath, 'utf8');

// Map: Kuru Kafa Bonk
const mapKuruKafaPath = path.join(__dirname, 'Mapas', 'Kuru Kafa Bonk by Namajunas from HaxMaps.hbs');
const mapKuruKafaData = fs.readFileSync(mapKuruKafaPath, 'utf8');

// Map: Laser Race 20000
const mapLaserRacePath = path.join(__dirname, 'Mapas', 'Laser Race 20000 from HaxMaps.hbs');
const mapLaserRaceData = fs.readFileSync(mapLaserRacePath, 'utf8');

// Map: Capture the Vlag
const mapCTFPath = path.join(__dirname, 'Mapas', 'capture the vlag by valn [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapCTFData = fs.readFileSync(mapCTFPath, 'utf8');

// Map: Cops and Robbers
const mapCopsRobbersPath = path.join(__dirname, 'Mapas', 'Hırsız & Polis _  (Cops and Robbers) by Namajunas [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapCopsRobbersData = fs.readFileSync(mapCopsRobbersPath, 'utf8');

// Map: 1234
const map1234Path = path.join(__dirname, 'Mapas', '1234-by-Qua-ʜᴀxᴍᴏᴅs.ᴄᴏᴍ_6359999414324.hbs');
const map1234Data = fs.readFileSync(map1234Path, 'utf8');

// Map: War of Conquest
const mapWarConquestPath = path.join(__dirname, 'Mapas', 'War-Of-Conquest-by-Namajunas-ʜᴀxᴍᴏᴅs.ᴄᴏᴍ_6556da2c05a07.hbs');
const mapWarConquestData = fs.readFileSync(mapWarConquestPath, 'utf8');

// Map: Tank War
const mapTankWarPath = path.join(__dirname, 'Mapas', 'Tank-War-flag-version-by-namajunas-ʜᴀxᴍᴏᴅs.ᴄᴏᴍ_63445a4ca17fe.hbs');
const mapTankWarData = fs.readFileSync(mapTankWarPath, 'utf8');

// Map: Jump by Qua
const mapJumpQuaPath = path.join(__dirname, 'Mapas', 'Jump by Qua [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapJumpQuaData = fs.readFileSync(mapJumpQuaPath, 'utf8');

// Map: Boomerang League
const mapBoomerangPath = path.join(__dirname, 'Mapas', '부메랑 리그 - 원반 v1.0.hbs');
const mapBoomerangData = fs.readFileSync(mapBoomerangPath, 'utf8');

// Map: XD (sin gravedad)
const mapXDPath = path.join(__dirname, 'Mapas', 'xd from HaxMaps.hbs');
const mapXDData = fs.readFileSync(mapXDPath, 'utf8');

// Map: WWECross
const mapWWECrossPath = path.join(__dirname, 'Mapas', 'WWECross-Prototype.hbs');
const mapWWECrossData = fs.readFileSync(mapWWECrossPath, 'utf8');

// Map: Web Survival III
const mapWebSurvival3Path = path.join(__dirname, 'Mapas', 'Web Survival Ⅲ  by Namajunas [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapWebSurvival3Data = fs.readFileSync(mapWebSurvival3Path, 'utf8');

// Map: Trampolin
const mapTrampolinPath = path.join(__dirname, 'Mapas', 'Trambolin.hbs');
const mapTrampolinData = fs.readFileSync(mapTrampolinPath, 'utf8');

// Map: Swing Trampolin
const mapSwingTrampolinPath = path.join(__dirname, 'Mapas', 'Swing Trambolin by Namajunas from HaxMaps.hbs');
const mapSwingTrampolinData = fs.readFileSync(mapSwingTrampolinPath, 'utf8');

// Map: Super Gravedad x4
const mapSuperGravedadPath = path.join(__dirname, 'Mapas', 'Super gravedad x4 - !!zDk.hbs');
const mapSuperGravedadData = fs.readFileSync(mapSuperGravedadPath, 'utf8');

// Map: Endure Survival 2
const mapEndureSurvivalPath = path.join(__dirname, 'Mapas', 'Endure Survival 2 by Namajunas from HaxMaps.hbs');
const mapEndureSurvivalData = fs.readFileSync(mapEndureSurvivalPath, 'utf8');

// Map: Endure Survival Bombs
const mapEndureBombsPath = path.join(__dirname, 'Mapas', 'Endure Survival (Bombs) by Alf [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapEndureBombsData = fs.readFileSync(mapEndureBombsPath, 'utf8');

// Map: Bonk Movable
const mapBonkMovablePath = path.join(__dirname, 'Mapas', 'Bonk-Movable-by-Namajunas-ʜᴀxᴍᴏᴅs.ᴄᴏᴍ_618002e5bafc7.hbs');
const mapBonkMovableData = fs.readFileSync(mapBonkMovablePath, 'utf8');

// Map: Lucky Race
const mapLuckyRacePath = path.join(__dirname, 'Mapas', 'Lucky race 10000 from HaxMaps.hbs');
const mapLuckyRaceData = fs.readFileSync(mapLuckyRacePath, 'utf8');

// Map: Street Race
const mapStreetRacePath = path.join(__dirname, 'Mapas', 'Street_race_70000 from HaxMaps.hbs');
const mapStreetRaceData = fs.readFileSync(mapStreetRacePath, 'utf8');

// Map: Shooting Survival
const mapShootingSurvivalPath = path.join(__dirname, 'Mapas', 'Shooting Survival .hbs');
const mapShootingSurvivalData = fs.readFileSync(mapShootingSurvivalPath, 'utf8');

// Map: SpaceBounce Race
const mapSpacebounceRacePath = path.join(__dirname, 'Mapas', 'SpaceBounce race 10000 from HaxMaps.hbs');
const mapSpacebounceRaceData = fs.readFileSync(mapSpacebounceRacePath, 'utf8');

// Map: RUN Rebound
const mapRunReboundPath = path.join(__dirname, 'Mapas', 'RUN rebound 1 by pagus.hbs');
const mapRunReboundData = fs.readFileSync(mapRunReboundPath, 'utf8');

// Map: Meadowlands Survival
const mapMeadowlandsPath = path.join(__dirname, 'Mapas', 'Meadowlands Survival.hbs');
const mapMeadowlandsData = fs.readFileSync(mapMeadowlandsPath, 'utf8');

// Map: Ban Vote (Juicio Público)
const mapBanVotePath = path.join(__dirname, 'Mapas', 'Ban_ by Meeelany [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapBanVoteData = fs.readFileSync(mapBanVotePath, 'utf8');

// Map: Survivor VOL 17
const mapSurvivorVol17Path = path.join(__dirname, 'Mapas', 'Survivor-VOL-17-Namajunas-ʜᴀxᴍᴏᴅs.ᴄᴏᴍ_65bee97e78587.hbs');
const mapSurvivorVol17Data = fs.readFileSync(mapSurvivorVol17Path, 'utf8');

// Map: Wind
const mapWindPath = path.join(__dirname, 'Mapas', 'Wind-by-Namajunas-ʜᴀxᴍᴏᴅs.ᴄᴏᴍ_6260f81615856.hbs');
const mapWindData = fs.readFileSync(mapWindPath, 'utf8');

// Map: Musical FIT
const mapMusicalFitPath = path.join(__dirname, 'Mapas', 'Musical-FIT-by-kara-aytac-14-players-ʜᴀxᴍᴏᴅs.ᴄᴏᴍ_626361ab4d651.hbs');
const mapMusicalFitData = fs.readFileSync(mapMusicalFitPath, 'utf8');

// Map: Namajunas Race
const mapNamajunasRacePath = path.join(__dirname, 'Mapas', 'Namajunas Race (My Last Map) from HaxMaps.hbs');
const mapNamajunasRaceData = fs.readFileSync(mapNamajunasRacePath, 'utf8');

// Map: Namajunas Race 2
const mapNamajunasRace2Path = path.join(__dirname, 'Mapas', 'Namajunas Race 2 [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapNamajunasRace2Data = fs.readFileSync(mapNamajunasRace2Path, 'utf8');

// Map: Impostor (chair.hbs)
const mapImpostorPath = path.join(__dirname, 'Mapas', 'chair.hbs');
const mapImpostorData = fs.readFileSync(mapImpostorPath, 'utf8');

// Map: FCT 1
const mapFCT1Path = path.join(__dirname, 'Mapas', 'FCT 1 - Falafels Collision Team 1.hbs');
const mapFCT1Data = fs.readFileSync(mapFCT1Path, 'utf8');

// Map: Fit in Graveyard
const mapGraveyardPath = path.join(__dirname, 'Mapas', 'Fit in (Graveyard) by Galactic Boy [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapGraveyardData = fs.readFileSync(mapGraveyardPath, 'utf8');

// Map: Futbol Callejero
const mapFutbolCallejeroPath = path.join(__dirname, 'Mapas', 'Futbol callejero a las piñas.hbs');
const mapFutbolCallejeroData = fs.readFileSync(mapFutbolCallejeroPath, 'utf8');

// Map: Gol a Gol
const mapGolAGolPath = path.join(__dirname, 'Mapas', 'Gol a Gol by SalgadoDoce goal from HaxMaps.hbs');
const mapGolAGolData = fs.readFileSync(mapGolAGolPath, 'utf8');

// Map: Gym 5.3 Colors
const mapGymColorsPath = path.join(__dirname, 'Mapas', 'Gym 5.3 Colors by Şerefli Şeref [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapGymColorsData = fs.readFileSync(mapGymColorsPath, 'utf8');

// Map: Gym 9
const mapGym9Path = path.join(__dirname, 'Mapas', 'Gym 9 from HaxMaps.hbs');
const mapGym9Data = fs.readFileSync(mapGym9Path, 'utf8');

// Map: Matrix Fit
const mapMatrixFitPath = path.join(__dirname, 'Mapas', 'Matrix Fit by Vhagar [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ].hbs');
const mapMatrixFitData = fs.readFileSync(mapMatrixFitPath, 'utf8');

// Map: Race 02
const mapRace02Path = path.join(__dirname, 'Mapas', 'Race 02 by MC from HaxMaps.hbs');
const mapRace02Data = fs.readFileSync(mapRace02Path, 'utf8');

// Map: Plum
const mapPlumPath = path.join(__dirname, 'Mapas', 'Plum from HaxMaps.hbs');
const mapPlumData = fs.readFileSync(mapPlumPath, 'utf8');

// Map: RUN Rebound 2
const mapRunRebound2Path = path.join(__dirname, 'Mapas', 'RUN rebound 2 by pagus.hbs');
const mapRunRebound2Data = fs.readFileSync(mapRunRebound2Path, 'utf8');

// Map: Swing Cannons
const mapSwingCannonsPath = path.join(__dirname, 'Mapas', 'Swing-3-Cannons-by-kara-aytac-8-players-\u029C\u1D00x\u1D0D\u1D0F\u1D05s.\u1D04\u1D0F\u1D0D_62636226478f4.hbs');
const mapSwingCannonsData = fs.readFileSync(mapSwingCannonsPath, 'utf8');

// Map: Survival Insect
const mapSurvivalInsectPath = path.join(__dirname, 'Mapas', 'Survival-From-Insect-by-FY-\u029C\u1D00x\u1D0D\u1D0F\u1D05s.\u1D04\u1D0F\u1D0D_64c62a1d6140d.hbs');
const mapSurvivalInsectData = fs.readFileSync(mapSurvivalInsectPath, 'utf8');

// Map: Run Luck
const mapRunLuckPath = path.join(__dirname, 'Mapas', 'Run-Luck-By-Beru-\u029C\u1D00x\u1D0D\u1D0F\u1D05s.\u1D04\u1D0F\u1D0D_6512efefb172b (1).hbs');
const mapRunLuckData = fs.readFileSync(mapRunLuckPath, 'utf8');

// Map: Pinball Roulette
const mapPinballRoulettePath = path.join(__dirname, 'Mapas', 'KOR-P.-CECH-Pinball-Roulette-\u029C\u1D00x\u1D0D\u1D0F\u1D05s.\u1D04\u1D0F\u1D0D_6534bd14f1879.hbs');
const mapPinballRouletteData = fs.readFileSync(mapPinballRoulettePath, 'utf8');

// Map: Jumping Survival
const mapJumpingSurvivalPath = path.join(__dirname, 'Mapas', 'Jumping-Survival-by-Serefli-Seref-\u029C\u1D00x\u1D0D\u1D0F\u1D05s.\u1D04\u1D0F\u1D0D_61ae1e1af196f.hbs');
const mapJumpingSurvivalData = fs.readFileSync(mapJumpingSurvivalPath, 'utf8');

// Map: Shaolin Soccer
const mapShaolinSoccerPath = path.join(__dirname, 'Mapas', 'Shaolin Soccer [gargus] V2 Edit [\u029C\u1D00x\u1D0D\u1D0F\u1D05s.\u1D04\u1D0F\u1D0D].hbs');
const mapShaolinSoccerData = fs.readFileSync(mapShaolinSoccerPath, 'utf8');

// Map: Space Vortex
const mapSpaceVortexPath = path.join(__dirname, 'Mapas', 'Space Vortex _Asdman.hbs');
const mapSpaceVortexData = fs.readFileSync(mapSpaceVortexPath, 'utf8');

// Map: SpaceBounce Power
const mapSpaceBouncePowerPath = path.join(__dirname, 'Mapas', 'SpaceBounce Power from HaxMaps.hbs');
const mapSpaceBouncePowerData = fs.readFileSync(mapSpaceBouncePowerPath, 'utf8');

// Map: B.T.L
const mapBtlPath = path.join(__dirname, 'Mapas', 'B.T.L-by-Serefli-Seref-\u029C\u1D00x\u1D0D\u1D0F\u1D05s.\u1D04\u1D0F\u1D0D_61ae180ad2466.hbs');
const mapBtlData = fs.readFileSync(mapBtlPath, 'utf8');

// Map: Bonk Summer
const mapBonkSummerPath = path.join(__dirname, 'Mapas', 'Bonk-Summer-by-Serefli-Seref-20-players-\u029C\u1D00x\u1D0D\u1D0F\u1D05s.\u1D04\u1D0F\u1D0D_61ae18e96d540.hbs');
const mapBonkSummerData = fs.readFileSync(mapBonkSummerPath, 'utf8');

// Map: Basketball
const mapBasketballPath = path.join(__dirname, 'Mapas', '\u0299\u1D00s\u1D0B\u1D07\u1D1B\u0299\u1D00\u029F\u029F \uD83C\uDFC0 By GLH.hbs');
const mapBasketballData = fs.readFileSync(mapBasketballPath, 'utf8');

// Map: Bonk Winter
const mapBonkWinterPath = path.join(__dirname, 'Mapas', 'Bonk-Winter-by-Serefli-Seref-20-players-\u029C\u1D00x\u1D0D\u1D0F\u1D05s.\u1D04\u1D0F\u1D0D_61ae19074320f.hbs');
const mapBonkWinterData = fs.readFileSync(mapBonkWinterPath, 'utf8');

// Cargar mapas de luckys
const mapLuckPath = path.join(__dirname, 'Lucks', 'Lucky-Map-2-by-Meeelany-ʜᴀxᴍᴏᴅs.ᴄᴏᴍ_667a7e7e87381.hbs');
const mapLuckData = fs.readFileSync(mapLuckPath, 'utf8');

const mapLuckDiosPath = path.join(__dirname, 'Lucks', 'Luck DIOS 2 by Pagus.hbs');
const mapLuckDiosData = fs.readFileSync(mapLuckDiosPath, 'utf8');

const mapLuckHellPath = path.join(__dirname, 'Lucks', 'Lucky Hell Map 1 by Meeelany from HaxMaps.hbs');
const mapLuckHellData = fs.readFileSync(mapLuckHellPath, 'utf8');

// Cargar módulos de luckys desde nueva carpeta
const luckyModulePath = path.join(__dirname, 'games', 'luckys', 'lucky.js');
const luckyModuleCode = fs.readFileSync(luckyModulePath, 'utf8');

const luckyHellModulePath = path.join(__dirname, 'games', 'luckys', 'luckyhell.js');
const luckyHellModuleCode = fs.readFileSync(luckyHellModulePath, 'utf8');

const luckyDiosModulePath = path.join(__dirname, 'games', 'luckys', 'luckydios.js');
const luckyDiosModuleCode = fs.readFileSync(luckyDiosModulePath, 'utf8');

// Cargar módulos de minijuegos desde nueva carpeta
const lalalaModulePath = path.join(__dirname, 'games', 'minijuegos', 'lalala.js');
const lalalaModuleCode = fs.readFileSync(lalalaModulePath, 'utf8');

const survivalModulePath = path.join(__dirname, 'games', 'minijuegos', 'survival.js');
const survivalModuleCode = fs.readFileSync(survivalModulePath, 'utf8');

const meteorsModulePath = path.join(__dirname, 'games', 'minijuegos', 'meteors.js');
const meteorsModuleCode = fs.readFileSync(meteorsModulePath, 'utf8');

const jumpingModulePath = path.join(__dirname, 'games', 'minijuegos', 'jumping.js');
const jumpingModuleCode = fs.readFileSync(jumpingModulePath, 'utf8');

const websurvivalModulePath = path.join(__dirname, 'games', 'minijuegos', 'websurvival.js');
const websurvivalModuleCode = fs.readFileSync(websurvivalModulePath, 'utf8');

const galacticModulePath = path.join(__dirname, 'games', 'minijuegos', 'galactic.js');
const galacticModuleCode = fs.readFileSync(galacticModulePath, 'utf8');

const gymModulePath = path.join(__dirname, 'games', 'minijuegos', 'gym.js');
const gymModuleCode = fs.readFileSync(gymModulePath, 'utf8');

const multiballsModulePath = path.join(__dirname, 'games', 'minijuegos', 'multiballs.js');
const multiballsModuleCode = fs.readFileSync(multiballsModulePath, 'utf8');
const supermanModulePath = path.join(__dirname, 'games', 'minijuegos', 'superman.js');
const supermanModuleCode = fs.readFileSync(supermanModulePath, 'utf8');
const dodgeballModulePath = path.join(__dirname, 'games', 'minijuegos', 'dodgeball.js');
const dodgeballModuleCode = fs.readFileSync(dodgeballModulePath, 'utf8');
const dodgeballV2ModulePath = path.join(__dirname, 'games', 'minijuegos', 'dodgeball_v2.js');
const dodgeballV2ModuleCode = fs.readFileSync(dodgeballV2ModulePath, 'utf8');
const numberChairsModulePath = path.join(__dirname, 'games', 'minijuegos', 'numberchairs.js');
const numberChairsModuleCode = fs.readFileSync(numberChairsModulePath, 'utf8');
const ultraballModulePath = path.join(__dirname, 'games', 'minijuegos', 'ultraball.js');
const ultraballModuleCode = fs.readFileSync(ultraballModulePath, 'utf8');
const survSquareModulePath = path.join(__dirname, 'games', 'minijuegos', 'survivalsquare.js');
const survSquareModuleCode = fs.readFileSync(survSquareModulePath, 'utf8');
const collisionModulePath = path.join(__dirname, 'games', 'minijuegos', 'collision_team_racing.js');
const collisionModuleCode = fs.readFileSync(collisionModulePath, 'utf8');
const spotBonkModulePath = path.join(__dirname, 'games', 'minijuegos', 'spot_bonk.js');
const spotBonkModuleCode = fs.readFileSync(spotBonkModulePath, 'utf8');
const spaceMeleeModulePath = path.join(__dirname, 'games', 'minijuegos', 'space_melee.js');
const spaceMeleeModuleCode = fs.readFileSync(spaceMeleeModulePath, 'utf8');
const chairmixModulePath = path.join(__dirname, 'games', 'minijuegos', 'chairmix.js');
const chairmixModuleCode = fs.readFileSync(chairmixModulePath, 'utf8');
const covidModulePath = path.join(__dirname, 'games', 'minijuegos', 'covid19.js');
const covidModuleCode = fs.readFileSync(covidModulePath, 'utf8');
const gymmixModulePath = path.join(__dirname, 'games', 'minijuegos', 'gymmix.js');
const gymmixModuleCode = fs.readFileSync(gymmixModulePath, 'utf8');
const triviaModulePath = path.join(__dirname, 'games', 'minijuegos', 'trivia.js');
const triviaModuleCode = fs.readFileSync(triviaModulePath, 'utf8');
const gotModulePath = path.join(__dirname, 'games', 'minijuegos', 'got.js');
const gotModuleCode = fs.readFileSync(gotModulePath, 'utf8');
const spaceCaseModulePath = path.join(__dirname, 'games', 'minijuegos', 'space_case.js');
const spaceCaseModuleCode = fs.readFileSync(spaceCaseModulePath, 'utf8');

const carryballModulePath = path.join(__dirname, 'games', 'minijuegos', 'american_carryball.js');
const carryballModuleCode = fs.readFileSync(carryballModulePath, 'utf8');

const ringSurvivalModulePath = path.join(__dirname, 'games', 'minijuegos', 'ring_survival.js');
const ringSurvivalModuleCode = fs.readFileSync(ringSurvivalModulePath, 'utf8');

const bonkArenaModulePath = path.join(__dirname, 'games', 'minijuegos', 'bonk_arena.js');
const bonkArenaModuleCode = fs.readFileSync(bonkArenaModulePath, 'utf8');

const bonkBeruModulePath = path.join(__dirname, 'games', 'minijuegos', 'bonk_beru.js');
const bonkBeruModuleCode = fs.readFileSync(bonkBeruModulePath, 'utf8');

const animalChairsModulePath = path.join(__dirname, 'games', 'minijuegos', 'animalchairs_whale.js');
const animalChairsModuleCode = fs.readFileSync(animalChairsModulePath, 'utf8');

const bonkBeruHaxModulePath = path.join(__dirname, 'games', 'minijuegos', 'bonk_beru_hax.js');
const bonkBeruHaxModuleCode = fs.readFileSync(bonkBeruHaxModulePath, 'utf8');

const covid2ModulePath = path.join(__dirname, 'games', 'minijuegos', 'covid2.js');
const covid2ModuleCode = fs.readFileSync(covid2ModulePath, 'utf8');

const dominicModulePath = path.join(__dirname, 'games', 'minijuegos', 'dominic_survivor.js');
const dominicModuleCode = fs.readFileSync(dominicModulePath, 'utf8');

const airHockeyModulePath = path.join(__dirname, 'games', 'minijuegos', 'air_hockey.js');
const airHockeyModuleCode = fs.readFileSync(airHockeyModulePath, 'utf8');

const fitTrenModulePath = path.join(__dirname, 'games', 'minijuegos', 'fit_in_tren.js');
const fitTrenModuleCode = fs.readFileSync(fitTrenModulePath, 'utf8');

const fitanicModulePath = path.join(__dirname, 'games', 'minijuegos', 'fitanic.js');
const fitanicModuleCode = fs.readFileSync(fitanicModulePath, 'utf8');

const fortunateRaceModulePath = path.join(__dirname, 'games', 'minijuegos', 'fortunate_race.js');
const fortunateRaceModuleCode = fs.readFileSync(fortunateRaceModulePath, 'utf8');

const kafaTopuModulePath = path.join(__dirname, 'games', 'minijuegos', 'kafa_topu.js');
const kafaTopuModuleCode = fs.readFileSync(kafaTopuModulePath, 'utf8');

const kafaShadowModulePath = path.join(__dirname, 'games', 'minijuegos', 'kafa_topu_shadow.js');
const kafaShadowModuleCode = fs.readFileSync(kafaShadowModulePath, 'utf8');

const kuruKafaModulePath = path.join(__dirname, 'games', 'minijuegos', 'kuru_kafa_bonk.js');
const kuruKafaModuleCode = fs.readFileSync(kuruKafaModulePath, 'utf8');

const laserRaceModulePath = path.join(__dirname, 'games', 'minijuegos', 'laser_race.js');
const laserRaceModuleCode = fs.readFileSync(laserRaceModulePath, 'utf8');

const ctfModulePath = path.join(__dirname, 'games', 'minijuegos', 'capture_the_flag.js');
const ctfModuleCode = fs.readFileSync(ctfModulePath, 'utf8');

const copsRobbersModulePath = path.join(__dirname, 'games', 'minijuegos', 'cops_robbers.js');
const copsRobbersModuleCode = fs.readFileSync(copsRobbersModulePath, 'utf8');

const juego1234ModulePath = path.join(__dirname, 'games', 'minijuegos', 'juego_1234.js');
const juego1234ModuleCode = fs.readFileSync(juego1234ModulePath, 'utf8');

const warConquestModulePath = path.join(__dirname, 'games', 'minijuegos', 'war_conquest.js');
const warConquestModuleCode = fs.readFileSync(warConquestModulePath, 'utf8');

const tankWarModulePath = path.join(__dirname, 'games', 'minijuegos', 'tank_war.js');
const tankWarModuleCode = fs.readFileSync(tankWarModulePath, 'utf8');

const jumpQuaModulePath = path.join(__dirname, 'games', 'minijuegos', 'jump.js');
const jumpQuaModuleCode = fs.readFileSync(jumpQuaModulePath, 'utf8');

const boomerangModulePath = path.join(__dirname, 'games', 'minijuegos', 'boomerang_league.js');
const boomerangModuleCode = fs.readFileSync(boomerangModulePath, 'utf8');

const xdGoalsModulePath = path.join(__dirname, 'games', 'minijuegos', 'xd_goals.js');
const xdGoalsModuleCode = fs.readFileSync(xdGoalsModulePath, 'utf8');

const wwecrossModulePath = path.join(__dirname, 'games', 'minijuegos', 'wwecross.js');
const wwecrossModuleCode = fs.readFileSync(wwecrossModulePath, 'utf8');

const webSurvival3ModulePath = path.join(__dirname, 'games', 'minijuegos', 'web_survival_3.js');
const webSurvival3ModuleCode = fs.readFileSync(webSurvival3ModulePath, 'utf8');

const trampolinModulePath = path.join(__dirname, 'games', 'minijuegos', 'trampolin.js');
const trampolinModuleCode = fs.readFileSync(trampolinModulePath, 'utf8');

const swingTrampolinModulePath = path.join(__dirname, 'games', 'minijuegos', 'swing_trampolin.js');
const swingTrampolinModuleCode = fs.readFileSync(swingTrampolinModulePath, 'utf8');

const superGravedadModulePath = path.join(__dirname, 'games', 'minijuegos', 'super_gravedad.js');
const superGravedadModuleCode = fs.readFileSync(superGravedadModulePath, 'utf8');

const endureSurvivalModulePath = path.join(__dirname, 'games', 'minijuegos', 'endure_survival.js');
const endureSurvivalModuleCode = fs.readFileSync(endureSurvivalModulePath, 'utf8');

const luckyRaceModulePath = path.join(__dirname, 'games', 'minijuegos', 'lucky_race.js');
const luckyRaceModuleCode = fs.readFileSync(luckyRaceModulePath, 'utf8');

const streetRaceModulePath = path.join(__dirname, 'games', 'minijuegos', 'street_race.js');
const streetRaceModuleCode = fs.readFileSync(streetRaceModulePath, 'utf8');

const shootingSurvivalModulePath = path.join(__dirname, 'games', 'minijuegos', 'shooting_survival.js');
const shootingSurvivalModuleCode = fs.readFileSync(shootingSurvivalModulePath, 'utf8');

const spacebounceRaceModulePath = path.join(__dirname, 'games', 'minijuegos', 'spacebounce_race.js');
const spacebounceRaceModuleCode = fs.readFileSync(spacebounceRaceModulePath, 'utf8');

const runReboundModulePath = path.join(__dirname, 'games', 'minijuegos', 'run_rebound.js');
const runReboundModuleCode = fs.readFileSync(runReboundModulePath, 'utf8');

const meadowlandsModulePath = path.join(__dirname, 'games', 'minijuegos', 'meadowlands.js');
const meadowlandsModuleCode = fs.readFileSync(meadowlandsModulePath, 'utf8');

const survivorVol17ModulePath = path.join(__dirname, 'games', 'minijuegos', 'survivor_vol17.js');
const survivorVol17ModuleCode = fs.readFileSync(survivorVol17ModulePath, 'utf8');

const windModulePath = path.join(__dirname, 'games', 'minijuegos', 'wind.js');
const windModuleCode = fs.readFileSync(windModulePath, 'utf8');

const impostorModulePath = path.join(__dirname, 'games', 'minijuegos', 'impostor.js');
const impostorModuleCode = fs.readFileSync(impostorModulePath, 'utf8');
const pistoleroModulePath = path.join(__dirname, 'games', 'minijuegos', 'pistolero.js');
const pistoleroModuleCode = fs.readFileSync(pistoleroModulePath, 'utf8');

const bonkMovableModulePath = path.join(__dirname, 'games', 'minijuegos', 'bonk_movable.js');
const bonkMovableModuleCode = fs.readFileSync(bonkMovableModulePath, 'utf8');

const endureBombsModulePath = path.join(__dirname, 'games', 'minijuegos', 'endure_bombs.js');
const endureBombsModuleCode = fs.readFileSync(endureBombsModulePath, 'utf8');

const musicalFitModulePath = path.join(__dirname, 'games', 'minijuegos', 'musical_fit.js');
const musicalFitModuleCode = fs.readFileSync(musicalFitModulePath, 'utf8');

const namajunasRaceModulePath = path.join(__dirname, 'games', 'minijuegos', 'namajunas_race.js');
const namajunasRaceModuleCode = fs.readFileSync(namajunasRaceModulePath, 'utf8');

const namajunasRace2ModulePath = path.join(__dirname, 'games', 'minijuegos', 'namajunas_race2.js');
const namajunasRace2ModuleCode = fs.readFileSync(namajunasRace2ModulePath, 'utf8');

const fct1ModulePath = path.join(__dirname, 'games', 'minijuegos', 'fct1.js');
const fct1ModuleCode = fs.readFileSync(fct1ModulePath, 'utf8');

const graveyardModulePath = path.join(__dirname, 'games', 'minijuegos', 'fit_in_graveyard.js');
const graveyardModuleCode = fs.readFileSync(graveyardModulePath, 'utf8');

const futbolCallejeroModulePath = path.join(__dirname, 'games', 'minijuegos', 'futbol_callejero.js');
const futbolCallejeroModuleCode = fs.readFileSync(futbolCallejeroModulePath, 'utf8');

const golAGolModulePath = path.join(__dirname, 'games', 'minijuegos', 'gol_a_gol.js');
const golAGolModuleCode = fs.readFileSync(golAGolModulePath, 'utf8');

const gymColorsModulePath = path.join(__dirname, 'games', 'minijuegos', 'gym_colors.js');
const gymColorsModuleCode = fs.readFileSync(gymColorsModulePath, 'utf8');

const gym9ModulePath = path.join(__dirname, 'games', 'minijuegos', 'gym9.js');
const gym9ModuleCode = fs.readFileSync(gym9ModulePath, 'utf8');

const matrixFitModulePath = path.join(__dirname, 'games', 'minijuegos', 'matrix_fit.js');
const matrixFitModuleCode = fs.readFileSync(matrixFitModulePath, 'utf8');

const race02ModulePath = path.join(__dirname, 'games', 'minijuegos', 'race02.js');
const race02ModuleCode = fs.readFileSync(race02ModulePath, 'utf8');

const plumModulePath = path.join(__dirname, 'games', 'minijuegos', 'plum.js');
const plumModuleCode = fs.readFileSync(plumModulePath, 'utf8');

const runRebound2ModulePath = path.join(__dirname, 'games', 'minijuegos', 'run_rebound_2.js');
const runRebound2ModuleCode = fs.readFileSync(runRebound2ModulePath, 'utf8');

const swingCannonsModulePath = path.join(__dirname, 'games', 'minijuegos', 'swing_cannons.js');
const swingCannonsModuleCode = fs.readFileSync(swingCannonsModulePath, 'utf8');

const survivalInsectModulePath = path.join(__dirname, 'games', 'minijuegos', 'survival_insect.js');
const survivalInsectModuleCode = fs.readFileSync(survivalInsectModulePath, 'utf8');

const runLuckModulePath = path.join(__dirname, 'games', 'minijuegos', 'run_luck.js');
const runLuckModuleCode = fs.readFileSync(runLuckModulePath, 'utf8');

const pinballRouletteModulePath = path.join(__dirname, 'games', 'minijuegos', 'pinball_roulette.js');
const pinballRouletteModuleCode = fs.readFileSync(pinballRouletteModulePath, 'utf8');

const jumpingSurvivalModulePath = path.join(__dirname, 'games', 'minijuegos', 'jumping_survival.js');
const jumpingSurvivalModuleCode = fs.readFileSync(jumpingSurvivalModulePath, 'utf8');

const shaolinSoccerModulePath = path.join(__dirname, 'games', 'minijuegos', 'shaolin_soccer.js');
const shaolinSoccerModuleCode = fs.readFileSync(shaolinSoccerModulePath, 'utf8');

const spaceVortexModulePath = path.join(__dirname, 'games', 'minijuegos', 'space_vortex.js');
const spaceVortexModuleCode = fs.readFileSync(spaceVortexModulePath, 'utf8');

const spaceBouncePowerModulePath = path.join(__dirname, 'games', 'minijuegos', 'spacebounce_power.js');
const spaceBouncePowerModuleCode = fs.readFileSync(spaceBouncePowerModulePath, 'utf8');

const basketballModulePath = path.join(__dirname, 'games', 'minijuegos', 'basketball.js');
const basketballModuleCode = fs.readFileSync(basketballModulePath, 'utf8');

const btlModulePath = path.join(__dirname, 'games', 'minijuegos', 'btl.js');
const btlModuleCode = fs.readFileSync(btlModulePath, 'utf8');

const bonkSummerModulePath = path.join(__dirname, 'games', 'minijuegos', 'bonk_summer.js');
const bonkSummerModuleCode = fs.readFileSync(bonkSummerModulePath, 'utf8');

const bonkWinterModulePath = path.join(__dirname, 'games', 'minijuegos', 'bonk_winter.js');
const bonkWinterModuleCode = fs.readFileSync(bonkWinterModulePath, 'utf8');

const zombieRunModulePath = path.join(__dirname, 'games', 'minijuegos', 'zombie_run.js');
const zombieRunModuleCode = fs.readFileSync(zombieRunModulePath, 'utf8');

const racingGroundModulePath = path.join(__dirname, 'games', 'minijuegos', 'racing_ground.js');
const racingGroundModuleCode = fs.readFileSync(racingGroundModulePath, 'utf8');

const buhoModulePath = path.join(__dirname, 'games', 'minijuegos', 'buho.js');
const buhoModuleCode = fs.readFileSync(buhoModulePath, 'utf8');

// Cargar mapas Buho (2-MAN a 16-MAN + CAMPEON)
const buhoMapsDir = path.join(__dirname, 'Buho', 'mapas');
const buhoMapsData = {};
const buhoGoalCenters = {};
if (fs.existsSync(buhoMapsDir)) {
    fs.readdirSync(buhoMapsDir).forEach(function(file) {
        if (!file.endsWith('.hbs')) return;
        const match = file.match(/^(\d+|CAMPEON)-MAN/);
        if (match) {
            const key = match[1];
            const content = fs.readFileSync(path.join(buhoMapsDir, file), 'utf8');
            buhoMapsData[key] = content;
            try {
                const parsed = JSON.parse(content);
                if (parsed.goals) {
                    buhoGoalCenters[key] = parsed.goals.map(function(g) {
                        return { x: Math.round((g.p0[0] + g.p1[0]) / 2), y: Math.round((g.p0[1] + g.p1[1]) / 2) };
                    });
                } else {
                    buhoGoalCenters[key] = [];
                }
            } catch(e) { buhoGoalCenters[key] = []; }
        }
    });
    console.log('Mapas Buho cargados: ' + Object.keys(buhoMapsData).length);
}

// Map: Zombie Run
const mapZombieRunPath = path.join(__dirname, 'Mapas', '¡ZOMBIE-RUN-LaboratorioByEmaxM16Ofi-ʜᴀxᴍᴏᴅs.ᴄᴏᴍ_67c8ecb1e06b7.hbs');
const mapZombieRunData = fs.readFileSync(mapZombieRunPath, 'utf8');

// Map: Racing Ground
const mapRacingGroundPath = path.join(__dirname, 'Mapas', '1.-Racing-Ground-ʜᴀxᴍᴏᴅs.ᴄᴏᴍ_66d7c2a6a6359.hbs');
const mapRacingGroundData = fs.readFileSync(mapRacingGroundPath, 'utf8');

// Cargar código principal de la sala
const roomMainCodePath = path.join(__dirname, 'room-main.txt');
const roomMainCode = fs.readFileSync(roomMainCodePath, 'utf8');

// Función helper para transformar módulos Node.js a navegador
function transformBuhoForBrowser(moduleCode, maps, goalCenters) {
    const buhoDataJson = JSON.stringify({ maps: maps, goalCenters: goalCenters });
    let code = moduleCode
        .replace(/const fs = require\('fs'\);?\n?/g, '')
        .replace(/const path = require\('path'\);?\n?/g, '')
        .replace(/const /g, 'var ')
        .replace(/let /g, 'var ')
        .replace(/module\.exports\s*=\s*/g, 'return ')
        .replace(/var buhoData = null;.*$/m, 'var buhoData = ' + buhoDataJson + ';');
    return '(function() {\n' + code + '\n})()';
}

function transformModuleForBrowser(moduleCode, mapData) {
    // ⚠️ CRÍTICO: El mapa DEBE ser una STRING JSON, NO un objeto JavaScript
    // Haxball's room.setCustomStadium() espera recibir una string JSON, no un objeto
    // Si pasas un objeto, falla con "Unexpected 'o' at line 1 column 3" porque
    // internamente Haxball hace JSON.parse() y recibe "[object Object]" como string
    const mapJsonString = JSON.stringify(mapData);
    
    // Eliminar require, module.exports y agregar return al final
    let code = moduleCode
        .replace(/const fs = require\('fs'\);?\n?/g, '')
        .replace(/const path = require\('path'\);?\n?/g, '')
        .replace(/const /g, 'var ')
        .replace(/let /g, 'var ')
        .replace(/module\.exports\s*=\s*/g, 'return ')
        .replace(/var mapData = null;.*$/m, 'var mapData = ' + mapJsonString + ';')
;

    return '(function() {\n' + code + '\n})()';
}

// Script del bot con minijuegos automáticos
const getBotScript = () => {
    const lalalaModule = transformModuleForBrowser(lalalaModuleCode, mapLALALAData);
    const survivalModule = transformModuleForBrowser(survivalModuleCode, mapSurvivalData);
    const meteorsModule = transformModuleForBrowser(meteorsModuleCode, mapMeteorsData);
    const jumpingModule = transformModuleForBrowser(jumpingModuleCode, mapJumpingData);
    const websurvivalModule = transformModuleForBrowser(websurvivalModuleCode, mapWebSurvivalData);
    const galacticModule = transformModuleForBrowser(galacticModuleCode, mapGalacticData);
    const spaceMeleeModule = transformModuleForBrowser(spaceMeleeModuleCode, mapSpaceMeleeData);
    const spotBonkModule = transformModuleForBrowser(spotBonkModuleCode, mapSpotBonkData);
        const chairmixModule = transformModuleForBrowser(chairmixModuleCode, mapChairMixData);
        const covidModule = transformModuleForBrowser(covidModuleCode, mapCovid19Data);
        const gymmixModule = transformModuleForBrowser(gymmixModuleCode, mapGymmixData);
        const triviaModule = transformModuleForBrowser(triviaModuleCode, mapTriviaData);
        const gotModule = transformModuleForBrowser(gotModuleCode, mapGOTData);
        const spaceCaseModule = transformModuleForBrowser(spaceCaseModuleCode, mapSpaceCaseData);
        const carryballModule = transformModuleForBrowser(carryballModuleCode, mapCarryballData);
        const ringSurvivalModule = transformModuleForBrowser(ringSurvivalModuleCode, mapRingSurvivalData);
        const bonkArenaModule = transformModuleForBrowser(bonkArenaModuleCode, mapBonkArenaData);
        const bonkBeruModule = transformModuleForBrowser(bonkBeruModuleCode, mapBonkBeruData);
        const animalChairsModule = transformModuleForBrowser(animalChairsModuleCode, mapAnimalChairsData);
        const bonkBeruHaxModule = transformModuleForBrowser(bonkBeruHaxModuleCode, mapBonkBeruHaxData);
        const covid2Module = transformModuleForBrowser(covid2ModuleCode, mapCovid2Data);
        const dominicModule = transformModuleForBrowser(dominicModuleCode, mapDominicData);
        const airHockeyModule = transformModuleForBrowser(airHockeyModuleCode, mapAirHockeyData);
        const fitTrenModule = transformModuleForBrowser(fitTrenModuleCode, mapFitTrenData);
        const fitanicModule = transformModuleForBrowser(fitanicModuleCode, mapFitanicData);
        const fortunateRaceModule = transformModuleForBrowser(fortunateRaceModuleCode, mapFortunateRaceData);
        const kafaTopuModule = transformModuleForBrowser(kafaTopuModuleCode, mapKafaTopuData);
        const kafaShadowModule = transformModuleForBrowser(kafaShadowModuleCode, mapKafaShadowData);
        const kuruKafaModule = transformModuleForBrowser(kuruKafaModuleCode, mapKuruKafaData);
        const laserRaceModule = transformModuleForBrowser(laserRaceModuleCode, mapLaserRaceData);
        const ctfModule = transformModuleForBrowser(ctfModuleCode, mapCTFData);
        const copsRobbersModule = transformModuleForBrowser(copsRobbersModuleCode, mapCopsRobbersData);
        const juego1234Module = transformModuleForBrowser(juego1234ModuleCode, map1234Data);
        const warConquestModule = transformModuleForBrowser(warConquestModuleCode, mapWarConquestData);
        const tankWarModule = transformModuleForBrowser(tankWarModuleCode, mapTankWarData);
        const jumpQuaModule = transformModuleForBrowser(jumpQuaModuleCode, mapJumpQuaData);
        const boomerangModule = transformModuleForBrowser(boomerangModuleCode, mapBoomerangData);
        const xdGoalsModule = transformModuleForBrowser(xdGoalsModuleCode, mapXDData);
        const wwecrossModule = transformModuleForBrowser(wwecrossModuleCode, mapWWECrossData);
        const webSurvival3Module = transformModuleForBrowser(webSurvival3ModuleCode, mapWebSurvival3Data);
        const trampolinModule = transformModuleForBrowser(trampolinModuleCode, mapTrampolinData);
        const swingTrampolinModule = transformModuleForBrowser(swingTrampolinModuleCode, mapSwingTrampolinData);
        const superGravedadModule = transformModuleForBrowser(superGravedadModuleCode, mapSuperGravedadData);
        const endureSurvivalModule = transformModuleForBrowser(endureSurvivalModuleCode, mapEndureSurvivalData);
        const luckyRaceModule = transformModuleForBrowser(luckyRaceModuleCode, mapLuckyRaceData);
        const streetRaceModule = transformModuleForBrowser(streetRaceModuleCode, mapStreetRaceData);
        const shootingSurvivalModule = transformModuleForBrowser(shootingSurvivalModuleCode, mapShootingSurvivalData);
        const spacebounceRaceModule = transformModuleForBrowser(spacebounceRaceModuleCode, mapSpacebounceRaceData);
        const runReboundModule = transformModuleForBrowser(runReboundModuleCode, mapRunReboundData);
        const meadowlandsModule = transformModuleForBrowser(meadowlandsModuleCode, mapMeadowlandsData);
        const survivorVol17Module = transformModuleForBrowser(survivorVol17ModuleCode, mapSurvivorVol17Data);
        const windModule = transformModuleForBrowser(windModuleCode, mapWindData);
        const impostorModule = transformModuleForBrowser(impostorModuleCode, mapImpostorData);
        const pistoleroModule = transformModuleForBrowser(pistoleroModuleCode, mapImpostorData);
        const bonkMovableModule = transformModuleForBrowser(bonkMovableModuleCode, mapBonkMovableData);
        const endureBombsModule = transformModuleForBrowser(endureBombsModuleCode, mapEndureBombsData);
        const musicalFitModule = transformModuleForBrowser(musicalFitModuleCode, mapMusicalFitData);
        const namajunasRaceModule = transformModuleForBrowser(namajunasRaceModuleCode, mapNamajunasRaceData);
        const namajunasRace2Module = transformModuleForBrowser(namajunasRace2ModuleCode, mapNamajunasRace2Data);
        const fct1Module = transformModuleForBrowser(fct1ModuleCode, mapFCT1Data);
        const graveyardModule = transformModuleForBrowser(graveyardModuleCode, mapGraveyardData);
        const futbolCallejeroModule = transformModuleForBrowser(futbolCallejeroModuleCode, mapFutbolCallejeroData);
        const golAGolModule = transformModuleForBrowser(golAGolModuleCode, mapGolAGolData);
        const gymColorsModule = transformModuleForBrowser(gymColorsModuleCode, mapGymColorsData);
        const gym9Module = transformModuleForBrowser(gym9ModuleCode, mapGym9Data);
        const matrixFitModule = transformModuleForBrowser(matrixFitModuleCode, mapMatrixFitData);
        const race02Module = transformModuleForBrowser(race02ModuleCode, mapRace02Data);
        const plumModule = transformModuleForBrowser(plumModuleCode, mapPlumData);
        const runRebound2Module = transformModuleForBrowser(runRebound2ModuleCode, mapRunRebound2Data);
        const swingCannonsModule = transformModuleForBrowser(swingCannonsModuleCode, mapSwingCannonsData);
        const survivalInsectModule = transformModuleForBrowser(survivalInsectModuleCode, mapSurvivalInsectData);
        const runLuckModule = transformModuleForBrowser(runLuckModuleCode, mapRunLuckData);
        const pinballRouletteModule = transformModuleForBrowser(pinballRouletteModuleCode, mapPinballRouletteData);
        const jumpingSurvivalModule = transformModuleForBrowser(jumpingSurvivalModuleCode, mapJumpingSurvivalData);
        const shaolinSoccerModule = transformModuleForBrowser(shaolinSoccerModuleCode, mapShaolinSoccerData);
        const spaceVortexModule = transformModuleForBrowser(spaceVortexModuleCode, mapSpaceVortexData);
        const spaceBouncePowerModule = transformModuleForBrowser(spaceBouncePowerModuleCode, mapSpaceBouncePowerData);
        const basketballModule = transformModuleForBrowser(basketballModuleCode, mapBasketballData);
        const btlModule = transformModuleForBrowser(btlModuleCode, mapBtlData);
        const bonkSummerModule = transformModuleForBrowser(bonkSummerModuleCode, mapBonkSummerData);
        const bonkWinterModule = transformModuleForBrowser(bonkWinterModuleCode, mapBonkWinterData);
        const zombieRunModule = transformModuleForBrowser(zombieRunModuleCode, mapZombieRunData);
        const racingGroundModule = transformModuleForBrowser(racingGroundModuleCode, mapRacingGroundData);
        const buhoModule = transformBuhoForBrowser(buhoModuleCode, buhoMapsData, buhoGoalCenters);
    const gymModule = transformModuleForBrowser(gymModuleCode, mapGymData);
    const multiballsModule = transformModuleForBrowser(multiballsModuleCode, mapMultiBallsData);
    const supermanModule = transformModuleForBrowser(supermanModuleCode, mapSupermanData);
    const dodgeballModule = transformModuleForBrowser(dodgeballModuleCode, mapDodgeballData);
    const dodgeballV2Module = transformModuleForBrowser(dodgeballV2ModuleCode, mapDodgeballV2Data);
    const collisionModule = transformModuleForBrowser(collisionModuleCode, mapCollisionData);
    const numberChairsModule = transformModuleForBrowser(numberChairsModuleCode, mapNumberChairsData);
    const ultraballModule = transformModuleForBrowser(ultraballModuleCode, mapUltraBallData);
    const survSquareModule = transformModuleForBrowser(survSquareModuleCode, mapSurvivalSquareData);
    
    // Escapar el código de los módulos Lucky
    const escapedLuckyCode = luckyModuleCode;
    const escapedLuckyHellCode = luckyHellModuleCode;
    const escapedLuckyDiosCode = luckyDiosModuleCode;
    
    // Reemplazar variables dinámicas en room-main.txt
    let mainCode = roomMainCode
        .replace(/##TOKEN##/g, HAXBALL_TOKEN)
        .replace(/##OWNER_AUTH##/g, OWNER_AUTH)
        .replace(/##MAP_LUCK##/g, JSON.stringify(JSON.stringify(mapLuckData)))
        .replace(/##MAP_LUCK_DIOS##/g, JSON.stringify(JSON.stringify(mapLuckDiosData)))
        .replace(/##MAP_LUCK_HELL##/g, JSON.stringify(JSON.stringify(mapLuckHellData)))
        .replace(/##MAP_DODGEBALL##/g, JSON.stringify(JSON.stringify(mapDodgeballData)))
        .replace(/##MAP_SUPERMAN##/g, JSON.stringify(JSON.stringify(mapSupermanData)))
        .replace(/##MAP_ULTRABALL##/g, JSON.stringify(JSON.stringify(mapUltraBallData)))
        .replace(/##MAP_NUMBERCHAIRS##/g, JSON.stringify(JSON.stringify(mapNumberChairsData)))
        .replace(/##MAP_SURVIVAL_SQUARE##/g, JSON.stringify(JSON.stringify(mapSurvivalSquareData)))
        .replace(/##MAP_COLLISION##/g, JSON.stringify(JSON.stringify(mapCollisionData)))
        .replace(/##MAP_SPOT_BONK##/g, JSON.stringify(JSON.stringify(mapSpotBonkData)))
        .replace(/##MAP_SPACE_MELEE##/g, JSON.stringify(JSON.stringify(mapSpaceMeleeData)))
        .replace(/##MAP_CHAIRMIX##/g, JSON.stringify(JSON.stringify(mapChairMixData)));
        
    // Inyectar todos los mapas de NumberChairs (v2-v21)
    var ncAllMapsObj = {};
    for (var ncV in numberChairMaps) {
        ncAllMapsObj[ncV] = numberChairMaps[ncV];
    }
    mainCode = mainCode.replace(/##NUMBERCHAIR_ALL_MAPS##/g, JSON.stringify(ncAllMapsObj));

    mainCode = mainCode.replace(/##MAP_COVID19##/g, JSON.stringify(JSON.stringify(mapCovid19Data)));
    mainCode = mainCode.replace(/##MAP_GYMMIX##/g, JSON.stringify(JSON.stringify(mapGymmixData)));
    mainCode = mainCode.replace(/##MAP_TRIVIA##/g, JSON.stringify(JSON.stringify(mapTriviaData)));
    mainCode = mainCode.replace(/##MAP_GOT##/g, JSON.stringify(JSON.stringify(mapGOTData)));
    mainCode = mainCode.replace(/##MAP_SPACECASE##/g, JSON.stringify(JSON.stringify(mapSpaceCaseData)));
    mainCode = mainCode.replace(/##MAP_CARRYBALL##/g, JSON.stringify(JSON.stringify(mapCarryballData)));
    mainCode = mainCode.replace(/##MAP_RING_SURVIVAL##/g, JSON.stringify(JSON.stringify(mapRingSurvivalData)));
    mainCode = mainCode.replace(/##MAP_BONK_ARENA##/g, JSON.stringify(JSON.stringify(mapBonkArenaData)));
    mainCode = mainCode.replace(/##MAP_BONK_BERU##/g, JSON.stringify(JSON.stringify(mapBonkBeruData)));
    mainCode = mainCode.replace(/##MAP_BAN_VOTE##/g, JSON.stringify(JSON.stringify(mapBanVoteData)));
    mainCode = mainCode.replace(/##MAP_IMPOSTOR##/g, JSON.stringify(JSON.stringify(mapImpostorData)));

    // Modo test: sala privada con contraseña
    if (TEST_MODE) {
        mainCode = mainCode.replace(
            'roomName: "\uD83C\uDFAE\uD83C\uDFAE\uD83C\uDFAE| Minigames_Isagi|| Minijue    gos + lucky \uD83C\uDFAE"',
            'roomName: "\uD83E\uDDEA TEST | Minijuegos"'
        );
        mainCode = mainCode.replace('public: true,', 'public: false,\n    password: "1234",');
    }

    // Inyectar lista de juegos de test (si existe)
    var testGamesVar = 'var TEST_ONLY_GAMES = null;\n';
    if (TEST_MODE && process.env.TEST_GAMES) {
        try {
            var testList = JSON.parse(process.env.TEST_GAMES);
            if (Array.isArray(testList) && testList.length > 0) {
                testGamesVar = 'var TEST_ONLY_GAMES = ' + JSON.stringify(testList) + ';\n';
                console.log('\uD83E\uDDEA Juegos de test: ' + testList.join(', '));
            }
        } catch(e) {}
    }

    // Construir el script completo
    return testGamesVar + `
// ============================================
// MÓDULO: LALALA
// ============================================
var LALALA = ` + lalalaModule + `;

// ============================================
// MÓDULO: SURVIVAL ROOM
// ============================================
var SURVIVAL = ` + survivalModule + `;

// ============================================
// MÓDULO: METEORS SURVIVAL
// ============================================
var METEORS = ` + meteorsModule + `;

// ============================================
// MÓDULO: JUMPING ARENA
// ============================================
var JUMPING = ` + jumpingModule + `;

// ============================================
// MÓDULO: WEB SURVIVAL
// ============================================
var WEBSURVIVAL = ` + websurvivalModule + `;

// ============================================
// MÓDULO: GALACTIC FIT
// ============================================
var GALACTIC = ` + galacticModule + `;

// ============================================
// MÓDULO: SPACE MELEE
// ============================================
var SPACE_MELEE = ` + spaceMeleeModule + `;

// ============================================
// MÓDULO: GYM
// ============================================
var GYM = ` + gymModule + `;

// ============================================
// MÓDULO: MULTIBALLS
// ============================================
var MULTIBALLS = ` + multiballsModule + `;

// ============================================
// MÓDULO: DODGEBALL
// ============================================
var DODGEBALL = ` + dodgeballModule + `;

// ============================================
// MÓDULO: DODGEBALL V2
// ============================================
var DODGEBALL_V2 = ` + dodgeballV2Module + `;

// ============================================
// MÓDULO: SUPERMAN
// ============================================
var SUPERMAN = ` + supermanModule + `;

// ============================================
// MÓDULO: ULTRABALL
// ============================================
var ULTRABALL = ` + ultraballModule + `;

// ============================================
// MÓDULO: NUMBER CHAIRS
// ============================================
var NUMBERCHAIRS = ` + numberChairsModule + `;

// ============================================
// MÓDULO: SURVIVAL SQUARE
// ============================================
var SURVIVAL_SQ = ` + survSquareModule + `;

// ============================================
// MÓDULO: COLLISION TEAM RACING
// ============================================
var COLLISION_TEAM_RACING = ` + collisionModule + `;
// ============================================
// MÓDULO: SPOT_BONK
// ============================================
var SPOT_BONK = ` + spotBonkModule + `;
// ============================================
// MÓDULO: CHAIRMIX
// ============================================
var CHAIRMIX = ` + chairmixModule + `;

// ============================================
// MÓDULO: COVID19
// ============================================
var COVID19 = ` + covidModule + `;

// ============================================
// MÓDULO: GYMMIX
// ============================================
var GYMMIX = ` + gymmixModule + `;

// ============================================
// MÓDULO: TRIVIA
// ============================================
var TRIVIA = ` + triviaModule + `;

// ============================================
// MÓDULO: GAME OF THRONES
// ============================================
var GOT = ` + gotModule + `;

// ============================================
// MÓDULO: SPACE CASE
// ============================================
var SPACE_CASE = ` + spaceCaseModule + `;

// ============================================
// MÓDULO: AMERICAN SPACE CARRYBALL
// ============================================
var AMERICAN_CARRYBALL = ` + carryballModule + `;

// ============================================
// MÓDULO: RING SURVIVAL
// ============================================
var RING_SURVIVAL = ` + ringSurvivalModule + `;

// ============================================
// MÓDULO: BONK ARENA
// ============================================
var BONK_ARENA = ` + bonkArenaModule + `;

// ============================================
// MÓDULO: BONK BERU
// ============================================
var BONK_BERU = ` + bonkBeruModule + `;

// ============================================
// MÓDULO: ANIMALCHAIRS WHALE
// ============================================
var ANIMALCHAIRS_WHALE = ` + animalChairsModule + `;

// ============================================
// MÓDULO: BONK BERU HAX
// ============================================
var BONK_BERU_HAX = ` + bonkBeruHaxModule + `;

// ============================================
// MÓDULO: COVID2
// ============================================
var COVID2 = ` + covid2Module + `;

// ============================================
// MÓDULO: DOMINIC SURVIVOR
// ============================================
var DOMINIC_SURVIVOR = ` + dominicModule + `;

// ============================================
// MÓDULO: AIR HOCKEY
// ============================================
var AIR_HOCKEY = ` + airHockeyModule + `;

// ============================================
// MÓDULO: FIT IN TREN
// ============================================
var FIT_IN_TREN = ` + fitTrenModule + `;

// ============================================
// MÓDULO: FITANIC
// ============================================
var FITANIC = ` + fitanicModule + `;

// ============================================
// MÓDULO: FORTUNATE RACE
// ============================================
var FORTUNATE_RACE = ` + fortunateRaceModule + `;

// ============================================
// MÓDULO: KAFA TOPU
// ============================================
var KAFA_TOPU = ` + kafaTopuModule + `;

// ============================================
// MÓDULO: KAFA TOPU SHADOW
// ============================================
var KAFA_TOPU_SHADOW = ` + kafaShadowModule + `;

// ============================================
// MÓDULO: KURU KAFA BONK
// ============================================
var KURU_KAFA_BONK = ` + kuruKafaModule + `;

// ============================================
// MÓDULO: LASER RACE
// ============================================
var LASER_RACE = ` + laserRaceModule + `;

// ============================================
// MÓDULO: CAPTURE THE FLAG
// ============================================
var CAPTURE_THE_FLAG = ` + ctfModule + `;

// ============================================
// MÓDULO: COPS AND ROBBERS
// ============================================
var COPS_ROBBERS = ` + copsRobbersModule + `;

// ============================================
// MÓDULO: JUEGO 1234
// ============================================
var JUEGO_1234 = ` + juego1234Module + `;

// ============================================
// MÓDULO: WAR OF CONQUEST
// ============================================
var WAR_CONQUEST = ` + warConquestModule + `;

// ============================================
// MÓDULO: TANK WAR
// ============================================
var TANK_WAR = ` + tankWarModule + `;

// ============================================
// MÓDULO: JUMP QUA
// ============================================
var JUMP_QUA = ` + jumpQuaModule + `;

// ============================================
// MÓDULO: BOOMERANG LEAGUE
// ============================================
var BOOMERANG_LEAGUE = ` + boomerangModule + `;

// ============================================
// MÓDULO: XD GOALS
// ============================================
var XD_GOALS = ` + xdGoalsModule + `;

// ============================================
// MÓDULO: WWECROSS
// ============================================
var WWECROSS = ` + wwecrossModule + `;

// ============================================
// MÓDULO: WEB SURVIVAL III
// ============================================
var WEB_SURVIVAL_3 = ` + webSurvival3Module + `;

// ============================================
// MÓDULO: TRAMPOLIN
// ============================================
var TRAMPOLIN = ` + trampolinModule + `;

// ============================================
// MÓDULO: SWING TRAMPOLIN
// ============================================
var SWING_TRAMPOLIN = ` + swingTrampolinModule + `;

// ============================================
// MÓDULO: SUPER GRAVEDAD x4
// ============================================
var SUPER_GRAVEDAD = ` + superGravedadModule + `;

// ============================================
// MÓDULO: ENDURE SURVIVAL 2
// ============================================
var ENDURE_SURVIVAL = ` + endureSurvivalModule + `;

// ============================================
// MÓDULO: LUCKY RACE
// ============================================
var LUCKY_RACE = ` + luckyRaceModule + `;

// ============================================
// MÓDULO: STREET RACE
// ============================================
var STREET_RACE = ` + streetRaceModule + `;

// ============================================
// MÓDULO: SHOOTING SURVIVAL
// ============================================
var SHOOTING_SURVIVAL = ` + shootingSurvivalModule + `;

// ============================================
// MÓDULO: SPACEBOUNCE RACE
// ============================================
var SPACEBOUNCE_RACE = ` + spacebounceRaceModule + `;

// ============================================
// MÓDULO: RUN REBOUND
// ============================================
var RUN_REBOUND = ` + runReboundModule + `;

// ============================================
// MÓDULO: MEADOWLANDS
// ============================================
var MEADOWLANDS = ` + meadowlandsModule + `;

// ============================================
// MÓDULO: SURVIVOR VOL 17
// ============================================
var SURVIVOR_VOL17 = ` + survivorVol17Module + `;

// ============================================
// MÓDULO: WIND
// ============================================
var WIND = ` + windModule + `;

// ============================================
// MÓDULO: IMPOSTOR
// ============================================
var IMPOSTOR = ` + impostorModule + `;

// ============================================
// MÓDULO: PISTOLERO
// ============================================
var PISTOLERO = ` + pistoleroModule + `;

// ============================================
// MÓDULO: BONK MOVABLE
// ============================================
var BONK_MOVABLE = ` + bonkMovableModule + `;

// ============================================
// MÓDULO: ENDURE BOMBS
// ============================================
var ENDURE_BOMBS = ` + endureBombsModule + `;

// ============================================
// MÓDULO: MUSICAL FIT
// ============================================
var MUSICAL_FIT = ` + musicalFitModule + `;

// ============================================
// MÓDULO: NAMAJUNAS RACE
// ============================================
var NAMAJUNAS_RACE = ` + namajunasRaceModule + `;

// ============================================
// MÓDULO: NAMAJUNAS RACE 2
// ============================================
var NAMAJUNAS_RACE_2 = ` + namajunasRace2Module + `;

// ============================================
// MÓDULO: FCT 1
// ============================================
var FCT1 = ` + fct1Module + `;

// ============================================
// MÓDULO: FIT IN GRAVEYARD
// ============================================
var FIT_IN_GRAVEYARD = ` + graveyardModule + `;

// ============================================
// MÓDULO: FUTBOL CALLEJERO
// ============================================
var FUTBOL_CALLEJERO = ` + futbolCallejeroModule + `;

// ============================================
// MÓDULO: GOL A GOL
// ============================================
var GOL_A_GOL = ` + golAGolModule + `;

// ============================================
// MÓDULO: GYM COLORS
// ============================================
var GYM_COLORS = ` + gymColorsModule + `;

// ============================================
// MÓDULO: GYM 9
// ============================================
var GYM9 = ` + gym9Module + `;

// ============================================
// MÓDULO: MATRIX FIT
// ============================================
var MATRIX_FIT = ` + matrixFitModule + `;

// ============================================
// MÓDULO: RACE 02
// ============================================
var RACE02 = ` + race02Module + `;

// ============================================
// MÓDULO: PLUM
// ============================================
var PLUM = ` + plumModule + `;

// ============================================
// MÓDULO: RUN REBOUND 2
// ============================================
var RUN_REBOUND_2 = ` + runRebound2Module + `;

// ============================================
// MÓDULO: SWING CANNONS
// ============================================
var SWING_CANNONS = ` + swingCannonsModule + `;

// ============================================
// MÓDULO: SURVIVAL INSECT
// ============================================
var SURVIVAL_INSECT = ` + survivalInsectModule + `;

// ============================================
// MÓDULO: RUN LUCK
// ============================================
var RUN_LUCK = ` + runLuckModule + `;

// ============================================
// MÓDULO: PINBALL ROULETTE
// ============================================
var PINBALL_ROULETTE = ` + pinballRouletteModule + `;

// ============================================
// MÓDULO: JUMPING SURVIVAL
// ============================================
var JUMPING_SURVIVAL = ` + jumpingSurvivalModule + `;

// ============================================
// MÓDULO: SHAOLIN SOCCER
// ============================================
var SHAOLIN_SOCCER = ` + shaolinSoccerModule + `;

// ============================================
// MÓDULO: SPACE VORTEX
// ============================================
var SPACE_VORTEX = ` + spaceVortexModule + `;

// ============================================
// MÓDULO: SPACEBOUNCE POWER
// ============================================
var SPACEBOUNCE_POWER = ` + spaceBouncePowerModule + `;

// ============================================
// MÓDULO: BASKETBALL
// ============================================
var BASKETBALL = ` + basketballModule + `;

// ============================================
// MÓDULO: B.T.L
// ============================================
var BTL = ` + btlModule + `;

// ============================================
// MÓDULO: BONK SUMMER
// ============================================
var BONK_SUMMER = ` + bonkSummerModule + `;

// ============================================
// MÓDULO: BONK WINTER
// ============================================
var BONK_WINTER = ` + bonkWinterModule + `;

// ============================================
// MÓDULO: ZOMBIE RUN
// ============================================
var ZOMBIE_RUN = ` + zombieRunModule + `;

// ============================================
// MÓDULO: RACING GROUND
// ============================================
var RACING_GROUND = ` + racingGroundModule + `;

// ============================================
// MÓDULO: BUHO
// ============================================
var BUHO = ` + buhoModule + `;

// ============================================
// MÓDULO: LUCKY
// ============================================
` + escapedLuckyCode + `

// ============================================
// MÓDULO: LUCKY HELL
// ============================================
` + escapedLuckyHellCode + `

// ============================================
// MÓDULO: LUCKY DIOS
// ============================================
` + escapedLuckyDiosCode + `

` + mainCode;
};

(async () => {
    if (TEST_MODE) {
        console.log('🧪 ═══════════════════════════════════════');
        console.log('🧪  MODO TEST - Sala privada (pass: 1234)');
        console.log('🧪  Webhooks Discord desactivados');
        console.log('🧪 ═══════════════════════════════════════');
    }
    console.log('🚀 Iniciando bot de Haxball...');

    // Conectar a MongoDB
    await db.connect();

    // Backup automático cada 24 horas
    db.createBackup();
    setInterval(function() { db.createBackup(); }, 24 * 60 * 60 * 1000);

    // ============================================
    // STATS MENSUALES: enviar top 5 y resetear cada mes
    // ============================================
    async function sendMonthlyStats() {
        try {
            const report = await db.getMonthlyReport();
            if (!report) { console.log('⚠️ No se pudo generar reporte mensual'); return; }

            const now = new Date();
            const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
            const monthStr = monthNames[now.getMonth() === 0 ? 11 : now.getMonth() - 1] + ' ' + (now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear());

            let msg = '# 📊 STATS MENSUALES - ' + monthStr + '\n\n';

            msg += '## 🏆 TOP 5 GANADORES\n';
            if (report.topWins.length === 0) {
                msg += 'No hay datos.\n';
            } else {
                const medals = ['🥇','🥈','🥉','4️⃣','5️⃣'];
                for (let i = 0; i < report.topWins.length; i++) {
                    const p = report.topWins[i];
                    msg += medals[i] + ' **' + (p.name || 'Desconocido') + '** - ' + (p.wins || 0) + ' victorias\n';
                }
            }

            msg += '\n## 💰 TOP 5 MAS RICOS\n';
            if (report.topRich.length === 0) {
                msg += 'No hay datos.\n';
            } else {
                const medals2 = ['🥇','🥈','🥉','4️⃣','5️⃣'];
                for (let i = 0; i < report.topRich.length; i++) {
                    const p = report.topRich[i];
                    msg += medals2[i] + ' **' + (p.name || 'Desconocido') + '** - $' + ((p.balance || 0).toLocaleString()) + '\n';
                }
            }

            // Top Ricos
            const topRich2 = await db.getTopPlayers('balance', 5);
            msg += '\n## 💰 TOP 5 MAS RICOS\n';
            if (!topRich2 || topRich2.length === 0) {
                msg += 'No hay datos.\n';
            } else {
                const medals3 = ['🥇','🥈','🥉','4️⃣','5️⃣'];
                for (let i = 0; i < topRich2.length; i++) {
                    const p = topRich2[i];
                    msg += medals3[i] + ' **' + (p.name || 'Desconocido') + '** - $' + ((p.balance || 0).toLocaleString()) + '\n';
                }
            }

            // Top Rachas
            const topStreaks = await db.getTopPlayers('bestStreak', 5);
            msg += '\n## 🔥 TOP 5 MEJORES RACHAS\n';
            if (!topStreaks || topStreaks.length === 0) {
                msg += 'No hay datos.\n';
            } else {
                const medals4 = ['🥇','🥈','🥉','4️⃣','5️⃣'];
                for (let i = 0; i < topStreaks.length; i++) {
                    const p = topStreaks[i];
                    msg += medals4[i] + ' **' + (p.name || 'Desconocido') + '** - ' + (p.bestStreak || 0) + ' victorias seguidas\n';
                }
            }

            // Top Clanes
            const topClans = await db.getTopClans(5);
            msg += '\n## 🏰 TOP 5 CLANES\n';
            if (!topClans || topClans.length === 0) {
                msg += 'No hay clanes.\n';
            } else {
                const medals5 = ['🥇','🥈','🥉','4️⃣','5️⃣'];
                for (let i = 0; i < topClans.length; i++) {
                    const c = topClans[i];
                    msg += medals5[i] + ' **[' + c.tag + '] ' + c.name + '** - ' + (c.totalWins || 0) + ' victorias (' + c.members.length + ' miembros)\n';
                }
            }

            // Top Geis
            const topGeis = await db.getTopPlayers('gayCount', 5);
            msg += '\n## 🌈 TOP 5 MAS GEIS\n';
            if (!topGeis || topGeis.length === 0) {
                msg += 'No hay datos.\n';
            } else {
                const medals6 = ['🥇','🥈','🥉','4️⃣','5️⃣'];
                for (let i = 0; i < topGeis.length; i++) {
                    const p = topGeis[i];
                    msg += medals6[i] + ' **' + (p.name || 'Desconocido') + '** - ' + (p.gayCount || 0) + ' veces\n';
                }
            }

            // Top Kickeados
            const topKicks = await db.getTopPlayers('kickCount', 5);
            msg += '\n## 👢 TOP 5 MAS KICKEADOS\n';
            if (!topKicks || topKicks.length === 0) {
                msg += 'No hay datos.\n';
            } else {
                const medals7 = ['🥇','🥈','🥉','4️⃣','5️⃣'];
                for (let i = 0; i < topKicks.length; i++) {
                    const p = topKicks[i];
                    msg += medals7[i] + ' **' + (p.name || 'Desconocido') + '** - ' + (p.kickCount || 0) + ' kicks\n';
                }
            }

            // Top Baneados
            const topBans = await db.getTopPlayers('banCount', 5);
            msg += '\n## 🔨 TOP 5 MAS BANEADOS\n';
            if (!topBans || topBans.length === 0) {
                msg += 'No hay datos.\n';
            } else {
                const medals8 = ['🥇','🥈','🥉','4️⃣','5️⃣'];
                for (let i = 0; i < topBans.length; i++) {
                    const p = topBans[i];
                    msg += medals8[i] + ' **' + (p.name || 'Desconocido') + '** - ' + (p.banCount || 0) + ' bans\n';
                }
            }

            // Enviar a Discord
            const url = DISCORD_WEBHOOKS.stats;
            if (url) {
                const resp = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: msg })
                });
                if (resp.ok) {
                    console.log('✅ Stats mensuales enviadas a Discord');
                } else {
                    console.error('❌ Error enviando stats mensuales:', resp.status);
                }
            }

            // Resetear wins/stats (NO el dinero)
            await db.resetMonthlyWins();
            await db.resetClanWins();
            console.log('✅ Stats mensuales reseteadas (jugadores + clanes)');
        } catch(e) {
            console.error('❌ Error en sendMonthlyStats:', e.message);
        }
    }

    // Stats mensuales se envian manualmente con !resetstats desde la sala

    // Modo generate-only: genera debug-script.js y sale (para el panel)
    if (process.argv.includes('--generate-only')) {
        const generatedScript = getBotScript();
        fs.writeFileSync(path.join(__dirname, 'debug-script.js'), generatedScript, 'utf8');
        console.log('SCRIPT_GENERATED');
        process.exit(0);
    }

    const useHeadless = process.env.HEADLESS === 'true';
    const browser = await puppeteer.launch({
        headless: useHeadless ? 'new' : false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    });
    
    const page = await browser.newPage();
    
    console.log('📄 Navegando a Haxball Headless...');
    await page.goto('https://www.haxball.com/headless', {
        waitUntil: 'networkidle2',
        timeout: 60000
    });
    
    console.log('⏳ Esperando que pase Cloudflare y cargue HBInit...');
    // Cloudflare puede tardar bastante, esperamos hasta 120 segundos
    for (let attempt = 1; attempt <= 12; attempt++) {
        const found = await page.waitForFunction('typeof HBInit === "function"', { timeout: 10000 }).then(() => true).catch(() => false);
        if (found) {
            console.log('✅ HBInit detectado!');
            break;
        }
        console.log('⏳ Intento ' + attempt + '/12 - HBInit aún no disponible, esperando...');
        if (attempt === 12) {
            console.log('⚠️ HBInit no se detectó tras 120s. Intentando inyectar de todas formas...');
        }
    }
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Exponer funciones de DB al contexto del navegador
    try {
        if (TEST_MODE) {
            // Test mode: desactivar escrituras (wins, dinero, replays)
            await page.exposeFunction('__dbSaveWin', async () => {
                console.log('🧪 [TEST] saveWin ignorado');
            });
            await page.exposeFunction('__dbSaveGamePlayed', async () => {
                console.log('🧪 [TEST] saveGamePlayed ignorado');
            });
            await page.exposeFunction('__dbSaveBestStreak', async () => {
                console.log('🧪 [TEST] saveBestStreak ignorado');
            });
            await page.exposeFunction('__dbAddBalance', async () => {
                console.log('🧪 [TEST] addBalance ignorado');
            });
            await page.exposeFunction('__sendReplay', async () => {
                console.log('🧪 [TEST] sendReplay ignorado');
                return true;
            });
            await page.exposeFunction('__sendMonthlyStats', async () => {
                console.log('🧪 [TEST] sendMonthlyStats ignorado');
                return true;
            });
            // Lecturas sí funcionan (para !stats, !top)
            await page.exposeFunction('__dbGetStats', async (auth) => {
                return await db.getStats(auth);
            });
            await page.exposeFunction('__dbGetTopPlayers', async (field, limit) => {
                return await db.getTopPlayers(field, limit);
            });
            await page.exposeFunction('__dbGetPlayerRank', async (auth, field) => {
                return await db.getPlayerRank(auth, field);
            });
            await page.exposeFunction('__discordWebhook', async (type, content) => {
                return await sendDiscordWebhook(type, content);
            });
            // Clanes (lectura+escritura en test también)
            await page.exposeFunction('__dbCreateClan', async (tag, name, leaderAuth, leaderName) => {
                return await db.createClan(tag, name, leaderAuth, leaderName);
            });
            await page.exposeFunction('__dbInviteToClan', async (leaderAuth, targetAuth, targetName) => {
                return await db.inviteToClan(leaderAuth, targetAuth, targetName);
            });
            await page.exposeFunction('__dbAcceptClanInvite', async (playerAuth, playerName) => {
                return await db.acceptClanInvite(playerAuth, playerName);
            });
            await page.exposeFunction('__dbLeaveClan', async (playerAuth) => {
                return await db.leaveClan(playerAuth);
            });
            await page.exposeFunction('__dbGetClanInfo', async (tag) => {
                return await db.getClanInfo(tag);
            });
            await page.exposeFunction('__dbGetClanByAuth', async (auth) => {
                return await db.getClanByAuth(auth);
            });
            await page.exposeFunction('__dbAddClanWin', async (auth) => {
                return await db.addClanWin(auth);
            });
            await page.exposeFunction('__dbGetTopClans', async (limit) => {
                return await db.getTopClans(limit);
            });
            await page.exposeFunction('__dbKickFromClan', async (leaderAuth, targetAuth) => {
                return await db.kickFromClan(leaderAuth, targetAuth);
            });
            // Matrimonios (lectura+escritura en test también)
            await page.exposeFunction('__dbSaveMarriage', async (auth1, auth2) => {
                await db.saveMarriage(auth1, auth2);
            });
            await page.exposeFunction('__dbRemoveMarriage', async (auth1, auth2) => {
                await db.removeMarriage(auth1, auth2);
            });
            await page.exposeFunction('__dbLoadMarriages', async () => {
                return await db.loadMarriages();
            });
            // Titan
            await page.exposeFunction('__dbSaveTitan', async (auth, name, value) => {
                await db.saveTitan(auth, name, value);
            });
            await page.exposeFunction('__dbLoadTitanData', async () => {
                return await db.loadTitanData();
            });
            await page.exposeFunction('__dbResetTitanData', async () => {
                await db.resetTitanData();
            });
            // Daily Rewards
            await page.exposeFunction('__dbSaveDailyReward', async (auth, lastClaim, streak) => {
                await db.saveDailyReward(auth, lastClaim, streak);
            });
            await page.exposeFunction('__dbLoadDailyRewards', async () => {
                return await db.loadDailyRewards();
            });
            console.log('🧪 Funciones expuestas en MODO TEST (escrituras desactivadas)');
        } else {
            await page.exposeFunction('__dbSaveWin', async (auth, name, minigame) => {
                await db.saveWin(auth, name, minigame);
            });
            await page.exposeFunction('__dbSaveGamePlayed', async (auth, name) => {
                await db.saveGamePlayed(auth, name);
            });
            await page.exposeFunction('__dbSaveBestStreak', async (auth, streak) => {
                await db.saveBestStreak(auth, streak);
            });
            await page.exposeFunction('__dbGetStats', async (auth) => {
                return await db.getStats(auth);
            });
            await page.exposeFunction('__dbGetTopPlayers', async (field, limit) => {
                return await db.getTopPlayers(field, limit);
            });
            await page.exposeFunction('__dbGetPlayerRank', async (auth, field) => {
                return await db.getPlayerRank(auth, field);
            });
            await page.exposeFunction('__dbAddBalance', async (auth, name, amount) => {
                await db.addBalance(auth, name, amount);
            });
            await page.exposeFunction('__discordWebhook', async (type, content) => {
                return await sendDiscordWebhook(type, content);
            });
            await page.exposeFunction('__sendReplay', async (replayArray, gameName) => {
                return await sendDiscordReplay(replayArray, gameName);
            });
            await page.exposeFunction('__dbAddGayCount', async (auth, name) => {
                await db.addGayCount(auth, name);
            });
            await page.exposeFunction('__dbAddKickCount', async (auth, name) => {
                await db.addKickCount(auth, name);
            });
            await page.exposeFunction('__dbAddBanCount', async (auth, name) => {
                await db.addBanCount(auth, name);
            });
            await page.exposeFunction('__sendMonthlyStats', async () => {
                await sendMonthlyStats();
                return true;
            });
            // Clanes
            await page.exposeFunction('__dbCreateClan', async (tag, name, leaderAuth, leaderName) => {
                return await db.createClan(tag, name, leaderAuth, leaderName);
            });
            await page.exposeFunction('__dbInviteToClan', async (leaderAuth, targetAuth, targetName) => {
                return await db.inviteToClan(leaderAuth, targetAuth, targetName);
            });
            await page.exposeFunction('__dbAcceptClanInvite', async (playerAuth, playerName) => {
                return await db.acceptClanInvite(playerAuth, playerName);
            });
            await page.exposeFunction('__dbLeaveClan', async (playerAuth) => {
                return await db.leaveClan(playerAuth);
            });
            await page.exposeFunction('__dbGetClanInfo', async (tag) => {
                return await db.getClanInfo(tag);
            });
            await page.exposeFunction('__dbGetClanByAuth', async (auth) => {
                return await db.getClanByAuth(auth);
            });
            await page.exposeFunction('__dbAddClanWin', async (auth) => {
                return await db.addClanWin(auth);
            });
            await page.exposeFunction('__dbGetTopClans', async (limit) => {
                return await db.getTopClans(limit);
            });
            await page.exposeFunction('__dbKickFromClan', async (leaderAuth, targetAuth) => {
                return await db.kickFromClan(leaderAuth, targetAuth);
            });
            // Matrimonios
            await page.exposeFunction('__dbSaveMarriage', async (auth1, auth2) => {
                await db.saveMarriage(auth1, auth2);
            });
            await page.exposeFunction('__dbRemoveMarriage', async (auth1, auth2) => {
                await db.removeMarriage(auth1, auth2);
            });
            await page.exposeFunction('__dbLoadMarriages', async () => {
                return await db.loadMarriages();
            });
            // Titan
            await page.exposeFunction('__dbSaveTitan', async (auth, name, value) => {
                await db.saveTitan(auth, name, value);
            });
            await page.exposeFunction('__dbLoadTitanData', async () => {
                return await db.loadTitanData();
            });
            await page.exposeFunction('__dbResetTitanData', async () => {
                await db.resetTitanData();
            });
            // Daily Rewards
            await page.exposeFunction('__dbSaveDailyReward', async (auth, lastClaim, streak) => {
                await db.saveDailyReward(auth, lastClaim, streak);
            });
            await page.exposeFunction('__dbLoadDailyRewards', async () => {
                return await db.loadDailyRewards();
            });
            console.log('✅ Funciones de DB, Discord y Replays expuestas al navegador');
        }
    } catch(e) {
        console.error('⚠️ Error exponiendo funciones:', e.message);
    }

    console.log('📝 Inyectando script automáticamente...');
    
    // Generar y guardar script para debugging
    const generatedScript = getBotScript();
    fs.writeFileSync(path.join(__dirname, 'debug-script.js'), generatedScript, 'utf8');
    console.log('💾 Script guardado en debug-script.js para inspección');
    
    // Inyectar y ejecutar el script directamente
    await page.evaluate((script) => {
        // Buscar el textarea
        const textarea = document.querySelector('textarea') || 
                        document.querySelector('#code') ||
                        document.querySelector('textarea[class*="code"]');
        
        if (textarea) {
            textarea.value = script;
            
            // Buscar y hacer click en el botón Run
            const buttons = Array.from(document.querySelectorAll('button'));
            const runButton = buttons.find(b => 
                b.textContent.toLowerCase().includes('run') ||
                b.id === 'run'
            );
            
            if (runButton) {
                runButton.click();
            }
        } else {
            // Si no hay textarea, ejecutar directamente
            eval(script);
        }
    }, generatedScript);
    
    console.log('✅ Script inyectado y ejecutado');
    console.log('⏳ Bot activo. Los logs aparecerán abajo:\n');
    
    // Capturar TODOS los mensajes de consola del navegador
    page.on('console', async msg => {
        try {
            const args = await Promise.all(
                msg.args().map(arg => arg.jsonValue().catch(() => arg.toString()))
            );
            const text = args.join(' ');
            
            // Mostrar link especial
            if (text.includes('Link:')) {
                console.log('\n🔗 ' + text);
                console.log('📋 Copia ese link para entrar a la sala\n');
                return;
            }
            
            // Mostrar TODOS los logs del juego
            console.log(text);
        } catch (e) {
            console.log(msg.text());
        }
    });
    
    console.log('⏹️ Presiona Ctrl+C para cerrar el bot\n');

    // Mantener el bot corriendo — menú interactivo al cerrar
    let isClosing = false;
    process.on('SIGINT', async () => {
        if (isClosing) {
            console.log('\n⚠️ Forzando cierre...');
            process.exit(1);
        }
        isClosing = true;

        const readline = require('readline');
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('⏹️  ¿Cómo quieres cerrar la sala?');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('1. 🔄 Reinicio para actualizaciones');
        console.log('2. 🌙 Cierre hasta otro día');
        console.log('3. ❌ Cancelar (no cerrar)');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        rl.question('Elige (1/2/3): ', async (answer) => {
            rl.close();
            answer = answer.trim();

            if (answer === '3') {
                console.log('✅ Cancelado. El bot sigue corriendo.');
                isClosing = false;
                return;
            }

            var msg = '';
            if (answer === '1') {
                msg = '🔄 ¡ATENCIÓN! La sala se REINICIARÁ en unos segundos para aplicar actualizaciones.\\n⏳ Vuelve a entrar en 1-2 minutos!';
            } else if (answer === '2') {
                msg = '🌙 ¡ATENCIÓN! La sala se CIERRA por hoy.\\n👋 ¡Nos vemos otro día! Únete al Discord: discord.gg/YvFHkSZUvE';
            } else {
                console.log('⚠️ Opción no válida. Cerrando sin aviso...');
                await db.close();
                await browser.close();
                process.exit();
                return;
            }

            console.log('📢 Enviando aviso a la sala...');
            try {
                await page.evaluate((announcement) => {
                    if (typeof room !== 'undefined' && room.sendAnnouncement) {
                        room.sendAnnouncement(announcement, null, 0xFF6600, 'bold', 2);
                    }
                }, msg);
            } catch(e) {
                console.log('⚠️ No se pudo enviar aviso: ' + e.message);
            }

            console.log('⏳ Esperando 5 segundos antes de cerrar...');
            await new Promise(resolve => setTimeout(resolve, 5000));

            console.log('⏹️ Cerrando bot...');
            await db.close();
            await browser.close();
            process.exit();
        });
    });
    
})().catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
});
