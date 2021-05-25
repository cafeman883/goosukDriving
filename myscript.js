//--------------------------------------------------
var srno = '#';

let goalObj = {};
let layoverObj = new Array(3);

//--------------------------------------------------
function routeInit() {
	goalObj = {
		name: '-',
	    x: 127.381874,  
	    y: 36.355238,
	    coordType: 'wgs84',
	    vehicleType : 7,
	    viaPoints: [{name:'-', x:127.381874, y:36.355238}]
	};

	layoverObj = [];  // 배열에 빈 배열을 할당해서 초기화
};

var getCarRadio = function() {
	var value = document.querySelector('input[name="carRadio"]:checked').value;

	return value * 1; // 숫자를 리턴하기 위해
};


var makeUrl = function() {
	let layover = new Array();
	let tmp;
	let i=0;
	let cnt=0;
	let tmpObj = {};

	routeInit();

	// 목적지
	tmp = document.getElementsByName("goal")[0].value;
	tmpObj = JSON.parse(tmp.replaceAll("'",'"'));

	// 경유지
	cnt = document.getElementsByName("layover").length;
	for(i = 0; i < cnt; i++) {
		layover[i] = document.getElementsByName("layover")[i].value
		layoverObj[i] = JSON.parse(layover[i].replaceAll("'",'"'));
	}

	goalObj.name        = tmpObj.name;
	goalObj.x           = tmpObj.x;
	goalObj.y           = tmpObj.y;
	goalObj.vehicleType = getCarRadio();
	goalObj.viaPoints   = layoverObj;

	console.log(goalObj);

}

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



// SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init('e43dc8045745f2062fbc14ca37ae1297');

// SDK 초기화 여부를 판단합니다.
console.log('kakao 초기화 여부:' + Kakao.isInitialized());

function navi() {
	// Kakao.Navi.start({
	// 	name: '대전광역시 서구 둔산2동 1306',
	//     x: 127.381874,  
	//     y: 36.355238,
	//     coordType: 'wgs84',
	//     viaPoints: [{name:'한밭초등학교', x:127.394269, y:36.353841}]
	// });
	makeUrl();

	console.log(goalObj);

	Kakao.Navi.start(goalObj);	
	
};





			
