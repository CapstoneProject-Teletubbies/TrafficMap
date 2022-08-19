package teletubbies.map.subway;

import lombok.Data;

@Data
public class SubwayDto {
    //1063: 경의중앙, 1065: 공항철도, 1067: 경춘선, 1075: 수인분당, 1077: 신분당, 1091: 자기부상, 1092: 우이신설
    private String subwayId; //지하철 호선 ID
    private String updnLine; //상하행선 구분 (2호선:(내선:0,외선:1, 상행, 하행)
    private String trainLineNm; //도착지방면(성수행-구로디지털단지방면)
    private String statnId; //지하철역ID
    private String statnNm; //지하철역명
    private String btrainSttus; // 열차종류(급행,ITX)
    private String barvlDt; //열차도착예정시간(단위:초)
    private String btrainNo; //열차 번호
    private String arvlMsg2; //첫번째 도착메세지(전역진입, 전역도착 등)
    private String arvlMsg3; //두번째 도착메세지(종합운동장 도착, 12분후(광명사거리) 등)
    private String arvlCd; //도착코드(0:진입, 1:도착, 2:출발, 3:전역출발, 4:전역진입, 5:전역도착, 99:운행중)

}
