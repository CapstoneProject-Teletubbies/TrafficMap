package teletubbies.map;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.junit.jupiter.api.Test;
import org.junit.rules.Timeout;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import reactor.netty.http.client.HttpClient;
import reactor.netty.resources.ConnectionProvider;

import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.time.Duration;
import java.util.function.Consumer;

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

	@Value("${ELEVATOR_APPKEY}")
	private String elevator_apikey; //버스 API 키 설정

	@Test
	void apiTestWebClient() throws UnsupportedEncodingException {

		long start = System.currentTimeMillis();
		DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory("http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService");
		factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.VALUES_ONLY);

		WebClient wc = WebClient.builder().uriBuilderFactory(factory).baseUrl("http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService").build();

		String encodedName = URLEncoder.encode("인천광역시 부평구 부평문화로 35","UTF-8");

		Mono<String> response = wc.get()
				.uri(uriBuilder -> uriBuilder.path("/getOperationInfoList")
						.queryParam("serviceKey",elevator_apikey)
						.queryParam("buld_address",encodedName) //모다 부평점
						.queryParam("numOfRows",1) // 1개만 출력
						.queryParam("pageNo",1).build())
				.retrieve().bodyToMono(String.class);//.block();
		long end = System.currentTimeMillis();
		System.out.println("걸리는 시간 : " + (end - start)/1000.0);

		long start1 = System.currentTimeMillis();
		response.subscribe( (data)->{
			System.out.println(data);
		});
		long end1 = System.currentTimeMillis();

		System.out.println("걸리는 시간 : " + (end1 - start1)/1000.0);

		/*
		Mono<String> mono = (Mono<String>) WebClient.builder().baseUrl("http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService")
				.build().get()
				.uri(builder -> builder.path("/getOperationInfoList")
						.queryParam("serviceKey",elevator_apikey)
						.queryParam("buld_address","인천광역시 부평구 부평문화로 35") //모다 부평점
						.queryParam("numOfRows",1) // 1개만 출력
						.queryParam("pageNo",1)
						.build()
				);

		System.out.println(mono);*/



	}

	@Test
	void apiTestWebClient2() throws UnsupportedEncodingException {

		DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory("http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService");
		factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.VALUES_ONLY);
		String connectionProviderName = "customConnectionProvider";
		int maxConnections = 1000;
		int acquireTimeout = 45;
		ConnectionProvider connectionProvider = ConnectionProvider.builder(connectionProviderName)
				.maxConnections(maxConnections)
				.pendingAcquireTimeout(Duration.ofSeconds(acquireTimeout))
				.build();
		HttpClient httpClient = HttpClient.create(connectionProvider)
				.tcpConfiguration(tcpClient -> tcpClient.option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 60000)
						.doOnConnected(connection -> {
							connection.addHandlerLast(new ReadTimeoutHandler(300));
							connection.addHandlerLast(new WriteTimeoutHandler(300));
						}));

		WebClient wc = WebClient.builder().clientConnector(new ReactorClientHttpConnector(httpClient)).uriBuilderFactory(factory).baseUrl("http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService").build();


		String encodedName = URLEncoder.encode("인천광역시 부평구 부평문화로 35", "UTF-8");

		Mono<String> response = wc.get()
				.uri(uriBuilder -> uriBuilder.path("/getOperationInfoList")
						.queryParam("serviceKey", elevator_apikey)
						.queryParam("buld_address", encodedName) //모다 부평점
						.queryParam("numOfRows", 1) // 1개만 출력
						.queryParam("pageNo", 1).build())
				.retrieve().bodyToMono(String.class);

		//System.out.println(response.block());
		//response.doOnNext(Thread.sleep(1000)).doOnSuccess(value -> System.out.println("success1"+value));

		//Timeout.millis(1000);
/*
		response.subscribe(
				value -> System.out.println("결과: "+value)//,
				//error -> error.printStackTrace(),
				//() -> System.out.println("completed without a value")
		);
*/



	}


	/*
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
    */
	@Value("${BUS_APPKEY}")
	private String bus_apikey; //버스 API 키 설정

	@Value("${BUS_URL}")
	private String bus_url; //버스 URL 설정

	@Test
	void apiTest2() throws UnsupportedEncodingException {

		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders(); //헤더

		//String decodeServiceKey = URLDecoder.decode(bus_apikey, "UTF-8");
		String encodedName = URLEncoder.encode("부평","UTF-8");

		UriComponents uri = UriComponentsBuilder
				.fromHttpUrl(bus_url)
				.queryParam("serviceKey", bus_apikey) //서비스키
				//URLEncoder.encode(name, "UTF-8")
				.queryParam("bstopNm", encodedName) //버스정류소명
				.queryParam("numOfRows", 2) // 개수
				.queryParam("pageNo", 1)
				.build(true);

		System.out.println("uri = " + uri);

		// 위에서 출력한 uri 복붙하면 되는데 .. 왜 안될까요.. 수정해야함..ㅠㅠ
		ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);

		System.out.println(result);


	}

///*
//	@Test
//	void httpApi(){
//		StringBuffer result = new StringBuffer();
//
//
//		.uri(uriBuilder -> uriBuilder.path("/getOperationInfoList")
//						.queryParam("serviceKey",elevator_apikey)
//						.queryParam("buld_address",encodedName) //모다 부평점
//						.queryParam("numOfRows",1) // 1개만 출력
//						.queryParam("pageNo",1).build())
//
//		String encodedName = URLEncoder.encode("인천광역시 부평구 부평문화로 35","UTF-8");
//
//
//		String encodedName = URLEncoder.encode("인천광역시 부평구 부평문화로 35","UTF-8");
//		try{
//			String urlstr = "http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService/getOperationInfoList"
//					+"?serviceKey="+elevator_apikey
//					+"&buld_address="+encodedName
//					+"&numOfRow=1&pageNo=1";
//			URL url=new URL(urlstr);
//			HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
//
//		}
//	}
//	*/


}
