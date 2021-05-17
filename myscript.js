
	// SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
	Kakao.init('e43dc8045745f2062fbc14ca37ae1297');

	// SDK 초기화 여부를 판단합니다.
	console.log(Kakao.isInitialized());

	function navi() {
		
		alert('test');
		
		Kakao.Navi.start({
			name: '목적지',
		    x: 36.355481,
		    y: 127.381882,
		    coordType: 'wgs84',
			viaPoints: [{name:'경유1', x:36.353841, y:127.394269}, 
						{name:'경유2', x:36.350652, y:127.395836}, 
						{name:'경유3', x:36.345560, y:127.390826}]
		})
  	}
