	var container = document.getElementById('map');
	var options = {
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3
	};

	var map = new kakao.maps.Map(container, options);


	function navi() {
    	Kakao.Navi.start({
      		name: '현대백화점 판교점',
            x: 127.11205203011632,
            y: 37.39279717586919,
            coordType: 'wgs84',
    	})
  	}