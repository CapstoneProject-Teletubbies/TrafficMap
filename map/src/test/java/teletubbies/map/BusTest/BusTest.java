package teletubbies.map.BusTest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

public class BusTest {
    @Value("${BUS_APPKEY}")
    private String bus_apikey; //엘리베이터 API 키 설정

    @Value("${BUS_URL}")
    private String bus_url; //엘리베이터 API 키 설정

    @Test
    void apiTest() {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        //String decodeServiceKey = URLDecoder.decode(serviceKey, "UTF-8");
        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl("http://apis.data.go.kr/6280000/busStationService/getBusStationNmList")
                .queryParam("serviceKey", bus_apikey)
                .queryParam("bstopNm", "롯데백화점")
                .queryParam("numOfRows", 1) // 1개만 출력
                .queryParam("pageNo", 1)
                .build(false);
        //System.out.println(uri);

        Object response = restTemplate.exchange(uri.toUriString(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);
        System.out.println("response = " + response);
    }
}
