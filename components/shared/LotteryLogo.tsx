//Essa pagina e usada para mostrar o logo dos jogos salvos no my-lines

import React from "react";
import { View, ActivityIndicator } from "react-native";

// Substitua por todos que usar
//import Pick3Logo from "@/assets/logos/az/pick3.svg";
//import Fantasy5Logo from "@/assets/logos/az/fantasy5.svg";
//import ThePickLogo from "@/assets/logos/az/thepick.svg";
//import TripleTwistLogo from "@/assets/logos/az/tripletwist.svg";
//import MegaMillionsLogo from "@/assets/logos/megamillions.svg";
//import Cash3MiddayLogo from "@/assets/logos/ar/cash3midday.svg";
//import Cash3EveningLogo from "@/assets/logos/ar/cash3evening.svg";
//import Cash4MiddayLogo from "@/assets/logos/ar/cash4midday.svg";
//import Cash4EveningLogo from "@/assets/logos/ar/cash4evening.svg";
//import NaturalStateJackpotLogo from "@/assets/logos/ar/naturalstatejackpot.svg";
//import LottoLogo from "@/assets/logos/ar/lotto.svg";
//import LuckyforLifeLogo from "@/assets/logos/ar/luckyforlife.svg";
//import Daily3MiddayLogo from "@/assets/logos/ca/daily3midday.svg";
//import Daily3EveningLogo from "@/assets/logos/ca/daily3evening.svg";
//import Daily4Logo from "@/assets/logos/ca/daily4.svg";
//import Fantasy5Logo from "@/assets/logos/ca/fantasy5.svg";
//import DailyDerbyLogo from "@/assets/logos/ca/dailyderby.svg";
//import SuperLottoPlusLogo from "@/assets/logos/ca/superlottoplus.svg";
//import Pick3MiddayLogo from "@/assets/logos/co/pick3midday.svg";
//import Pick3EveningLogo from "@/assets/logos/co/pick3evening.svg";
//import Cash5Logo from "@/assets/logos/co/cash5.svg";
//import LottoPlusLogo from "@/assets/logos/co/lottoplus.svg";
//import LuckyforLifeLogo from "@/assets/logos/co/luckyforlife.svg";
//import PowerballLogo from "@/assets/logos/powerball.svg";
//import PowerballDouplepayLogo from "@/assets/logos/co/powerballdouplepay.svg";
//import Play3DayLogo from "@/assets/logos/ct/play3day.svg";
//import Play3NightLogo from "@/assets/logos/ct/play3night.svg";
//import Play4DayLogo from "@/assets/logos/ct/play4day.svg";
//import Play4NightLogo from "@/assets/logos/ct/play4night.svg";
//import Cash5Logo from "@/assets/logos/ct/cash5.svg";
//import ClassicLottoLogo from "@/assets/logos/ct/classiclotto.svg";
//import LuckyforLifeLogo from "@/assets/logos/ct/luckyforlife.svg";
//import Play3DayLogo from "@/assets/logos/de/play3day.svg";
//import Play3NightLogo from "@/assets/logos/de/play3night.svg";
//import Play4DayLogo from "@/assets/logos/de/play4day.svg";
//import Play4NightLogo from "@/assets/logos/de/play4night.svg";
//import Play5DayLogo from "@/assets/logos/de/play5day.svg";
//import Play5Logo from "@/assets/logos/de/play5.svg";
//import Multi-WinLottoLogo from "@/assets/logos/de/multi-winlotto.svg";
//import LuckyforLifeLogo from "@/assets/logos/de/luckyforlife.svg";
//import LottoAmericaLogo from "@/assets/logos/de/lottoamerica.svg";
//import Pick2MiddayLogo from "@/assets/logos/fl/pick2midday.svg";
//import Pick2EveningLogo from "@/assets/logos/fl/pick2evening.svg";
//import Pick3MiddayLogo from "@/assets/logos/fl/pick3midday.svg";
//import Pick3EveningLogo from "@/assets/logos/fl/pick3evening.svg";
//import Pick4MiddayLogo from "@/assets/logos/fl/pick4midday.svg";
//import Pick4EveningLogo from "@/assets/logos/fl/pick4evening.svg";
//import Pick5MiddayLogo from "@/assets/logos/fl/pick5midday.svg";
//import Pick5EveningLogo from "@/assets/logos/fl/pick5evening.svg";
//import Fantasy5MiddayLogo from "@/assets/logos/fl/fantasy5midday.svg";
//import Fantasy5Logo from "@/assets/logos/fl/fantasy5.svg";
//import FloridaLottoLogo from "@/assets/logos/fl/floridalotto.svg";
//import JackpotTriplePlayLogo from "@/assets/logos/fl/jackpottripleplay.svg";
//import CashPopMorningLogo from "@/assets/logos/fl/cashpopmorning.svg";
//import CashPopMatineeLogo from "@/assets/logos/fl/cashpopmatinee.svg";
//import CashPopAfternoonLogo from "@/assets/logos/fl/cashpopafternoon.svg";
//import CashPopEveningLogo from "@/assets/logos/fl/cashpopevening.svg";
//import CashPopLateNightLogo from "@/assets/logos/fl/cashpoplatenight.svg";
//import Cash4LifeLogo from "@/assets/logos/fl/cash4life.svg";
//import PowerballDouplepayLogo from "@/assets/logos/fl/powerballdouplepay.svg";
//import CashPopEarlyBirdLogo from "@/assets/logos/ga/cashpopearlybird.svg";
//import CashPopMatineeLogo from "@/assets/logos/ga/cashpopmatinee.svg";
//import CashPopDriveTimeLogo from "@/assets/logos/ga/cashpopdrivetime.svg";
//import CashPopPrimeTimeLogo from "@/assets/logos/ga/cashpopprimetime.svg";
//import CashPopNightOwlLogo from "@/assets/logos/ga/cashpopnightowl.svg";
//import Cash3MiddayLogo from "@/assets/logos/ga/cash3midday.svg";
//import Cash3EveningLogo from "@/assets/logos/ga/cash3evening.svg";
//import Cash3NightLogo from "@/assets/logos/ga/cash3night.svg";
//import Cash4MiddayLogo from "@/assets/logos/ga/cash4midday.svg";
//import Cash4EveningLogo from "@/assets/logos/ga/cash4evening.svg";
//import Cash4NightLogo from "@/assets/logos/ga/cash4night.svg";
//import GeorgiaFiveMiddayLogo from "@/assets/logos/ga/georgiafivemidday.svg";
//import GeorgiaFiveEveningLogo from "@/assets/logos/ga/georgiafiveevening.svg";
//import Fantasy5Logo from "@/assets/logos/ga/fantasy5.svg";
//import Cash4LifeLogo from "@/assets/logos/ga/cash4life.svg";
//import Pick3DayLogo from "@/assets/logos/id/pick3day.svg";
//import Pick3NightLogo from "@/assets/logos/id/pick3night.svg";
//import Pick4DayLogo from "@/assets/logos/id/pick4day.svg";
//import Pick4NightLogo from "@/assets/logos/id/pick4night.svg";
//import IdahoCashLogo from "@/assets/logos/id/idahocash.svg";
//import LuckyforLifeLogo from "@/assets/logos/id/luckyforlife.svg";
//import LottoAmericaLogo from "@/assets/logos/id/lottoamerica.svg";
//import PowerballDouplepayLogo from "@/assets/logos/id/powerballdouplepay.svg";
//import Pick3MiddayLogo from "@/assets/logos/il/pick3midday.svg";
//import Pick3EveningLogo from "@/assets/logos/il/pick3evening.svg";
//import Pick4MiddayLogo from "@/assets/logos/il/pick4midday.svg";
//import Pick4EveningLogo from "@/assets/logos/il/pick4evening.svg";
//import LuckyDayLottoMiddayLogo from "@/assets/logos/il/luckydaylottomidday.svg";
//import LuckyDayLottoEveningLogo from "@/assets/logos/il/luckydaylottoevening.svg";
//import LottoLogo from "@/assets/logos/il/lotto.svg";
//import PowerbalLogo from "@/assets/logos/il/powerbal.svg";
//import Daily3MiddayLogo from "@/assets/logos/in/daily3midday.svg";
//import Daily3EveningLogo from "@/assets/logos/in/daily3evening.svg";
//import Daily4MiddayLogo from "@/assets/logos/in/daily4midday.svg";
//import Daily4EveningLogo from "@/assets/logos/in/daily4evening.svg";
//import Cash5Logo from "@/assets/logos/in/cash5.svg";
//import QuickDrawMiddayLogo from "@/assets/logos/in/quickdrawmidday.svg";
//import QuickDrawEveningLogo from "@/assets/logos/in/quickdrawevening.svg";
//import LottoPlusLogo from "@/assets/logos/in/lottoplus.svg";
//import CashPopMorningLogo from "@/assets/logos/in/cashpopmorning.svg";
//import CashPopMatineeLogo from "@/assets/logos/in/cashpopmatinee.svg";
//import CashPopAfternoonLogo from "@/assets/logos/in/cashpopafternoon.svg";
//import CashPopEveningLogo from "@/assets/logos/in/cashpopevening.svg";
//import CashPopLateNightLogo from "@/assets/logos/in/cashpoplatenight.svg";
//import Cash4LifeLogo from "@/assets/logos/in/cash4life.svg";
//import PowerballDouplepayLogo from "@/assets/logos/in/powerballdouplepay.svg";
//import Pick3MiddayLogo from "@/assets/logos/ia/pick3midday.svg";
//import Pick3EveningLogo from "@/assets/logos/ia/pick3evening.svg";
//import Pick4MiddayLogo from "@/assets/logos/ia/pick4midday.svg";
//import Pick4EveningLogo from "@/assets/logos/ia/pick4evening.svg";
//import LuckyforLifeLogo from "@/assets/logos/ia/luckyforlife.svg";
//import LottoAmericaLogo from "@/assets/logos/ia/lottoamerica.svg";
//import PowerballDouplepayLogo from "@/assets/logos/ia/powerballdouplepay.svg";
//import Pick3Logo from "@/assets/logos/ks/pick3.svg";
//import Pick3EveningLogo from "@/assets/logos/ks/pick3evening.svg";
//import SuperCashLogo from "@/assets/logos/ks/supercash.svg";
//import 2by2Logo from "@/assets/logos/ks/2by2.svg";
//import LuckyforLifeLogo from "@/assets/logos/ks/luckyforlife.svg";
//import LottoAmericaLogo from "@/assets/logos/ks/lottoamerica.svg";
//import Pick3MiddayLogo from "@/assets/logos/ky/pick3midday.svg";
//import Pick3EveningLogo from "@/assets/logos/ky/pick3evening.svg";
//import Pick4MiddayLogo from "@/assets/logos/ky/pick4midday.svg";
//import Pick4EveningLogo from "@/assets/logos/ky/pick4evening.svg";
//import CashBallLogo from "@/assets/logos/ky/cashball.svg";
//import LuckyforLifeLogo from "@/assets/logos/ky/luckyforlife.svg";
//import PowerballDouplepayLogo from "@/assets/logos/ky/powerballdouplepay.svg";
//import Pick3Logo from "@/assets/logos/la/pick3.svg";
//import Pick4Logo from "@/assets/logos/la/pick4.svg";
//import Pick5Logo from "@/assets/logos/la/pick5.svg";
//import Easy5Logo from "@/assets/logos/la/easy5.svg";
//import LottoLogo from "@/assets/logos/la/lotto.svg";
//import CashPopEarlyBirdLogo from "@/assets/logos/me/cashpopearlybird.svg";
//import CashPopBrunchLogo from "@/assets/logos/me/cashpopbrunch.svg";
//import CashPopMatineeLogo from "@/assets/logos/me/cashpopmatinee.svg";
//import CashPopSupperTimeLogo from "@/assets/logos/me/cashpopsuppertime.svg";
//import CashPopNightOwlLogo from "@/assets/logos/me/cashpopnightowl.svg";
//import Tri-StatePick3DayLogo from "@/assets/logos/me/tri-statepick3day.svg";
//import Tri-StatePick3EveningLogo from "@/assets/logos/me/tri-statepick3evening.svg";
//import Tri-StatePick4DayLogo from "@/assets/logos/me/tri-statepick4day.svg";
//import Tri-StatePick4EveningLogo from "@/assets/logos/me/tri-statepick4evening.svg";
//import Gimme5Logo from "@/assets/logos/me/gimme5.svg";
//import LuckyforLifeLogo from "@/assets/logos/me/luckyforlife.svg";
//import Tri-StateMegabucksPlusLogo from "@/assets/logos/me/tri-statemegabucksplus.svg";
//import LottoAmericaLogo from "@/assets/logos/me/lottoamerica.svg";
//import PowerballDouplepayLogo from "@/assets/logos/me/powerballdouplepay.svg";
//import Pick3MiddayLogo from "@/assets/logos/md/pick3midday.svg";
//import Pick3EveningLogo from "@/assets/logos/md/pick3evening.svg";
//import Pick4MiddayLogo from "@/assets/logos/md/pick4midday.svg";
//import Pick4EveningLogo from "@/assets/logos/md/pick4evening.svg";
//import Pick5MiddayLogo from "@/assets/logos/md/pick5midday.svg";
//import Pick5EveningLogo from "@/assets/logos/md/pick5evening.svg";
//import BonusMatch5Logo from "@/assets/logos/md/bonusmatch5.svg";
//import MultiMatchLogo from "@/assets/logos/md/multimatch.svg";
//import CashPop9amLogo from "@/assets/logos/md/cashpop9am.svg";
//import CashPop1pmLogo from "@/assets/logos/md/cashpop1pm.svg";
//import CashPop6pmLogo from "@/assets/logos/md/cashpop6pm.svg";
//import CashPop11pmLogo from "@/assets/logos/md/cashpop11pm.svg";
//import Cash4LifeLogo from "@/assets/logos/md/cash4life.svg";
//import PowerballDouplepayLogo from "@/assets/logos/md/powerballdouplepay.svg";
//import NumbersGameMiddayLogo from "@/assets/logos/ma/numbersgamemidday.svg";
//import NumbersGameEveningLogo from "@/assets/logos/ma/numbersgameevening.svg";
//import MassCashLogo from "@/assets/logos/ma/masscash.svg";
//import MegabucksLogo from "@/assets/logos/ma/megabucks.svg";
//import LuckyforLifeLogo from "@/assets/logos/ma/luckyforlife.svg";
//import Daily3MiddayLogo from "@/assets/logos/mi/daily3midday.svg";
//import Daily3EveningLogo from "@/assets/logos/mi/daily3evening.svg";
//import Daily4MiddayLogo from "@/assets/logos/mi/daily4midday.svg";
//import Daily4EveningLogo from "@/assets/logos/mi/daily4evening.svg";
//import Fantasy5Logo from "@/assets/logos/mi/fantasy5.svg";
//import KenoLogo from "@/assets/logos/mi/keno.svg";
//import PokerLottoLogo from "@/assets/logos/mi/pokerlotto.svg";
//import ClassicLotto47Logo from "@/assets/logos/mi/classiclotto47.svg";
//import LuckyforLifeLogo from "@/assets/logos/mi/luckyforlife.svg";
//import PowerballDouplepayLogo from "@/assets/logos/mi/powerballdouplepay.svg";
//import Pick3Logo from "@/assets/logos/mn/pick3.svg";
//import Gopher5Logo from "@/assets/logos/mn/gopher5.svg";
//import North5Logo from "@/assets/logos/mn/north5.svg";
//import LottoAmericaLogo from "@/assets/logos/mn/lottoamerica.svg";
//import PowerballDouplepayLogo from "@/assets/logos/mn/powerballdouplepay.svg";
//import Cash3MiddayLogo from "@/assets/logos/ms/cash3midday.svg";
//import Cash3EveningLogo from "@/assets/logos/ms/cash3evening.svg";
//import Cash4MiddayLogo from "@/assets/logos/ms/cash4midday.svg";
//import Cash4EveningLogo from "@/assets/logos/ms/cash4evening.svg";
//import CashPopMiddayLogo from "@/assets/logos/ms/cashpopmidday.svg";
//import CashPopEveningLogo from "@/assets/logos/ms/cashpopevening.svg";
//import Match5Logo from "@/assets/logos/ms/match5.svg";
//import LottoAmericaLogo from "@/assets/logos/ms/lottoamerica.svg";
//import PowerballDouplepayLogo from "@/assets/logos/ms/powerballdouplepay.svg";
//import Pick3MiddayLogo from "@/assets/logos/mo/pick3midday.svg";
//import Pick3EveningLogo from "@/assets/logos/mo/pick3evening.svg";
//import Pick4MiddayLogo from "@/assets/logos/mo/pick4midday.svg";
//import Pick4EveningLogo from "@/assets/logos/mo/pick4evening.svg";
//import ShowMeCashLogo from "@/assets/logos/mo/showmecash.svg";
//import LottoLogo from "@/assets/logos/mo/lotto.svg";
//import CashPopEarlyBirdLogo from "@/assets/logos/mo/cashpopearlybird.svg";
//import CashPopLateMorningLogo from "@/assets/logos/mo/cashpoplatemorning.svg";
//import CashPopMatineeLogo from "@/assets/logos/mo/cashpopmatinee.svg";
//import CashPopPrimeTimeLogo from "@/assets/logos/mo/cashpopprimetime.svg";
//import CashPopNightOwlLogo from "@/assets/logos/mo/cashpopnightowl.svg";
//import Cash4LifeLogo from "@/assets/logos/mo/cash4life.svg";
//import PowerballDouplepayLogo from "@/assets/logos/mo/powerballdouplepay.svg";
//import MontanaCashLogo from "@/assets/logos/mt/montanacash.svg";
//import BigSkyBonusLogo from "@/assets/logos/mt/bigskybonus.svg";
//import LuckyforLifeLogo from "@/assets/logos/mt/luckyforlife.svg";
//import LottoAmericaLogo from "@/assets/logos/mt/lottoamerica.svg";
//import PowerballDouplepayLogo from "@/assets/logos/mt/powerballdouplepay.svg";
//import Pick3Logo from "@/assets/logos/ne/pick3.svg";
//import Pick5Logo from "@/assets/logos/ne/pick5.svg";
//import MyDayLogo from "@/assets/logos/ne/myday.svg";
//import 2by2Logo from "@/assets/logos/ne/2by2.svg";
//import LuckyforLifeLogo from "@/assets/logos/ne/luckyforlife.svg";
//import LottoAmericaLogo from "@/assets/logos/ne/lottoamerica.svg";
//import PowerballDouplepayLogo from "@/assets/logos/ne/powerballdouplepay.svg";
//import Tri-StatePick3DayLogo from "@/assets/logos/nh/tri-statepick3day.svg";
//import Tri-StatePick3EveningLogo from "@/assets/logos/nh/tri-statepick3evening.svg";
//import Tri-StatePick4DayLogo from "@/assets/logos/nh/tri-statepick4day.svg";
//import Tri-StatePick4EveningLogo from "@/assets/logos/nh/tri-statepick4evening.svg";
//import Gimme5Logo from "@/assets/logos/nh/gimme5.svg";
//import Tri-StateMegabucksPlusLogo from "@/assets/logos/nh/tri-statemegabucksplus.svg";
//import LuckyforLifeLogo from "@/assets/logos/nh/luckyforlife.svg";
//import Pick3MiddayLogo from "@/assets/logos/nj/pick3midday.svg";
//import Pick3EveningLogo from "@/assets/logos/nj/pick3evening.svg";
//import Pick4MiddayLogo from "@/assets/logos/nj/pick4midday.svg";
//import Pick4EveningLogo from "@/assets/logos/nj/pick4evening.svg";
//import JerseyCash5Logo from "@/assets/logos/nj/jerseycash5.svg";
//import Pick6Logo from "@/assets/logos/nj/pick6.svg";
//import Cash4LifeLogo from "@/assets/logos/nj/cash4life.svg";
//import PowerballDouplepayLogo from "@/assets/logos/nj/powerballdouplepay.svg";
//import Pick3PlusDayLogo from "@/assets/logos/nm/pick3plusday.svg";
//import Pick3PlusEveningLogo from "@/assets/logos/nm/pick3plusevening.svg";
//import Pick4PlusDayLogo from "@/assets/logos/nm/pick4plusday.svg";
//import Pick4PlusEveningLogo from "@/assets/logos/nm/pick4plusevening.svg";
//import RoadRunnerCashLogo from "@/assets/logos/nm/roadrunnercash.svg";
//import 0Logo from "@/assets/logos/nm/0.svg";
//import LottoAmericaLogo from "@/assets/logos/nm/lottoamerica.svg";
import PowerballLogo from "@/assets/logos/ny/powerball.svg";
import MegaMillionsLogo from "@/assets/logos/ny/megamillions.svg";
import NumbersMiddayLogo from "@/assets/logos/ny/numbersmidday.svg";
import NumbersEveningLogo from "@/assets/logos/ny/numbersevening.svg";
import Win4MiddayLogo from "@/assets/logos/ny/win4midday.svg";
import Win4EveningLogo from "@/assets/logos/ny/win4evening.svg";
import Take5MiddayLogo from "@/assets/logos/ny/take5midday.svg";
import Take5EveningLogo from "@/assets/logos/ny/take5evening.svg";
import Pick10Logo from "@/assets/logos/ny/pick10.svg";
import NYLottoLogo from "@/assets/logos/ny/nylotto.svg";
import Cash4LifeLogo from "@/assets/logos/ny/cash4life.svg";
//import Pick3DayLogo from "@/assets/logos/nc/pick3day.svg";
//import Pick3EveningLogo from "@/assets/logos/nc/pick3evening.svg";
//import Pick4DayLogo from "@/assets/logos/nc/pick4day.svg";
//import Pick4EveningLogo from "@/assets/logos/nc/pick4evening.svg";
//import Cash5Logo from "@/assets/logos/nc/cash5.svg";
//import CashPopMorningBuzzLogo from "@/assets/logos/nc/cashpopmorningbuzz.svg";
//import CashPopLunchRushLogo from "@/assets/logos/nc/cashpoplunchrush.svg";
//import CashPopClockOutCashLogo from "@/assets/logos/nc/cashpopclockoutcash.svg";
//import CashPopPrimetimePopLogo from "@/assets/logos/nc/cashpopprimetimepop.svg";
//import CashPopMidnightMoneyLogo from "@/assets/logos/nc/cashpopmidnightmoney.svg";
//import LuckyforLifeLogo from "@/assets/logos/nc/luckyforlife.svg";
//import 2by2Logo from "@/assets/logos/nd/2by2.svg";
//import LuckyforLifeLogo from "@/assets/logos/nd/luckyforlife.svg";
//import 0Logo from "@/assets/logos/nd/luckyforlife.svg";
//import LottoAmericaLogo from "@/assets/logos/nd/lottoamerica.svg";
//import Pick3MiddayLogo from "@/assets/logos/oh/pick3midday.svg";
//import Pick3EveningLogo from "@/assets/logos/oh/pick3evening.svg";
//import Pick4MiddayLogo from "@/assets/logos/oh/pick4midday.svg";
//import Pick4EveningLogo from "@/assets/logos/oh/pick4evening.svg";
//import Pick5MiddayLogo from "@/assets/logos/oh/pick5midday.svg";
//import Pick5EveningLogo from "@/assets/logos/oh/pick5evening.svg";
//import ClassicLottoLogo from "@/assets/logos/oh/classiclotto.svg";
//import RollingCash5Logo from "@/assets/logos/oh/rollingcash5.svg";
//import LuckyforLifeLogo from "@/assets/logos/oh/luckyforlife.svg";
//import Pick3Logo from "@/assets/logos/ok/pick3.svg";
//import Cash5Logo from "@/assets/logos/ok/cash5.svg";
//import LuckyforLifeLogo from "@/assets/logos/ok/luckyforlife.svg";
//import LottoAmericaLogo from "@/assets/logos/ok/lottoamerica.svg";
//import PowerballDouplepayLogo from "@/assets/logos/ok/powerballdouplepay.svg";
//import Pick41pmLogo from "@/assets/logos/or/pick41pm.svg";
//import Pick44pmLogo from "@/assets/logos/or/pick44pm.svg";
//import Pick47pmLogo from "@/assets/logos/or/pick47pm.svg";
//import Pick410pmLogo from "@/assets/logos/or/pick410pm.svg";
//import WinForLifeLogo from "@/assets/logos/or/winforlife.svg";
//import MegabucksLogo from "@/assets/logos/or/megabucks.svg";
//import Pick2MiddayLogo from "@/assets/logos/pa/pick2midday.svg";
//import Pick2EveningLogo from "@/assets/logos/pa/pick2evening.svg";
//import Pick3MiddayLogo from "@/assets/logos/pa/pick3midday.svg";
//import Pick3EveningLogo from "@/assets/logos/pa/pick3evening.svg";
//import Pick4MiddayLogo from "@/assets/logos/pa/pick4midday.svg";
//import Pick4EveningLogo from "@/assets/logos/pa/pick4evening.svg";
//import Pick5MiddayLogo from "@/assets/logos/pa/pick5midday.svg";
//import Pick5EveningLogo from "@/assets/logos/pa/pick5evening.svg";
//import TreasureHuntLogo from "@/assets/logos/pa/treasurehunt.svg";
//import Cash5Logo from "@/assets/logos/pa/cash5.svg";
//import Match6Logo from "@/assets/logos/pa/match6.svg";
//import Cash4LifeLogo from "@/assets/logos/pa/cash4life.svg";
//import PowerballDouplepayLogo from "@/assets/logos/pa/powerballdouplepay.svg";
//import MegaMillionsLogo from "@/assets/logos/pa/megamillions.svg";
//import Pega2DiacuteaLogo from "@/assets/logos/pr/pega2diacutea.svg";
//import Pega2NocheLogo from "@/assets/logos/pr/pega2noche.svg";
//import Pega3DiacuteaLogo from "@/assets/logos/pr/pega3diacutea.svg";
//import Pega3NocheLogo from "@/assets/logos/pr/pega3noche.svg";
//import Pega4DiacuteaLogo from "@/assets/logos/pr/pega4diacutea.svg";
//import Pega4NocheLogo from "@/assets/logos/pr/pega4noche.svg";
//import LotoLogo from "@/assets/logos/pr/loto.svg";
//import RevanchaLogo from "@/assets/logos/pr/revancha.svg";
//import PowerballDouplepayLogo from "@/assets/logos/pr/powerballdouplepay.svg";
//import MegaMillionsLogo from "@/assets/logos/pr/megamillions.svg";
//import NumbersGameMiddayLogo from "@/assets/logos/ri/numbersgamemidday.svg";
//import NumbersGameEveningLogo from "@/assets/logos/ri/numbersgameevening.svg";
//import WildMoneyLogo from "@/assets/logos/ri/wildmoney.svg";
//import LuckyforLifeLogo from "@/assets/logos/ri/luckyforlife.svg";
//import MegaMillionsLogo from "@/assets/logos/ri/megamillions.svg";
//import Pick3MiddayLogo from "@/assets/logos/sc/pick3midday.svg";
//import Pick3EveningLogo from "@/assets/logos/sc/pick3evening.svg";
//import Pick4MiddayLogo from "@/assets/logos/sc/pick4midday.svg";
//import Pick4EveningLogo from "@/assets/logos/sc/pick4evening.svg";
//import PalmettoCash5Logo from "@/assets/logos/sc/palmettocash5.svg";
//import CashPopMiddayLogo from "@/assets/logos/sc/cashpopmidday.svg";
//import CashPopEveningLogo from "@/assets/logos/sc/cashpopevening.svg";
//import PowerballDouplepayLogo from "@/assets/logos/sc/powerballdouplepay.svg";
//import DakotaCashLogo from "@/assets/logos/sd/dakotacash.svg";
//import LuckyforlifeLogo from "@/assets/logos/sd/luckyforlife.svg";
//import LottoAmericaLogo from "@/assets/logos/sd/lottoamerica.svg";
//import PowerballDouplepayLogo from "@/assets/logos/sd/powerballdouplepay.svg";
//import MegaMillionsLogo from "@/assets/logos/sd/megamillions.svg";
//import Cash3MorningLogo from "@/assets/logos/tn/cash3morning.svg";
//import Cash3MiddayLogo from "@/assets/logos/tn/cash3midday.svg";
//import Cash3EveningLogo from "@/assets/logos/tn/cash3evening.svg";
//import Cash4MorningLogo from "@/assets/logos/tn/cash4morning.svg";
//import Cash4MiddayLogo from "@/assets/logos/tn/cash4midday.svg";
//import Cash4EveningLogo from "@/assets/logos/tn/cash4evening.svg";
//import TennesseeCashLogo from "@/assets/logos/tn/tennesseecash.svg";
//import DailyTennesseeJackpotLogo from "@/assets/logos/tn/dailytennesseejackpot.svg";
//import Cash4LifeLogo from "@/assets/logos/tn/cash4life.svg";
//import LottoAmericaLogo from "@/assets/logos/tn/lottoamerica.svg";
//import PowerballDouplepayLogo from "@/assets/logos/tn/powerballdouplepay.svg";
//import MegaMillionsLogo from "@/assets/logos/tn/megamillions.svg";
//import Pick3MorningLogo from "@/assets/logos/tx/pick3morning.svg";
//import Pick3DayLogo from "@/assets/logos/tx/pick3day.svg";
//import Pick3EveningLogo from "@/assets/logos/tx/pick3evening.svg";
//import Pick3NightLogo from "@/assets/logos/tx/pick3night.svg";
//import Daily4MorningLogo from "@/assets/logos/tx/daily4morning.svg";
//import Daily4DayLogo from "@/assets/logos/tx/daily4day.svg";
//import Daily4EveningLogo from "@/assets/logos/tx/daily4evening.svg";
//import Daily4NightLogo from "@/assets/logos/tx/daily4night.svg";
//import CashFiveLogo from "@/assets/logos/tx/cashfive.svg";
//import TexasTwoStepLogo from "@/assets/logos/tx/texastwostep.svg";
//import LottoTexasLogo from "@/assets/logos/tx/lottotexas.svg";
//import AllorNothingMorningLogo from "@/assets/logos/tx/allornothingmorning.svg";
//import AllorNothingDayLogo from "@/assets/logos/tx/allornothingday.svg";
//import AllorNothingEveningLogo from "@/assets/logos/tx/allornothingevening.svg";
//import AllorNothingNightLogo from "@/assets/logos/tx/allornothingnight.svg";
//import MegaMillionsLogo from "@/assets/logos/tx/megamillions.svg";
//import Pick3MorningLogo from "@/assets/logos/vi/pick3morning.svg";
//import Pick3MiddayLogo from "@/assets/logos/vi/pick3midday.svg";
//import Pick3SunsetLogo from "@/assets/logos/vi/pick3sunset.svg";
//import Pick3EveningLogo from "@/assets/logos/vi/pick3evening.svg";
//import Pick4MorningLogo from "@/assets/logos/vi/pick4morning.svg";
//import Pick4MiddayLogo from "@/assets/logos/vi/pick4midday.svg";
//import Pick4SunsetLogo from "@/assets/logos/vi/pick4sunset.svg";
//import Pick4EveningLogo from "@/assets/logos/vi/pick4evening.svg";
//import LuckyPickLogo from "@/assets/logos/vi/luckypick.svg";
//import SuperLottoLogo from "@/assets/logos/vi/superlotto.svg";
//import PowerballDouplepayLogo from "@/assets/logos/vi/powerballdouplepay.svg";
//import MegaMillionsLogo from "@/assets/logos/vi/megamillions.svg";
//import Tri-StatePick3DayLogo from "@/assets/logos/vt/tri-statepick3day.svg";
//import Tri-StatePick3EveningLogo from "@/assets/logos/vt/tri-statepick3evening.svg";
//import Tri-StatePick4DayLogo from "@/assets/logos/vt/tri-statepick4day.svg";
//import Tri-StatePick4EveningLogo from "@/assets/logos/vt/tri-statepick4evening.svg";
//import Gimme5Logo from "@/assets/logos/vt/gimme5.svg";
//import Tri-StateMegabucksPlusLogo from "@/assets/logos/vt/tri-statemegabucksplus.svg";
//import LuckyforLifeLogo from "@/assets/logos/vt/luckyforlife.svg";
//import MegaMillionsLogo from "@/assets/logos/vt/megamillions.svg";
//import Cash4LifeLogo from "@/assets/logos/va/cash4life.svg";
//import CashPopAfterHoursLogo from "@/assets/logos/va/cashpopafterhours.svg";
//import CashPopPrimeTimeLogo from "@/assets/logos/va/cashpopprimetime.svg";
//import CashPopRushHourLogo from "@/assets/logos/va/cashpoprushhour.svg";
//import CashPopLunchBreakLogo from "@/assets/logos/va/cashpoplunchbreak.svg";
//import CashPopCoffeeBreakLogo from "@/assets/logos/va/cashpopcoffeebreak.svg";
//import BankaMillionLogo from "@/assets/logos/va/bankamillion.svg";
//import Cash5NightLogo from "@/assets/logos/va/cash5night.svg";
//import Pick5NightLogo from "@/assets/logos/va/pick5night.svg";
//import Pick5DayLogo from "@/assets/logos/va/pick5day.svg";
//import Pick4NightLogo from "@/assets/logos/va/pick4night.svg";
//import Pick4DayLogo from "@/assets/logos/va/pick4day.svg";
//import Pick3NightLogo from "@/assets/logos/va/pick3night.svg";
//import Pick3DayLogo from "@/assets/logos/va/pick3day.svg";
//import MegaMillionsLogo from "@/assets/logos/va/megamillions.svg";
//import Match4Logo from "@/assets/logos/wa/match4.svg";
//import Hit5Logo from "@/assets/logos/wa/hit5.svg";
//import DailyKenoLogo from "@/assets/logos/wa/dailykeno.svg";
//import LottoLogo from "@/assets/logos/wa/lotto.svg";
//import CashPopLogo from "@/assets/logos/wa/cashpop.svg";
//import MegaMillionsLogo from "@/assets/logos/wa/megamillions.svg";
//import PowerballDouplepayLogo from "@/assets/logos/wa/powerballdouplepay.svg";
//import DC-2MiddayLogo from "@/assets/logos/dc/dc-2midday.svg";
//import DC-2EveningLogo from "@/assets/logos/dc/dc-2evening.svg";
//import DC-3MiddayLogo from "@/assets/logos/dc/dc-3midday.svg";
//import DC-3EveningLogo from "@/assets/logos/dc/dc-3evening.svg";
//import DC-4MiddayLogo from "@/assets/logos/dc/dc-4midday.svg";
//import DC-4EveningLogo from "@/assets/logos/dc/dc-4evening.svg";
//import DC-5MiddayLogo from "@/assets/logos/dc/dc-5midday.svg";
//import DC-5EveningLogo from "@/assets/logos/dc/dc-5evening.svg";
//import LuckyforLifeLogo from "@/assets/logos/dc/luckyforlife.svg";
//import PowerballDouplepayLogo from "@/assets/logos/dc/powerballdouplepay.svg";
//import MegaMillionsLogo from "@/assets/logos/wv/megamillions.svg";
//import Daily3Logo from "@/assets/logos/wv/daily3.svg";
//import Daily4Logo from "@/assets/logos/wv/daily4.svg";
//import Cash25Logo from "@/assets/logos/wv/cash25.svg";
//import LottoAmericaLogo from "@/assets/logos/wv/lottoamerica.svg";
//import Pick3MiddayLogo from "@/assets/logos/wi/pick3midday.svg";
//import Pick3EveningLogo from "@/assets/logos/wi/pick3evening.svg";
//import Pick4MiddayLogo from "@/assets/logos/wi/pick4midday.svg";
//import Pick4EveningLogo from "@/assets/logos/wi/pick4evening.svg";
//import Badger5Logo from "@/assets/logos/wi/badger5.svg";
//import SuperCashLogo from "@/assets/logos/wi/supercash.svg";
//import MegabucksLogo from "@/assets/logos/wi/megabucks.svg";
//import AllorNothingMiddayLogo from "@/assets/logos/wi/allornothingmidday.svg";
//import AllorNothingEveningLogo from "@/assets/logos/wi/allornothingevening.svg";
//import MegaMillionsLogo from "@/assets/logos/wi/megamillions.svg";
//import 2by2Logo from "@/assets/logos/wy/2by2.svg";
//import CowboyDrawLogo from "@/assets/logos/wy/cowboydraw.svg";
//import LuckyforLifeLogo from "@/assets/logos/wy/luckyforlife.svg";
//import MegaMillionsLogo from "@/assets/logos/wy/megamillions.svg";

// ...adicione mais se usar

const LOGO_MAP: Record<string, any> = {
  //"/assets/logos/az/pick3.svg": Pick3Logo,
  //"/assets/logos/az/fantasy5.svg": Fantasy5Logo,
  //"/assets/logos/az/thepick.svg": ThePickLogo,
  //"/assets/logos/az/tripletwist.svg": TripleTwistLogo,
  //"/assets/logos/az/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/az/powerball.svg": PowerballLogo,
  //"/assets/logos/ar/cash3midday.svg": Cash3MiddayLogo,
  //"/assets/logos/ar/cash3evening.svg": Cash3EveningLogo,
  //"/assets/logos/ar/cash4midday.svg": Cash4MiddayLogo,
  //"/assets/logos/ar/cash4evening.svg": Cash4EveningLogo,
  //"/assets/logos/ar/naturalstatejackpot.svg": NaturalStateJackpotLogo,
  //"/assets/logos/ar/lotto.svg": LottoLogo,
  //"/assets/logos/ar/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/ar/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/ar/powerball.svg": PowerballLogo,
  //"/assets/logos/ca/daily3midday.svg": Daily3MiddayLogo,
  //"/assets/logos/ca/daily3evening.svg": Daily3EveningLogo,
  //"/assets/logos/ca/daily4.svg": Daily4Logo,
  //"/assets/logos/ca/fantasy5.svg": Fantasy5Logo,
  //"/assets/logos/ca/dailyderby.svg": DailyDerbyLogo,
  //"/assets/logos/ca/superlottoplus.svg": SuperLottoPlusLogo,
  //"/assets/logos/ca/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/ca/powerball.svg": PowerballLogo,
  //"/assets/logos/co/pick3midday.svg": Pick3MiddayLogo,
  //"/assets/logos/co/pick3evening.svg": Pick3EveningLogo,
  //"/assets/logos/co/cash5.svg": Cash5Logo,
  //"/assets/logos/co/lottoplus.svg": LottoPlusLogo,
  //"/assets/logos/co/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/co/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/co/powerball.svg": PowerballLogo,
  //"/assets/logos/co/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/ct/play3day.svg": Play3DayLogo,
  //"/assets/logos/ct/play3night.svg": Play3NightLogo,
  //"/assets/logos/ct/play4day.svg": Play4DayLogo,
  //"/assets/logos/ct/play4night.svg": Play4NightLogo,
  //"/assets/logos/ct/cash5.svg": Cash5Logo,
  //"/assets/logos/ct/classiclotto.svg": ClassicLottoLogo,
  //"/assets/logos/ct/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/ct/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/ct/powerball.svg": PowerballLogo,
  //"/assets/logos/de/play3day.svg": Play3DayLogo,
  //"/assets/logos/de/play3night.svg": Play3NightLogo,
  //"/assets/logos/de/play4day.svg": Play4DayLogo,
  //"/assets/logos/de/play4night.svg": Play4NightLogo,
  //"/assets/logos/de/play5day.svg": Play5DayLogo,
  //"/assets/logos/de/play5.svg": Play5Logo,
  //"/assets/logos/de/multi-winlotto.svg": Multi-WinLottoLogo,
  //"/assets/logos/de/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/de/lottoamerica.svg": LottoAmericaLogo,
  //"/assets/logos/de/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/de/powerball.svg": PowerballLogo,
  //"/assets/logos/fl/pick2midday.svg": Pick2MiddayLogo,
  //"/assets/logos/fl/pick2evening.svg": Pick2EveningLogo,
  //"/assets/logos/fl/pick3midday.svg": Pick3MiddayLogo,
  //"/assets/logos/fl/pick3evening.svg": Pick3EveningLogo,
  //"/assets/logos/fl/pick4midday.svg": Pick4MiddayLogo,
  //"/assets/logos/fl/pick4evening.svg": Pick4EveningLogo,
  //"/assets/logos/fl/pick5midday.svg": Pick5MiddayLogo,
  //"/assets/logos/fl/pick5evening.svg": Pick5EveningLogo,
  //"/assets/logos/fl/fantasy5midday.svg": Fantasy5MiddayLogo,
  //"/assets/logos/fl/fantasy5.svg": Fantasy5Logo,
  //"/assets/logos/fl/floridalotto.svg": FloridaLottoLogo,
  //"/assets/logos/fl/jackpottripleplay.svg": JackpotTriplePlayLogo,
  //"/assets/logos/fl/cashpopmorning.svg": CashPopMorningLogo,
  //"/assets/logos/fl/cashpopmatinee.svg": CashPopMatineeLogo,
  //"/assets/logos/fl/cashpopafternoon.svg": CashPopAfternoonLogo,
  //"/assets/logos/fl/cashpopevening.svg": CashPopEveningLogo,
  //"/assets/logos/fl/cashpoplatenight.svg": CashPopLateNightLogo,
  //"/assets/logos/fl/cash4life.svg": Cash4LifeLogo,
  //"/assets/logos/fl/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/fl/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/fl/powerball.svg": PowerballLogo,
  //"/assets/logos/ga/cashpopearlybird.svg": CashPopEarlyBirdLogo,
  //"/assets/logos/ga/cashpopmatinee.svg": CashPopMatineeLogo,
  //"/assets/logos/ga/cashpopdrivetime.svg": CashPopDriveTimeLogo,
  //"/assets/logos/ga/cashpopprimetime.svg": CashPopPrimeTimeLogo,
  //"/assets/logos/ga/cashpopnightowl.svg": CashPopNightOwlLogo,
  //"/assets/logos/ga/cash3midday.svg": Cash3MiddayLogo,
  //"/assets/logos/ga/cash3evening.svg": Cash3EveningLogo,
  //"/assets/logos/ga/cash3night.svg": Cash3NightLogo,
  //"/assets/logos/ga/cash4midday.svg": Cash4MiddayLogo,
  //"/assets/logos/ga/cash4evening.svg": Cash4EveningLogo,
  //"/assets/logos/ga/cash4night.svg": Cash4NightLogo,
  //"/assets/logos/ga/georgiafivemidday.svg": GeorgiaFiveMiddayLogo,
  //"/assets/logos/ga/georgiafiveevening.svg": GeorgiaFiveEveningLogo,
  //"/assets/logos/ga/fantasy5.svg": Fantasy5Logo,
  //"/assets/logos/ga/cash4life.svg": Cash4LifeLogo,
  //"/assets/logos/ga/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/ga/powerball.svg": PowerballLogo,
  //"/assets/logos/id/pick3day.svg": Pick3DayLogo,
  //"/assets/logos/id/pick3night.svg": Pick3NightLogo,
  //"/assets/logos/id/pick4day.svg": Pick4DayLogo,
  //"/assets/logos/id/pick4night.svg": Pick4NightLogo,
  //"/assets/logos/id/idahocash.svg": IdahoCashLogo,
  //"/assets/logos/id/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/id/lottoamerica.svg": LottoAmericaLogo,
  //"/assets/logos/id/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/id/powerball.svg": PowerballLogo,
  //"/assets/logos/id/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/il/pick3midday.svg": Pick3MiddayLogo,
  //"/assets/logos/il/pick3evening.svg": Pick3EveningLogo,
  //"/assets/logos/il/pick4midday.svg": Pick4MiddayLogo,
  //"/assets/logos/il/pick4evening.svg": Pick4EveningLogo,
  //"/assets/logos/il/luckydaylottomidday.svg": LuckyDayLottoMiddayLogo,
  //"/assets/logos/il/luckydaylottoevening.svg": LuckyDayLottoEveningLogo,
  //"/assets/logos/il/lotto.svg": LottoLogo,
  //"/assets/logos/il/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/il/powerbal.svg": PowerbalLogo,
  //"/assets/logos/in/daily3midday.svg": Daily3MiddayLogo,
  //"/assets/logos/in/daily3evening.svg": Daily3EveningLogo,
  //"/assets/logos/in/daily4midday.svg": Daily4MiddayLogo,
  //"/assets/logos/in/daily4evening.svg": Daily4EveningLogo,
  //"/assets/logos/in/cash5.svg": Cash5Logo,
  //"/assets/logos/in/quickdrawmidday.svg": QuickDrawMiddayLogo,
  //"/assets/logos/in/quickdrawevening.svg": QuickDrawEveningLogo,
  //"/assets/logos/in/lottoplus.svg": LottoPlusLogo,
  //"/assets/logos/in/cashpopmorning.svg": CashPopMorningLogo,
  //"/assets/logos/in/cashpopmatinee.svg": CashPopMatineeLogo,
  //"/assets/logos/in/cashpopafternoon.svg": CashPopAfternoonLogo,
  //"/assets/logos/in/cashpopevening.svg": CashPopEveningLogo,
  //"/assets/logos/in/cashpoplatenight.svg": CashPopLateNightLogo,
  //"/assets/logos/in/cash4life.svg": Cash4LifeLogo,
  //"/assets/logos/in/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/in/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/in/powerball.svg": PowerballLogo,
  //"/assets/logos/ia/pick3midday.svg": Pick3MiddayLogo,
  //"/assets/logos/ia/pick3evening.svg": Pick3EveningLogo,
  //"/assets/logos/ia/pick4midday.svg": Pick4MiddayLogo,
  //"/assets/logos/ia/pick4evening.svg": Pick4EveningLogo,
  //"/assets/logos/ia/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/ia/lottoamerica.svg": LottoAmericaLogo,
  //"/assets/logos/ia/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/ia/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/ia/powerball.svg": PowerballLogo,
  //"/assets/logos/ks/pick3.svg": Pick3Logo,
  //"/assets/logos/ks/pick3evening.svg": Pick3EveningLogo,
  //"/assets/logos/ks/supercash.svg": SuperCashLogo,
  //"/assets/logos/ks/2by2.svg": 2by2Logo,
  //"/assets/logos/ks/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/ks/lottoamerica.svg": LottoAmericaLogo,
  //"/assets/logos/ks/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/ks/powerball.svg": PowerballLogo,
  //"/assets/logos/ky/pick3midday.svg": Pick3MiddayLogo,
  //"/assets/logos/ky/pick3evening.svg": Pick3EveningLogo,
  //"/assets/logos/ky/pick4midday.svg": Pick4MiddayLogo,
  //"/assets/logos/ky/pick4evening.svg": Pick4EveningLogo,
  //"/assets/logos/ky/cashball.svg": CashBallLogo,
  //"/assets/logos/ky/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/ky/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/ky/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/ky/powerball.svg": PowerballLogo,
  //"/assets/logos/la/pick3.svg": Pick3Logo,
  //"/assets/logos/la/pick4.svg": Pick4Logo,
  //"/assets/logos/la/pick5.svg": Pick5Logo,
  //"/assets/logos/la/easy5.svg": Easy5Logo,
  //"/assets/logos/la/lotto.svg": LottoLogo,
  //"/assets/logos/la/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/la/powerball.svg": PowerballLogo,
  //"/assets/logos/me/cashpopearlybird.svg": CashPopEarlyBirdLogo,
  //"/assets/logos/me/cashpopbrunch.svg": CashPopBrunchLogo,
  //"/assets/logos/me/cashpopmatinee.svg": CashPopMatineeLogo,
  //"/assets/logos/me/cashpopsuppertime.svg": CashPopSupperTimeLogo,
  //"/assets/logos/me/cashpopnightowl.svg": CashPopNightOwlLogo,
  //"/assets/logos/me/tri-statepick3day.svg": Tri-StatePick3DayLogo,
  //"/assets/logos/me/tri-statepick3evening.svg": Tri-StatePick3EveningLogo,
  //"/assets/logos/me/tri-statepick4day.svg": Tri-StatePick4DayLogo,
  //"/assets/logos/me/tri-statepick4evening.svg": Tri-StatePick4EveningLogo,
  //"/assets/logos/me/gimme5.svg": Gimme5Logo,
  //"/assets/logos/me/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/me/tri-statemegabucksplus.svg": Tri-StateMegabucksPlusLogo,
  //"/assets/logos/me/lottoamerica.svg": LottoAmericaLogo,
  //"/assets/logos/me/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/me/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/me/powerball.svg": PowerballLogo,
  //"/assets/logos/md/pick3midday.svg": Pick3MiddayLogo,
  //"/assets/logos/md/pick3evening.svg": Pick3EveningLogo,
  //"/assets/logos/md/pick4midday.svg": Pick4MiddayLogo,
  //"/assets/logos/md/pick4evening.svg": Pick4EveningLogo,
  //"/assets/logos/md/pick5midday.svg": Pick5MiddayLogo,
  //"/assets/logos/md/pick5evening.svg": Pick5EveningLogo,
  //"/assets/logos/md/bonusmatch5.svg": BonusMatch5Logo,
  //"/assets/logos/md/multimatch.svg": MultiMatchLogo,
  //"/assets/logos/md/cashpop9am.svg": CashPop9amLogo,
  //"/assets/logos/md/cashpop1pm.svg": CashPop1pmLogo,
  //"/assets/logos/md/cashpop6pm.svg": CashPop6pmLogo,
  //"/assets/logos/md/cashpop11pm.svg": CashPop11pmLogo,
  //"/assets/logos/md/cash4life.svg": Cash4LifeLogo,
  //"/assets/logos/md/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/md/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/md/powerball.svg": PowerballLogo,
  //"/assets/logos/ma/numbersgamemidday.svg": NumbersGameMiddayLogo,
  //"/assets/logos/ma/numbersgameevening.svg": NumbersGameEveningLogo,
  //"/assets/logos/ma/masscash.svg": MassCashLogo,
  //"/assets/logos/ma/megabucks.svg": MegabucksLogo,
  //"/assets/logos/ma/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/ma/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/ma/powerball.svg": PowerballLogo,
  //"/assets/logos/mi/daily3midday.svg": Daily3MiddayLogo,
  //"/assets/logos/mi/daily3evening.svg": Daily3EveningLogo,
  //"/assets/logos/mi/daily4midday.svg": Daily4MiddayLogo,
  //"/assets/logos/mi/daily4evening.svg": Daily4EveningLogo,
  //"/assets/logos/mi/fantasy5.svg": Fantasy5Logo,
  //"/assets/logos/mi/keno.svg": KenoLogo,
  //"/assets/logos/mi/pokerlotto.svg": PokerLottoLogo,
  //"/assets/logos/mi/classiclotto47.svg": ClassicLotto47Logo,
  //"/assets/logos/mi/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/mi/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/mi/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/mi/powerball.svg": PowerballLogo,
  //"/assets/logos/mn/pick3.svg": Pick3Logo,
  //"/assets/logos/mn/gopher5.svg": Gopher5Logo,
  //"/assets/logos/mn/north5.svg": North5Logo,
  //"/assets/logos/mn/lottoamerica.svg": LottoAmericaLogo,
  //"/assets/logos/mn/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/mn/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/mn/powerball.svg": PowerballLogo,
  //"/assets/logos/ms/cash3midday.svg": Cash3MiddayLogo,
  //"/assets/logos/ms/cash3evening.svg": Cash3EveningLogo,
  //"/assets/logos/ms/cash4midday.svg": Cash4MiddayLogo,
  //"/assets/logos/ms/cash4evening.svg": Cash4EveningLogo,
  //"/assets/logos/ms/cashpopmidday.svg": CashPopMiddayLogo,
  //"/assets/logos/ms/cashpopevening.svg": CashPopEveningLogo,
  //"/assets/logos/ms/match5.svg": Match5Logo,
  //"/assets/logos/ms/lottoamerica.svg": LottoAmericaLogo,
  //"/assets/logos/ms/powerball.svg": PowerballLogo,
  //"/assets/logos/ms/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/ms/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/mo/pick3midday.svg": Pick3MiddayLogo,
  //"/assets/logos/mo/pick3evening.svg": Pick3EveningLogo,
  //"/assets/logos/mo/pick4midday.svg": Pick4MiddayLogo,
  //"/assets/logos/mo/pick4evening.svg": Pick4EveningLogo,
  //"/assets/logos/mo/showmecash.svg": ShowMeCashLogo,
  //"/assets/logos/mo/lotto.svg": LottoLogo,
  //"/assets/logos/mo/cashpopearlybird.svg": CashPopEarlyBirdLogo,
  //"/assets/logos/mo/cashpoplatemorning.svg": CashPopLateMorningLogo,
  //"/assets/logos/mo/cashpopmatinee.svg": CashPopMatineeLogo,
  //"/assets/logos/mo/cashpopprimetime.svg": CashPopPrimeTimeLogo,
  //"/assets/logos/mo/cashpopnightowl.svg": CashPopNightOwlLogo,
  //"/assets/logos/mo/cash4life.svg": Cash4LifeLogo,
  //"/assets/logos/mo/0.svg": 0Logo,
  //"/assets/logos/mo/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/mo/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/mt/montanacash.svg": MontanaCashLogo,
  //"/assets/logos/mt/bigskybonus.svg": BigSkyBonusLogo,
  //"/assets/logos/mt/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/mt/lottoamerica.svg": LottoAmericaLogo,
  //"/assets/logos/mt/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/mt/powerball.svg": PowerballLogo,
  //"/assets/logos/mt/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/ne/pick3.svg": Pick3Logo,
  //"/assets/logos/ne/pick5.svg": Pick5Logo,
  //"/assets/logos/ne/myday.svg": MyDayLogo,
  //"/assets/logos/ne/2by2.svg": 2by2Logo,
  //"/assets/logos/ne/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/ne/lottoamerica.svg": LottoAmericaLogo,
  //"/assets/logos/ne/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/ne/powerball.svg": PowerballLogo,
  //"/assets/logos/ne/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/nh/tri-statepick3day.svg": Tri-StatePick3DayLogo,
  //"/assets/logos/nh/tri-statepick3evening.svg": Tri-StatePick3EveningLogo,
  //"/assets/logos/nh/tri-statepick4day.svg": Tri-StatePick4DayLogo,
  //"/assets/logos/nh/tri-statepick4evening.svg": Tri-StatePick4EveningLogo,
  //"/assets/logos/nh/gimme5.svg": Gimme5Logo,
  //"/assets/logos/nh/tri-statemegabucksplus.svg": Tri-StateMegabucksPlusLogo,
  //"/assets/logos/nh/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/nh/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/nj/pick3midday.svg": Pick3MiddayLogo,
  //"/assets/logos/nj/pick3evening.svg": Pick3EveningLogo,
  //"/assets/logos/nj/pick4midday.svg": Pick4MiddayLogo,
  //"/assets/logos/nj/pick4evening.svg": Pick4EveningLogo,
  //"/assets/logos/nj/jerseycash5.svg": JerseyCash5Logo,
  //"/assets/logos/nj/pick6.svg": Pick6Logo,
  //"/assets/logos/nj/cash4life.svg": Cash4LifeLogo,
  //"/assets/logos/nj/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/nj/powerball.svg": PowerballLogo,
  //"/assets/logos/nj/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/nm/pick3plusday.svg": Pick3PlusDayLogo,
  //"/assets/logos/nm/pick3plusevening.svg": Pick3PlusEveningLogo,
  //"/assets/logos/nm/pick4plusday.svg": Pick4PlusDayLogo,
  //"/assets/logos/nm/pick4plusevening.svg": Pick4PlusEveningLogo,
  //"/assets/logos/nm/roadrunnercash.svg": RoadRunnerCashLogo,
  //"/assets/logos/nm/0.svg": 0Logo,
  //"/assets/logos/nm/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/nm/lottoamerica.svg": LottoAmericaLogo,
  "/assets/logos/ny/megamillions.svg": MegaMillionsLogo,
  "/assets/logos/ny/powerball.svg": PowerballLogo,
  "/assets/logos/ny/numbersmidday.svg": NumbersMiddayLogo,
  "/assets/logos/ny/numbersevening.svg": NumbersEveningLogo,
  "/assets/logos/ny/win4midday.svg": Win4MiddayLogo,
  "/assets/logos/ny/win4evening.svg": Win4EveningLogo,
  "/assets/logos/ny/take5midday.svg": Take5MiddayLogo,
  "/assets/logos/ny/take5evening.svg": Take5EveningLogo,
  "/assets/logos/ny/pick10.svg": Pick10Logo,
  "/assets/logos/ny/nylotto.svg": NYLottoLogo,
  "/assets/logos/ny/cash4life.svg": Cash4LifeLogo,
  //"/assets/logos/nc/pick3day.svg": Pick3DayLogo,
  //"/assets/logos/nc/pick3evening.svg": Pick3EveningLogo,
  //"/assets/logos/nc/pick4day.svg": Pick4DayLogo,
  //"/assets/logos/nc/pick4evening.svg": Pick4EveningLogo,
  //"/assets/logos/nc/cash5.svg": Cash5Logo,
  //"/assets/logos/nc/cashpopmorningbuzz.svg": CashPopMorningBuzzLogo,
  //"/assets/logos/nc/cashpoplunchrush.svg": CashPopLunchRushLogo,
  //"/assets/logos/nc/cashpopclockoutcash.svg": CashPopClockOutCashLogo,
  //"/assets/logos/nc/cashpopprimetimepop.svg": CashPopPrimetimePopLogo,
  //"/assets/logos/nc/cashpopmidnightmoney.svg": CashPopMidnightMoneyLogo,
  //"/assets/logos/nc/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/nc/powerball.svg": PowerballLogo,
  //"/assets/logos/nc/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/nd/2by2.svg": 2by2Logo,
  //"/assets/logos/nd/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/nd/luckyforlife.svg": 0Logo,
  //"/assets/logos/nd/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/nd/lottoamerica.svg": LottoAmericaLogo,
  //"/assets/logos/oh/pick3midday.svg": Pick3MiddayLogo,
  //"/assets/logos/oh/pick3evening.svg": Pick3EveningLogo,
  //"/assets/logos/oh/pick4midday.svg": Pick4MiddayLogo,
  //"/assets/logos/oh/pick4evening.svg": Pick4EveningLogo,
  //"/assets/logos/oh/pick5midday.svg": Pick5MiddayLogo,
  //"/assets/logos/oh/pick5evening.svg": Pick5EveningLogo,
  //"/assets/logos/oh/classiclotto.svg": ClassicLottoLogo,
  //"/assets/logos/oh/rollingcash5.svg": RollingCash5Logo,
  //"/assets/logos/oh/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/oh/powerball.svg": PowerballLogo,
  //"/assets/logos/oh/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/ok/pick3.svg": Pick3Logo,
  //"/assets/logos/ok/cash5.svg": Cash5Logo,
  //"/assets/logos/ok/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/ok/lottoamerica.svg": LottoAmericaLogo,
  //"/assets/logos/ok/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/ok/powerball.svg": PowerballLogo,
  //"/assets/logos/ok/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/or/pick41pm.svg": Pick41pmLogo,
  //"/assets/logos/or/pick44pm.svg": Pick44pmLogo,
  //"/assets/logos/or/pick47pm.svg": Pick47pmLogo,
  //"/assets/logos/or/pick410pm.svg": Pick410pmLogo,
  //"/assets/logos/or/winforlife.svg": WinForLifeLogo,
  //"/assets/logos/or/megabucks.svg": MegabucksLogo,
  //"/assets/logos/or/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/or/powerball.svg": PowerballLogo,
  //"/assets/logos/pa/pick2midday.svg": Pick2MiddayLogo,
  //"/assets/logos/pa/pick2evening.svg": Pick2EveningLogo,
  //"/assets/logos/pa/pick3midday.svg": Pick3MiddayLogo,
  //"/assets/logos/pa/pick3evening.svg": Pick3EveningLogo,
  //"/assets/logos/pa/pick4midday.svg": Pick4MiddayLogo,
  //"/assets/logos/pa/pick4evening.svg": Pick4EveningLogo,
  //"/assets/logos/pa/pick5midday.svg": Pick5MiddayLogo,
  //"/assets/logos/pa/pick5evening.svg": Pick5EveningLogo,
  //"/assets/logos/pa/treasurehunt.svg": TreasureHuntLogo,
  //"/assets/logos/pa/cash5.svg": Cash5Logo,
  //"/assets/logos/pa/match6.svg": Match6Logo,
  //"/assets/logos/pa/cash4life.svg": Cash4LifeLogo,
  //"/assets/logos/pa/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/pa/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/pa/powerball.svg": PowerballLogo,
  //"/assets/logos/pr/pega2diacutea.svg": Pega2DiacuteaLogo,
  //"/assets/logos/pr/pega2noche.svg": Pega2NocheLogo,
  //"/assets/logos/pr/pega3diacutea.svg": Pega3DiacuteaLogo,
  //"/assets/logos/pr/pega3noche.svg": Pega3NocheLogo,
  //"/assets/logos/pr/pega4diacutea.svg": Pega4DiacuteaLogo,
  //"/assets/logos/pr/pega4noche.svg": Pega4NocheLogo,
  //"/assets/logos/pr/loto.svg": LotoLogo,
  //"/assets/logos/pr/revancha.svg": RevanchaLogo,
  //"/assets/logos/pr/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/pr/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/pr/powerball.svg": PowerballLogo,
  //"/assets/logos/ri/numbersgamemidday.svg": NumbersGameMiddayLogo,
  //"/assets/logos/ri/numbersgameevening.svg": NumbersGameEveningLogo,
  //"/assets/logos/ri/wildmoney.svg": WildMoneyLogo,
  //"/assets/logos/ri/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/ri/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/ri/powerball.svg": PowerballLogo,
  //"/assets/logos/sc/pick3midday.svg": Pick3MiddayLogo,
  //"/assets/logos/sc/pick3evening.svg": Pick3EveningLogo,
  //"/assets/logos/sc/pick4midday.svg": Pick4MiddayLogo,
  //"/assets/logos/sc/pick4evening.svg": Pick4EveningLogo,
  //"/assets/logos/sc/palmettocash5.svg": PalmettoCash5Logo,
  //"/assets/logos/sc/cashpopmidday.svg": CashPopMiddayLogo,
  //"/assets/logos/sc/cashpopevening.svg": CashPopEveningLogo,
  //"/assets/logos/sc/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/sc/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/sc/powerball.svg": PowerballLogo,
  //"/assets/logos/sd/dakotacash.svg": DakotaCashLogo,
  //"/assets/logos/sd/luckyforlife.svg": LuckyforlifeLogo,
  //"/assets/logos/sd/lottoamerica.svg": LottoAmericaLogo,
  //"/assets/logos/sd/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/sd/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/sd/powerball.svg": PowerballLogo,
  //"/assets/logos/tn/cash3morning.svg": Cash3MorningLogo,
  //"/assets/logos/tn/cash3midday.svg": Cash3MiddayLogo,
  //"/assets/logos/tn/cash3evening.svg": Cash3EveningLogo,
  //"/assets/logos/tn/cash4morning.svg": Cash4MorningLogo,
  //"/assets/logos/tn/cash4midday.svg": Cash4MiddayLogo,
  //"/assets/logos/tn/cash4evening.svg": Cash4EveningLogo,
  //"/assets/logos/tn/tennesseecash.svg": TennesseeCashLogo,
  //"/assets/logos/tn/dailytennesseejackpot.svg": DailyTennesseeJackpotLogo,
  //"/assets/logos/tn/cash4life.svg": Cash4LifeLogo,
  //"/assets/logos/tn/lottoamerica.svg": LottoAmericaLogo,
  //"/assets/logos/tn/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/tn/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/tn/powerball.svg": PowerballLogo,
  //"/assets/logos/tx/pick3morning.svg": Pick3MorningLogo,
  //"/assets/logos/tx/pick3day.svg": Pick3DayLogo,
  //"/assets/logos/tx/pick3evening.svg": Pick3EveningLogo,
  //"/assets/logos/tx/pick3night.svg": Pick3NightLogo,
  //"/assets/logos/tx/daily4morning.svg": Daily4MorningLogo,
  //"/assets/logos/tx/daily4day.svg": Daily4DayLogo,
  //"/assets/logos/tx/daily4evening.svg": Daily4EveningLogo,
  //"/assets/logos/tx/daily4night.svg": Daily4NightLogo,
  //"/assets/logos/tx/cashfive.svg": CashFiveLogo,
  //"/assets/logos/tx/texastwostep.svg": TexasTwoStepLogo,
  //"/assets/logos/tx/lottotexas.svg": LottoTexasLogo,
  //"/assets/logos/tx/allornothingmorning.svg": AllorNothingMorningLogo,
  //"/assets/logos/tx/allornothingday.svg": AllorNothingDayLogo,
  //"/assets/logos/tx/allornothingevening.svg": AllorNothingEveningLogo,
  //"/assets/logos/tx/allornothingnight.svg": AllorNothingNightLogo,
  //"/assets/logos/tx/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/tx/powerball.svg": PowerballLogo,
  //"/assets/logos/vi/pick3morning.svg": Pick3MorningLogo,
  //"/assets/logos/vi/pick3midday.svg": Pick3MiddayLogo,
  //"/assets/logos/vi/pick3sunset.svg": Pick3SunsetLogo,
  //"/assets/logos/vi/pick3evening.svg": Pick3EveningLogo,
  //"/assets/logos/vi/pick4morning.svg": Pick4MorningLogo,
  //"/assets/logos/vi/pick4midday.svg": Pick4MiddayLogo,
  //"/assets/logos/vi/pick4sunset.svg": Pick4SunsetLogo,
  //"/assets/logos/vi/pick4evening.svg": Pick4EveningLogo,
  //"/assets/logos/vi/luckypick.svg": LuckyPickLogo,
  //"/assets/logos/vi/superlotto.svg": SuperLottoLogo,
  //"/assets/logos/vi/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/vi/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/vi/powerball.svg": PowerballLogo,
  //"/assets/logos/vt/tri-statepick3day.svg": Tri-StatePick3DayLogo,
  //"/assets/logos/vt/tri-statepick3evening.svg": Tri-StatePick3EveningLogo,
  //"/assets/logos/vt/tri-statepick4day.svg": Tri-StatePick4DayLogo,
  //"/assets/logos/vt/tri-statepick4evening.svg": Tri-StatePick4EveningLogo,
  //"/assets/logos/vt/gimme5.svg": Gimme5Logo,
  //"/assets/logos/vt/tri-statemegabucksplus.svg": Tri-StateMegabucksPlusLogo,
  //"/assets/logos/vt/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/vt/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/vt/powerball.svg": PowerballLogo,
  //"/assets/logos/va/cash4life.svg": Cash4LifeLogo,
  //"/assets/logos/va/cashpopafterhours.svg": CashPopAfterHoursLogo,
  //"/assets/logos/va/cashpopprimetime.svg": CashPopPrimeTimeLogo,
  //"/assets/logos/va/cashpoprushhour.svg": CashPopRushHourLogo,
  //"/assets/logos/va/cashpoplunchbreak.svg": CashPopLunchBreakLogo,
  //"/assets/logos/va/cashpopcoffeebreak.svg": CashPopCoffeeBreakLogo,
  //"/assets/logos/va/bankamillion.svg": BankaMillionLogo,
  //"/assets/logos/va/cash5night.svg": Cash5NightLogo,
  //"/assets/logos/va/pick5night.svg": Pick5NightLogo,
  //"/assets/logos/va/pick5day.svg": Pick5DayLogo,
  //"/assets/logos/va/pick4night.svg": Pick4NightLogo,
  //"/assets/logos/va/pick4day.svg": Pick4DayLogo,
  //"/assets/logos/va/pick3night.svg": Pick3NightLogo,
  //"/assets/logos/va/pick3day.svg": Pick3DayLogo,
  //"/assets/logos/va/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/va/powerball.svg": PowerballLogo,
  //"/assets/logos/wa/match4.svg": Match4Logo,
  //"/assets/logos/wa/hit5.svg": Hit5Logo,
  //"/assets/logos/wa/dailykeno.svg": DailyKenoLogo,
  //"/assets/logos/wa/lotto.svg": LottoLogo,
  //"/assets/logos/wa/cashpop.svg": CashPopLogo,
  //"/assets/logos/wa/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/wa/powerball.svg": PowerballLogo,
  //"/assets/logos/wa/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/dc/dc-2midday.svg": DC-2MiddayLogo,
  //"/assets/logos/dc/dc-2evening.svg": DC-2EveningLogo,
  //"/assets/logos/dc/dc-3midday.svg": DC-3MiddayLogo,
  //"/assets/logos/dc/dc-3evening.svg": DC-3EveningLogo,
  //"/assets/logos/dc/dc-4midday.svg": DC-4MiddayLogo,
  //"/assets/logos/dc/dc-4evening.svg": DC-4EveningLogo,
  //"/assets/logos/dc/dc-5midday.svg": DC-5MiddayLogo,
  //"/assets/logos/dc/dc-5evening.svg": DC-5EveningLogo,
  //"/assets/logos/dc/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/dc/powerballdouplepay.svg": PowerballDouplepayLogo,
  //"/assets/logos/wv/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/wv/powerball.svg": PowerballLogo,
  //"/assets/logos/wv/daily3.svg": Daily3Logo,
  //"/assets/logos/wv/daily4.svg": Daily4Logo,
  //"/assets/logos/wv/cash25.svg": Cash25Logo,
  //"/assets/logos/wv/lottoamerica.svg": LottoAmericaLogo,
  //"/assets/logos/wi/pick3midday.svg": Pick3MiddayLogo,
  //"/assets/logos/wi/pick3evening.svg": Pick3EveningLogo,
  //"/assets/logos/wi/pick4midday.svg": Pick4MiddayLogo,
  //"/assets/logos/wi/pick4evening.svg": Pick4EveningLogo,
  //"/assets/logos/wi/badger5.svg": Badger5Logo,
  //"/assets/logos/wi/supercash.svg": SuperCashLogo,
  //"/assets/logos/wi/megabucks.svg": MegabucksLogo,
  //"/assets/logos/wi/allornothingmidday.svg": AllorNothingMiddayLogo,
  //"/assets/logos/wi/allornothingevening.svg": AllorNothingEveningLogo,
  //"/assets/logos/wi/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/wi/powerball.svg": PowerballLogo,
  //"/assets/logos/wy/2by2.svg": 2by2Logo,
  //"/assets/logos/wy/cowboydraw.svg": CowboyDrawLogo,
  //"/assets/logos/wy/luckyforlife.svg": LuckyforLifeLogo,
  //"/assets/logos/wy/megamillions.svg": MegaMillionsLogo,
  //"/assets/logos/wy/powerball.svg": PowerballLogo,

  // ...adicione conforme seu app precisa
};

export function LotteryLogo({
  logoPath,
  size = 44,
}: {
  logoPath?: string;
  size?: number;
}) {
  if (!logoPath) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: 14,
          backgroundColor: "#E8ECF8",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color="#95A4C9" />
      </View>
    );
  }

  const LogoComponent = LOGO_MAP[logoPath];
  if (LogoComponent) {
    return <LogoComponent width={size} height={size} />;
  }

  // fallback: placeholder
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 14,
        backgroundColor: "#EEE",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
}
