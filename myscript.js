//--------------------------------------------------
var srno = '#';

let goal = {};
let layover = new Array(3);
const layoverTmp = {
	name: '경유지명',
    x: 127.381874,  
    y: 36.355238
}

// vehicleType: 1(1종), 7(이륜차)
// viaPoints	Object[]	경유지 정보, 최대 3개
// viaPoints: [{name:'-', x:127.381874, y:36.355238}]


//--------------------------------------------------
function routeInit() {
	goal = {
		name: '-',
	    x: 127.381874,  
	    y: 36.355238,
	    coordType: 'wgs84',
	    vehicleType : 7
	};

	layover = [];  // 배열에 빈 배열을 할당해서 초기화
};

var getCarRadio = function() {
	var value = document.querySelector('input[name="carRadio"]:checked').value;

	return value;
};


var makeUrl = function() {
	var layover = new Array();
	var layoverObj = new Array();

	layover[0] = document.getElementsByName("layover")[0].value;
	layover[1] = document.getElementsByName("layover")[1].value;
	layover[2] = document.getElementsByName("layover")[2].value;
	

	layoverObj[0] = JSON.parse(layover[0].replaceAll("'",'"'));
	layoverObj[1] = JSON.parse(layover[1].replaceAll("'",'"'));
	layoverObj[2] = JSON.parse(layover[2].replaceAll("'",'"'));	

	layoverTmp.viaPoints = layoverObj;

	console.log(layoverTmp);






	if (getCarRadio() == 1) {
		console.log('승용차');
	}
	else if (getCarRadio() == 7) {
		console.log('바이크');
	}
}




// SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init('e43dc8045745f2062fbc14ca37ae1297');

// SDK 초기화 여부를 판단합니다.
console.log('kakao 초기화 여부:' + Kakao.isInitialized());

function navi(srno) {

	console.log(srno);

	switch (srno) {
		case 'A00001':
			Kakao.Navi.start({
				name: '대전광역시 서구 둔산2동 1306',
			    x: 127.381874,  
			    y: 36.355238,
			    coordType: 'wgs84',
			    viaPoints: [{name:'한밭초등학교', x:127.394269, y:36.353841}]
			})			
			break;
		case 'A00002':
			break;
	}
};



var getParameters = function (paramName) { 
	// 리턴값을 위한 변수 선언 
	var returnValue; 

	// 현재 URL 가져오기 
	var url = location.href; 

	// get 파라미터 값을 가져올 수 있는 ? 를 기점으로 slice 한 후 split 으로 나눔 
	var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'); 


	// 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return 
	for (var i = 0; i < parameters.length; i++) { 
		var varName = parameters[i].split('=')[0]; 


		alert(varName + '/' + paramName);
		
		

		if (varName.toUpperCase() == paramName.toUpperCase()) { 
			returnValue = parameters[i].split('=')[1]; 
			returnValue = returnValue.replaceAll("#", "");
			return decodeURIComponent(returnValue); 
		} 
	} 
};


			
