package teletubbies.map.find;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import java.net.URI;

@Service
public class FindServiceImpl implements FindService{
    @Value("${TMAP_APPKEY}")
    private String tmap_apiKey; //티맵 API 앱키 설정

    @Value("${ELEVATOR_APPKEY}")
    private String elevator_apikey; //엘리베이터 API 키 설정

    @Value("${TMAP_URL}")
    private String tmap_url;

    @Value("${ELEVATOR_URL}")
    private String elevator_url;

    public String findAddressByTmapAPI(String FindName) { // 통합 검색해서
        //RestTemplate : REST API 호출이후 응답을 받을 때까지 기다리는 동기방식
        RestTemplate restTemplate = new RestTemplate();

        //URI 생성
        URI uri = UriComponentsBuilder
                .fromUriString(tmap_url)
                .queryParam("version", 1) //version은 1
                .queryParam("searchKeyword",FindName) //일단 스타벅스 부평점으로 검색
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

        FindDto findDto = new FindDto();
        findDto.setName(FindName);

        System.out.println("findDto.getName() = " + findDto.getName());


        return result.getBody();
    }

    public String findElevatorByAPI(String address) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더

        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(elevator_url)
                .queryParam("serviceKey", elevator_apikey) //서비스키
                .queryParam("buld_address", address) //주소
                .queryParam("numOfRows", 1) // 개수
                .queryParam("pageNo", 3)
                .build(false);

        ResponseEntity<String> response = restTemplate.exchange(uri.toUriString(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);
        return response.getBody();
    }

}
