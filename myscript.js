
	// SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
	Kakao.init('e43dc8045745f2062fbc14ca37ae1297');

	// SDK 초기화 여부를 판단합니다.
	console.log(Kakao.isInitialized());

	function navi() {
		
		alert('test');
		
		Kakao.Navi.start({
			name: '현대백화점 판교점',
		    x: 127.11205203011632,
		    y: 37.39279717586919,
		    coordType: 'wgs84',
			viaPoints: [{name:'경유1', x:127.11205203011632, y:37.39279717586919}, 
						{name:'경유2', x:130.11205203011632, y:37.39279717586919}, 
						{name:'경유3', x:133.11205203011632, y:37.39279717586919}]
		})
  	}
