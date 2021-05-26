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

//---------------------카카오 지도표시-------------------------------------

// SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init('e43dc8045745f2062fbc14ca37ae1297');

// SDK 초기화 여부를 판단합니다.
console.log('kakao 초기화 여부:' + Kakao.isInitialized());



var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
    };



// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 

//--------------------지도 마커 생성------------------------------------------
// 마커가 표시될 위치입니다 
var positions = [
    {
        title: '카카오', 
        latlng: new kakao.maps.LatLng(33.450705, 126.570677)
    },
    {
        title: '생태연못', 
        latlng: new kakao.maps.LatLng(33.450936, 126.569477)
    },
    {
        title: '텃밭', 
        latlng: new kakao.maps.LatLng(33.450879, 126.569940)
    },
    {
        title: '근린공원',
        latlng: new kakao.maps.LatLng(33.451393, 126.570738)
    }
];

// 마커 이미지의 이미지 주소입니다
var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

for (var i = 0; i < positions.length; i ++) {
    
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
    
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });
}

//--------------------------------------------------------------------------------

//--------------------지도 인포윈도우 생성------------------------------------------
var iwContent = '<div style="padding:5px;">Hello World! <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

// 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({
    position : iwPosition, 
    content : iwContent 
});
  
// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
infowindow.open(map, marker); 

//-------------------------------------------------------------------------------

//--------------------지도 경로에 따른 지도 확대 및 축소------------------------------------------
// 버튼을 클릭하면 아래 배열의 좌표들이 모두 보이게 지도 범위를 재설정합니다 
var points = [
    new kakao.maps.LatLng(33.452278, 126.567803),
    new kakao.maps.LatLng(33.452671, 126.574792),
    new kakao.maps.LatLng(33.451744, 126.572441)
];

// 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
var bounds = new kakao.maps.LatLngBounds();    
var i, marker;
for (i = 0; i < points.length; i++) {
    // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
    marker =     new kakao.maps.Marker({ position : points[i] });
    marker.setMap(map);
    
    // LatLngBounds 객체에 좌표를 추가합니다
    bounds.extend(points[i]);
}

function setBounds() {
    // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
    // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
    map.setBounds(bounds);
}
//-------------------------------------------------------------------------------



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





			
