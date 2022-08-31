package teletubbies.map.find;

import lombok.SneakyThrows;
import org.json.XML;
import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.ParallelFlux;
import reactor.core.scheduler.Schedulers;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class FindServiceImpl implements FindService {
    @Value("${TMAP_APPKEY}")
    private String tmap_apiKey; //티맵 API 앱키 설정

    @Value("${ELEVATOR_APPKEY}")
    private String elevator_apikey; //엘리베이터 API 키 설정

    @Value("${TMAP_URL}")
    private String tmap_url;

    @Value("${TMAP_RG_URL}")
    private String tmap_rg_url;

    @Value("${ELEVATOR_URL}")
    private String elevator_url;

    @Value("${STAIR_URL}")
    private String stair_url;
    /**
     *
     * 방법1
     *
     */
//    @SneakyThrows
//    public List<FindDto> findAddressByTmapAPI(String FindName) { // 통합 검색해서
//        //RestTemplate : REST API 호출이후 응답을 받을 때까지 기다리는 동기방식
//        RestTemplate restTemplate = new RestTemplate();
//        HttpHeaders headers = new HttpHeaders(); //헤더
//        //URI 생성
//        URI uri = UriComponentsBuilder
//                .fromUriString(tmap_url)
//                .queryParam("version", 1) //version은 1
//                .queryParam("searchKeyword", FindName) //일단 스타벅스 부평점으로 검색
//                .queryParam("count", 10) // 10개만 출력
//                .encode()
//                .build()
//                .toUri();
//
//        //헤더를 넣기 위한 것
//        RequestEntity<Void> req = RequestEntity
//                .get(uri)
//                .header("appKey", tmap_apiKey) //앱키
//                .build();
//
//        //response
//        ResponseEntity<String> result = restTemplate.exchange(req, String.class);
//        System.out.println(result);
//
//        if(result.getBody() != null) {
//            //받아온 JSON 데이터 가공
//            //json parser
//            JSONParser parser = new JSONParser();
//            JSONObject object = (JSONObject) parser.parse(result.getBody());
//            //searchPoiInfo의 value들
//            JSONObject searchPoiInfo = (JSONObject) object.get("searchPoiInfo");
//            //pois의 value들
//            JSONObject pois = (JSONObject) searchPoiInfo.get("pois");
//            //poi의 value는 배열이라 JSONArray 사용
//            JSONArray poiArr = (JSONArray) pois.get("poi");
//
//            List<FindDto> dtos = new ArrayList<>(); //리스트에 담을 dtos 선언
//
//            //다시 poi의 value를 받아온 배열을 개수만큼 담기 (검색했을 때 출력하는 리스트 최대 10개)
//            for (int i = 0; i < poiArr.size(); i++) {
//                FindDto findDto = new FindDto();
//                object = (JSONObject) poiArr.get(i);
//
//                //이제 newAddress 안의 경도, 위도, 도로명 주소 쓰기 위해 또 파싱
//                JSONObject newAddressList = (JSONObject) object.get("newAddressList");
//                JSONArray newAddress = (JSONArray) newAddressList.get("newAddress");
//                JSONObject object1 = (JSONObject) newAddress.get(0);
//
//                //이제 필요한 애들 받아오기
//                String fullAddressRoad = (String) object1.get("fullAddressRoad"); //도로명 주소
//                String centerLat = (String) object1.get("centerLat"); //위도
//                String centerLon = (String) object1.get("centerLon"); //경도
//                String name = (String) object.get("name"); // 이름
//                String bizName = (String) object.get("bizName"); // 업종명
//                String upperBizName = (String) object.get("upperBizName"); //업종명 대분류
//                String middleAddrName = (String) object.get("middleAddrName"); // 도로명주소 ㅇㅇ로
//                String roadName = (String) object.get("roadName"); // 도로명주소 ㅇㅇ로
//                String firstBuildNo = (String) object.get("firstBuildNo"); //건물번호1
//
//                //일단 테스트로 이제 가공한 데이터를 findDto에 저장
//                findDto.setName(name);
//                findDto.setFullAddressRoad(fullAddressRoad);
//                findDto.setLatitude(Double.parseDouble(centerLat));
//                findDto.setLongitude(Double.parseDouble(centerLon));
//                findDto.setBizName(bizName);
//                findDto.setUpperBizName(upperBizName);
//                findDto.setMiddleAddrName(middleAddrName);
//                findDto.setRoadName(roadName);
//                findDto.setFirstBuildNo(firstBuildNo);
//
//                String addr = middleAddrName + " " + roadName + " " + firstBuildNo;
//
//                /**
//                 * 엘리베이터 받는 부분
//                 */
////            findDto.setElevatorState(findElevatorByAPI(addr));
//
//                dtos.add(i, findDto);
//            }
//            System.out.println("dtos = " + dtos);
//            return dtos;
//        }
//        else {
//            return null;
//        }
//    }

    /**
     * 방법2
     */
    @SneakyThrows
    public List<FindDto> findAddressByTmapAPI(String FindName, double longitude, double latitude) { // 티맵 api (통합검색(명칭검색))

        long start2 = System.currentTimeMillis();
        long start0 = System.currentTimeMillis();
        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory(tmap_url);
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.VALUES_ONLY);

        WebClient wc = WebClient.builder().uriBuilderFactory(factory).baseUrl(tmap_url).build();

        String encodedName = URLEncoder.encode(FindName, "UTF-8");

        ResponseEntity<String> result = wc.get()
                .uri(uriBuilder -> uriBuilder.path("/tmap/pois")
                        .queryParam("version", 1) //버전
                        .queryParam("searchKeyword", encodedName) // 검색 키워드
                        .queryParam("count", 10) // 개수
                        .queryParam("appKey", tmap_apiKey) // 서비스키
                        .queryParam("searchtypCd", "A") // 거리순, 정확도순 검색(거리순 : R, 정확도순 : A)
                        .queryParam("radius", 0) // 반경( 0: 전국반경)
                        .queryParam("centerLon", longitude) // 중심 좌표의 경도 좌표
                        .queryParam("centerLat", latitude) // 중심 좌표의 위도 좌표
                        .build())

                .retrieve() //response 불러옴
                .toEntity(String.class)
//                .bodyToMono(String.class);
                .block();
        long end2 = System.currentTimeMillis();
        System.out.println("용의자 시간 : "+(end2-start2)/1000.0);

        if (result.getBody() != null) {
            //받아온 JSON 데이터 가공
            //json parser
            JSONParser parser = new JSONParser();
            JSONObject object = (JSONObject) parser.parse(result.getBody());
            //searchPoiInfo의 value들
            JSONObject searchPoiInfo = (JSONObject) object.get("searchPoiInfo");
            //pois의 value들
            JSONObject pois = (JSONObject) searchPoiInfo.get("pois");
            //poi의 value는 배열이라 JSONArray 사용
            JSONArray poiArr = (JSONArray) pois.get("poi");

            List<FindDto> dtos = new ArrayList<>(); //리스트에 담을 dtos 선언

            List<ElevatorOrderDto> ele = new ArrayList<>();


            for(int i = 0 ; i<poiArr.size();i++){

                ElevatorOrderDto elevatorOrderDto = new ElevatorOrderDto();
                FindDto findDto = new FindDto();
                object = (JSONObject) poiArr.get(i);
                String middleAddrName = (String) object.get("middleAddrName"); // 도로명주소 ㅇㅇ로
                String roadName = (String) object.get("roadName"); // 도로명주소 ㅇㅇ로
                String firstBuildNo = (String) object.get("firstBuildNo"); //건물번호1
                findDto.setMiddleAddrName(middleAddrName);
                findDto.setRoadName(roadName);
                findDto.setFirstBuildNo(firstBuildNo);

                String addr = middleAddrName + " " + roadName + " " + firstBuildNo;

                String encodedAddr = URLEncoder.encode(addr,"UTF-8");

                elevatorOrderDto.setAddress(encodedAddr);
                elevatorOrderDto.setOrder(i);

                ele.add(i,elevatorOrderDto);
            }

            Map<Integer,String> elevatorResult = new HashMap<>();
            long start1 = System.currentTimeMillis();
            elevatorResult = findElevatorByAPI(ele);
            long end1 = System.currentTimeMillis();
            System.out.println("엘레베이터만 걸리는 시간 : "+(end1-start1)/1000.0);

            //다시 poi의 value를 받아온 배열을 개수만큼 담기 (검색했을 때 출력하는 리스트 최대 10개)
            for (int i = 0; i < poiArr.size(); i++) {

                FindDto findDto = new FindDto();
                object = (JSONObject) poiArr.get(i);

                //이제 newAddress 안의 경도, 위도, 도로명 주소 쓰기 위해 또 파싱
                JSONObject newAddressList = (JSONObject) object.get("newAddressList");
                JSONArray newAddress = (JSONArray) newAddressList.get("newAddress");

                if(newAddress.size() != 0) {
                    JSONObject object1 = (JSONObject) newAddress.get(0);

                    //이제 필요한 애들 받아오기
                    String fullAddressRoad = (String) object1.get("fullAddressRoad"); //도로명 주소
                    String centerLat = (String) object1.get("centerLat"); //위도
                    String centerLon = (String) object1.get("centerLon"); //경도
                    String name = (String) object.get("name"); // 이름
                    String bizName = (String) object.get("bizName"); // 업종명
                    String upperBizName = (String) object.get("upperBizName"); //업종명 대분류
                    String middleAddrName = (String) object.get("middleAddrName"); // 도로명주소 ㅇㅇ로
                    String roadName = (String) object.get("roadName"); // 도로명주소 ㅇㅇ로
                    String firstBuildNo = (String) object.get("firstBuildNo"); //건물번호1

                    findDto.setName(name);
                    findDto.setFullAddressRoad(fullAddressRoad);
                    findDto.setLatitude(Double.parseDouble(centerLat));
                    findDto.setLongitude(Double.parseDouble(centerLon));
                    findDto.setBizName(bizName);
                    findDto.setUpperBizName(upperBizName);
                    findDto.setMiddleAddrName(middleAddrName);
                    findDto.setRoadName(roadName);
                    findDto.setFirstBuildNo(firstBuildNo);

//                String addr = middleAddrName + " " + roadName + " " + firstBuildNo;

                    findDto.setElevatorState(elevatorResult.get(i));

                    dtos.add(i, findDto);
                }
                else { //건물이 아니라 도로 같은거라서 [] 안에 비어있을 경우
                    String name = (String) object.get("name"); // 이름
                    String upperBizName = (String) object.get("upperBizName"); //업종명 대분류
                    String frontLat = (String) object.get("frontLat"); //위도
                    String frontLon = (String) object.get("frontLon"); //경도

                    findDto.setName(name);
                    findDto.setUpperBizName(upperBizName);
                    findDto.setLatitude(Double.parseDouble(frontLat));
                    findDto.setLongitude(Double.parseDouble(frontLon));

                    dtos.add(i, findDto);
                }

            }

            long end0 = System.currentTimeMillis();
            System.out.println("총 시간 : " + (end0 - start0) / 1000.0);
            System.out.println("dtos = " + dtos);
            return dtos;

        }
        else {
            return null;
        }
    }


    @SneakyThrows
    public Map<Integer,String> findElevatorByAPI(List<ElevatorOrderDto> ele){

        long start = System.currentTimeMillis();

        List<String> responseResult = fetchElevator(ele).collectSortedList(Comparator.reverseOrder()).block();

//        for (int i=0; i<ele.size();i++) {
//            System.out.println(responseResult.get(i));
//        }
        long end = System.currentTimeMillis();

        //List<String> result = new ArrayList<>();

        Map<Integer,String> result= new HashMap<Integer,String>();
        Map<String,String> map = new HashMap<>();

        for(int i = 0; i<ele.size();i++){

            org.json.JSONObject object = XML.toJSONObject(responseResult.get(i));
            org.json.JSONObject response = (org.json.JSONObject) object.get("response");
            org.json.JSONObject body = (org.json.JSONObject) response.get("body");
            //System.out.println(body);
            if (!(body.get("items").equals(""))) { // 엘리베이터가 없으면 body":{"items":"","numOfRows":,"pageNo":,"totalCount":} 이런식으로 반환
                org.json.JSONObject items = (org.json.JSONObject) body.get("items");
                //item value들
                org.json.JSONObject item = (org.json.JSONObject) items.get("item");
                //필요한 엘리베이터 정보 받아오기
                String elvtrSttsNm = (String) item.get("elvtrSttsNm");
                //return elvtrSttsNm;
                String addr = (String) item.get("address1");
                //String encodedAddr = URLEncoder.encode(addr,"UTF-8");

                String[] t= addr.split(" ");
                List<String> str_list = new ArrayList<String>(Arrays.asList(t));

                //System.out.println(str_list);
                str_list.remove(0);
                String s = str_list.get(0);
                //System.out.println(s);
                //System.out.println(s.length()-1);
                String r = String.valueOf((s.charAt(s.length()-1)));

                /*if(r.equals("시") | r.equals("군")){
                    str_list.remove(0);
                }*/

                String result_str = String.join(" ",str_list);
                //System.out.println(result_str);

                map.put(result_str,elvtrSttsNm);
            }
        }

        //System.out.println(map);
        //System.out.println(ele);

        for(int i = 0; i<ele.size();i++){
            String decodedAddr = URLDecoder.decode(ele.get(i).getAddress());
            String elevator = map.get(decodedAddr);
            //System.out.println(decodedAddr);
            if(elevator==null){
                result.put(ele.get(i).getOrder(),"x");
            }else{
                result.put(ele.get(i).getOrder(),elevator);
            }

        }

        return result;


/*
        for(int i = 0; i<ele.size();i++){

            org.json.JSONObject object = XML.toJSONObject(responseResult.get(i));
            org.json.JSONObject response = (org.json.JSONObject) object.get("response");
            org.json.JSONObject body = (org.json.JSONObject) response.get("body");

            if (body.get("items").equals("")) { // 엘리베이터가 없으면 body":{"items":"","numOfRows":,"pageNo":,"totalCount":} 이런식으로 반환
                String elvtrSttsNm = "x";
                //return elvtrSttsNm;
                result.add(elvtrSttsNm);
            } else {
                org.json.JSONObject items = (org.json.JSONObject) body.get("items");
                //item value들
                org.json.JSONObject item = (org.json.JSONObject) items.get("item");
                //필요한 엘리베이터 정보 받아오기
                String elvtrSttsNm = (String) item.get("elvtrSttsNm");
                //return elvtrSttsNm;
                result.add(elvtrSttsNm);
            }
        }

        return result;
*/



    }

    /*
        @SneakyThrows
        public List<String> findElevatorByAPI(List<ElevatorOrderDto> ele) {
            DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory(elevator_url);
            factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.VALUES_ONLY);

            WebClient wc = WebClient.builder().uriBuilderFactory(factory).baseUrl(elevator_url).build();

            String encodedName = URLEncoder.encode(address, "UTF-8");

            long start = System.currentTimeMillis();

            ResponseEntity<String> result = wc.get()
                    .uri(uriBuilder -> uriBuilder.path("/getOperationInfoList")
                            .queryParam("serviceKey", elevator_apikey)
                            .queryParam("buld_address", encodedName) //주소
                            .queryParam("numOfRows", 1) // 1개만 출력
                            .queryParam("pageNo", 1).build())
                    .retrieve() //response 불러옴
                    .toEntity(String.class)
    //                .bodyToMono(String.class);
                    .block();

            long end = System.currentTimeMillis();
            System.out.println(address + " 엘레베이터 호출 하나 생성에 걸리는 시간 : " + (end - start) / 1000.0);

            org.json.JSONObject object = XML.toJSONObject(result.getBody());
            org.json.JSONObject response = (org.json.JSONObject) object.get("response");
            org.json.JSONObject body = (org.json.JSONObject) response.get("body");

            if (body.get("items").equals("")) { // 엘리베이터가 없으면 body":{"items":"","numOfRows":,"pageNo":,"totalCount":} 이런식으로 반환
                String elvtrSttsNm = "x";
                return elvtrSttsNm;
            } else {
                org.json.JSONObject items = (org.json.JSONObject) body.get("items");
                //item value들
                org.json.JSONObject item = (org.json.JSONObject) items.get("item");
                //필요한 엘리베이터 정보 받아오기
                String elvtrSttsNm = (String) item.get("elvtrSttsNm");
                return elvtrSttsNm;
            }
        }

    */
    //계단 api
    @SneakyThrows
    public List<StairDto> findStairs() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        String encodedPath = URLEncoder.encode("인천시_이동약자연결시설_18종1", "UTF-8");
        //URI 생성
        UriComponents uri = UriComponentsBuilder
                .fromUriString(stair_url)
                .path("/" + encodedPath + "/FeatureServer/12/query")
                .queryParam("where", "1%3D1")
                .queryParam("outFields", "objectid,ctprvnnm,signgunm,signgucode,rdnmadr,lnmadr,startlatitude,startlongitude,endlatitude,endlongitude")
                .queryParam("outSR", 4326)
                .queryParam("f", "json")
                .build(true);

        //response
        ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);

        if (result.getBody() != null) {
            //json parser
            JSONParser parser = new JSONParser();
            JSONObject object = (JSONObject) parser.parse(result.getBody());

            JSONArray features = (JSONArray) object.get("features");

            List<StairDto> dtos = new ArrayList<>(); //리스트에 담을 dtos 선언

            //배열 크기만큼 반복
            for (int i = 0; i < features.size(); i++) {
                StairDto stairDto = new StairDto();
                object = (JSONObject) features.get(i);

                JSONObject attributes = (JSONObject) object.get("attributes");

                //이제 필요한 애들 받아오기
                Long objectid = (Long) attributes.get("objectid"); //id
                String ctprvnnm = (String) attributes.get("ctprvnnm"); //인천광역시
                String signgunm = (String) attributes.get("signgunm"); //ㅇㅇ구
                String signgucode = (String) attributes.get("signgucode"); //  우편번호
                String rdnmadr = (String) attributes.get("rdnmadr"); // 도로명주소
                String lnmadr = (String) attributes.get("lnmadr"); // 지명주소
                Double startlatitude = (Double) attributes.get("startlatitude"); // 시작위도
                Double startlongitude = (Double) attributes.get("startlongitude"); // 시작경도
                Double endlatitude = (Double) attributes.get("endlatitude"); //끝위도
                Double endlongitude = (Double) attributes.get("endlongitude"); //끝경도

                //일단 테스트로 이제 가공한 데이터를 stairDto에 저장
                stairDto.setObjectid(objectid);
                stairDto.setCtprvnnm(ctprvnnm);
                stairDto.setSigngucode(signgucode);
                stairDto.setSigngunm(signgunm);
                stairDto.setRdnmadr(rdnmadr);
                stairDto.setLnmadr(lnmadr);
                stairDto.setStartlatitude(startlatitude);
                stairDto.setStartlongitude(startlongitude);
                stairDto.setEndlatitude(endlatitude);
                stairDto.setEndlongitude(endlongitude);

                dtos.add(i, stairDto);
            }
            return dtos;
        } else {
            return null;
        }
    }

    @SneakyThrows
    public List<ElevatorDto> findElevators() { // 엘리베이터 위도,경도(위치) 가져오는 api
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        String encodedPath = URLEncoder.encode("인천시_이동약자연결시설_18종1", "UTF-8");
        //URI 생성
        UriComponents uri = UriComponentsBuilder
                .fromUriString(stair_url)
                .path("/" + encodedPath + "/FeatureServer/6/query")
                .queryParam("where", "1%3D1")
                .queryParam("outFields", "objectid,latitude,longitude")
                .queryParam("outSR", 4326)
                .queryParam("f", "json")
                .build(true);

        //response
        ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);

        if(result.getBody() != null) {
            //json parser
            JSONParser parser = new JSONParser();
            JSONObject object = (JSONObject) parser.parse(result.getBody());

            JSONArray features = (JSONArray) object.get("features");

            List<ElevatorDto> dtos = new ArrayList<>(); //리스트에 담을 dtos 선언

            //배열 크기만큼 반복
            for (int i = 0; i < features.size(); i++) {
                ElevatorDto elevatorDto = new ElevatorDto();
                object = (JSONObject) features.get(i);

                JSONObject attributes = (JSONObject) object.get("attributes");

                //이제 필요한 애들 받아오기
                Long objectid = (Long) attributes.get("objectid"); // id(개수 체크용)
                double latitude = (double) attributes.get("latitude"); //위도
                double longitude = (double) attributes.get("longitude"); //경도

                //일단 테스트로 이제 가공한 데이터를 elevatorDto에 저장
                elevatorDto.setObjectid(objectid);
                elevatorDto.setLatitude(latitude);
                elevatorDto.setLongitude(longitude);

                dtos.add(i, elevatorDto);
            }
            return dtos;
        }
        else {
            return null;
        }
    }

    public Mono<String> getEle(ElevatorOrderDto ele) {

        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory("http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService");
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.VALUES_ONLY);
        WebClient wc = WebClient.builder().uriBuilderFactory(factory).baseUrl("http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService").build();

        //String encodedName = URLEncoder.encode(address,"UTF-8");

        return wc.get()
                .uri(uriBuilder -> uriBuilder.path("/getOperationInfoList")
                        .queryParam("serviceKey",elevator_apikey)
                        .queryParam("buld_address",ele.getAddress()) //모다 부평점
                        .queryParam("numOfRows",1) // 1개만 출력
                        .queryParam("pageNo",1).build())
                .retrieve().bodyToMono(String.class);

    }

    public ParallelFlux<String> fetchElevator(List<ElevatorOrderDto> adds) throws Exception{

        ParallelFlux<String> result = Flux.fromIterable(adds)
                //.sort((obj1,obj2)-> obj1.getOrder().compareTo(obj2.getOrder()))
                .parallel()
                .runOn(Schedulers.parallel())
                .flatMap(this::getEle)
                ;

        return result;
    }

    @SneakyThrows
    public String tMapReverseGeoCoding(String lat, String lon) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        //URI 생성
        UriComponents uri = UriComponentsBuilder
                .fromUriString(tmap_rg_url)
                .queryParam("lon", lon)
                .queryParam("lat", lat)
                .queryParam("version", 1)
                .queryParam("appKey", tmap_apiKey)
                .build(true);

        //response
        ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);

        JSONParser parser = new JSONParser();
        JSONObject object = (JSONObject) parser.parse(result.getBody());
        JSONObject addressInfo = (JSONObject) object.get("addressInfo");

        return addressInfo.get("fullAddress").toString();

    }




}

/**
 *
 * 엘리베이터 RestTemplate 쓰는 방법(너무 느려서 다른 방법 씀)
 */
//        RestTemplate restTemplate = new RestTemplate();
//        HttpHeaders headers = new HttpHeaders(); //헤더
//
//        UriComponents uri = UriComponentsBuilder
//                .fromHttpUrl(elevator_url)
//                .queryParam("serviceKey", elevator_apikey) //서비스키
//                .queryParam("buld_address", address) //주소
//                .queryParam("numOfRows", 1) // 개수
//                .queryParam("pageNo", 1)
//                .build();
//
//        ResponseEntity<String> result = restTemplate.exchange(uri.toUriString(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);
//
//        //데이터 가공
//        JSONParser parser = new JSONParser();
//        JSONObject object = (JSONObject) parser.parse(result.getBody());
//        JSONObject response = (JSONObject) object.get("response");
//        JSONObject body = (JSONObject) response.get("body");
//
//        if(body.get("items").equals("")) { // 엘리베이터가 없으면 body":{"items":"","numOfRows":,"pageNo":,"totalCount":} 이런식으로 반환
//            String elvtrSttsNm = "x";
//            return elvtrSttsNm;
//        }
//        else {
//            JSONObject items = (JSONObject) body.get("items");
//            //item value들
//            JSONObject item = (JSONObject) items.get("item");
//            //필요한 엘리베이터 정보 받아오기
//            String elvtrSttsNm = (String) item.get("elvtrSttsNm");
//            return elvtrSttsNm;
//        }
//    }
//}