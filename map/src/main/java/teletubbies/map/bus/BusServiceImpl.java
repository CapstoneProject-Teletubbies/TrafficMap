package teletubbies.map.bus;

import lombok.SneakyThrows;
import org.json.JSONObject;
import org.json.XML;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 반복되는 코드 많아서 이 부분 나중에 수정할 것!!!!
 */
@Service
public class BusServiceImpl implements BusService {
    @Value("${BUS_APPKEY}")
    private String bus_apikey; //버스 API 키 설정

    //버스 URL 설정
    @Value("${BUS_URL}")
    private String bus_url; // 정류소명으로 정류소(ID) 검색
     @Value("${BUSLOCATION_URL}")
    private String busLocation_url;
    @Value("${BUSID_URL}")
    private String busId_url;
    @Value("${BUSIDLIST_URL}")
    private String busIdList_url;
    @Value("${BUSNUM_URL}")
    private String busNum_url;
    @Value("${BSTOPID_URL}")
    private String busStopId_url;

    @SneakyThrows
    public List<BusStopDto> findBusStopByBusStopName(String name) { //정류소명으로 정류소(ID) 검색

        if(name.matches("\\d+")){
            return null;
        }

        name =getBusStopName(name);

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        //서비스 키와, 검색할 정류소 인코딩
        String encodedKey = URLEncoder.encode(bus_apikey, "UTF-8");
        String encodedName = URLEncoder.encode(name, "UTF-8");

        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(bus_url)
                .queryParam("serviceKey", encodedKey) //서비스키
                .queryParam("bstopNm", encodedName) //버스정류소명
                .queryParam("numOfRows", 5) // 개수
                .queryParam("pageNo", 1)
                .build(true);

        ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);

        //xml 형식을 json 형식으로 변환
        JSONObject response = XML.toJSONObject(result.getBody());
        JSONObject ServiceResult = response.getJSONObject("ServiceResult"); // ServiceResult의 value들
        if(ServiceResult == null) { //아마 호출실패
            findBusStopByBusStopName(name); //다시불러
//            return null;
        }
        JSONObject msgHeader = ServiceResult.getJSONObject("msgHeader"); //msgHeader의 value들

        if(msgHeader.get("resultCode").equals(0)) { // 결과가 있을 경우
            JSONObject msgBody = ServiceResult.getJSONObject("msgBody"); // msgBody의 value들

            if (msgBody.get("itemList").getClass().getName() != "org.json.JSONObject") { // itemList가 JSONArray라면 (여러개)
                JSONArray itemList =  msgBody.getJSONArray("itemList"); // itemList의 value들

                List<BusStopDto> dtos = new ArrayList<>();

//                System.out.println("정류소명으로 정류소(ID) 검색");
                for (int i = 0; i < itemList.length(); i++) { // 받아올 데이터 개수만큼 반복
                    JSONObject array = itemList.getJSONObject(i);
                    BusStopDto busStopDto = new BusStopDto();

                    Integer BSTOPID = array.getInt("BSTOPID"); // 정류소 ID
                    Integer SHORT_BSTOPID = array.getInt("SHORT_BSTOPID"); // 단축 정류소ID
                    String BSTOPNM = array.getString("BSTOPNM"); // 정류소명
                    BigDecimal POSX = array.getBigDecimal("POSX"); // X좌표
                    BigDecimal POSY = array.getBigDecimal("POSY"); // Y좌표

                    busStopDto.setBSTOPID(BSTOPID);
                    busStopDto.setSHORT_BSTOPID(SHORT_BSTOPID);
                    busStopDto.setBSTOPNM(BSTOPNM);
                    busStopDto.setPOSX(POSX);
                    busStopDto.setPOSY(POSY);
                    busStopDto.setBusStop(true);

                    dtos.add(i, busStopDto);
                }
                return dtos;
            }

            else { //itemList가 JSONObject라면 (1개)
                JSONObject itemList = msgBody.getJSONObject("itemList");

                List<BusStopDto> dtos = new ArrayList<>();
                BusStopDto busStopDto = new BusStopDto();

                Integer BSTOPID = itemList.getInt("BSTOPID"); // 정류소 ID
                Integer SHORT_BSTOPID = itemList.getInt("SHORT_BSTOPID"); // 단축 정류소ID
                String BSTOPNM = itemList.getString("BSTOPNM"); // 정류소 ID
                BigDecimal POSX = itemList.getBigDecimal("POSX"); // X좌표
                BigDecimal POSY = itemList.getBigDecimal("POSY"); // Y좌표

                busStopDto.setBSTOPID(BSTOPID);
                busStopDto.setSHORT_BSTOPID(SHORT_BSTOPID);
                busStopDto.setBSTOPNM(BSTOPNM);
                busStopDto.setPOSX(POSX);
                busStopDto.setPOSY(POSY);
                busStopDto.setBusStop(true);

                dtos.add(busStopDto);
                return dtos;
            }
        }

        else { // 결과가 없을 경우 (itemList이 X)
            return null;
        }
    }

    @SneakyThrows
    public List<BusLocationDto> findBusLocationtByRouteId(int routeId) { // 노선 ID로 버스 위치 조회
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        String encodedKey = URLEncoder.encode(bus_apikey, "UTF-8"); //서비스 키 인코딩

        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(busLocation_url)
                .queryParam("serviceKey", encodedKey) // 서비스키
                .queryParam("routeId", routeId) // routeID
                .queryParam("numOfRows", 50) // 개수
                .queryParam("pageNo", 1)
                .build(true);

        ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);

        JSONObject response = XML.toJSONObject(result.getBody()); // xml 형식을 json 형식으로 변환
        JSONObject ServiceResult = response.getJSONObject("ServiceResult"); //ServiceResult의 value들
//        System.out.println("ServiceResult = " + ServiceResult);
        JSONObject msgHeader = ServiceResult.getJSONObject("msgHeader"); //msgHeader의 value들
        Integer totalCount = msgHeader.getInt("totalCount"); // 총 개수

        if (msgHeader.get("resultCode").equals(0)) { //결과가 있을 경우
            JSONObject msgBody = ServiceResult.getJSONObject("msgBody"); //msgBody의 value들

            if (msgBody.get("itemList").getClass().getName() != "org.json.JSONObject") { // itemList가 JSONArray라면 (여러개)
                JSONArray itemList = msgBody.getJSONArray("itemList"); //itemList의 value들

                List<BusLocationDto> dtos = new ArrayList<>();

//                System.out.println("routeID로 버스 위치 조회");
                for (int i = 0; i < totalCount; i++) { // 총 개수 만큼 반복
                    JSONObject array = itemList.getJSONObject(i);
                    BusLocationDto busLocationDto = new BusLocationDto();

                    Integer BUSID = array.getInt("BUSID"); // 버스 ID
                    String BUS_NUM_PLATE = array.getString("BUS_NUM_PLATE"); // 차량 번호
                    Integer LOW_TP_CD = array.getInt("LOW_TP_CD"); // 저상버스 여부 (0:일반, 1:저상)
                    Integer DIRCD = array.getInt("DIRCD"); // 진행방향코드(0:상행, 1:하행, 2:순환)
                    Integer PATHSEQ = array.getInt("PATHSEQ"); // 노드 순번
                    Integer LATEST_STOPSEQ = array.getInt("LATEST_STOPSEQ"); // 최근 정류소순번
                    Integer LATEST_STOP_ID = array.getInt("LATEST_STOP_ID"); // 최근 정류소ID
                    String LATEST_STOP_NAME = array.getString("LATEST_STOP_NAME"); // 최근 정류소 명
                    Integer REMAIND_SEAT = array.getInt("REMAIND_SEAT"); // 차량 빈자리 수(255:사용안함)
                    Integer CONGESTION = array.getInt("CONGESTION"); // 혼잡도(1:여유, 2:보통, 3:혼잡, 255:사용안함)
                    Integer LASTBUSYN = array.getInt("LASTBUSYN"); // 막차 코드(0:일반, 1:막차)

                    busLocationDto.setBUSID(BUSID);
                    busLocationDto.setBUS_NUM_PLATE(BUS_NUM_PLATE);
                    busLocationDto.setLOW_TP_CD(LOW_TP_CD);
                    busLocationDto.setDIRCD(DIRCD);
                    busLocationDto.setPATHSEQ(PATHSEQ);
                    busLocationDto.setLATEST_STOPSEQ(LATEST_STOPSEQ);
                    busLocationDto.setLATEST_STOP_ID(LATEST_STOP_ID);
                    busLocationDto.setLATEST_STOP_NAME(LATEST_STOP_NAME);
                    busLocationDto.setREMAIND_SEAT(REMAIND_SEAT);
                    busLocationDto.setCONGESTION(CONGESTION);
                    busLocationDto.setLASTBUSYN(LASTBUSYN);

                    dtos.add(i, busLocationDto);
                }

                return dtos;
            }
            else { //itemList가 JSONObject라면 (1개)
                JSONObject itemList = msgBody.getJSONObject("itemList");

                List<BusLocationDto> dtos = new ArrayList<>();
                BusLocationDto busLocationDto = new BusLocationDto();

                Integer BUSID = itemList.getInt("BUSID"); // 버스 ID
                String BUS_NUM_PLATE = itemList.getString("BUS_NUM_PLATE"); // 차량 번호
                Integer LOW_TP_CD = itemList.getInt("LOW_TP_CD"); // 저상버스 여부 (0:일반, 1:저상)
                Integer DIRCD = itemList.getInt("DIRCD"); // 진행방향코드(0:상행, 1:하행, 2:순환)
                Integer PATHSEQ = itemList.getInt("PATHSEQ"); // 노드 순번
                Integer LATEST_STOPSEQ = itemList.getInt("LATEST_STOPSEQ"); // 최근 정류소순번
                Integer LATEST_STOP_ID = itemList.getInt("LATEST_STOP_ID"); // 최근 정류소ID
                String LATEST_STOP_NAME = itemList.getString("LATEST_STOP_NAME"); // 최근 정류소 명
                Integer REMAIND_SEAT = itemList.getInt("REMAIND_SEAT"); // 차량 빈자리 수(255:사용안함)
                Integer CONGESTION = itemList.getInt("CONGESTION"); // 혼잡도(1:여유, 2:보통, 3:혼잡, 255:사용안함)
                Integer LASTBUSYN = itemList.getInt("LASTBUSYN"); // 막차 코드(0:일반, 1:막차)

                busLocationDto.setBUSID(BUSID);
                busLocationDto.setBUS_NUM_PLATE(BUS_NUM_PLATE);
                busLocationDto.setLOW_TP_CD(LOW_TP_CD);
                busLocationDto.setDIRCD(DIRCD);
                busLocationDto.setPATHSEQ(PATHSEQ);
                busLocationDto.setLATEST_STOPSEQ(LATEST_STOPSEQ);
                busLocationDto.setLATEST_STOP_ID(LATEST_STOP_ID);
                busLocationDto.setLATEST_STOP_NAME(LATEST_STOP_NAME);
                busLocationDto.setREMAIND_SEAT(REMAIND_SEAT);
                busLocationDto.setCONGESTION(CONGESTION);
                busLocationDto.setLASTBUSYN(LASTBUSYN);
                dtos.add(busLocationDto);

                return dtos;
            }
        }
        else { // 결과가 없을 경우
            return null;
        }
    }

    @SneakyThrows
    public List<BusRouteDetailDto> findBusRouteDetailByRouteId(int routeId) { // 노선 ID로 상세 정보 조회
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        String encodedKey = URLEncoder.encode(bus_apikey, "UTF-8"); //서비스 키 인코딩

        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(busId_url)
                .queryParam("serviceKey", encodedKey) //서비스키
                .queryParam("routeId", routeId) // routeID
                .queryParam("numOfRows", 20) // 개수
                .queryParam("pageNo", 1)
                .build(true);

        ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);

        JSONObject response = XML.toJSONObject(result.getBody()); //xml 형식을 json 형식으로 변환

        JSONObject ServiceResult = response.getJSONObject("ServiceResult"); //ServiceResult의 value들
        JSONObject msgHeader = ServiceResult.getJSONObject("msgHeader"); //msgHeader의 value들

        if (msgHeader.get("resultCode").equals(0)) { // 결과가 있을 경우
            JSONObject msgBody = ServiceResult.getJSONObject("msgBody"); //msgBody의 value들
            JSONObject itemList = msgBody.getJSONObject("itemList"); //itemList의 value들

            List<BusRouteDetailDto> dtos = new ArrayList<>();

//            System.out.println("routeID로 상세 정보 조회");
            BusRouteDetailDto busRouteDetailDto = new BusRouteDetailDto();

            Integer ROUTEID = itemList.getInt("ROUTEID"); // 버스 노선 고유번호
            Object ROUTENO = itemList.get("ROUTENO"); // 노선 명
            Integer ROUTETPCD = itemList.getInt("ROUTETPCD"); // 노선유형코드 [1:지선형, 2:간선형, 3:좌석형, 4:광역형, 5:리무진, 6:마을버스, 7:순환형, 8:급행간선, 9:지선(순환)]
            Object FBUS_DEPHMS = itemList.get("FBUS_DEPHMS"); // 첫차 시간 hhm169000015m
            Object LBUS_DEPHMS = itemList.get("LBUS_DEPHMS"); // 막차 시간 hhmm
            Object MIN_ALLOCGAP = itemList.get("MIN_ALLOCGAP"); // 	최소 배차간격
            Object MAX_ALLOCGAP = itemList.get("MAX_ALLOCGAP"); // 최대 배차간격
            Integer TURN_BSTOPID = itemList.getInt("TURN_BSTOPID"); // 회차지 정류소ID
            String TURN_BSTOPNM = itemList.getString("TURN_BSTOPNM"); // 회차지 정류소명
            Integer ORIGIN_BSTOPID = itemList.getInt("ORIGIN_BSTOPID"); // 기점 정류소ID
            String ORIGIN_BSTOPNM = itemList.getString("ORIGIN_BSTOPNM"); // 기점 정류소명
            Integer DEST_BSTOPID = itemList.getInt("DEST_BSTOPID"); // 종점 정류소ID
            String DEST_BSTOPNM = itemList.getString("DEST_BSTOPNM"); // 종점 정류소명

            busRouteDetailDto.setROUTEID(ROUTEID);
            busRouteDetailDto.setROUTENO(ROUTENO);
            busRouteDetailDto.setROUTETPCD(ROUTETPCD);
            busRouteDetailDto.setFBUS_DEPHMS(FBUS_DEPHMS);
            busRouteDetailDto.setLBUS_DEPHMS(LBUS_DEPHMS);
            busRouteDetailDto.setMIN_ALLOCGAP(MIN_ALLOCGAP);
            busRouteDetailDto.setMAX_ALLOCGAP(MAX_ALLOCGAP);
            busRouteDetailDto.setTURN_BSTOPID(TURN_BSTOPID);
            busRouteDetailDto.setTURN_BSTOPNM(TURN_BSTOPNM);
            busRouteDetailDto.setORIGIN_BSTOPID(ORIGIN_BSTOPID);
            busRouteDetailDto.setORIGIN_BSTOPNM(ORIGIN_BSTOPNM);
            busRouteDetailDto.setDEST_BSTOPID(DEST_BSTOPID);
            busRouteDetailDto.setDEST_BSTOPNM(DEST_BSTOPNM);

            dtos.add(busRouteDetailDto);
            return dtos;
        }
        else { // 결과가 없을 경우
            return null;
        }
    }

    @SneakyThrows
    public List<BusRouteListDto> findBusRouteListByRouteId(int routeId) { // 노선 ID로 버스 정류소 목록 검색
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        String encodedKey = URLEncoder.encode(bus_apikey, "UTF-8"); //서비스 키 인코딩

        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(busIdList_url)
                .queryParam("serviceKey", encodedKey) //서비스키
                .queryParam("routeId", routeId) // routeID
                .queryParam("numOfRows", 300) // 개수
                .queryParam("pageNo", 1)
                .build(true);

        ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);

        JSONObject response = XML.toJSONObject(result.getBody()); //xml 형식을 json 형식으로 변환

        JSONObject ServiceResult =  response.getJSONObject("ServiceResult"); //ServiceResult의 value들
        JSONObject msgHeader = ServiceResult.getJSONObject("msgHeader"); //msgHeader의 value들
        Integer totalCount = msgHeader.getInt("totalCount"); // 정류장 총 개수

        if(msgHeader.get("resultCode").equals(0)) { // 결과가 있을 경우
            JSONObject msgBody = ServiceResult.getJSONObject("msgBody"); //msgBody의 value들
            JSONArray itemList = msgBody.getJSONArray("itemList"); //itemList의 value들

            List<BusRouteListDto> dtos = new ArrayList<>();
//            System.out.println("routeID로 노선 검색");
            for (int i = 0; i < totalCount; i++) { // 정류장 개수만큼 반복
                JSONObject array = itemList.getJSONObject(i);
                BusRouteListDto busRouteListDto = new BusRouteListDto();

                String BSTOPNM = array.getString("BSTOPNM"); // 정류장 이름
                Integer BSTOPID = array.getInt("BSTOPID"); // 정류소 ID
                Integer SHORT_BSTOPID = array.getInt("SHORT_BSTOPID"); // 단축 정류소ID
                Integer PATHSEQ = array.getInt("PATHSEQ"); // 노드 순번
                Integer BSTOPSEQ = array.getInt("BSTOPSEQ"); // 정류소 순번
                Integer DIRCD = array.getInt("DIRCD"); // 방향코드(0:상행, 1:하행, 2:순환)
                BigDecimal POSX = array.getBigDecimal("POSX"); // X 좌표
                BigDecimal POSY = array.getBigDecimal("POSY"); // Y 좌표

                busRouteListDto.setBSTOPNM(BSTOPNM);
                busRouteListDto.setBSTOPID(BSTOPID);
                busRouteListDto.setSHORT_BSTOPID(SHORT_BSTOPID);
                busRouteListDto.setPATHSEQ(PATHSEQ);
                busRouteListDto.setBSTOPSEQ(BSTOPSEQ);
                busRouteListDto.setDIRCD(DIRCD);
                busRouteListDto.setPOSX(POSX);
                busRouteListDto.setPOSY(POSY);

                dtos.add(i, busRouteListDto);
            }
            return dtos;
        }
        else{ // 결과가 없을 경우
            return null;
        }
    }

    @SneakyThrows
    public List<BusInfoDto> findBusInfoByBusNum(Object busNum) { // 버스 번호로 버스 정보 조회

        long start2 = System.currentTimeMillis();

        String str_busNum = String.valueOf(busNum);
        int result_count = 3;

        Pattern regex1 = Pattern.compile("버스");
        Matcher regexMatcher1 = regex1.matcher(str_busNum);
        if(regexMatcher1.find()){
            result_count = 10;
            Pattern regex = Pattern.compile("\\d+");
            Matcher regexMatcher = regex.matcher(str_busNum);
            if (regexMatcher.find()) {
                str_busNum = regexMatcher.group();
                busNum = str_busNum;
            }
        }

        String a= str_busNum;
        String str_a = "\\W+"+a;
        String a_str = a+"\\W+";
        String a_str_s=a+"(\\W+)";
        String a_h_d = a+"-\\d+";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        String encodedKey = URLEncoder.encode(bus_apikey, "UTF-8"); //서비스 키 인코딩

        if (busNum.getClass().getName() == "java.lang.String") { //버스 번호가 String이면 인코딩
            busNum = URLEncoder.encode(busNum.toString(), "UTF-8");
        }

        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(busNum_url)
                .queryParam("serviceKey", encodedKey) // 서비스키
                .queryParam("routeNo", busNum) // 버스 번호
                .queryParam("numOfRows", 318) // 개수
                .queryParam("pageNo", 1)
                .build(true);

        ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);

        JSONObject response = XML.toJSONObject(result.getBody()); //xml 형식을 json 형식으로 변환
        JSONObject ServiceResult = response.getJSONObject("ServiceResult"); //ServiceResult의 value들
        JSONObject msgHeader = ServiceResult.getJSONObject("msgHeader"); //msgBody의 value들
        Integer totalCount = msgHeader.getInt("totalCount");; //msgBody의 value들
        
        if (msgHeader.get("resultCode").equals(0)) { // 결과가 있다면
            JSONObject msgBody = ServiceResult.getJSONObject("msgBody"); //msgBody의 value들

            if(msgBody.get("itemList").getClass().getName() == "org.json.JSONArray") { // itemList가 JSONArray 라면 (여러개)
                JSONArray itemList = msgBody.getJSONArray("itemList"); //itemList의 value들

                List<BusInfoDto> dtos = new ArrayList<>();
//                System.out.println(" 버스번호로 버스정보 조회");

                int i = 0;
                int j = 0;
                while (i < result_count && j < totalCount) { // 아이템리스트 반환개수만큼
                    JSONObject array = (JSONObject) itemList.get(j);
                    BusInfoDto busInfoDto = new BusInfoDto();

                    Object ROUTENO = array.get("ROUTENO"); // 노선 번호
                    String str_routeno = ROUTENO.toString();
                    if (str_routeno.matches(a) | str_routeno.matches(str_a) | str_routeno.matches(a_str) | str_routeno.matches(a_str_s) | str_routeno.matches(a_h_d)) { //해당하는 버스 번호의 버스 정보만 출력
                        Integer ROUTEID = array.getInt("ROUTEID"); // 노선 ID
                        Integer ROUTETPCD = array.getInt("ROUTETPCD"); // 노선 유형코드
                        Object FBUS_DEPHMS = array.get("FBUS_DEPHMS"); // 첫차 시간
                        Object LBUS_DEPHMS = array.get("LBUS_DEPHMS"); // 막차 시간
                        Integer MIN_ALLOCGAP = array.getInt("MIN_ALLOCGAP"); //최소 배차간격
                        Integer MAX_ALLOCGAP = array.getInt("MAX_ALLOCGAP"); //최대 배차간격
                        Integer TURN_BSTOPID = array.getInt("TURN_BSTOPID"); //회차지 정류소 ID
                        String TURN_BSTOPNM = array.getString("TURN_BSTOPNM"); // 회차지 정류소명
                        Integer ORIGIN_BSTOPID = array.getInt("ORIGIN_BSTOPID"); // 기점 정류소 ID
                        String ORIGIN_BSTOPNM = array.getString("ORIGIN_BSTOPNM"); // 기점 정류소 명
                        Integer DEST_BSTOPID = array.getInt("DEST_BSTOPID"); //종점 정류소 ID
                        String DEST_BSTOPNM = array.getString("DEST_BSTOPNM"); // 종점 정류소명

                        busInfoDto.setROUTENO(ROUTENO);
                        busInfoDto.setROUTEID(ROUTEID);
                        busInfoDto.setROUTETPCD(ROUTETPCD);
                        busInfoDto.setFBUS_DEPHMS(FBUS_DEPHMS);
                        busInfoDto.setLBUS_DEPHMS(LBUS_DEPHMS);
                        busInfoDto.setMIN_ALLOCGAP(MIN_ALLOCGAP);
                        busInfoDto.setMAX_ALLOCGAP(MAX_ALLOCGAP);
                        busInfoDto.setTURN_BSTOPID(TURN_BSTOPID);
                        busInfoDto.setTURN_BSTOPNM(TURN_BSTOPNM);
                        busInfoDto.setORIGIN_BSTOPID(ORIGIN_BSTOPID);
                        busInfoDto.setORIGIN_BSTOPNM(ORIGIN_BSTOPNM);
                        busInfoDto.setDEST_BSTOPID(DEST_BSTOPID);
                        busInfoDto.setDEST_BSTOPNM(DEST_BSTOPNM);

                        dtos.add(i, busInfoDto);
                        i += 1;
                    }
                    j += 1;
                }
                long end2 = System.currentTimeMillis();
                System.out.println("버스 시간 : "+(end2-start2)/1000.0);
                return dtos;
            }

            else { // itemList가 JSONObject 라면 (1개)
            JSONObject itemList = msgBody.getJSONObject("itemList");
                List<BusInfoDto> dtos = new ArrayList<>();
                BusInfoDto busInfoDto = new BusInfoDto();

                Object ROUTENO = itemList.get("ROUTENO"); // 노선 번호
                Integer ROUTEID = itemList.getInt("ROUTEID"); // 노선 ID
                Integer ROUTETPCD = itemList.getInt("ROUTETPCD"); // 노선 유형코드
                Object FBUS_DEPHMS = itemList.get("FBUS_DEPHMS"); // 첫차 시간
                Object LBUS_DEPHMS = itemList.get("LBUS_DEPHMS"); // 막차 시간
                Integer MIN_ALLOCGAP = itemList.getInt("MIN_ALLOCGAP"); //최소 배차간격
                Integer MAX_ALLOCGAP = itemList.getInt("MAX_ALLOCGAP"); //최대 배차간격
                Integer TURN_BSTOPID = itemList.getInt("TURN_BSTOPID"); //회차지 정류소 ID
                String TURN_BSTOPNM = itemList.getString("TURN_BSTOPNM"); // 회차지 정류소명
                Integer ORIGIN_BSTOPID = itemList.getInt("ORIGIN_BSTOPID"); // 기점 정류소 ID
                String ORIGIN_BSTOPNM = itemList.getString("ORIGIN_BSTOPNM"); // 기점 정류소 명
                Integer DEST_BSTOPID = itemList.getInt("DEST_BSTOPID"); //종점 정류소 ID
                String DEST_BSTOPNM = itemList.getString("DEST_BSTOPNM"); // 종점 정류소명

                busInfoDto.setROUTENO(ROUTENO);
                busInfoDto.setROUTEID(ROUTEID);
                busInfoDto.setROUTETPCD(ROUTETPCD);
                busInfoDto.setFBUS_DEPHMS(FBUS_DEPHMS);
                busInfoDto.setLBUS_DEPHMS(LBUS_DEPHMS);
                busInfoDto.setMIN_ALLOCGAP(MIN_ALLOCGAP);
                busInfoDto.setMAX_ALLOCGAP(MAX_ALLOCGAP);
                busInfoDto.setTURN_BSTOPID(TURN_BSTOPID);
                busInfoDto.setTURN_BSTOPNM(TURN_BSTOPNM);
                busInfoDto.setORIGIN_BSTOPID(ORIGIN_BSTOPID);
                busInfoDto.setORIGIN_BSTOPNM(ORIGIN_BSTOPNM);
                busInfoDto.setDEST_BSTOPID(DEST_BSTOPID);
                busInfoDto.setDEST_BSTOPNM(DEST_BSTOPNM);

                dtos.add(busInfoDto);
                return dtos;
            }
        }
        else { // 결과가 없다면
            return null;
        }

    }

    @SneakyThrows
    public List<BusArrivalDto> findBusArrivalByBusStopId(int bStopId) { //정류소 ID로 버스 도착정보목록 조회
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        String encodedKey = URLEncoder.encode(bus_apikey, "UTF-8"); //서비스 키 인코딩

        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(busStopId_url)
                .queryParam("serviceKey", encodedKey) //서비스키
                .queryParam("bstopId", bStopId) // 버스정류소ID
                .queryParam("numOfRows", 10) // 개수
                .queryParam("pageNo", 1)
                .build(true);

        ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);

        JSONObject response = XML.toJSONObject(result.getBody()); //xml 형식을 json 형식으로 변환

        JSONObject ServiceResult = response.getJSONObject("ServiceResult"); //ServiceResult의 value들
        JSONObject msgHeader = ServiceResult.getJSONObject("msgHeader"); // msgBody의 value들

        if (msgHeader.get("resultCode").equals(0)) { // 결과가 있다면
            JSONObject msgBody = ServiceResult.getJSONObject("msgBody"); // msgBody의 value들

            if(msgBody.get("itemList").getClass().getName() == "org.json.JSONArray") { // itemList가 JSONArray라면 (여러개)
                JSONArray itemList = msgBody.getJSONArray("itemList"); // itemList의 value들
//                System.out.println("정류소 ID로 버스 도착정보목록 조회");
                List<BusArrivalDto> dtos = new ArrayList<>();

                for (int i = 0; i < itemList.length(); i++) { // 받아올 데이터 개수만큼 반복
                    JSONObject array = itemList.getJSONObject(i);
                    BusArrivalDto busArrivalDto = new BusArrivalDto();

                    Integer ROUTEID = array.getInt("ROUTEID"); // 노선 ID(버스 노선 고유번호)
                    Integer BUSID = array.getInt("BUSID"); // 버스 ID(차량 고유번호)
                    String BUS_NUM_PLATE = array.getString("BUS_NUM_PLATE"); // 차량 번호
                    Integer REST_STOP_COUNT = array.getInt("REST_STOP_COUNT"); // 몇 정거장 전
                    Integer ARRIVALESTIMATETIME = array.getInt("ARRIVALESTIMATETIME"); // 도착예정시간(몇 초 전)
                    Integer LATEST_STOP_ID = array.getInt("LATEST_STOP_ID"); //버스의 최근 정류소 ID
                    String LATEST_STOP_NAME = array.getString("LATEST_STOP_NAME"); //버스의 최근 정류소 명
                    Integer DIRCD = array.getInt("DIRCD"); // 진행방향코드(0:상행, 1:하행, 2:순환)

                    if (array.has("LOW_TP_CD")) { // LOW_TP_CD가 있다면
                        Integer LOW_TP_CD = array.getInt("LOW_TP_CD"); // 저상버스 여부(0:일반, 1:저상)
                        busArrivalDto.setLOW_TP_CD(LOW_TP_CD);
                    }
                    if (array.has("REMAIND_SEAT")) { // REMAIND_SEAT가 있다면
                        Integer REMAIND_SEAT = array.getInt("REMAIND_SEAT"); // 차량 빈자리 수 (255:사용안함)
                        busArrivalDto.setREMAIND_SEAT(REMAIND_SEAT);
                    }
                    if (array.has("CONGESTION")) { // CONGESTION가 있다면
                        Integer CONGESTION =array.getInt("CONGESTION"); // 혼잡도 (1:여유, 2:보통, 3:혼잡,  255:사용안함)
                        busArrivalDto.setCONGESTION(CONGESTION);
                    }
                    if (array.has("LASTBUSYN")) { //LASTBUSYN가 있다면
                        Integer LASTBUSYN = array.getInt("LASTBUSYN"); // 막차코드 (0:일반 1:막차)
                        busArrivalDto.setLASTBUSYN(LASTBUSYN);
                    }
                    busArrivalDto.setROUTEID(ROUTEID);
                    busArrivalDto.setBUSID(BUSID);
                    busArrivalDto.setBUS_NUM_PLATE(BUS_NUM_PLATE);
                    busArrivalDto.setREST_STOP_COUNT(REST_STOP_COUNT);
                    busArrivalDto.setARRIVALESTIMATETIME(ARRIVALESTIMATETIME);
                    busArrivalDto.setLATEST_STOP_ID(LATEST_STOP_ID);
                    busArrivalDto.setLATEST_STOP_NAME(LATEST_STOP_NAME);
                    busArrivalDto.setDIRCD(DIRCD);
                    dtos.add(i, busArrivalDto);
                }
                return dtos;
            }
            else { //array 가 아니라면(1개)
                JSONObject itemList = msgBody.getJSONObject("itemList"); //itemList가 JSONObject라면

                List<BusArrivalDto> dtos = new ArrayList<>();
                BusArrivalDto busArrivalDto = new BusArrivalDto();

                Integer ROUTEID = itemList.getInt("ROUTEID"); // 노선 ID(버스 노선 고유번호)
                Integer BUSID = itemList.getInt("BUSID"); // 버스 ID(차량 고유번호)
                String BUS_NUM_PLATE = itemList.getString("BUS_NUM_PLATE"); // 차량 번호
                Integer REST_STOP_COUNT = itemList.getInt("REST_STOP_COUNT"); // 몇 정거장 전
                Integer ARRIVALESTIMATETIME = itemList.getInt("ARRIVALESTIMATETIME"); // 도착예정시간(몇 초 전)
                Integer LATEST_STOP_ID = itemList.getInt("LATEST_STOP_ID"); //버스의 최근 정류소 ID
                String LATEST_STOP_NAME = itemList.getString("LATEST_STOP_NAME"); //버스의 최근 정류소 명
                Integer DIRCD = itemList.getInt("DIRCD"); // 진행방향코드(0:상행, 1:하행, 2:순환)

                if (itemList.has("LOW_TP_CD")) { // LOW_TP_CD가 있다면
                    Integer LOW_TP_CD = itemList.getInt("LOW_TP_CD"); // 저상버스 여부(0:일반, 1:저상)
                    busArrivalDto.setLOW_TP_CD(LOW_TP_CD);
                }
                if (itemList.has("REMAIND_SEAT")) { // REMAIND_SEAT가 있다면
                    Integer REMAIND_SEAT = itemList.getInt("REMAIND_SEAT"); // 차량 빈자리 수 (255:사용안함)
                    busArrivalDto.setREMAIND_SEAT(REMAIND_SEAT);
                }
                if (itemList.has("CONGESTION")) { // CONGESTION가 있다면
                    Integer CONGESTION =itemList.getInt("CONGESTION"); // 혼잡도 (1:여유, 2:보통, 3:혼잡,  255:사용안함)
                    busArrivalDto.setCONGESTION(CONGESTION);
                }
                if (itemList.has("LASTBUSYN")) { //LASTBUSYN가 있다면
                    Integer LASTBUSYN = itemList.getInt("LASTBUSYN"); // 막차코드 (0:일반 1:막차)
                    busArrivalDto.setLASTBUSYN(LASTBUSYN);
                }
                busArrivalDto.setROUTEID(ROUTEID);
                busArrivalDto.setBUSID(BUSID);
                busArrivalDto.setBUS_NUM_PLATE(BUS_NUM_PLATE);
                busArrivalDto.setREST_STOP_COUNT(REST_STOP_COUNT);
                busArrivalDto.setARRIVALESTIMATETIME(ARRIVALESTIMATETIME);
                busArrivalDto.setLATEST_STOP_ID(LATEST_STOP_ID);
                busArrivalDto.setLATEST_STOP_NAME(LATEST_STOP_NAME);
                busArrivalDto.setDIRCD(DIRCD);

                dtos.add(busArrivalDto);
                return dtos;
            }
        }
        else { // 결과가 없다면
            return null;
        }
    }

    public String getBusStopName(String str){
        Pattern regex1 = Pattern.compile(" 버스정류장");
        Pattern regex2 = Pattern.compile("버스정류장");
        Pattern regex2_1 = Pattern.compile(" 버스 정류장");
        Pattern regex3 = Pattern.compile(" 정류장");
        Pattern regex4 = Pattern.compile("정류장");
        Pattern regex5 = Pattern.compile(" 정류소");
        Pattern regex6 = Pattern.compile("정류소");

        Matcher regexMatcher1 = regex1.matcher(str);
        Matcher regexMatcher2 = regex2.matcher(str);
        Matcher regexMatcher2_1 = regex2_1.matcher(str);
        Matcher regexMatcher3 = regex3.matcher(str);
        Matcher regexMatcher4 = regex4.matcher(str);
        Matcher regexMatcher5 = regex5.matcher(str);
        Matcher regexMatcher6 = regex6.matcher(str);

        String result = "";

        if(regexMatcher1.find()){
            String substring = str.substring(0, str.length() - 6);
            result = substring;
        }else if(regexMatcher2.find()){
            String substring = str.substring(0, str.length() - 5);
            result = substring;
        }else if(regexMatcher2_1.find()){
            String substring = str.substring(0, str.length() - 7);
            result = substring;
        }else if(regexMatcher3.find() | regexMatcher5.find()){
            String substring = str.substring(0, str.length() - 4);
            result = substring;
        }else if(regexMatcher4.find() | regexMatcher6.find()){
            String substring = str.substring(0, str.length() - 3);
            result = substring;
        }else{
            return str;
        }

        return result;

    }

}
