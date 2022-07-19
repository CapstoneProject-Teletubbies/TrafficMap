package teletubbies.map.bus;

import lombok.SneakyThrows;
import org.json.JSONObject;
import org.json.XML;
import org.json.JSONArray;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Array;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * 반복되는 코드 많아서 이 부분 나중에 수정할 것!!!!

 */
@Service
public class BusServiceImpl implements BusService {
    @Value("${BUS_APPKEY}")
    private String bus_apikey; //버스 API 키 설정

    //버스 URL 설정
    @Value("${BUS_URL}")
    private String bus_url;
    @Value("${BSTOPID_URL}")
    private String busStopId_url;
    @Value("${BUSID_URL}")
    private String busId_url;
    @Value("${BUSIDLIST_URL}")
    private String busIdList_url;

    @SneakyThrows
    public Object findBusStopByBusStopName(String name) { //정류소명으로 정류소(ID) 검색
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        //서비스 키와, 검색할 정류소 인코딩
        String encodedKey = URLEncoder.encode(bus_apikey, "UTF-8");
        String encodedName = URLEncoder.encode(name, "UTF-8");

        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(bus_url)
                .queryParam("serviceKey", encodedKey) //서비스키
                .queryParam("bstopNm", encodedName) //버스정류소명
                .queryParam("numOfRows", 2) // 개수
                .queryParam("pageNo", 1)
                .build(true);

        ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);

        //xml 형식을 json 형식으로 변환
        JSONObject response = XML.toJSONObject(result.getBody());

        JSONObject ServiceResult = (JSONObject)response.get("ServiceResult"); //ServiceResult의 value들
        JSONObject msgBody = (JSONObject)ServiceResult.get("msgBody"); //msgBody의 value들
        JSONArray itemList = (JSONArray) msgBody.get("itemList"); //itemList의 value들

        System.out.println("정류소명으로 정류소(ID) 검색");
        for(int i=0; i<itemList.length(); i++) { // 받아올 데이터 개수만큼 반복
            JSONObject array = (JSONObject) itemList.get(i);
            System.out.println("(" + i + ")");
            Integer BSTOPID = (Integer)array.get("BSTOPID"); //정류소 ID
            String ADMINNM = (String)array.get("ADMINNM"); // 정류소 관할관청명(BusZone)

            System.out.println("BSTOPID = " + BSTOPID);
            System.out.println("ADMINNM = " + ADMINNM);
        }

        return result.getBody();
    }

    @SneakyThrows
    public Object findBusArrivalByBusStopId(int bStopId) { //정류소 ID로 버스 도착정보목록 조회
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        //서비스 키 인코딩
        String encodedKey = URLEncoder.encode(bus_apikey, "UTF-8");

        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(busStopId_url)
                .queryParam("serviceKey", encodedKey) //서비스키
                .queryParam("bstopId", bStopId) // 정류소ID
                .queryParam("numOfRows", 2) // 개수
                .queryParam("pageNo", 1)
                .build(true);

        ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);


        //xml 형식을 json 형식으로 변환
        JSONObject response = XML.toJSONObject(result.getBody());

        JSONObject ServiceResult = (JSONObject)response.get("ServiceResult"); //ServiceResult의 value들
        JSONObject msgBody = (JSONObject)ServiceResult.get("msgBody"); //msgBody의 value들
        JSONArray itemList = (JSONArray) msgBody.get("itemList"); //itemList의 value들

        System.out.println("정류소 ID로 버스 도착정보목록 조회");
        for(int i=0; i<itemList.length(); i++) { // 받아올 데이터 개수만큼 반복
            JSONObject array = (JSONObject) itemList.get(i);
            System.out.println("(" + i + ")");
            Integer BUSID = (Integer)array.get("BUSID"); // 버스 ID(차량 고유 식별자)
            Integer ARRIVALESTIMATETIME = (Integer)array.get("ARRIVALESTIMATETIME"); // 도착예정시간(몇 초 전)
            Integer LOW_TP_CD = (Integer)array.get("LOW_TP_CD"); // 저상버스 여부
            Integer ROUTEID = (Integer)array.get("ROUTEID"); //버스 노선 ID
            Integer REST_STOP_COUNT = (Integer)array.get("REST_STOP_COUNT"); // 몇 정거장 전
            String LATEST_STOP_NAME = (String)array.get("LATEST_STOP_NAME"); //버스의 최근 정류소 명
            String BUS_NUM_PLATE = (String)array.get("BUS_NUM_PLATE"); // 차량 번호판

            System.out.println("BUSID = " + BUSID);
            System.out.println("ARRIVALESTIMATETIME = " + ARRIVALESTIMATETIME);
            System.out.println("LOW_TP_CD = " + LOW_TP_CD);
            System.out.println("ROUTEID = " + ROUTEID);
            System.out.println("REST_STOP_COUNT = " + REST_STOP_COUNT);
            System.out.println("LATEST_STOP_NAME = " + LATEST_STOP_NAME);
            System.out.println("BUS_NUM_PLATE = " + BUS_NUM_PLATE);
            System.out.println();
        }

        return result.getBody();
    }

    @SneakyThrows
    public Object findBusByRouteId(int busId) { // 버스 노선 ID로 버스 번호 조회
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        //서비스 키 인코딩
        String encodedKey = URLEncoder.encode(bus_apikey, "UTF-8");

        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(busId_url)
                .queryParam("serviceKey", encodedKey) //서비스키
                .queryParam("routeId", busId) // 노선 ID
                .queryParam("numOfRows", 2) // 개수
                .queryParam("pageNo", 1)
                .build(true);

        ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);

        //xml 형식을 json 형식으로 변환
        JSONObject response = XML.toJSONObject(result.getBody());

        JSONObject ServiceResult = (JSONObject)response.get("ServiceResult"); //ServiceResult의 value들
        JSONObject msgBody = (JSONObject)ServiceResult.get("msgBody"); //msgBody의 value들
        JSONObject itemList = (JSONObject) msgBody.get("itemList"); //itemList의 value들


        System.out.println(" 노선 id로 버스 번호 조회");
        Integer ROUTENO = (Integer)itemList.get("ROUTENO"); // 버스 번호
        String DEST_BSTOPNM = (String)itemList.get("DEST_BSTOPNM"); // 종점
        String ORIGIN_BSTOPNM = (String)itemList.get("ORIGIN_BSTOPNM"); // 기점
        String TURN_BSTOPNM = (String)itemList.get("TURN_BSTOPNM"); //회차지
        Integer ROUTELEN = (Integer)itemList.get("ROUTELEN");

        System.out.println("ROUTENO = " + ROUTENO);
        System.out.println("DEST_BSTOPNM = " + DEST_BSTOPNM);
        System.out.println("ORIGIN_BSTOPNM = " + ORIGIN_BSTOPNM);
        System.out.println("TURN_BSTOPNM = " + TURN_BSTOPNM);
        System.out.println("ROUTELEN = " + ROUTELEN);
        System.out.println();

        return result.getBody();

    }

    @SneakyThrows
    public Object findBusStopNameByRouteId(int routeId) { // 노선 ID로 버스 정류소 목록 검색
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        //서비스 키 인코딩
        String encodedKey = URLEncoder.encode(bus_apikey, "UTF-8");

        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(busIdList_url)
                .queryParam("serviceKey", encodedKey) //서비스키
                .queryParam("routeId", routeId) // 정류소ID
                .queryParam("numOfRows", 300) // 개수
                .queryParam("pageNo", 1)
                .build(true);

        ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);

        //xml 형식을 json 형식으로 변환
        JSONObject response = XML.toJSONObject(result.getBody());

        JSONObject ServiceResult = (JSONObject)response.get("ServiceResult"); //ServiceResult의 value들
        JSONObject msgHeader = (JSONObject)ServiceResult.get("msgHeader"); //msgHeader의 value들
        Integer totalCount = (Integer) msgHeader.get("totalCount"); // 정류장 총 개수

        JSONObject msgBody = (JSONObject)ServiceResult.get("msgBody"); //msgBody의 value들
        JSONArray itemList = (JSONArray) msgBody.get("itemList"); //itemList의 value들

        System.out.println(" 버스 정류소 목록 검색");
        for(int i=0; i<totalCount; i++) { // 정류장 개수만큼 반복
            JSONObject array = (JSONObject) itemList.get(i);

            System.out.println("(" + i + ")");
            String BSTOPNM = (String)array.get("BSTOPNM"); // 정류장 이름
            System.out.println("BSTOPNM = " + BSTOPNM);
            System.out.println();
        }

        return result.getBody();
    }

}
