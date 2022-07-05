package teletubbies.map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.UnsupportedEncodingException;

@SpringBootTest
class MapApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void apiTest() throws UnsupportedEncodingException {

		//http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService
		String serviceKey="서비스키";

		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();

		//String decodeServiceKey = URLDecoder.decode(serviceKey, "UTF-8");
		UriComponents uri = UriComponentsBuilder
				.fromHttpUrl("http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService/getOperationInfoList")
				.queryParam("serviceKey",serviceKey)
				.queryParam("buld_address","인천광역시 부평구 부평문화로 35") //모다 부평점
				.queryParam("numOfRows",1) // 1개만 출력
				.queryParam("pageNo",1)
				.build(false);
		//System.out.println(uri);

		Object response = restTemplate.exchange(uri.toUriString(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);
		System.out.println(response);
	}
}
