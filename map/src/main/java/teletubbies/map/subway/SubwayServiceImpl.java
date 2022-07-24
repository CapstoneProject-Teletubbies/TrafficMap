package teletubbies.map.subway;

import lombok.SneakyThrows;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;


@Service
public class SubwayServiceImpl implements SubwayService{
    @Value("${SUBWAY_APPKEY}")
    private String subway_apikey; //지하철 API 앱키 설정

    @Value("${SUBWAY_URL}")
    private String subway_url; //지하철 URL 설정

    @SneakyThrows
    public List<SubwayDto> findSubwayByStopName(int start, int end, String name) { //지하철역 이름으로 도착정보 조회
        //RestTemplate : REST API 호출이후 응답을 받을 때까지 기다리는 동기방식
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        String encodedName = URLEncoder.encode(name, "UTF-8");
        //URI 생성
        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(subway_url)
                .path("api/subway/" + subway_apikey + "/json/realtimeStationArrival")
                .path("/" + start + "/" + end + "/" + encodedName)
                .build(true);

        //response
        ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);

        //받아온 JSON 데이터 가공
        //json parser
        JSONParser parser = new JSONParser();
        JSONObject object = (JSONObject) parser.parse(result.getBody());
        JSONArray realtimeArrivalList = (JSONArray) object.get("realtimeArrivalList");

        if (realtimeArrivalList == null) { // 결과가 없으면 null 처리
            return null;
        } else {
            List<SubwayDto> dtos = new ArrayList<>();
            for (int i = 0; i < realtimeArrivalList.size(); i++) { //받아올 데이터 개수만큼 반복

                JSONObject array = (JSONObject) realtimeArrivalList.get(i);
                SubwayDto subwayDto = new SubwayDto();

                //1063: 경의중앙, 1065: 공항철도, 1067: 경춘선, 1075: 수인분당, 1077: 신분당, 1091: 자기부상, 1092: 우이신설
                String subwayId = (String) array.get("subwayId"); // 지하철호선 ID
                String updnLine = (String) array.get("updnLine"); // 상행/하행 표시
                String trainLineNm = (String) array.get("trainLineNm"); // 도착지 방면
                String statnId = (String) array.get("statnId"); // 지하철역 ID
                String statnNm = (String) array.get("statnNm"); // 지하철역 명
                String btrainSttus = (String) array.get("btrainSttus"); // 열차종류
                String barvlDt = (String) array.get("barvlDt"); // 열차도착예정시간(단위:초)
                String btrainNo = (String) array.get("btrainNo"); // 열차 번호
                String arvlMsg2 = (String) array.get("arvlMsg2"); // 첫번째 도착메세지
                String arvlMsg3 = (String) array.get("arvlMsg3"); // 두번째 도착메세지
                String arvlCd = (String) array.get("arvlCd"); // 도착 코드(0:진입, 1:도착, 2:출발, 3:전역출발, 4:전역진입, 5:전역도착, 99:운행중)

                subwayDto.setSubwayId(subwayId);
                subwayDto.setUpdnLine(updnLine);
                subwayDto.setTrainLineNm(trainLineNm);
                subwayDto.setStatnId(statnId);
                subwayDto.setStatnNm(statnNm);
                subwayDto.setBtrainSttus(btrainSttus);
                subwayDto.setBarvlDt(barvlDt);
                subwayDto.setBtrainNo(btrainNo);
                subwayDto.setArvlMsg2(arvlMsg2);
                subwayDto.setArvlMsg3(arvlMsg3);
                subwayDto.setArvlCd(arvlCd);

                dtos.add(i, subwayDto);
            }
            return dtos;
        }
    }
}
