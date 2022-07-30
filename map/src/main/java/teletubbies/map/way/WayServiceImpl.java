package teletubbies.map.way;

import lombok.SneakyThrows;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import teletubbies.map.find.FindDto;
import teletubbies.map.subway.SubwayDto;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class WayServiceImpl implements WayService{
    @Value("${TMAP_URL}")
    private String tmap_way_url;

    @Value("${TMAP_APPKEY}")
    private String tmap_apikey;
    @SneakyThrows
    public Object findWay(double startX, double startY, double endX, double endY, String startName, String endName) { // 티맵 도보 길찾기
        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory(tmap_way_url);
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.VALUES_ONLY);

        WebClient wc = WebClient.builder().uriBuilderFactory(factory).baseUrl(tmap_way_url).build();

        String encodedStartName = URLEncoder.encode(startName, "UTF-8");
        String encodedEndName = URLEncoder.encode(endName, "UTF-8");

        ResponseEntity<String> result = wc.get()
                .uri(uriBuilder -> uriBuilder.path("/tmap/routes/pedestrian")
                        .queryParam("startX", startX) //시작 경도
                        .queryParam("startY", startY) // 시작 위도
                        .queryParam("endX", endX) // 끝 경도
                        .queryParam("endY", endY) // 끝 위도
                        .queryParam("startName", encodedStartName) // 개수
                        .queryParam("endName", encodedEndName)
                        .queryParam("appKey", tmap_apikey)
                        .build())
                .retrieve() //response 불러옴
                .toEntity(String.class)
                .block();

        return result.getBody();
    }

//        if (result.getBody() != null) {
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

//            List<FindDto> dtos = new ArrayList<>(); //리스트에 담을 dtos 선언
//
//            //다시 poi의 value를 받아온 배열을 개수만큼 담기 (검색했을 때 출력하는 리스트 최대 10개)
//            for (int i = 0; i < poiArr.size(); i++) {
//                long start1 = System.currentTimeMillis();
//                FindDto findDto = new FindDto();
//                object = (JSONObject) poiArr.get(i);
//
//
//                long end1 = System.currentTimeMillis();
//                System.out.println(i +"번째 하나 생성에 걸리는 시간 : " + (end1 - start1)/1000.0);
//            }
//            System.out.println("dtos = " + dtos);
//            return dtos;
//        }
//        else {
//            return null;
//        }
}
