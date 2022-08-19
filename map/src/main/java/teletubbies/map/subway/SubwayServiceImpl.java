package teletubbies.map.subway;

import lombok.SneakyThrows;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;


@Service
public class SubwayServiceImpl implements SubwayService {
    @Value("${SUBWAY_APPKEY}")
    private String subway_apikey; //지하철 API 앱키 설정
    @Value("${WHEELCHAIR_APPKEY}")
    private String wheelchair_apikey; //휠체어리프트 API 앱키 설정
    @Value("${TOILET_APPKEY}")
    private String toilet_apikey; //장애인화장실 API 앱키 설정

    @Value("${SUBWAY_URL}")
    private String subway_url; //지하철 URL 설정
    @Value("${SUBWAYMAP_URL}")
    private String suwaymap_url; //지하철 1-9호선 내부지도 URL 설정
    @Value("${WHEELCHAIR_URL}")
    private String wheelchair_url; //휠체어리프트 URL 설정
    @Value("${TOILET_URL}")
    private String toilet_url; // 장애인화장실 URL 설정


    @SneakyThrows
    public List<SubwayDto> findSubwayByStopName(String name) { //지하철역 이름으로 도착정보 조회
        //RestTemplate : REST API 호출이후 응답을 받을 때까지 기다리는 동기방식
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        String encodedName = URLEncoder.encode(name, "UTF-8");
        //URI 생성
        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(subway_url)
                .path("api/subway/" + subway_apikey + "/json/realtimeStationArrival/0/15/" + encodedName)
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
        }
        else {
            List<SubwayDto> dtos = new ArrayList<>();
            for (int i = 0; i < realtimeArrivalList.size(); i++) { //받아올 데이터 개수만큼 반복

                JSONObject array = (JSONObject) realtimeArrivalList.get(i);
                SubwayDto subwayDto = new SubwayDto();

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

                switch (subwayId) { // subwayId가 알아보기 힘들 것 같아서 알아볼 수 있도록 이름 바꿔서 저장해주기 위한 switch문
                    case "1001":
                        subwayId = "1호선";
                        break;
                    case "1002":
                        subwayId = "2호선";
                        break;
                    case "1003":
                        subwayId = "3호선";
                        break;
                    case "1004":
                        subwayId = "4호선";
                        break;
                    case "1005":
                        subwayId = "5호선";
                        break;
                    case "1006":
                        subwayId = "6호선";
                        break;
                    case "1007":
                        subwayId = "7호선";
                        break;
                    case "1008":
                        subwayId = "8호선";
                        break;
                    case "1009":
                        subwayId = "9호선";
                        break;
                    case "1063":
                        subwayId = "경의중앙선";
                        break;
                    case "1065":
                        subwayId = "공항철도";
                        break;
                    case "1067":
                        subwayId = "경춘선";
                        break;
                    case "1075":
                        subwayId = "수인분당선";
                        break;
                    case "1077":
                        subwayId = "신분당선";
                        break;
                    case "1091":
                        subwayId = "인천공항자기부상철도";
                        break;
                    case "1092":
                        subwayId = "우이신설선";
                        break;
                    default:
                        subwayId = null;
                        break;
                }
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

    @SneakyThrows
    public Integer findWheelchair(int lnCd, int stinCd, String railOprIsttCd) { // 휠체어리프트
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        //URI 생성
        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(wheelchair_url)
                .queryParam("serviceKey", wheelchair_apikey)
                .queryParam("format", "json")
                .queryParam("railOprIsttCd", railOprIsttCd) //철도운영기관코드
                .queryParam("lnCd", lnCd) // 선코드
                .queryParam("stinCd", stinCd) // 역코드
                .build(true);

        //response
        ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);

        JSONParser parser = new JSONParser();
        JSONObject object = (JSONObject) parser.parse(result.getBody());
        JSONObject header = (JSONObject) object.get("header");

        if (header.get("resultCnt").equals(0)) { // 만약 휠체어리프트가 없는 역이면
            return null;
        } else {
            Integer num = Integer.parseInt(header.get("resultCnt").toString());
            return num;
        }
        /*
        리스트로 반환했다가 휠체어리프트 유무만 쓸거 같아서 아래는 일단 주석처리함!
         */
//        else { // 휠체어 리프트가 있는 역이면
//            JSONArray body = (JSONArray) object.get("body"); // body의 value들 불러오기 위한 것
//
//            List<WheelchairDto> dtos = new ArrayList<>();
//            for(int i=0; i<body.size(); i++) { // 개수만큼 반복
//                JSONObject array = (JSONObject) body.get(i);
//                WheelchairDto wheelchairDto = new WheelchairDto();
//
//                Long bndWgt = (Long) array.get("bndWgt"); // 한계중량
//                String dtlLoc = (String) array.get("dtlLoc"); // 상세위치
//                String exitNo = (String) array.get("exitNo"); // 출구번호
//                String grndDvNmFr = (String) array.get("grndDvNmFr"); // 운행시작(지상/지하)
//                String grndDvNmTo = (String) array.get("grndDvNmTo"); // 운행종료(지상/지하)
//                Long len = (Long) array.get("len"); // 길이
//                Long runStinFlorFr = (Long) array.get("runStinFlorFr"); // 운행시작층
//                Long runStinFlorTo = (Long) array.get("runStinFlorTo"); // 운행종료층
//                Long wd = (Long) array.get("wd"); // 폭
//
//                //WheelChairDto에 저장
//                wheelchairDto.setBndWgt(bndWgt);
//                wheelchairDto.setDtlLoc(dtlLoc);
//                wheelchairDto.setExitNo(exitNo);
//                wheelchairDto.setGrndDvNmFr(grndDvNmFr);
//                wheelchairDto.setGrndDvNmTo(grndDvNmTo);
//                wheelchairDto.setLen(len);
//                wheelchairDto.setRunStinFlorFr(runStinFlorFr);
//                wheelchairDto.setRunStinFlorTo(runStinFlorTo);
//                wheelchairDto.setWd(wd);
//
//                dtos.add(i, wheelchairDto);
//            }
//            return dtos;
//        }
    }

    @SneakyThrows
    public Integer findToilet(int lnCd, int stinCd, String railOprIsttCd) { // 장애인화장실
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

        //URI 생성
        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(toilet_url)
                .queryParam("serviceKey", toilet_apikey)
                .queryParam("format", "json")
                .queryParam("railOprIsttCd", railOprIsttCd) //철도운영기관코드
                .queryParam("lnCd", lnCd) // 선코드
                .queryParam("stinCd", stinCd) // 역코드
                .build(true);

        //response
        ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);

        JSONParser parser = new JSONParser();
        JSONObject object = (JSONObject) parser.parse(result.getBody());
        JSONObject header = (JSONObject) object.get("header"); // header value값 가져오기 위한 것

        if (header.get("resultCnt").equals(0)) { // 만약 장애인화장실이 없는 역이면
            return null;
        } else { // 있는 역이면
            Integer num = Integer.parseInt(header.get("resultCnt").toString());
            return num; // 개수 반환
        }
    }

        /*
        리스트로 반환했다가 얘두 장애인화장실 유무만 쓸거 같아서 아래 일단 주석처리!
         */
//        else { // 장애인화장실이 있는 역이면
//            JSONArray body = (JSONArray) object.get("body"); // body의 value들 불러오기 위한 것
//
//            List<ToiletDto> dtos = new ArrayList<>();
//            for(int i=0; i<body.size(); i++) { // 개수만큼 반복
//                JSONObject array = (JSONObject) body.get(i);
//                ToiletDto toiletDto = new ToiletDto();
//
//                Long diapExchNum = (Long) array.get("diapExchNum"); // 기저귀교환대개수
//                String dtlLoc = (String) array.get("dtlLoc"); // 상세위치
//                String exitNo = (String) array.get("exitNo"); // 출구번호
//                String gateInotDvNm = (String) array.get("gateInotDvNm"); // 게이트내외구분
//                String grndDvNm = (String) array.get("grndDvNm"); // 지상구분
//                String mlFmlDvNm = (String) array.get("mlFmlDvNm"); // 남녀구분
//                Long stinFlor = (Long) array.get("stinFlor"); // 역층
//                Long toltNum = (Long) array.get("toltNum");  // 화장실개수
//
//                //toiletDto에 저장
//                toiletDto.setDiapExchNum(diapExchNum);
//                toiletDto.setDtlLoc(dtlLoc);
//                toiletDto.setExitNo(exitNo);
//                toiletDto.setGateInotDvNm(gateInotDvNm);
//                toiletDto.setGrndDvNm(grndDvNm);
//                toiletDto.setMlFmlDvNm(mlFmlDvNm);
//                toiletDto.setStinFlor(stinFlor);
//                toiletDto.setToltNum(toltNum);
//
//                dtos.add(i, toiletDto);
//            }
//            return dtos;
//        }


    //인천 1.2호선 내부지도
    @SneakyThrows
    public MultiValueMap<String, String> findSubwayPhotoByStopName() {

        File doc = new File(new File("./src/main/resources/SubwayPhotoFileName.txt").getCanonicalPath());

        BufferedReader obj = new BufferedReader(new InputStreamReader(new FileInputStream(doc), "utf-8"));
        String[] Name;
        String str;
        String key;
        String value;
        MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
        while ((str = obj.readLine()) != null) {
            Name = str.split("\\t");
            key = Name[0];
            value = Name[1];
            map.add(key, value);
        }

        return map;
    }

    // 1~9호선
    @SneakyThrows
    public String findSubwayPhoto2(String line, String name) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders(); //헤더
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8)); // 한글깨짐 방지

//        String encodedName = URLEncoder.encode(name, "UTF-8");
        //URI 생성
        UriComponents uri = UriComponentsBuilder
                .fromHttpUrl(suwaymap_url)
                .path("/" + subway_apikey + "/json/SmrtEmergerncyGuideImg/1/50/" + line + "/")
                .build(true);

        //response
        ResponseEntity<String> result = restTemplate.exchange(uri.toUri(), HttpMethod.GET, new HttpEntity<String>(headers), String.class);

        JSONParser parser = new JSONParser();
        JSONObject object = (JSONObject) parser.parse(result.getBody());
        JSONObject smrtEmergerncyGuideImg = (JSONObject) object.get("SmrtEmergerncyGuideImg");
        Long totalCount = (Long) smrtEmergerncyGuideImg.get("list_total_count");
        JSONArray row = (JSONArray) smrtEmergerncyGuideImg.get("row");

        for (int i = 0; i < totalCount; i++) { // 개수만큼 반복
            JSONObject array = (JSONObject) row.get(i);

            String getName = array.get("STN_NM").toString();

            if (name.equals(getName)) { // 받은 역이름과 같으면
                String url = array.get("STN_IMG_URL").toString();

                return url; //url 반환
            }
            else { // 다르면
                continue; // 넘어갑시다
            }
        }
        return null; //없으면 null 반환해버렷
    }
}