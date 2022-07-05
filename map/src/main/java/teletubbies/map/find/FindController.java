package teletubbies.map.find;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/api")
public class FindController {

    @Value("${TMAP_APPKEY}")
    private String tmap_apiKey; //티맵 API 앱키 설정

    @Value("${ELEVATOR_APPKEY}")
    private String elevator_apikey; //엘리베이터 API 키 설정

     //(티맵) 명칭(POI) 통합 검색
    @GetMapping("/find/address")
    public String tMapAPI() {
        //RestTemplate : REST API 호출이후 응답을 받을 때까지 기다리는 동기방식
        RestTemplate restTemplate = new RestTemplate();

        //URI 생성
        URI uri = UriComponentsBuilder
                .fromUriString("https://apis.openapi.sk.com/")
                .path("tmap/pois")
                .queryParam("version", 1) //version은 1
                .queryParam("searchKeyword","스타벅스 부평점") //일단 스타벅스 부평점으로 검색
                .queryParam("count",1) // 1개만 출력
                .encode()
                .build()
                .toUri();

        //헤더를 넣기 위한 것
        RequestEntity<Void> req = RequestEntity
                .get(uri)
                .header("appKey", tmap_apiKey) //앱키
                .build();

        ResponseEntity<String> result = restTemplate.exchange(req, String.class);
//        System.out.println("result = " + result);

        return result.getBody();
    }

    // 주소로 엘리베이터 검색
    @GetMapping("/find/elevator")
    public Object elevatorAPI() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더

        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl("http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService/getOperationInfoList")
                .queryParam("serviceKey", elevator_apikey) //서비스키
                .queryParam("buld_address", "인천광역시 부평구 부평문화로 35") //주소
                .queryParam("numOfRows", 1) // 개수
                .queryParam("pageNo", 3)
                .build(false);

        Object response = restTemplate.exchange(uri.toUriString(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);
        return response;
    }

}
