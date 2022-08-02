package teletubbies.map.way;

import lombok.SneakyThrows;
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

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class WayServiceImpl implements WayService {
    @Value("${TMAP_URL}")
    private String tmap_way_url; // 티맵 URL

    @Value("${TMAP_APPKEY}")
    private String tmap_apikey; // 티맵 API KEY

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
                        .queryParam("startName", encodedStartName) // 출발지 이름
                        .queryParam("endName", encodedEndName) // 도착지 이름
                        .queryParam("appKey", tmap_apikey) // api appKey
                        .build())
                .retrieve() //response 불러옴
                .toEntity(String.class)
                .block();
        System.out.println("result.getBody() = " + result.getBody());
        return result.getBody();

    }
}

//    RestTemplate restTemplate = new RestTemplate();
//    HttpHeaders headers = new HttpHeaders(); //헤더
//        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지
//
//    String encodedStartName = URLEncoder.encode(startName, "UTF-8");
//    String encodedEndName = URLEncoder.encode(endName, "UTF-8");
//
//    //URI 생성
//    UriComponents uri = UriComponentsBuilder
//            .fromUriString(tmap_way_url)
//            .path("/tmap/routes/pedestrian")
//            .queryParam("startX", startX) //시작 경도
//            .queryParam("startY", startY) // 시작 위도
//            .queryParam("endX", endX) // 끝 경도
//            .queryParam("endY", endY) // 끝 위도
//            .queryParam("startName", encodedStartName) // 출발지 이름
//            .queryParam("endName", encodedEndName) // 도착지 이름
//            .queryParam("appKey", tmap_apikey) // api appKey
//            .build(true);
//
//    //response
//    ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);
//        System.out.println("result.getBody() = " + result.getBody());
//        return result.getBody();

