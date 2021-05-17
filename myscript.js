
	// SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
	Kakao.init('e43dc8045745f2062fbc14ca37ae1297');

	// SDK 초기화 여부를 판단합니다.
	console.log(Kakao.isInitialized());

	function navi() {
		
		Kakao.Navi.start({
			name: '대전광역시 서구 둔산2동 1306',
		    x: 36.355238,
		    y: 127.381874,
		    coordType: 'wgs84',
			viaPoints: [{name:'한밭초등학교', x:36.353841, y:127.394269}]
		})
  	}
