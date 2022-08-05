package teletubbies.map.bus;

import lombok.Data;

@Data
public class BusRouteDetailDto {
    //버스노선 상세정보
    private Integer ROUTEID; // 버스 노선 고유번호
    private Object ROUTENO; // 노선 명
    private Integer ROUTETPCD; // 노선유형코드 [1:지선형, 2:간선형, 3:좌석형, 4:광역형, 5:리무진, 6:마을버스, 7:순환형, 8:급행간선, 9:지선(순환)]
    private Object FBUS_DEPHMS; // 첫차 시간 hhmm
    private Object LBUS_DEPHMS; // 막차 시간 hhmm
    private Object MIN_ALLOCGAP; // 	최소 배차간격
    private Object MAX_ALLOCGAP; // 최대 배차간격
    private Integer TURN_BSTOPID; // 회차지 정류소ID
    private String TURN_BSTOPNM; // 회차지 정류소명
    private Integer ORIGIN_BSTOPID; // 기점 정류소ID
    private String ORIGIN_BSTOPNM; // 기점 정류소명
    private Integer DEST_BSTOPID; // 종점 정류소ID
    private String DEST_BSTOPNM; // 종점 정류소명
}
