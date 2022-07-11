package teletubbies.map.bus;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class BusServiceImpl implements BusService {
    @Value("${BUS_APPKEY}")
    private String bus_apikey; //엘리베이터 API 키 설정

    @Value("${BUS_URL}")
    private String bus_url; //엘리베이터 API 키 설정

    // SERVICE ERROR SERVICE_KEY_IS_NOT_REGISTERED_ERROR 30 (해결 X)
    @SneakyThrows
    public Object findBusStopByBusStopName(String name){ //정류소명으로 정류소 검색
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더

        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(bus_url)
                .queryParam("serviceKey", bus_apikey) //서비스키
                //URLEncoder.encode(name, "UTF-8")
                .queryParam("bstopNm", name) //버스정류소명
                .queryParam("numOfRows", 2) // 개수
                .queryParam("pageNo", 1)
                .queryParam("type","xml")
                .build();

        System.out.println("uri = " + uri);
        // 위에서 출력한 uri 복붙하면 되는데 .. 왜 안될까요.. 수정해야함..ㅠㅠ
        ResponseEntity<String> result = restTemplate.exchange(uri.toUriString(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);
        return result.getBody();
    }
}
