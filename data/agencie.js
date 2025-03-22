const agencies = [
    //tunis 1
    { id: '1', name: 'Poste Bab Fella', latitude: 36.79088, longitude: 10.17843, region: 'Tunis', delegation: 'Bab Fella' },
    { id: '2', name: 'Poste Bab Saadoun Gare', latitude:  36.81064, longitude: 10.15358, region: 'Tunis', delegation: 	'Bab Saadoun Gare' },
    { id: '3', name: 'Poste BAD', latitude: 36.80679, longitude: 10.18404, region: 'Tunis', delegation: 'BAD ' },
    { id: '4', name: 'Poste Bardo', latitude: 36.80911, longitude: 10.13655, region: 'Tunis', delegation: ' Bardo' },
    { id: '5', name: 'Poste Carthage', latitude: 36.85252, longitude: 10.33137, region: 'Tunis', delegation: 'Carthage' },
   
       //ben arous 2
       { id: '6', name: 'Poste Ben Arous', latitude: 36.743500 , longitude: 10.22166, region: 'Ben Arous', delegation: 'Ben Arous' },
       { id: '7', name: 'Poste Ben Arous Sud', latitude: 36.75452000 , longitude: 10.22167000, region: 'Ben Arous', delegation: 'Ben Arous Sud' },
       { id: '8', name: 'Poste Bir El Bey', latitude: 36.7118744 , longitude: 10.380671, region: 'Ben Arous', delegation: 'Bir El Bey' },
       { id: '9', name: 'Poste Bir El Kassaa', latitude: 36.726822 , longitude: 10.216580, region: 'Ben Arous', delegation: 'Bir El Kassaa' },
       { id: '10', name: 'Poste Borj Cedria', latitude: 36.69491 , longitude: 10.38643, region: 'Ben Arous', delegation: ' Borj Cedria' },
       
    //ariana 3
    { id: '11', name: 'Poste Ariana', latitude:  36.883741, longitude:  10.205285, region: 'Ariana', delegation: 'Ariana' },
    { id: '12', name: 'Poste Borj El Baccouch', latitude: 36.854795, longitude:  10.199543, region: 'Ariana', delegation: 'Borj El Baccouch' },
    { id: '13', name: 'Poste Borj Louzir', latitude: 36.865935, longitude: 10.211977, region: 'Ariana', delegation: 'Borj Louzir' },
    { id: '14', name: 'Poste Borj Touil', latitude:  36.839563, longitude: 10.122953, region: 'Ariana', delegation: 	'Borj Touil' },
    { id: '15', name: 'Poste Cebelet Ben Ammar', latitude: 35.417424, longitude: 0.895629, region: 'Ariana', delegation: 'Cebelet Ben Ammar ' },
  
    //beja 4
    { id: '16', name: 'Poste Aïn Tounga', latitude:  36.5333, longitude:  9.36667, region: 'Beja', delegation: 'Aïn Tounga' },
    { id: '17', name: 'Poste Beja', latitude: 36.69424, longitude: 9.21141, region: 'Beja', delegation: 'Beja' },
    { id: '18', name: 'Poste Chouach', latitude:  36.10558, longitude: 10.04837, region: 'Beja', delegation: 	'Chouach' },
    { id: '19', name: 'Poste Dougga', latitude: 36.461600, longitude: 9.243500, region: 'Beja', delegation: ' Dougga' },
    { id: '20', name: 'Poste El Ksar', latitude: 34.39743, longitude:  8.80271, region: 'Beja', delegation: 'El Ksar' },
    
    // sousse 5
    { id: '21', name: 'Poste Aïn Mdhaker', latitude: 36.2022, longitude: 10.2783, region: 'Sousse', delegation: '	Aïn Mdhaker' },
    { id: '22', name: 'Poste Aîn Rahma', latitude: 35.6246337, longitude:  10.3919059, region: 'Sousse', delegation: '	Aîn Rahma' },
    { id: '23', name: 'Poste Akouda', latitude:  35.86535, longitude:10.56813, region: 'Sousse', delegation: 'Akouda' },
    { id: '24', name: 'Poste Aouled Amer', latitude:  34.6828, longitude:  10.685, region: 'Sousse', delegation: 	'	Aouled Amer' },
    { id: '25', name: 'Poste Béni Kalthoum', latitude:  35.7009, longitude: 10.58909, region: 'Sousse', delegation: '	Béni Kalthoum' },

    //monastir 6
    { id: '26', name: 'Poste Amiret Fhoul', latitude: 35.4441, longitude: 10.8268, region: 'Monastir', delegation: '	Amiret Fhoul' },
    { id: '27', name: 'Poste Amiret Hajjej', latitude: 35.4975, longitude:  10.7619, region: 'Monastir', delegation: '	Amiret Hajjej' },
    { id: '28', name: 'Poste Amiret Hatem', latitude:  35.687809, longitude:10.756010, region: 'Monastir', delegation: 'Amiret Hatem' },
    { id: '29', name: 'Poste Chrahil', latitude:  35.50777, longitude:  10.85247, region: 'Monastir', delegation: 	'	Chrahil' },
    { id: '30', name: 'Poste Bekalta', latitude:  35.617254, longitude: 10.989731, region: 'Monastir', delegation: '	Bekalta' },
    
    //mahdia 7
    { id: '31', name: 'Poste Al Bradaa', latitude: 35.34785, longitude: 10.98967, region: 'Mahdia', delegation: 'Al Bradaa' },
    { id: '32', name: 'Poste El Jem Souk', latitude: 35.39006, longitude:  10.65999, region: 'Mahdia', delegation: 'El Jem Souk' },
    { id: '33', name: 'Poste Bouhlel sud', latitude:  35.4058, longitude:10.67278, region: 'Mahdia', delegation: 'Bouhlel sud' },
    { id: '34', name: 'Poste Essaad',latitude:  35.4686, longitude:  10.9341, region: 'Mahdia', delegation: 	'Essaad	' },
    { id: '35', name: 'Poste El Jem', latitude:  35.39006, longitude: 10.65999, region: 'Mahdia', delegation: '	El Jem' },
 
    //jendouba 8
    { id: '36', name: 'Poste 	Aïn Draham', latitude: 36.77364499999999, longitude: 8.6848147, region: 'Jendouba', delegation: '	Aïn Draham' },
    { id: '37', name: 'Poste Ben Bechir', latitude: 36.5706, longitude:  8.8575, region: 'Jendouba', delegation: 'Ben Bechir' },
    { id: '38', name: 'Poste Beni Mtir', latitude:36.73946 , longitude:8.73351, region: 'Jendouba', delegation: 'Beni Mtir' },
    { id: '39', name: 'Poste Bou Salem', latitude:  36.6103092, longitude:  8.9742237, region: 'Jendouba', delegation: 	'	Bou Salem' },
    { id: '40', name: 'Poste Brirem', latitude:  36.84793, longitude: 8.89961, region: 'Jendouba', delegation: 'Brirem' },

    //kef 9
    { id: '41', name: 'Poste Borj Elaifa', latitude: 36.21813, longitude: 8.85154, region: 'Kef', delegation: 'Borj Elaifa' },
    { id: '42', name: 'Poste Barnoussa', latitude: 36.15754, longitude: 8.6913, region: 'Kef', delegation: 'Barnoussa' },
    { id: '43', name: 'Poste Dahmani', latitude:  35.940193, longitude:8.840769, region: 'Kef', delegation: 'Dahmani' },
    { id: '44', name: 'Poste El Ksour',latitude:  35.89429, longitude:  8.88345, region: 'Kef', delegation: 	'El Ksour	' },
    { id: '45', name: 'Poste Essakia', latitude:  36.23443, longitude: 8.53128, region: 'Kef', delegation: 'Essakia' },

    //siliana 10
    { id: '46', name: 'Poste Aïn Zrig', latitude: 35.89528, longitude: 9.43909, region: 'Siliana', delegation: 'Aïn Zrig' },
    { id: '47', name: 'Poste Aroussa', latitude:36.37867, longitude:  9.45064, region: 'Siliana', delegation: 'Aroussa' },
    { id: '48', name: 'Poste Bargou', latitude:36.09211 , longitude:9.56728, region: 'Siliana', delegation: 'Bargou' },
    { id: '49', name: 'Poste Borj Messaoudi', latitude:  36.28989, longitude:  9.06145, region: 'Siliana', delegation: 	'Borj Messaoudi' },
    { id: '50', name: 'Poste Boujlida', latitude:  36.41244, longitude: 9.50413, region: 'Siliana', delegation: 'Boujlida' },

    //Bizerte 11
    { id: '51', name: 'Poste Aïn Ghalel', latitude: 37.02978, longitude: 9.87054, region: 'Bizerte', delegation: 'Aïn Ghalel' },
    { id: '52', name: 'Poste Bach Hamba', latitude: 37.237320, longitude: 10.023410, region: 'Bizerte', delegation: 'Bach Hamba' },
    { id: '53', name: 'Poste Bazina', latitude:  36.96624, longitude:9.30116, region: 'Bizerte', delegation: 'Bazina' },
    { id: '54', name: 'Poste Beni Ataa',latitude:  37.23042, longitude:  10.07961, region: 'Bizerte', delegation: 	' Beni Ataa' },
    { id: '55', name: 'Poste Bizerte', latitude:  37.274612, longitude: 9.862724, region: 'Bizerte', delegation: 'Bizerte' },

    //Gabes 12
    { id: '56', name: 'Poste Aïn Tounine', latitude: 33.4957, longitude: 10.1315, region: 'Gabes', delegation: 'Aïn Tounine' },
    { id: '57', name: 'Poste Arram', latitude:33.5842, longitude: 10.3186, region: 'Gabes', delegation: 'Arram' },
    { id: '58', name: 'Poste Ayoun Zorkine', latitude:33.6657 , longitude:10.2048, region: 'Gabes', delegation: 'Ayoun Zorkine' },
    { id: '59', name: 'Poste Ben Ghilouf', latitude:  33.88114, longitude: 9.61916, region: 'Gabes', delegation: 	'Ben Ghilouf' },
    { id: '60', name: 'Poste Bou Attouch', latitude:  33.89927000, longitude: 9.78496000, region: 'Gabes', delegation: 'Bou Attouch' },

    //Gafsa 13
    { id: '61', name: 'Poste Alim', latitude: 34.64424, longitude: 9.15698, region: 'Gafsa', delegation: 'Alim' },
    { id: '62', name: 'Poste Ayaicha', latitude: 34.24734, longitude: 9.24803, region: 'Gafsa', delegation: 'Ayaicha' },
    { id: '63', name: 'Poste Belkhir', latitude:  34.27414, longitude:9.39038, region: 'Gafsa', delegation: 'Belkhir' },
    { id: '64', name: 'Poste Cité Essourour',latitude: 34.74942, longitude:  10.76642, region: 'Gafsa', delegation: 	' Cité Essourour' },
    { id: '65', name: 'Poste Douali Gafsa', latitude: 34.431140, longitude: 8.775656, region: 'Gafsa', delegation: 'Douali Gafsa' },

    //Kairouan 14
    { id: '66', name: 'Poste Ain Boumourra', latitude: 35.9664, longitude:9.9512, region: 'Kairouan', delegation: 'Ain Boumourra' },
    { id: '67', name: 'Poste Aïn El Khazzazia', latitude:35.558231, longitude: 10.239000, region: 'Kairouan', delegation: 'Aïn El Khazzazia' },
    { id: '68', name: 'Poste Aïn Jelloula', latitude:35.79936 , longitude:9.80566, region: 'Kairouan', delegation: 'Aïn Jelloula' },
    { id: '69', name: 'Poste Ben Salem', latitude:  35.5832, longitude:9.9064, region: 'Kairouan', delegation: 	'Ben Salem' },
    { id: '70', name: 'Poste Bouhajla', latitude: 35.253056, longitude:10.013889, region: 'Kairouan', delegation: 'Bouhajla' },

    //Kasserine 15
    { id: '71', name: 'Poste Aïn Hmadna', latitude: 35.53003, longitude: 9.01909, region: 'Kasserine', delegation: 'Aïn Hmadna' },
    { id: '72', name: 'Poste Barrouka', latitude: 34.65695, longitude: 8.57864, region: 'Kasserine', delegation: 'Barrouka' },
    { id: '73', name: 'Poste Bou Lahnech', latitude:  35.738091, longitude:8.736970, region: 'Kasserine', delegation: 'Bou Lahnech' },
    { id: '74', name: 'Poste Bou Zgam',latitude: 35.21380, longitude:  8.92428, region: 'Kasserine', delegation: 	' Bou Zgam' },
    { id: '75', name: 'Poste Bouchebka', latitude: 35.17245, longitude:8.41871, region: 'Kasserine', delegation: 'Bouchebka' },

    //Kebeli 16
    { id: '76', name: 'Poste Bazma', latitude: 33.684139, longitude:9.070820, region: 'Kebeli', delegation: 'Bazma' },
    { id: '77', name: 'Poste Bechri', latitude:33.79414, longitude: 8.77319, region: 'Kebeli', delegation: 'Bechri' },
    { id: '78', name: 'Poste Blidet', latitude:33.5780017 , longitude:8.8390320999, region: 'Kebeli', delegation: 'Blidet' },
    { id: '79', name: 'Poste Douz', latitude:  33.456535, longitude:9.038601, region: 'Kebeli', delegation: 	'Douz' },
    { id: '80', name: 'Poste Elfaouar', latitude: 33.35663, longitude:8.67214, region: 'Kebeli', delegation: 'Elfaouar' },

    //Medenine 17
    { id: '81', name: 'Poste Ajim', latitude: 33.723600, longitude: 10.748800, region: 'Medenine', delegation: 'Ajim' },
    { id: '82', name: 'Poste Aouled Amor', latitude: 33.83075, longitude: 10.82026, region: 'Medenine', delegation: 'Aouled Amor' },
    { id: '83', name: 'Poste Arkou', latitude:  33.77468, longitude:11.00036, region: 'Medenine', delegation: 'Arkou' },
    { id: '84', name: 'Poste Benguerdane',latitude: 33.13877, longitude:  11.21865, region: 'Medenine', delegation: 	' Benguerdane' },
    { id: '85', name: 'Poste Benguerdane 7 Mars', latitude: 33.13877, longitude:11.21865, region: 'Medenine', delegation: 'Benguerdane 7 Mars' },

    //Nabeul 18
    { id: '86', name: 'Poste Aïn Tbornek', latitude: 36.5328, longitude:10.4561, region: 'Nabeul', delegation: 'Aïn Tbornek' },
    { id: '87', name: 'Poste Beli', latitude:36.56764, longitude: 10.55459, region: 'Nabeul', delegation: 'Beli' },
    { id: '88', name: 'Poste Bir Bou Ragba', latitude:36.43069 , longitude:10.5684, region: 'Nabeul', delegation: 'Bir Bou Ragba' },
    { id: '89', name: 'Poste Bir Mroua', latitude:  36.79288, longitude:10.62481, region: 'Nabeul', delegation: 	'Bir Mroua' },
    { id: '90', name: 'Poste Bni Khalled', latitude: 36.64871, longitude:10.59014, region: 'Nabeul', delegation: 'Bni Khalled' },

    //sfax 19
    { id: '91', name: 'Poste Agareb', latitude: 34.74232, longitude: 10.52722, region: 'sfax', delegation: 'Agareb' },
    { id: '92', name: 'Poste Bab Jebli', latitude: 34.7386, longitude:10.75913, region: 'sfax', delegation: 'Bab Jebli' },
    { id: '93', name: 'Poste Bir Ali Ben Khalifa', latitude:  34.73616, longitude:10.09324, region: 'sfax', delegation: 'Bir Ali Ben Khalifa' },
    { id: '94', name: 'Poste Bir Salah',latitude: 35.2127, longitude: 10.71045, region: 'sfax', delegation: 	' Bir Salah' },
    { id: '95', name: 'Poste Bou Thedi', latitude: 35.09903, longitude:10.26929, region: 'sfax', delegation: 'Bou Thedi' }, 

    //Sidi Bouzid 20
    { id: '96', name: 'Poste Ben Aoun', latitude: 34.88213, longitude:9.17833, region: 'Sidi Bouzid', delegation: 'Ben Aoun' },
    { id: '97', name: 'Poste Bir El Heffey', latitude:34.88213, longitude: 9.17833, region: 'Sidi Bouzid', delegation: 'Bir El Heffey' },
    { id: '98', name: 'Poste Borj El Karma', latitude:34.51743 , longitude:9.77055, region: 'Sidi Bouzid', delegation: 'Borj El Karma' },
    { id: '99', name: 'Poste Dhouibet', latitude:  35.09099, longitude:9.9408 , region: 'Sidi Bouzid', delegation: 	'Dhouibet' },
    { id: '100', name: 'Poste El Hichria', latitude: 34.8742, longitude:9.4351, region: 'Sidi Bouzid', delegation: 'El Hichria' },

    //Tataouine 21
    { id: '101', name: 'Poste Beni Mhira', latitude: 32.86373, longitude: 10.81678, region: 'Tataouine', delegation: 'Beni Mhira' },
    { id: '102', name: 'Poste Bir Lahmar', latitude: 33.17907, longitude:10.44169, region: 'Tataouine', delegation: 'Bir Lahmar' },
    { id: '103', name: 'Poste Bir Thalathine', latitude: 32.7101, longitude:10.3564, region: 'Tataouine', delegation: 'Bir Thalathine' },
    { id: '104', name: 'Poste Bni Barka',latitude: 32.89033, longitude: 10.44293, region: 'Tataouine', delegation: 	' Bni Barka' },
    { id: '105', name: 'Poste Chenini', latitude: 32.91501, longitude:10.27884, region: 'Tataouine', delegation: 'Chenini' },

    //Tozeur 22
    { id: '106', name: 'Poste BAin El Karma Tozeur', latitude: 34.4384, longitude:8.0519, region: 'Sidi Bouzid', delegation: 'BAin El Karma Tozeur' },
    { id: '107', name: 'Poste Ben Farjallah', latitude:33.90977, longitude:8.01205, region: 'Sidi Bouzid', delegation: 'Ben Farjallah' },
    { id: '108', name: 'Poste Bled El Hadar', latitude:33.9167 , longitude:8.13333, region: 'Sidi Bouzid', delegation: 'Bled El Hadar' },
    { id: '109', name: 'Poste Degache', latitude:  33.99719, longitude:8.16842 , region: 'Sidi Bouzid', delegation: 	'Degache' },
    { id: '110', name: 'Poste El Hamma de Jerid', latitude: 33.9990623, longitude:8.1611703, region: 'Sidi Bouzid', delegation: 'El Hamma de Jerid' },

    //Zaghouan 23
    { id: '111', name: 'Poste Ain Asker', latitude: 36.5739, longitude: 9.9935, region: 'Zaghouan', delegation: 'Ain Asker' },
    { id: '112', name: 'Poste Aïn Battoum', latitude: 36.05264, longitude:9.9947, region: 'Zaghouan', delegation: 'Aïn Battoum' },
    { id: '113', name: 'Poste Bir Chaouech', latitude:36.106, longitude:10.0481, region: 'Zaghouan', delegation: 'Bir Chaouech' },
    { id: '114', name: 'Poste Bir Hlima',latitude: 36.39636, longitude: 10.04441, region: 'Zaghouan', delegation: 	' Bir Hlima' },
    { id: '115', name: 'Poste Bir Mchergua', latitude: 36.46321, longitude:10.05652, region: 'Zaghouan', delegation: 'Bir Mchergua' },

    //Manouba 24
    { id: '116', name: 'Poste Borj El Amri', latitude: 36.71297, longitude:9.88303, region: 'Manouba', delegation: 'Borj El Amri' },
    { id: '117', name: 'Poste Borj Etoumi', latitude:36.75463, longitude:9.71876, region: 'Manouba', delegation: 'Borj Etoumi' },
    { id: '118', name: 'Poste Douar Hicher', latitude:36.827741 , longitude:10.0891256, region: 'Manouba', delegation: 'Douar Hicher' },
    { id: '119', name: 'Poste El Bassatine', latitude: 36.72294, longitude:10.30319, region: 'Manouba', delegation: 	'El Bassatine' },
    { id: '120', name: 'Poste El Fejja', latitude: 36.67901, longitude:9.98681, region: 'Manouba', delegation: 'El Fejja' }


  ]  
  export default agencies;