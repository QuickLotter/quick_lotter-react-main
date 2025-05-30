// utils/fetchGamesByState.ts

import { fetchArizonaGames } from "@/states/arizona/games";
import { fetchArkansasGames } from "@/states/arkansas/games";
import { fetchCaliforniaGames } from "@/states/california/games";
import { fetchColoradoGames } from "@/states/colorado/games";
import { fetchConnecticutGames } from "@/states/connecticut/games";
import { fetchDelawareGames } from "@/states/delaware/games";
import { fetchFloridaGames } from "@/states/florida/games";
import { fetchGeorgiaGames } from "@/states/georgia/games";
import { fetchIdahoGames } from "@/states/idaho/games";
import { fetchIllinoisGames } from "@/states/illinois/games";
import { fetchIndianaGames } from "@/states/indiana/games";
import { fetchIowaGames } from "@/states/iowa/games";
import { fetchKansasGames } from "@/states/kansas/games";
import { fetchKentuckyGames } from "@/states/kentucky/games";
import { fetchLouisianaGames } from "@/states/louisiana/games";
import { fetchMaineGames } from "@/states/maine/games";
import { fetchMarylandGames } from "@/states/maryland/games";
import { fetchMassachusettsGames } from "@/states/massachusetts/games";
import { fetchMichiganGames } from "@/states/michigan/games";
import { fetchMinnesotaGames } from "@/states/minnesota/games";
import { fetchMississippiGames } from "@/states/mississippi/games";
import { fetchMissouriGames } from "@/states/missouri/games";
import { fetchMontanaGames } from "@/states/montana/games";
import { fetchNebraskaGames } from "@/states/nebraska/games";
import { fetchNewHampshireGames } from "@/states/new_hampshire/games";
import { fetchNewJerseyGames } from "@/states/new_jersey/games";
import { fetchNewMexicoGames } from "@/states/new_mexico/games";
import { fetchNewYorkGames } from "@/states/new_york/games";
import { fetchNorthCarolinaGames } from "@/states/north_carolina/games";
import { fetchNorthDakotaGames } from "@/states/north_dakota/games";
import { fetchOhioGames } from "@/states/ohio/games";
import { fetchOklahomaGames } from "@/states/oklahoma/games";
import { fetchOregonGames } from "@/states/oregon/games";
import { fetchPennsylvaniaGames } from "@/states/pennsylvania/games";
import { fetchPuertoRicoGames } from "@/states/puerto_rico/games";
import { fetchRhodeIslandGames } from "@/states/rhode_island/games";
import { fetchSouthCarolinaGames } from "@/states/south_carolina/games";
import { fetchSouthDakotaGames } from "@/states/south_dakota/games";
import { fetchTennesseeGames } from "@/states/tennessee/games";
import { fetchTexasGames } from "@/states/texas/games";
import { fetchVermontGames } from "@/states/vermont/games";
import { fetchVirginiaGames } from "@/states/virginia/games";
import { fetchWashingtonGames } from "@/states/washington/games";
import { fetchDistrictOfColumbiaGames } from "@/states/district_of_columbia/games";
import { fetchWestVirginiaGames } from "@/states/west_virginia/games";
import { fetchWisconsinGames } from "@/states/wisconsin/games";
import { fetchWyomingGames } from "@/states/wyoming/games";

// Função principal: busca os jogos conforme o código do estado
export async function fetchGamesByState(state: string) {
  switch (state.toUpperCase()) {
    case "AZ":
      return fetchArizonaGames();
    case "AR":
      return fetchArkansasGames();
    case "CA":
      return fetchCaliforniaGames();
    case "CO":
      return fetchColoradoGames();
    case "CT":
      return fetchConnecticutGames();
    case "DE":
      return fetchDelawareGames();
    case "FL":
      return fetchFloridaGames();
    case "GA":
      return fetchGeorgiaGames();
    case "ID":
      return fetchIdahoGames();
    case "IL":
      return fetchIllinoisGames();
    case "IN":
      return fetchIndianaGames();
    case "IA":
      return fetchIowaGames();
    case "KS":
      return fetchKansasGames();
    case "KY":
      return fetchKentuckyGames();
    case "LA":
      return fetchLouisianaGames();
    case "ME":
      return fetchMaineGames();
    case "MD":
      return fetchMarylandGames();
    case "MA":
      return fetchMassachusettsGames();
    case "MI":
      return fetchMichiganGames();
    case "MN":
      return fetchMinnesotaGames();
    case "MS":
      return fetchMississippiGames();
    case "MO":
      return fetchMissouriGames();
    case "MT":
      return fetchMontanaGames();
    case "NE":
      return fetchNebraskaGames();
    case "NH":
      return fetchNewHampshireGames();
    case "NJ":
      return fetchNewJerseyGames();
    case "NM":
      return fetchNewMexicoGames();
    case "NY":
      return fetchNewYorkGames();
    case "NC":
      return fetchNorthCarolinaGames();
    case "ND":
      return fetchNorthDakotaGames();
    case "OH":
      return fetchOhioGames();
    case "OK":
      return fetchOklahomaGames();
    case "OR":
      return fetchOregonGames();
    case "PA":
      return fetchPennsylvaniaGames();
    case "PR":
      return fetchPuertoRicoGames();
    case "RI":
      return fetchRhodeIslandGames();
    case "SC":
      return fetchSouthCarolinaGames();
    case "SD":
      return fetchSouthDakotaGames();
    case "TN":
      return fetchTennesseeGames();
    case "TX":
      return fetchTexasGames();
    case "VT":
      return fetchVermontGames();
    case "VA":
      return fetchVirginiaGames();
    case "WA":
      return fetchWashingtonGames();
    case "DC":
      return fetchDistrictOfColumbiaGames();
    case "WV":
      return fetchWestVirginiaGames();
    case "WI":
      return fetchWisconsinGames();
    case "WY":
      return fetchWyomingGames();
    default:
      return [];
  }
}
