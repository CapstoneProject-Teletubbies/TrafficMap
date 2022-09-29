package teletubbies.map;

import ch.qos.logback.core.net.server.Client;
import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.junit.jupiter.api.Test;
import org.junit.rules.Timeout;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.integration.IntegrationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import reactor.netty.http.client.HttpClient;
import reactor.netty.resources.ConnectionProvider;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.*;
import java.util.function.Consumer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

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

		Mono<String> response1 = wc.get()
				.uri(uriBuilder -> uriBuilder.path("/getOperationInfoList")
						.queryParam("serviceKey",elevator_apikey)
						.queryParam("buld_address",encodedName) //모다 부평점
						.queryParam("numOfRows",1) // 1개만 출력
						.queryParam("pageNo",1).build())
				.retrieve().bodyToMono(String.class);


		Mono<String> response2 = wc.get()
				.uri(uriBuilder -> uriBuilder.path("/getOperationInfoList")
						.queryParam("serviceKey",elevator_apikey)
						.queryParam("buld_address",encodedName) //모다 부평점
						.queryParam("numOfRows",1) // 1개만 출력
						.queryParam("pageNo",1).build())
				.retrieve().bodyToMono(String.class);

		Mono<String> response3 = wc.get()
				.uri(uriBuilder -> uriBuilder.path("/getOperationInfoList")
						.queryParam("serviceKey",elevator_apikey)
						.queryParam("buld_address",encodedName) //모다 부평점
						.queryParam("numOfRows",1) // 1개만 출력
						.queryParam("pageNo",1).build())
				.retrieve().bodyToMono(String.class);

		ArrayList<Mono> res = new ArrayList<>();
		res.add(response1);
		res.add(response2);
		res.add(response3);

		long end = System.currentTimeMillis();
		System.out.println("걸리는 시간 : " + (end - start)/1000.0);

		long start1 = System.currentTimeMillis();
		System.out.println((Mono.zip(response1,response2,response3).block()));

		//Mono.zip



		//objectArray ->
		//                Arrays.stream(objectArray)
		//                        .map(object -> yourMapperFunction(object))
		//                        .collect(Collectors.toList())

		/*System.out.println((Mono.zip(res, objectArray ->
				Arrays.stream(objectArray)
						.map(object -> res.get(i)).block()));
*/

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



	public Mono<String> getEle(String address) {

		DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory("http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService");
		factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.VALUES_ONLY);
		WebClient wc = WebClient.builder().uriBuilderFactory(factory).baseUrl("http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService").build();

		//String encodedName = URLEncoder.encode(address,"UTF-8");

		return wc.get()
				.uri(uriBuilder -> uriBuilder.path("/getOperationInfoList")
						.queryParam("serviceKey",elevator_apikey)
						.queryParam("buld_address",address) //모다 부평점
						.queryParam("numOfRows",1) // 1개만 출력
						.queryParam("pageNo",1).build())
				.retrieve().bodyToMono(String.class);

	}

	public Flux<String> fetchElevator(List<String> adds) throws Exception{



		Flux<String> result = Flux.fromIterable(adds)
				.parallel()
				.runOn(Schedulers.parallel())
				.flatMap(this::getEle)
				.ordered((u1,u2)-> u2.compareTo(u1));
		return result;
	}

	@Test
	public void Elevator() throws Exception {

		List<String> adds = new ArrayList<>();

		String encodedName1 = URLEncoder.encode("인천광역시 부평구 부평문화로 35","UTF-8");
		String encodedName2 = URLEncoder.encode("인천광역시 부평구 부평문화로 35","UTF-8");
		String encodedName3 = URLEncoder.encode("인천광역시 부평구 부평문화로 35","UTF-8");
		String encodedName4 = URLEncoder.encode("인천광역시 부평구 부평문화로 35","UTF-8");
		String encodedName5 = URLEncoder.encode("인천광역시 부평구 부평문화로 35","UTF-8");
		String encodedName6 = URLEncoder.encode("인천광역시 부평구 부평문화로 35","UTF-8");
		String encodedName7 = URLEncoder.encode("인천광역시 부평구 부평문화로 35","UTF-8");
		String encodedName8 = URLEncoder.encode("인천광역시 부평구 부평문화로 35","UTF-8");
		String encodedName9 = URLEncoder.encode("인천광역시 부평구 부평문화로 35","UTF-8");
		String encodedName10 = URLEncoder.encode("인천광역시 부평구 부평문화로 35","UTF-8");

		adds.add(encodedName1);
		adds.add(encodedName2);
		adds.add(encodedName3);
		adds.add(encodedName4);
		adds.add(encodedName5);
		adds.add(encodedName6);
		adds.add(encodedName7);
		adds.add(encodedName8);
		adds.add(encodedName9);
		adds.add(encodedName10);


		DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory("http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService");
		factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.VALUES_ONLY);
		WebClient wc = WebClient.builder().uriBuilderFactory(factory).baseUrl("http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService").build();

		//Client client = new Client("http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService");

		//Flux<String> response=fetchElevator(adds);





		long start = System.currentTimeMillis();

		//response.blockLast();

		List<String> result = fetchElevator(adds).collectList().block();

		long end = System.currentTimeMillis();
		System.out.println("걸리는 시간 : " + (end - start)/1000.0);
		//response.subscribe(i -> System.out.println(i));


		//System.out.println(fetchElevator(adds).blockFirst());
		//System.out.println();

	}


	@Test
	public void Elevator2() throws Exception {

		List<String> adds = new ArrayList<>();
		List<Mono<String>> api = new ArrayList<>();

		String encodedName1 = URLEncoder.encode("인천광역시 부평구 부평문화로 35","UTF-8");
		String encodedName2 = URLEncoder.encode("인천광역시 부평구 부평문화로 35","UTF-8");
		String encodedName3 = URLEncoder.encode("인천광역시 부평구 부평문화로 35","UTF-8");
		String encodedName4 = URLEncoder.encode("인천광역시 부평구 부평문화로 35","UTF-8");

		adds.add(encodedName1);
		adds.add(encodedName2);
		adds.add(encodedName3);
		adds.add(encodedName4);

		DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory("http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService");
		factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.VALUES_ONLY);
		WebClient wc = WebClient.builder().uriBuilderFactory(factory).baseUrl("http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService").build();

		//Client client = new Client("http://openapi.elevator.go.kr/openapi/service/ElevatorOperationService");

		//Flux<String> response=fetchElevator(adds);

		for (int i=0 ; i < 4;i++) {
			Mono<String> response1 = wc.get()
					.uri(uriBuilder -> uriBuilder.path("/getOperationInfoList")
							.queryParam("serviceKey", elevator_apikey)
							.queryParam("buld_address", encodedName1) //모다 부평점
							.queryParam("numOfRows", 1) // 1개만 출력
							.queryParam("pageNo", 1).build())
					.retrieve().bodyToMono(String.class);

			api.add(response1);

		}

		long start = System.currentTimeMillis();

		Mono.zip(api.get(0),api.get(1),api.get(2),api.get(3)).block();

		long end = System.currentTimeMillis();
		System.out.println("걸리는 시간 : " + (end - start)/1000.0);
		//response.subscribe(i -> System.out.println(i));


		//System.out.println(fetchElevator(adds).blockFirst());
		//System.out.println();

	}

	@Test
	void stringSplitTest() {

		String test = "인천광역시 부평구 부평문화로 35";
		String[] t= test.split(" ");
		List<String> result = new ArrayList<String>(Arrays.asList(t));

		result.remove(0);
		String s = result.get(0);
		String r = String.valueOf((s.charAt(s.length()-1)));

		System.out.println(r.equals("구"));

		String result_str = String.join(" ",result);

		System.out.println(result_str);



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

	@Test
	void callPhotoName() throws Exception {

		File doc = new File("C:\\Users\\alicx\\Desktop\\Map\\TrafficMap\\map\\src\\test\\java\\teletubbies\\map\\SubwayPhotoFileName.txt");

		BufferedReader obj = new BufferedReader(new InputStreamReader(new FileInputStream(doc), "utf-8"));
		String[] Name;
		String str;
		String key;
		String value;
		MultiValueMap<String,String> map = new LinkedMultiValueMap<String,String>();
		while((str=obj.readLine())!=null){
			Name = str.split("\\t");
			key = Name[0];
			value = Name[1];
			map.add(key, value);
		}

		System.out.println(map.get("인천시청"));

	}

	@Test
	void callPhotoName2() throws Exception{
		File doc = new File("C:\\Users\\alicx\\Desktop\\Map\\TrafficMap\\map\\src\\test\\java\\teletubbies\\map\\SubwayPhotoFileName.txt");

		BufferedReader obj = new BufferedReader(new InputStreamReader(new FileInputStream(doc), "utf-8"));
		String[] Name;
		String str;
		String key;
		String value;

		List<String> result = new ArrayList<String>();

		String test="인천시청";

		while((str=obj.readLine())!=null){
			Name = str.split("\\t");
			key = Name[0];
			value = Name[1];
			if(key.equals(test)){
				result.add(value);}
		}

		System.out.println(result);

		//,,,? 어느 포인트에서 안되는겅미..?
	}

	@Test
	void callSubwayNum() throws Exception{
		File doc = new File("C:\\Users\\alicx\\Desktop\\Map\\TrafficMap\\map\\src\\test\\java\\teletubbies\\map\\SubwayNumber.txt");

		BufferedReader obj = new BufferedReader(new InputStreamReader(new FileInputStream(doc), "utf-8"));
		String[] Name;
		String str;
		String RAIL_OPR_ISTT_CD;
		String LN_CD;
		String STIN_CD;
		String SubwayName;
		String test;

		MultiValueMap<String,String> map = new LinkedMultiValueMap<String,String>();
		while((str=obj.readLine())!=null){
			Name = str.split("\\t");
			RAIL_OPR_ISTT_CD = Name[0];
			LN_CD = Name[2];
			STIN_CD = Name[4];
			SubwayName = Name[3]+" "+Name[5];
			test=RAIL_OPR_ISTT_CD+" "+LN_CD+" "+STIN_CD;

			map.add(SubwayName, test);
		}
		System.out.println("출력 되나");
		System.out.println(map.get("1호선 부평"));


	}

	@Test
	void call() throws Exception{
		File doc = new File("C:\\Users\\alicx\\Desktop\\Map\\TrafficMap\\map\\src\\test\\java\\teletubbies\\map\\stair.txt");

		BufferedReader obj = new BufferedReader(new InputStreamReader(new FileInputStream(doc), "utf-8"));
		String[] Name;
		String str;
		String name=null;
		String lat=null;
		String longt = null;


		MultiValueMap<String,String> map = new LinkedMultiValueMap<String,String>();
		while((str=obj.readLine())!=null){
			Name = str.split("\\t");
			name = Name[0];
			lat= Name[1];
			longt = Name[2];

		}
		System.out.println(name+lat+longt);
		System.out.println(map.get("1호선 부평"));



		}


	@Test
	void gwalho(){
		String str = "종로3가(어쩌구)";

		String str2=str.replaceAll("\\(.*?\\)","");

		System.out.println(str2);

	}

	@Test
	void regularExpression () {


		String a = "11아파트";
		Pattern str_a = Pattern.compile("아파트");

		Matcher matcher = str_a.matcher(a);

		System.out.println(matcher.find());
	}


}