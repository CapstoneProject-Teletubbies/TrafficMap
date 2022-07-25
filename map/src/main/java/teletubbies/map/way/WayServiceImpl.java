//package teletubbies.map.way;
//
//import lombok.SneakyThrows;
//import org.json.simple.JSONArray;
//import org.json.simple.JSONObject;
//import org.json.simple.parser.JSONParser;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.http.converter.StringHttpMessageConverter;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//import org.springframework.web.util.UriComponents;
//import org.springframework.web.util.UriComponentsBuilder;
//import teletubbies.map.subway.SubwayDto;
//
//import java.net.URLEncoder;
//import java.nio.charset.StandardCharsets;
//import java.util.List;
//
//@Service
//public class WayServiceImpl implements WayService{
//    @Value("${KAKAOMAP_URL}")
//    private String kakaomap_url;
//    @SneakyThrows
//    public String findWay(String name, double latitude, double langitude) { //길찾기 연결
//        //RestTemplate : REST API 호출이후 응답을 받을 때까지 기다리는 동기방식
//        RestTemplate restTemplate = new RestTemplate();
//        HttpHeaders headers = new HttpHeaders(); //헤더
//        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지
//
//        String encodedName = URLEncoder.encode(name, "UTF-8");
//        //URI 생성
//        UriComponents uri = UriComponentsBuilder
//                .fromHttpUrl(kakaomap_url)
//                .path("/" + encodedName + "/" + latitude + "/" + langitude)
//                .build(true);
//        System.out.println("uri = " + uri);
//
//        // url 연결 해야함
//
//        //response
//        //ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);
//        return null;
//    }
//}
