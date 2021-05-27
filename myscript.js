//-----------------파일쓰기-------------------------



//--------------------------------------------------
var srno = '#';

let goalObj = {};
let layoverObj = new Array(3);

//--------------------------------------------------
function routeInit() {
	goalObj = {
		name: '파만장',
	    x: 126.78204526122205,  
	    y: 37.793763470235774,
	    coordType: 'wgs84',
	    vehicleType : 7,
	    viaPoints: [{name:'-', x:126.78204526122205, y:37.793763470235774}]
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

	//console.log(goalObj);

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


var selectBtn = function (whichBtn, tmpObj) {

    let layover = {};
    let goal = {};
    let tmp = '';
    let tmpObject = {};

    console.log('test : ' + typeof tmpObj);

    /*
    tmp = JSON.stringify(tmpObj);
    tmpObject = JSON.parse(tmp);
    console.log(JSON.stringify({ x: 5, y: 6 }));
    console.log(JSON.stringify({name: 경기_파주시_월롱면_위전리_659-52,x:126.78322059284794,y:37.79368229988303,coordType: wgs84,vehicleType : 7}));
    */
   // tmp = JSON.stringify(tmpObj.replaceAll("@", "'"));
    //tmpObject = JSON.parse(tmp.replaceAll('"', ''));
    //tmpObject = JSON.parse(tmp);
    
    
    //tmpObj.name        = '';
    //tmpObj.x           = '';
    //tmpObj.y           = '';
    //tmpObj.vehicleType = getCarRadio();
    //goalObj.viaPoints   = layoverObj;
   

    if(whichBtn == 'lg') {

    }else if(whichBtn == 'l1') {

    }else if(whichBtn == 'l2') {

    }else if(whichBtn == 'l3') {

    }else {
        //
    }
}


var addrCopy = function () {
  let textarea = document.getElementById("addr");
  textarea.select();
  document.execCommand("copy");
}



//---------------------카카오 지도표시-------------------------------------

// SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init('e43dc8045745f2062fbc14ca37ae1297');

// SDK 초기화 여부를 판단합니다.
console.log('kakao 초기화 여부:' + Kakao.isInitialized());

// 마커를 담을 배열입니다
var markers = [];

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.793763470235774, 126.78204526122205), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();  

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

// 키워드로 장소를 검색합니다
searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        //alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch( keyword, placesSearchCB); 
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    
    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    for ( var i=0; i<places.length; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i), 
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });

            itemEl.onmouseover =  function () {
                displayInfowindow(marker, title);
            };

            itemEl.onmouseout =  function () {
                infowindow.close();
            };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>'; 
    }
                 
      itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i; 

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}

// 지도에 클릭 이벤트를 등록합니다
// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
    // 클릭한 위도, 경도 정보를 가져옵니다 
    var latlng = mouseEvent.latLng;
    
    var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
    message += '경도는 ' + latlng.getLng() + ' 입니다';
    
    // latlng.getLng() : 126.xxxx
    // latlng.getLat() : 37.xxxx    
});

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
    infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

// 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
searchAddrFromCoords(map.getCenter(), displayCenterInfo);

// 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {      
    searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {        
        if (status === kakao.maps.services.Status.OK) {

            let myaddr = '';
            // 구조체를 버튼에 담아서 보내자
            let latlng = mouseEvent.latLng;
            let clickX = latlng.getLng();
            let clickY = latlng.getLat();            

            let tmp = '';            
            let tmpObj = {};


            myaddr = result[0].address.address_name;
            // @를 작은따옴표(')로 나중에 치환할거임
            // 주소의 띄어쓰기를 _로 치환해서 보내고, 나중에 바꿀거임.
            /*
            tmpObj = "{"              +
                "name: @"+ myaddr.replaceAll(" ", "_") + "@," +
                "x:"   + clickX + "," +	
                "y:"   + clickY + "," + 
                "coordType: @wgs84@,"   +
                "vehicleType : " + getCarRadio() + "}";
			
            tmp = "'" + tmpObj + "'";
            */
            tmpObj = {
                name: myaddr,
                x: clickX , 	
                y: clickY ,  
                coordType: 'wgs84',
                vehicleType: getCarRadio()
            };

            tmp = JSON.stringify(tmpObj);

            console.log(typeof tmp);

            //var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
            //detailAddr += '<div>지번 주소  : ' + result[0].address.address_name + '</div>';
            var detailAddr = '<div class="control">' +  
                             //'<input class="input is-hovered" type="text" value="'+myaddr+'" id="addr">' +
                             '<textarea id="addr" class="textarea has-fixed-size" rows="3">'+myaddr+'</textarea>'+
                             '<br /><a class="button is-info is-light" onclick="addrCopy()">주소 복사</a>' +
                             '</div>';
            
            var content = "<div class='bAddr'>" +
                          "    <span class='title'>"+ detailAddr +'</span>' + 
                          "    <a class='button is-info is-light' href='#' onclick='selectBtn(" + '"' + "l1" + '"' + ", " + tmp + ")'>경로1</a> " +
                          "    <a class='button is-info is-light' href='#' onclick='selectBtn(" + '"' + "l2" + '"' + ", " + tmp + ")'>경로2</a> " +
                          "    <a class='button is-info is-light' href='#' onclick='selectBtn(" + '"' + "l3" + '"' + ", " + tmp + ")'>경로3</a> " +
                          "    <a class='button is-info is-light' href='#' onclick='selectBtn(" + '"' + "lg" + '"' + ", " + tmp + ")'>목적지</a>" +                         
                          "</div>";

            // 마커를 클릭한 위치에 표시합니다 
            marker.setPosition(latlng);
            marker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }   
    });
});

// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'idle', function() {
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
});

function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
}

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
function displayCenterInfo(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById('centerAddr');

        for(var i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {
                infoDiv.innerHTML = result[i].address_name;
                break;
            }

           // console.log(result[i].region_type);
        }
    }    
}


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





			
