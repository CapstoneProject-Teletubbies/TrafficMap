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

import java.lang.reflect.Array;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class BusServiceImpl implements BusService {
    @Value("${BUS_APPKEY}")
    private String bus_apikey; //버스 API 키 설정

    @Value("${BUS_URL}")
    private String bus_url; //버스 URL 설정

    @SneakyThrows
    public Object findBusStopByBusStopName(String name) { //정류소명으로 정류소 검색
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        //서비스 키와, 검색할 정류소 인코딩
        String encodedKey = URLEncoder.encode(bus_apikey, "UTF-8");
        String encodedName = URLEncoder.encode(name, "UTF-8");

        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(bus_url)
                .queryParam("serviceKey", encodedKey) //서비스키
                //URLEncoder.encode(name, "UTF-8")
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

        for(int i=0; i<itemList.length(); i++) { // 받아올 데이터 개수만큼 반복
            JSONObject array = (JSONObject) itemList.get(i);
            Integer BSTOPID = (Integer)array.get("BSTOPID"); //정류소 ID
            String ADMINNM = (String)array.get("ADMINNM"); // 정류소 관할관청명(BusZone)
            System.out.println("res = " + BSTOPID);
            System.out.println("res = " + ADMINNM);
        }

        return result.getBody();
    }
}
