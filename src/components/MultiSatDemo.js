import React from 'react';
import { Map, ControlBar, SatelliteInfoBar, Trajectory, GroundStationNetworkCoverage } from '@cryptosat/cryptosim-visualization';
import Satellite from '@cryptosat/cryptosim/lib/satellite';
import Universe from '@cryptosat/cryptosim/lib/universe';
import GroundStationNetwork from '@cryptosat/cryptosim/lib/groundStationNetwork';
import SimulatedClock from '@cryptosat/cryptosim/lib/clocks/simulatedClock';

class MultiSatDemo extends React.Component {

  constructor() {
    super();
    const setup = setupUniverse();
    this.universe = setup.universe;
    this.gsnetwork = setup.gsnetwork;
    this.state = {
      satelliteId: this.universe.satellites().keys().next().value,
      displayCoverage: false,
      displayTrajectory: false,
    };

    // WARNING: ugly hack to override the contents of the entire page
    setTimeout(() => {
      const navContainer = document.getElementsByClassName('root')[0];
      if (navContainer) navContainer.remove();
    }, 2000);
  }

  setSatellite(satelliteId) {
    this.setState({satelliteId: satelliteId});
  }

  setCoverageDisplay(value) {
    this.setState({displayCoverage: value});
  }

  setTrajectoryDisplay(value) {
    this.setState({displayTrajectory: value});
  }

  render() {
    const sat = this.universe.satellites().get(this.state.satelliteId);
    let trajectory = this.state.displayTrajectory ? <Trajectory satellite={sat}/> : null;
    let coverage = this.state.displayCoverage ? <GroundStationNetworkCoverage gsnetwork={this.gsnetwork}/> : null;
    return (
      <div style={{height: '100%', width: '100%'}}>
        <ControlBar universe={this.universe}
                    setSatellite={this.setSatellite.bind(this)}
                    setCoverageDisplay={this.setCoverageDisplay.bind(this)}
                    setTrajectoryDisplay={this.setTrajectoryDisplay.bind(this)}/>
        <SatelliteInfoBar satellite={sat} gsnetwork={this.gsnetwork} />
        <Map universe={this.universe} gsnetwork={this.gsnetwork}>
          {coverage}
          {trajectory}
        </Map>
      </div>
    );
  }
}

function setupUniverse() {
  const clock = new SimulatedClock(new Date(2021, 2, 1, 2, 30, 0, 0));
  clock.setSpeed(10);
  clock.play();
  const universe = new Universe(clock);

  const ATLAS_CENTAUR_2 = [
    '1 00694U 63047A   21233.61197746  .00000235  00000-0  16549-4 0  9990',
    '2 00694  30.3600  41.8846 0584898 322.3968  33.7072 14.02866658897540',
  ];

  const THOR_AGENA_D_R_B = [
    '1 00733U 64002A   21233.47593346  .00000008  00000-0  20179-4 0  9998',
    '2 00733  98.9790 146.8931 0034773  59.0592 301.4000 14.32450994   361',
  ];

  const SL_3_R_B = [
    '1 19046U 88032B   21233.45144324  .00000408  00000-0  34254-4 0  9993',
    '2 19046  97.3857 240.9999 0036850 180.1676 179.9544 15.02971465801541',
  ];

  const SL_8_R_B = [
    '1 21938U 92020B   21233.49566486  .00000014  00000-0 -11880-5 0  9994',
    '2 21938  82.9307 307.2917 0027971 252.7859 116.4991 13.75292298472784',
  ];

  const OAO_2 = [
    '1 03597U 68110A   21233.48863080  .00000006  00000-0  67935-5 0  9999',
    '2 03597  34.9929 167.4891 0006137 217.5520 142.4742 14.45889464778477',
  ];

  const ISIS_1 = [
    '1 03669U 69009A   21233.51121436  .00000050  00000-0  29470-4 0  9993',
    '2 03669  88.4375 339.0430 1711555 199.7263 152.8907 11.29510200160937',
  ];

  const SERT_2 = [
    '1 04327U 70009A   21233.35797888 -.00000018  00000-0  30088-4 0  9991',
    '2 04327  99.1436 258.1198 0005894  99.9786 271.1615 13.58501173554302',
  ];

  const ASTEX_1 = [
    '1 05560U 71089A   21233.52907243  .00000061  00000-0  16711-4 0  9991',
    '2 05560  92.7234 335.4972 0013927 284.3253  75.6406 14.48146524621722',
  ];

  const COSMOS_482_DESCENT_CRAFT = [
    '1 06073U 72023E   21233.58641303  .00023183  66192-5  91510-4 0  9997',
    '2 06073  52.0325 359.9663 1258852  57.1739 314.4136 13.29892883558967',
  ];

  const OAO_3_COPERNICUS = [
    '1 06153U 72065A   21233.56143448  .00000025  00000-0  97628-5 0  9995',
    '2 06153  35.0081  23.2713 0007582 276.1822 165.6545 14.57991608603496',
  ];

  const ATLAS_CENTAUR_R_B = [
    '1 06155U 72065B   21233.55065361  .00000089  00000-0  17649-4 0  9997',
    '2 06155  35.0031 264.9408 0037380 149.8655 210.4203 14.71702959596011',
  ];

  const SEASAT_1 = [
    '1 10967U 78064A   21233.29735142 -.00000058  00000-0  23202-4 0  9999',
    '2 10967 107.9993 249.1201 0001668 297.1891  62.9083 14.43892207266866',
  ];

  const METEOR_1_29 = [
    '1 11251U 79005A   21233.60318917  .00001927  00000-0  50054-4 0  9994',
    '2 11251  97.6853 182.3878 0015754  30.1407 330.0742 15.40226794874710',
  ];

  const SL_14_R_B = [
    '1 21423U 91042B   21233.24066887  .00000068  00000-0  59923-5 0  9997',
    '2 21423  82.4967 335.2061 0016170 293.1991  66.7518 14.79837385607224',
  ];

  const METEOR_PRIRODA = [
    '1 12585U 81065A   21232.76175676  .00000660  00000-0  31670-4 0  9999',
    '2 12585  97.5756 229.7480 0015623 106.8731 253.4219 15.22397760188406',
  ];

  const COSMOS_1408 = [
    '1 13552U 82092A   21233.37965610  .00001540  00000-0  53227-4 0  9998',
    '2 13552  82.5667 209.2580 0018928  56.7624 303.5427 15.28937517129718',
  ];

  const COSMOS_1455 = [
    '1 14032U 83037A   21233.37726101  .00000677  00000-0  30711-4 0  9995',
    '2 14032  82.5164  18.0434 0017045  16.1518 344.0256 15.18957662 92664',
  ];

  const COSMOS_1500 = [
    '1 14372U 83099A   21233.42489432  .00000677  00000-0  30287-4 0  9997',
    '2 14372  82.5131 273.1283 0015180 167.1201 193.0425 15.19447697 69033',
  ];

  const COSMOS_1536 = [
    '1 14699U 84013A   21233.12761512  .00000028  00000-0 -55217-7 0  9999',
    '2 14699  82.5258 291.3015 0011475 243.5452 116.4598 15.05867166 21524',
  ];

  const COSMOS_1544 = [
    '1 14819U 84027A   21233.57776405  .00001404  00000-0  48232-4 0  9998',
    '2 14819  82.4817 289.7700 0014401  61.5077 298.7611 15.29141966 48543',
  ];

  const ERBS = [
    '1 15354U 84108B   21233.64787373  .00006099  00000-0  10093-3 0  9995',
    '2 15354  57.0061   1.8502 0011779 131.8498 228.3569 15.53627581 34335',
  ];

  const COSMOS_1626 = [
    '1 15494U 85009A   21233.50395910  .00000791  00000-0  30321-4 0  9998',
    '2 15494  82.4811 159.6196 0003915  95.3233 264.8452 15.25023995   887',
  ];

  const SL_12_R_B_2 = [
    '1 15772U 85042D   21233.63297448 -.00000088  00000-0 -18249-4 0  9991',
    '2 15772  71.1104 354.7090 0035874 193.1144 177.9291 14.21298412878335',
  ];

  const SL_16_R_B = [
    '1 31793U 07029B   21233.52992042 -.00000327  00000-0 -14549-3 0  9995',
    '2 31793  70.9753  62.9184 0002610 281.8579  98.6402 14.14448332730457',
  ];

  const COSMOS_1743 = [
    '1 16719U 86034A   21233.43871660  .00000564  00000-0  27502-4 0  9996',
    '2 16719  82.5519 295.7298 0012782  39.7374 330.7576 15.16143433926572',
  ];

  const AJISAI_EGS = [
    '1 16908U 86061A   21233.62833078 -.00000115  00000-0 -12048-3 0  9990',
    '2 16908  50.0084 160.9606 0011463  19.2383  38.1865 12.44494383261161',
  ];

  const COSMOS_1812 = [
    '1 17295U 87003A   21233.43813892  .00000603  00000-0  29674-4 0  9992',
    '2 17295  82.5118  81.6641 0001938 222.3467 137.7616 15.16112414889826',
  ];

  const COSMOS_1833 = [
    '1 17589U 87027A   21233.39049995 -.00000275  00000-0 -12161-3 0  9993',
    '2 17589  70.9178 217.5254 0021566 197.3940 162.6444 14.12909247775648',
  ];

  const COSMOS_1844 = [
    '1 17973U 87041A   21233.44028544  .00000171  00000-0  11448-3 0  9999',
    '2 17973  70.8978 296.7549 0031178 351.9111   8.1503 14.14118339768701',
  ];

  const COSMOS_1867 = [
    '1 18187U 87060A   21233.57211464 -.00000067  00000-0  12630-4 0  9997',
    '2 18187  65.0097 276.9453 0020787 273.8975  85.9733 14.31125031782198',
  ];

  const COSMOS_1892 = [
    '1 18421U 87088A   21233.48425220  .00000989  00000-0  47231-4 0  9992',
    '2 18421  82.4999 207.7510 0015301  18.6752 341.5040 15.17763401849980',
  ];

  const COSMOS_1933 = [
    '1 18958U 88020A   21233.49741767  .00000754  00000-0  52479-4 0  9992',
    '2 18958  82.5271  70.2510 0012601 123.6579 236.5851 15.03976266799714',
  ];

  const COSMOS_1953 = [
    '1 19210U 88050A   21233.62364869  .00000425  00000-0  26799-4 0  9997',
    '2 19210  82.5203 352.1613 0014239  90.5601 269.7258 15.06351362786413',
  ];

  const COSMOS_1975 = [
    '1 19573U 88093A   21233.57974546 -.00000022  00000-0 -35970-5 0  9996',
    '2 19573  82.5208 307.4521 0015490 133.0634 227.1893 15.05243384768168',
  ];

  const INTERCOSMOS_24 = [
    '1 20261U 89080A   21233.59633120 -.00000097  00000-0 -35873-4 0  9994',
    '2 20261  82.6007 101.9161 1202367 175.1828 186.2192 12.56210096458006',
  ];

  const DELTA_2_R_B_1 = [
    '1 20453U 90008B   21233.46914864  .00001957  00000-0  10822-3 0  9992',
    '2 20453  35.6246 238.4668 0276912 297.5969  59.6880 14.86766114675203',
  ];

  const DELTA_1_R_B = [
    '1 20323U 89089B   21233.47705807  .00000026  00000-0  16071-4 0  9990',
    '2 20323  97.1212 317.6607 0070603 319.3263  40.2673 14.48413305655110',
  ];

  const ARIANE_40_R_B = [
    '1 23561U 95021B   21233.38278679  .00000036  00000-0  26864-4 0  9994',
    '2 23561  98.6696 283.7981 0007930  63.7059 306.9308 14.38040657380367',
  ];

  const COSMOS_2058 = [
    '1 20465U 90010A   21233.38798386  .00000309  00000-0  23708-4 0  9996',
    '2 20465  82.4879 219.5550 0015115 185.3971 174.7092 14.98255014692692',
  ];

  const HST = [
    '1 20580U 90037B   21233.35746556  .00000558  00000-0  22723-4 0  9994',
    '2 20580  28.4710 355.6088 0002870  44.9443 348.0366 15.09708593520812',
  ];

  const COSMOS_2084 = [
    '1 20663U 90055A   21233.28191640  .00000151  00000-0  32082-4 0  9994',
    '2 20663  62.7938 172.8026 0079984  15.8295 344.5271 14.92288217687491',
  ];

  const SL_6_R_B_2 = [
    '1 20666U 90055D   21233.32991182  .00000098  00000-0  26661-4 0  9997',
    '2 20666  62.7842  87.9777 0106222  42.0498 318.8686 14.92541390689456',
  ];

  const OKEAN_3 = [
    '1 21397U 91039A   21233.44639177  .00000231  00000-0  19564-4 0  9991',
    '2 21397  82.5224 127.9212 0017959 165.4692 194.7049 14.93140968616401',
  ];

  const COSMOS_2151 = [
    '1 21422U 91042A   21233.29156619  .00000210  00000-0  18030-4 0  9996',
    '2 21422  82.4983 233.6572 0012811 233.0350 126.9698 14.92284338614910',
  ];

  const ERS_1 = [
    '1 21574U 91050A   21233.35494194  .00000017  00000-0  20338-4 0  9992',
    '2 21574  98.6525 194.2807 0034161  89.0369 271.4731 14.37809921576891',
  ];

  const INTERCOSMOS_25 = [
    '1 21819U 91086A   21233.43827044  .00000565  00000-0  10597-3 0  9999',
    '2 21819  82.5789 228.5998 1517194  75.6367 300.7843 12.05279983296083',
  ];

  const COSMOS_2219 = [
    '1 22219U 92076A   21233.43735493  .00000311  00000-0  18905-3 0  9990',
    '2 22219  71.0579 249.4665 0019449 222.3727 137.5894 14.13666069483571',
  ];

  const COSMOS_2221 = [
    '1 22236U 92080A   21233.46198645  .00000208  00000-0  19934-4 0  9998',
    '2 22236  82.5057  57.2913 0016027 339.3327  20.7240 14.88085974533210',
  ];

  const COSMOS_2228 = [
    '1 22286U 92094A   21233.48513745  .00000213  00000-0  20151-4 0  9991',
    '2 22286  82.5215  14.0193 0022637  92.6863 267.6946 14.88311169528408',
  ];

  const COSMOS_2242 = [
    '1 22626U 93024A   21233.50554499  .00000214  00000-0  20400-4 0  9995',
    '2 22626  82.5207  42.3061 0020435  92.7610 267.5947 14.88161321532790',
  ];

  const COSMOS_2278 = [
    '1 23087U 94023A   21233.48877682 -.00000311  00000-0 -13912-3 0  9995',
    '2 23087  71.0539  48.7891 0007509  30.1654 329.9900 14.13833628409974',
  ];

  const ERS_2 = [
    '1 23560U 95021A   21233.33225622  .00001044  00000-0  46667-4 0  9991',
    '2 23560  98.5417  92.4705 0004226 131.0314 229.1285 15.24123014407571',
  ];

  const ORBVIEW_2_SEASTAR = [
    '1 24883U 97037A   21233.26702467  .00000036  00000-0  29157-4 0  9993',
    '2 24883  98.6490 351.2818 0001198 277.6036  82.5012 14.33628653270290',
  ];

  const ISS_ZARYA = [
    '1 25544U 98067A   21233.72321194  .00005004  00000-0  10063-3 0  9992',
    '2 25544  51.6451  18.6351 0002801 298.4081 168.7057 15.48500216298758',
  ];

  const CZ_4B_R_B = [
    '1 29507U 06046C   21233.35428622  .00001035  00000-0  83936-4 0  9994',
    '2 29507  97.7603 259.1312 0047388 155.2724 205.0786 15.01068111809847',
  ];

  const OKEAN_O = [
    '1 25860U 99039A   21233.37478525  .00000065  00000-0  16815-4 0  9999',
    '2 25860  98.1793 264.9977 0000882  76.5269 283.6039 14.76753702188962',
  ];

  const DELTA_2_R_B = [
    '1 25876U 99041E   21233.51732472  .00000141  00000-0  64652-4 0  9996',
    '2 25876  51.7648  52.3581 0531651 158.4605 203.9628 14.04606517129090',
  ];

  const HELIOS_1B = [
    '1 25977U 99064A   21233.49026169  .00000049  00000-0  13237-4 0  9999',
    '2 25977  98.3207  50.5829 0002293  65.2559 294.8891 14.82575044438835',
  ];

  const TERRA = [
    '1 25994U 99068A   21233.46202812  .00000058  00000-0  22794-4 0  9998',
    '2 25994  98.1726 306.6845 0001408  99.6413 317.3415 14.57132018152814',
  ];

  const MTI = [
    '1 26102U 00014A   21233.01657572  .00012276  00000-0  13906-3 0  9990',
    '2 26102  97.4602 143.0541 0008172  81.2772 278.9447 15.62521668191424',
  ];

  const TITAN_4B_R_B = [
    '1 26474U 00047B   21233.53388704  .00000132  00000-0  22295-4 0  9993',
    '2 26474  67.9951 331.6581 0051074  84.0104 276.6856 14.96200664143571',
  ];

  const ENVISAT = [
    '1 27386U 02009A   21233.45650476  .00000016  00000-0  18639-4 0  9993',
    '2 27386  98.1527 224.2055 0001387  86.3109  86.6318 14.38038063 20343',
  ];

  const IDEFIX_ARIANE_42P_R_B = [
    '1 27422U 02021B   21233.35113562 -.00000009  00000-0  12924-4 0  9991',
    '2 27422  98.4064 184.0563 0013201  45.4765 314.7494 14.29327669  6585',
  ];

  const AQUA = [
    '1 27424U 02022A   21233.57479937  .00000091  00000-0  30153-4 0  9993',
    '2 27424  98.2114 173.9743 0002371  82.3497  90.9247 14.57116269 26513',
  ];

  const MIDORI_II_ADEOS_II = [
    '1 27597U 02056A   21233.28010796  .00000007  00000-0  20483-4 0  9995',
    '2 27597  98.5671 177.3079 0001568 121.6280 238.5054 14.27511929973133',
  ];

  const H_2A_R_B = [
    '1 38341U 12025E   21233.24603818  .00000136  00000-0  23602-4 0  9999',
    '2 38341  98.5282  63.1692 0054158 291.9974  67.5489 14.84257571501117',
  ];

  const CZ_2C_R_B = [
    '1 43521U 18054D   21233.53789646  .00000452  00000-0  26161-4 0  9993',
    '2 43521  35.1547  48.2650 0082329 312.5063  46.8718 15.11628530174256',
  ];

  const ARIANE_5_R_B = [
    '1 28499U 04049H   21233.26506325  .00000034  00000-0  11733-4 0  9995',
    '2 28499  98.0750 342.8631 0091160 325.0024  57.0542 14.80143889899671',
  ];

  const CZ_2D_R_B = [
    '1 28738U 05024B   21233.34562101  .00000523  00000-0  33581-4 0  9996',
    '2 28738  97.3603 247.0794 0013043 131.9747 228.2598 15.12500017886374',
  ];

  const SUZAKU_ASTRO_EII = [
    '1 28773U 05025A   21233.31425604  .00001399  00000-0  61749-4 0  9998',
    '2 28773  31.3814  99.5548 0004590 220.3825 139.6482 15.18577184889330',
  ];

  const ALOS_DAICHI = [
    '1 28931U 06002A   21233.40085746  .00000109  00000-0  29983-4 0  9991',
    '2 28931  97.8914 205.3156 0001377 103.1419 256.9934 14.62869216830556',
  ];

  const AKARI_ASTRO_F = [
    '1 28939U 06005A   21233.40033957  .00002811  00000-0  70224-4 0  9995',
    '2 28939  98.2401 264.6233 0084313 256.4422 102.7417 15.37649797846881',
  ];

  const RESURS_DK_1 = [
    '1 29228U 06021A   21233.24971688  .00000127  00000-0  16805-4 0  9992',
    '2 29228  69.9357 173.7040 0004695 201.8629 158.2332 15.02731683837275',
  ];

  const GENESIS_1 = [
    '1 29252U 06029A   21233.54705355  .00000655  00000-0  40574-4 0  9992',
    '2 29252  64.5232 334.1860 0050017 309.2111  50.4576 15.18794140833404',
  ];

  const COSMO_SKYMED_1 = [
    '1 31598U 07023A   21233.45245434 -.00001790  00000-0 -21845-3 0  9992',
    '2 31598  97.8915  56.4231 0001405  83.7733 276.3653 14.82144897768527',
  ];

  const GENESIS_2 = [
    '1 31789U 07028A   21233.41927398  .00000373  00000-0  28344-4 0  9997',
    '2 31789  64.4970  17.1413 0008526  19.9190 340.2264 15.17864577780341',
  ];

  const COSMOS_2428 = [
    '1 31792U 07029A   21233.35435848  .00000335  00000-0  20786-3 0  9998',
    '2 31792  70.9082  89.6285 0007361 159.2424 200.8997 14.12334230729479',
  ];

  const KORONAS_FOTON = [
    '1 33504U 09003A   21233.50147365  .00000265  00000-0  12083-4 0  9990',
    '2 33504  82.4439 154.7892 0017550 227.5845 132.3904 15.16075728692500',
  ];

  const CUSAT_2_FALCON_9_R_B = [
    '1 39271U 13055G   21233.50528240  .00007112  00000-0  16610-3 0  9991',
    '2 39271  80.9669 162.5469 0563839 311.9192  43.5198 14.53900996413087',
  ];

  const SL_4_R_B = [
    '1 47547U 21008B   21233.33663534  .00045969  53889-5  15764-3 0  9999',
    '2 47547  67.1368 200.8705 0366621 264.8801  91.0421 15.30496479 30261',
  ];

  const ALOS_2 = [
    '1 39766U 14029A   21233.52080178  .00000172  00000-0  29952-4 0  9990',
    '2 39766  97.9221 329.9510 0001524  90.6708 269.4684 14.79473473391285',
  ];

  const SL_27_R_B = [
    '1 40354U 14084B   21233.52539194  .00001110  00000-0  27339-4 0  9993',
    '2 40354  74.7361 217.6772 0036834 192.0253 168.0085 15.41274155374360',
  ];

  const YAOGAN_29 = [
    '1 41038U 15069A   21233.55991227  .00000040  00000-0  12136-4 0  9999',
    '2 41038  98.0410 227.7097 0000956  50.5694 309.5604 14.80518555309914',
  ];

  const ASTRO_H_HITOMI = [
    '1 41337U 16012A   21233.49601125  .00000312  00000-0  18295-4 0  9992',
    '2 41337  31.0043 162.7247 0012233   0.9137 359.1519 14.98875608302072',
  ];

  const HXMT_HUIYAN = [
    '1 42758U 17034A   21233.38022969  .00000214  00000-0  26750-4 0  9992',
    '2 42758  43.0160 196.7229 0008762 214.7681 279.7007 15.09267914230821',
  ];

  const AEOLUS = [
    '1 43600U 18066A   21233.44593185  .00037228  00000-0  14557-3 0  9991',
    '2 43600  96.7146 239.2626 0006134  80.2182 279.9784 15.86914218173555',
  ];

  const SAOCOM_1A = [
    '1 43641U 18076A   21233.46086442  .00000033  00000-0  10689-4 0  9999',
    '2 43641  97.8886  59.4550 0001502  77.7900 282.3486 14.82154192155294',
  ];

  const SAOCOM_1B = [
    '1 46265U 20059A   21233.49204042  .00000021  00000-0  91674-5 0  9990',
    '2 46265  97.8896  58.5449 0001474  80.6839 279.4546 14.82153333 52699',
  ];

  const SAT_2020_063G = [
    '1 46395U 20063G   21233.58545718  .00033514  11489-4  11044-3 0  9998',
    '2 46395  50.2029 341.1861 0006993  20.8493 339.2777 15.91584546 55640',
  ];

  const TIANHE = [
    '1 48274U 21035A   21233.76853679  .00005326  00000-0  60560-4 0  9995',
    '2 48274  41.4696 242.8915 0006270  65.3362 104.2579 15.63063156 17954',
  ];

  new Satellite(universe, 'crypto0', ATLAS_CENTAUR_2[0], ATLAS_CENTAUR_2[1]);
  new Satellite(universe, 'crypto1', THOR_AGENA_D_R_B[0], THOR_AGENA_D_R_B[1]);
  new Satellite(universe, 'crypto2', SL_3_R_B[0], SL_3_R_B[1]);
  new Satellite(universe, 'crypto3', SL_8_R_B[0], SL_8_R_B[1]);
  new Satellite(universe, 'crypto4', OAO_2[0], OAO_2[1]);
  new Satellite(universe, 'crypto5', ISIS_1[0], ISIS_1[1]);
  new Satellite(universe, 'crypto6', SERT_2[0], SERT_2[1]);
  new Satellite(universe, 'crypto7', ASTEX_1[0], ASTEX_1[1]);
  new Satellite(universe, 'crypto8', COSMOS_482_DESCENT_CRAFT[0], COSMOS_482_DESCENT_CRAFT[1]);
  new Satellite(universe, 'crypto9', OAO_3_COPERNICUS[0], OAO_3_COPERNICUS[1]);
  new Satellite(universe, 'crypto10', ATLAS_CENTAUR_R_B[0], ATLAS_CENTAUR_R_B[1]);
  new Satellite(universe, 'crypto11', SEASAT_1[0], SEASAT_1[1]);
  new Satellite(universe, 'crypto12', METEOR_1_29[0], METEOR_1_29[1]);
  new Satellite(universe, 'crypto13', SL_14_R_B[0], SL_14_R_B[1]);
  new Satellite(universe, 'crypto14', METEOR_PRIRODA[0], METEOR_PRIRODA[1]);
  new Satellite(universe, 'crypto15', COSMOS_1408[0], COSMOS_1408[1]);
  new Satellite(universe, 'crypto16', COSMOS_1455[0], COSMOS_1455[1]);
  new Satellite(universe, 'crypto17', COSMOS_1500[0], COSMOS_1500[1]);
  new Satellite(universe, 'crypto18', COSMOS_1536[0], COSMOS_1536[1]);
  new Satellite(universe, 'crypto19', COSMOS_1544[0], COSMOS_1544[1]);
  new Satellite(universe, 'crypto20', ERBS[0], ERBS[1]);
  new Satellite(universe, 'crypto21', COSMOS_1626[0], COSMOS_1626[1]);
  new Satellite(universe, 'crypto22', SL_12_R_B_2[0], SL_12_R_B_2[1]);
  new Satellite(universe, 'crypto23', SL_16_R_B[0], SL_16_R_B[1]);
  new Satellite(universe, 'crypto24', COSMOS_1743[0], COSMOS_1743[1]);
  new Satellite(universe, 'crypto25', AJISAI_EGS[0], AJISAI_EGS[1]);
  new Satellite(universe, 'crypto26', COSMOS_1812[0], COSMOS_1812[1]);
  new Satellite(universe, 'crypto27', COSMOS_1833[0], COSMOS_1833[1]);
  new Satellite(universe, 'crypto28', COSMOS_1844[0], COSMOS_1844[1]);
  new Satellite(universe, 'crypto29', COSMOS_1867[0], COSMOS_1867[1]);
  new Satellite(universe, 'crypto30', COSMOS_1892[0], COSMOS_1892[1]);
  new Satellite(universe, 'crypto31', COSMOS_1933[0], COSMOS_1933[1]);
  new Satellite(universe, 'crypto32', COSMOS_1953[0], COSMOS_1953[1]);
  new Satellite(universe, 'crypto33', COSMOS_1975[0], COSMOS_1975[1]);
  new Satellite(universe, 'crypto34', INTERCOSMOS_24[0], INTERCOSMOS_24[1]);
  new Satellite(universe, 'crypto35', DELTA_2_R_B_1[0], DELTA_2_R_B_1[1]);
  new Satellite(universe, 'crypto36', DELTA_1_R_B[0], DELTA_1_R_B[1]);
  new Satellite(universe, 'crypto37', ARIANE_40_R_B[0], ARIANE_40_R_B[1]);
  new Satellite(universe, 'crypto38', COSMOS_2058[0], COSMOS_2058[1]);
  new Satellite(universe, 'crypto39', HST[0], HST[1]);
  new Satellite(universe, 'crypto40', COSMOS_2084[0], COSMOS_2084[1]);
  new Satellite(universe, 'crypto41', SL_6_R_B_2[0], SL_6_R_B_2[1]);
  new Satellite(universe, 'crypto42', OKEAN_3[0], OKEAN_3[1]);
  new Satellite(universe, 'crypto43', COSMOS_2151[0], COSMOS_2151[1]);
  new Satellite(universe, 'crypto44', ERS_1[0], ERS_1[1]);
  new Satellite(universe, 'crypto45', INTERCOSMOS_25[0], INTERCOSMOS_25[1]);
  new Satellite(universe, 'crypto46', COSMOS_2219[0], COSMOS_2219[1]);
  new Satellite(universe, 'crypto47', COSMOS_2221[0], COSMOS_2221[1]);
  new Satellite(universe, 'crypto48', COSMOS_2228[0], COSMOS_2228[1]);
  new Satellite(universe, 'crypto49', COSMOS_2242[0], COSMOS_2242[1]);
  new Satellite(universe, 'crypto50', COSMOS_2278[0], COSMOS_2278[1]);
  new Satellite(universe, 'crypto51', ERS_2[0], ERS_2[1]);
  new Satellite(universe, 'crypto52', ORBVIEW_2_SEASTAR[0], ORBVIEW_2_SEASTAR[1]);
  new Satellite(universe, 'crypto53', ISS_ZARYA[0], ISS_ZARYA[1]);
  new Satellite(universe, 'crypto54', CZ_4B_R_B[0], CZ_4B_R_B[1]);
  new Satellite(universe, 'crypto55', OKEAN_O[0], OKEAN_O[1]);
  new Satellite(universe, 'crypto56', DELTA_2_R_B[0], DELTA_2_R_B[1]);
  new Satellite(universe, 'crypto57', HELIOS_1B[0], HELIOS_1B[1]);
  new Satellite(universe, 'crypto58', TERRA[0], TERRA[1]);
  new Satellite(universe, 'crypto59', MTI[0], MTI[1]);
  new Satellite(universe, 'crypto60', TITAN_4B_R_B[0], TITAN_4B_R_B[1]);
  new Satellite(universe, 'crypto61', ENVISAT[0], ENVISAT[1]);
  new Satellite(universe, 'crypto62', IDEFIX_ARIANE_42P_R_B[0], IDEFIX_ARIANE_42P_R_B[1]);
  new Satellite(universe, 'crypto63', AQUA[0], AQUA[1]);
  new Satellite(universe, 'crypto64', MIDORI_II_ADEOS_II[0], MIDORI_II_ADEOS_II[1]);
  new Satellite(universe, 'crypto65', H_2A_R_B[0], H_2A_R_B[1]);
  new Satellite(universe, 'crypto66', CZ_2C_R_B[0], CZ_2C_R_B[1]);
  new Satellite(universe, 'crypto67', ARIANE_5_R_B[0], ARIANE_5_R_B[1]);
  new Satellite(universe, 'crypto68', CZ_2D_R_B[0], CZ_2D_R_B[1]);
  new Satellite(universe, 'crypto69', SUZAKU_ASTRO_EII[0], SUZAKU_ASTRO_EII[1]);
  new Satellite(universe, 'crypto70', ALOS_DAICHI[0], ALOS_DAICHI[1]);
  new Satellite(universe, 'crypto71', AKARI_ASTRO_F[0], AKARI_ASTRO_F[1]);
  new Satellite(universe, 'crypto72', RESURS_DK_1[0], RESURS_DK_1[1]);
  new Satellite(universe, 'crypto73', GENESIS_1[0], GENESIS_1[1]);
  new Satellite(universe, 'crypto74', COSMO_SKYMED_1[0], COSMO_SKYMED_1[1]);
  new Satellite(universe, 'crypto75', GENESIS_2[0], GENESIS_2[1]);
  new Satellite(universe, 'crypto76', COSMOS_2428[0], COSMOS_2428[1]);
  new Satellite(universe, 'crypto77', KORONAS_FOTON[0], KORONAS_FOTON[1]);
  new Satellite(universe, 'crypto78', CUSAT_2_FALCON_9_R_B[0], CUSAT_2_FALCON_9_R_B[1]);
  new Satellite(universe, 'crypto79', SL_4_R_B[0], SL_4_R_B[1]);
  new Satellite(universe, 'crypto80', ALOS_2[0], ALOS_2[1]);
  new Satellite(universe, 'crypto81', SL_27_R_B[0], SL_27_R_B[1]);
  new Satellite(universe, 'crypto82', YAOGAN_29[0], YAOGAN_29[1]);
  new Satellite(universe, 'crypto83', ASTRO_H_HITOMI[0], ASTRO_H_HITOMI[1]);
  new Satellite(universe, 'crypto84', HXMT_HUIYAN[0], HXMT_HUIYAN[1]);
  new Satellite(universe, 'crypto85', AEOLUS[0], AEOLUS[1]);
  new Satellite(universe, 'crypto86', SAOCOM_1A[0], SAOCOM_1A[1]);
  new Satellite(universe, 'crypto87', SAOCOM_1B[0], SAOCOM_1B[1]);
  new Satellite(universe, 'crypto88', SAT_2020_063G[0], SAT_2020_063G[1]);
  new Satellite(universe, 'crypto89', TIANHE[0], TIANHE[1]);

  const gsnetwork = GroundStationNetwork.load(
      universe, require('@cryptosat/cryptosim/data/rbcNetwork'));

  return {
    universe: universe,
    gsnetwork: gsnetwork,
  }

}

export default MultiSatDemo;
